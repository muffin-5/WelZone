import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaMoon,
  FaChartLine,
} from "react-icons/fa";
import PageShell from "./PageShell";
import SessionCalendar from "./SessionCalendar";
import SleepQuality from "./SleepQuality";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const CalendarPage = () => {
  const whoLogged = localStorage.getItem("whoLogged");
  const myId = localStorage.getItem("Id");
  const [bookedSessions, setBookedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const endpoint =
          whoLogged === "counselor"
            ? `http://localhost:8080/slots/booked/${myId}`
            : `http://localhost:8080/slots/bookedbyme/${myId}`;
        const res = await axios.get(endpoint);
        setBookedSessions(Array.isArray(res.data) ? res.data : []);
      } catch {
        setError("Failed to load your session calendar.");
        setBookedSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [whoLogged, myId]);

  const grouped = {};
  bookedSessions.forEach((s) => {
    const start = convertArrayToDate(s.startTime);
    if (!start) return;
    const key = start.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  const isCounselor = whoLogged === "counselor";

  return (
    <PageShell
      eyebrow="Calendar"
      title={
        isCounselor ? "My Session Calendar" : "My Booked Sessions Calendar"
      }
      subtitle={
        isCounselor
          ? "A clear month-by-month view of every session members have booked with you."
          : "A clear month-by-month view of every counselling session you've booked."
      }
    >
      {error && (
        <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="welzone-card p-6 flex items-center justify-center h-96 text-stone">
              Loading your calendar...
            </div>
          ) : (
            <SessionCalendar sessions={bookedSessions} title="Month view" />
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          {/* Upcoming list */}
          <div className="welzone-card p-6">
            <h3 className="text-lg font-extrabold text-cocoa mb-4 flex items-center gap-2">
              <FaCalendarCheck className="text-sage-500" /> Upcoming
            </h3>
            {bookedSessions.length === 0 ? (
              <p className="text-sm text-stone">
                No upcoming sessions booked.{" "}
                {isCounselor
                  ? "Open up availability to start getting bookings."
                  : "Head to Book a Session to find one."}
              </p>
            ) : (
              <ul className="space-y-3">
                {bookedSessions.slice(0, 5).map((session) => {
                  const start = convertArrayToDate(session.startTime);
                  const personName = session.counselorName || session.userName;
                  return (
                    <li
                      key={session.slotId ?? session.id}
                      className="rounded-2xl bg-sage-50 px-4 py-3"
                    >
                      <p className="text-sm font-bold text-sage-800">
                        {personName
                          ? `With ${personName}`
                          : "Counselling session"}
                      </p>
                      <p className="text-xs text-stone">
                        {start?.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        ·{" "}
                        {start?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Quick links */}
          <div className="welzone-card p-6">
            <h3 className="text-lg font-extrabold text-cocoa mb-4">
              Quick actions
            </h3>
            <div className="space-y-2">
              {!isCounselor && (
                <a href="/book-session" className="quick-link">
                  <FaCalendarAlt className="text-sage-500" /> Book a new session
                </a>
              )}
              <a href="/progress" className="quick-link">
                <FaChartLine className="text-peach-400" /> View my progress
              </a>
              <a href="/chat" className="quick-link">
                <FaMoon className="text-clay-400" /> Open chat
              </a>
            </div>
          </div>

          {/* Sleep widget compact */}
          <SleepQuality compact />
        </div>
      </div>
    </PageShell>
  );
};

export default CalendarPage;