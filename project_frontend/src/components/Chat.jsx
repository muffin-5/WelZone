import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  FaPaperPlane,
  FaVideo,
  FaCheckCircle,
  FaUserCircle,
} from "react-icons/fa";
import PageShell from "./PageShell";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const Chat = () => {
  const whoLogged = localStorage.getItem("whoLogged");
  const myId = localStorage.getItem("Id");
  const myType = whoLogged === "counselor" ? "COUNSELOR" : "USER";

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const subscriptionsRef = useRef([]);
  const typingTimeoutRef = useRef(null);
  const lastTypingSentRef = useRef(0);
  const subscribeRef = useRef(null);

  const getApiBase = () => API_BASE;

  const getStompDestination = () => `${getApiBase().replace(/\/$/, "")}/chat-websocket`;

  // Subscribe/unsubscribe to the message + typing topics for the active session
  const subscribeToTopics = (client) => {
    if (!selectedSession || !client?.connected) return;

    // Clean up previous subscriptions
    subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
    subscriptionsRef.current = [];

    const sessionId = selectedSession.slotId;

    const msgSub = client.subscribe(`/topic/messages/${sessionId}`, (frame) => {
      try {
        const msg = JSON.parse(frame.body);
        setMessages((prev) =>
          prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
        );
      } catch {
        // ignore malformed frames
      }
    });

    const typingSub = client.subscribe(`/topic/typing/${sessionId}`, (frame) => {
      try {
        const evt = JSON.parse(frame.body);
        const isMine =
          String(evt.senderType).toUpperCase() === myType &&
          String(evt.senderId) === String(myId);
        if (isMine || !evt.typing) {
          setOtherTyping(false);
          return;
        }
        setOtherTyping(true);
        // Safety: hide the bubble even if a "stopped" event is missed
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setOtherTyping(false), 4000);
      } catch {
        // ignore malformed frames
      }
    });

    subscriptionsRef.current = [msgSub, typingSub];
  };

  // Keep the latest subscribeToTopics callable for the socket's onConnect/reconnect
  subscribeRef.current = subscribeToTopics;

  // Connect to the STOMP WebSocket once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(getStompDestination()),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 3000,
      debug: () => {},
      onConnect: () => subscribeRef.current(client),
    });
    client.activate();
    stompClientRef.current = client;

    return () => {
      subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
      subscriptionsRef.current = [];
      clearTimeout(typingTimeoutRef.current);
      client.deactivate();
      stompClientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resubscribe whenever the selected session changes
  useEffect(() => {
    const client = stompClientRef.current;
    if (client) subscribeToTopics(client);
    setOtherTyping(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSession]);

  // Fetch list of sessions the user/counselor is part of
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const endpoint =
          myType === "COUNSELOR"
            ? `${getApiBase()}/slots/booked/${myId}`
            : `${getApiBase()}/slots/bookedbyme/${myId}`;
        const res = await axios.get(endpoint);
        setSessions(Array.isArray(res.data) ? res.data : []);
      } catch {
        setSessions([]);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, [myId, myType]);

  // Fetch messages for selected session (initial load only; live updates arrive via WebSocket)
  useEffect(() => {
    if (!selectedSession) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${getApiBase()}/chat/messages/${selectedSession.slotId}`
        );
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [selectedSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, otherTyping]);

  const notifyTyping = (typing) => {
    const client = stompClientRef.current;
    if (!client?.connected || !selectedSession) return;
    try {
      client.publish({
        destination: "/app/typing",
        body: JSON.stringify({
          sessionId: selectedSession.slotId,
          senderId: Number(myId),
          senderType: myType,
          typing,
        }),
      });
    } catch {
      // socket not ready yet
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Debounce: announce "typing" at most once per second while typing
    const now = Date.now();
    if (now - lastTypingSentRef.current > 1000) {
      lastTypingSentRef.current = now;
      notifyTyping(true);
    }

    // Stop announcing after the user pauses for ~1.5s
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      lastTypingSentRef.current = 0;
      notifyTyping(false);
    }, 1500);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedSession) return;
    const msg = input.trim();
    setInput("");
    setSending(true);

    // Tell the other party we stopped typing
    clearTimeout(typingTimeoutRef.current);
    lastTypingSentRef.current = 0;
    notifyTyping(false);

    try {
      await axios.post(`${getApiBase()}/chat/send`, {
        sessionId: selectedSession.slotId,
        senderId: Number(myId),
        senderType: myType,
        message: msg,
      });
      // New message is pushed back over the WebSocket; no refetch needed.
      // Fallback refetch in case the socket is briefly unavailable.
      const res = await axios.get(
        `${getApiBase()}/chat/messages/${selectedSession.slotId}`
      );
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const startTime = selectedSession
    ? convertArrayToDate(selectedSession.startTime)
    : null;

  const otherName =
    myType === "COUNSELOR"
      ? selectedSession?.userName
      : selectedSession?.counselorName;

  const otherInitial = otherName ? otherName.charAt(0).toUpperCase() : "?";

  const formatTime = (ts) =>
    ts ? new Date(ts.endsWith("Z") ? ts : `${ts}Z`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  const formatDay = (ts) => {
    if (!ts) return "";
    const d = new Date(ts.endsWith("Z") ? ts : `${ts}Z`);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const sameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
    if (sameDay(d, today)) return "Today";
    if (sameDay(d, yesterday)) return "Yesterday";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  // Insert day dividers between messages
  const grouped = [];
  let lastDay = null;
  messages.forEach((m) => {
    const day = m.timestamp ? new Date(m.timestamp).toDateString() : "";
    if (day !== lastDay) {
      grouped.push({ type: "divider", label: formatDay(m.timestamp), key: `div-${day}` });
      lastDay = day;
    }
    grouped.push({ type: "msg", m });
  });

  return (
    <PageShell
      eyebrow="Messaging"
      title="Secure Chat"
      subtitle={
        myType === "COUNSELOR"
          ? "Message the members who have booked sessions with you."
          : "Message your counsellor before or after your session."
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Session list */}
        <div className="welzone-card p-4 lg:h-[560px] lg:overflow-y-auto">
          <h3 className="font-extrabold text-cocoa px-2 py-2 mb-2">
            Conversations
          </h3>
          {loadingSessions ? (
            <p className="px-2 py-4 text-sm text-stone">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <div className="px-2 py-6 text-center">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-sm text-stone">
                No sessions to chat about yet.{" "}
                {myType === "USER"
                  ? "Book a session to start chatting."
                  : "Add availability and wait for bookings."}
              </p>
            </div>
          ) : (
            sessions.map((session) => {
              const start = convertArrayToDate(session.startTime);
              const active = selectedSession?.slotId === session.slotId;
              const personName = session.counselorName || session.userName;
              return (
                <button
                  key={session.slotId ?? session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left flex items-center gap-3 rounded-2xl p-3 mb-1 transition ${
                    active
                      ? "bg-sage-100 ring-1 ring-sage-300"
                      : "hover:bg-cream-100"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      active ? "bg-sage-200 text-sage-700" : "bg-cream-200 text-stone"
                    }`}
                  >
                    <FaVideo />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-cocoa truncate">
                      {personName
                        ? `Session with ${personName}`
                        : "Counselling session"}
                    </p>
                    <p className="text-xs text-stone truncate">
                      {start?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      ·{" "}
                      {start?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Chat window */}
        <div className="lg:col-span-2 welzone-card flex flex-col overflow-hidden h-[calc(100dvh-11rem)] lg:h-[560px]">
          {!selectedSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <span className="w-20 h-20 rounded-3xl bg-sage-100 text-sage-500 flex items-center justify-center mb-4">
                <FaUserCircle className="text-4xl" />
              </span>
              <p className="font-bold text-cocoa">Select a conversation</p>
              <p className="text-sm text-stone mt-1 max-w-xs">
                Choose a session from the list to start chatting securely with
                your counsellor.
              </p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-200 bg-cream-50">
                <span className="w-10 h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center">
                  <FaVideo />
                </span>
                <div className="flex-1">
                  <p className="font-bold text-cocoa">
                    {selectedSession.counselorName || selectedSession.userName
                      ? `Session with ${
                          selectedSession.counselorName ||
                          selectedSession.userName
                        }`
                      : "Counselling session"}
                  </p>
                  <p className="text-xs text-stone">
                    {startTime?.toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="welzone-chip bg-sage-100 text-sage-700 text-xs">
                  <FaCheckCircle /> Encrypted
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 md:p-5 md:space-y-4 bg-mist/60 overscroll-contain">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-stone text-center max-w-xs">
                      No messages yet. Say hello to start the conversation! 🌿
                    </p>
                  </div>
                ) : (
                  grouped.map((item) => {
                    if (item.type === "divider") {
                      return (
                        <div key={item.key} className="flex justify-center py-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone/70 bg-white px-3 py-1 rounded-full shadow-sm md:text-[11px]">
                            {item.label}
                          </span>
                        </div>
                      );
                    }
                    const m = item.m;
                    const isMine =
                      String(m.senderType).toUpperCase() === myType &&
                      String(m.senderId) === String(myId);
                    const senderInitial = isMine ? null : otherInitial;
                    return (
                      <div
                        key={m.id}
                        className={`flex items-end gap-2 md:gap-2.5 ${isMine ? "justify-end" : "justify-start"}`}
                      >
                        {/* Avatar on the opposite side */}
                        {!isMine && (
                          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-xs md:text-sm font-bold shrink-0 ring-2 ring-white shadow-sm">
                            {senderInitial}
                          </span>
                        )}

                        <div className={`flex flex-col max-w-[75%] md:max-w-[70%] ${isMine ? "items-end" : "items-start"}`}>
                          {/* Sender name for the other party */}
                          {!isMine && (
                            <span className="text-[10px] md:text-[11px] font-semibold text-stone/70 mb-0.5 ml-1.5 md:ml-1">
                              {otherName || "Counsellor"}
                            </span>
                          )}
                          <div
                            className={`px-3 py-2 md:px-4 md:py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words rounded-2xl md:rounded-3xl shadow-sm ${
                              isMine
                                ? "bg-sage-500 text-white rounded-br-md"
                                : "bg-white text-cocoa rounded-bl-md border border-cream-200"
                            }`}
                          >
                            {m.message}
                            <span
                              className={`block text-[10px] mt-1 ${
                                isMine ? "text-sage-100/80 text-right" : "text-stone/60 text-right"
                              }`}
                            >
                              {formatTime(m.timestamp)}
                            </span>
                          </div>
                        </div>

                        {/* Avatar on my side */}
                        {isMine && (
                          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-sage-500 text-white flex items-center justify-center text-xs md:text-sm font-bold shrink-0 ring-2 ring-white shadow-sm">
                            {whoLogged === "counselor" ? "C" : "M"}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
                {otherTyping && (
                  <div className="flex items-end gap-2 md:gap-2.5 justify-start">
                    <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-xs md:text-sm font-bold shrink-0 ring-2 ring-white shadow-sm">
                      {otherInitial}
                    </span>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] md:text-[11px] font-semibold text-stone/70 mb-0.5 ml-1.5 md:ml-1">
                        {otherName || "Counsellor"}
                      </span>
                      <div className="px-3 py-2.5 bg-white rounded-2xl rounded-bl-md border border-cream-200 shadow-sm flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-stone/40 animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 rounded-full bg-stone/40 animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 rounded-full bg-stone/40 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={sendMessage}
                className="flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-5 md:py-4 border-t border-cream-200 bg-cream-50"
              >
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="welzone-input flex-1"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="welzone-btn-primary !px-4 !py-2.5 md:!px-5 md:!py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default Chat;