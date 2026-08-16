import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaCalendarPlus,
  FaClock,
  FaUser,
  FaCalendarCheck,
  FaArrowRight,
  FaVideo,
  FaTrash,
  FaComments,
} from "react-icons/fa";
import PageShell from "./PageShell";
import SessionCalendar from "./SessionCalendar";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const formatRange = (date) => {
  const start = convertArrayToDate(date.startTime);
  const end = convertArrayToDate(date.endTime);
  if (!start) return "";
  return `${start.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })} · ${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} – ${end ? end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}`;
};

const CounselorSessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [tab, setTab] = useState("all");
  const navigate = useNavigate();
  const counselorId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookedRes, availRes, allRes] = await Promise.all([
          axios.get(`http://localhost:8080/slots/booked/${counselorId}`),
          axios.get(`http://localhost:8080/slots/available/${counselorId}`),
          axios.get(`http://localhost:8080/slots/all/${counselorId}`),
        ]);
        setUpcomingSessions(
          Array.isArray(bookedRes.data) ? bookedRes.data : []
        );
        setAvailableSlots(Array.isArray(availRes.data) ? availRes.data : []);
        setAllSlots(Array.isArray(allRes.data) ? allRes.data : []);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setUpcomingSessions([]);
        setAvailableSlots([]);
        setAllSlots([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [counselorId]);

  const handleDelete = async (slot) => {
    const slotId = slot.slotId ?? slot.id;
    if (
      !window.confirm(
        `Delete this ${slot.booked ? "booked" : "available"} slot? This cannot be undone.`
      )
    ) {
      return;
    }
    setDeleting(slotId);
    try {
      const response = await axios.delete(
        `http://localhost:8080/slots/${slotId}`
      );
      if (response.status === 200) {
        setAllSlots((prev) => prev.filter((s) => (s.slotId ?? s.id) !== slotId));
        setUpcomingSessions((prev) =>
          prev.filter((s) => (s.slotId ?? s.id) !== slotId)
        );
        setAvailableSlots((prev) =>
          prev.filter((s) => s.id !== slotId)
        );
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      window.alert("Failed to delete slot. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <PageShell
      eyebrow="Counsellor"
      title="Manage Your Sessions"
      subtitle="See who's booked in next, view your available slots, and keep your calendar in sync."
      action={
        <Link to="/counselor/add-slot" className="welzone-btn-primary">
          <FaCalendarPlus /> Add New Slot
        </Link>
      }
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-cream-200/60 rounded-full p-1.5 w-fit">
        <TabButton
          active={tab === "all"}
          onClick={() => setTab("all")}
          label={`All Slots (${allSlots.length})`}
        />
        <TabButton
          active={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
          label={`Upcoming (${upcomingSessions.length})`}
        />
        <TabButton
          active={tab === "available"}
          onClick={() => setTab("available")}
          label={`Available (${availableSlots.length})`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {tab === "upcoming" ? (
            loading ? (
              <div className="welzone-card p-8 text-center text-stone">
                Loading sessions...
              </div>
            ) : upcomingSessions.length === 0 ? (
              <div className="welzone-card p-10 text-center">
                <p className="text-4xl mb-3">🗓️</p>
                <p className="font-bold text-cocoa">No upcoming sessions</p>
                <p className="text-sm text-stone mt-1">
                  Add availability so members can book time with you.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.slotId ?? session.id}
                    className="welzone-card p-5 flex items-center gap-4 hover:shadow-lift transition-shadow"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0">
                      <FaVideo className="text-xl" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-cocoa">
                          {session.userName
                            ? `Session with ${session.userName}`
                            : "Session with a Member"}
                        </h3>
                        <span className="welzone-chip bg-sage-100 text-sage-700 text-xs">
                          Booked
                        </span>
                      </div>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 mt-1">
                        <FaClock className="text-sage-500" />{" "}
                        {formatRange(session)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => navigate(`/chat`)}
                        className="welzone-btn-secondary text-sm"
                        title="Chat with member"
                      >
                        <FaComments className="text-xs" />
                      </button>
                      <button
                        onClick={() => navigate(`./${session.slotId ?? session.id}`)}
                        className="welzone-btn-secondary text-sm"
                      >
                        Details <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : tab === "available" ? (
            loading ? (
              <div className="welzone-card p-8 text-center text-stone">
                Loading slots...
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="welzone-card p-10 text-center">
                <p className="text-4xl mb-3">⏳</p>
                <p className="font-bold text-cocoa">No available slots</p>
                <p className="text-sm text-stone mt-1">
                  Create your first slot to start receiving bookings.
                </p>
                <Link to="/counselor/add-slot" className="welzone-btn-primary mt-4 inline-flex">
                  <FaCalendarPlus /> Add Slot
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {availableSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="welzone-card p-5 flex items-center gap-4"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-cream-200 text-cocoa flex items-center justify-center shrink-0">
                      <FaUser className="text-xl" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-cocoa">Available Slot</h3>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-stone mt-1">
                        <FaClock className="text-sage-500" /> {formatRange(slot)}
                      </p>
                    </div>
                    <span className="welzone-chip bg-peach-100 text-peach-500 text-xs shrink-0">
                      Open
                    </span>
                    <button
                      onClick={() => handleDelete(slot)}
                      disabled={deleting === slot.id}
                      className="welzone-btn-ghost !px-3.5 !py-2 text-xs shrink-0 hover:!bg-peach-50 hover:!text-peach-500"
                      title="Delete slot"
                    >
                      <FaTrash /> {deleting === slot.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : loading ? (
            <div className="welzone-card p-8 text-center text-stone">
              Loading slots...
            </div>
          ) : allSlots.length === 0 ? (
            <div className="welzone-card p-10 text-center">
              <p className="text-4xl mb-3">⏳</p>
              <p className="font-bold text-cocoa">No slots yet</p>
              <p className="text-sm text-stone mt-1">
                Create your first slot to start receiving bookings.
              </p>
              <Link to="/counselor/add-slot" className="welzone-btn-primary mt-4 inline-flex">
                <FaCalendarPlus /> Add Slot
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {allSlots.map((slot) => {
                const slotId = slot.slotId ?? slot.id;
                return (
                  <div
                    key={slotId}
                    className="welzone-card p-5 flex items-center gap-4 hover:shadow-lift transition-shadow"
                  >
                    <span
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        slot.booked
                          ? "bg-sage-100 text-sage-600"
                          : "bg-cream-200 text-cocoa"
                      }`}
                    >
                      {slot.booked ? <FaVideo className="text-xl" /> : <FaUser className="text-xl" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-cocoa">
                          {slot.booked
                            ? `Booked by ${slot.userName || "a member"}`
                            : "Available Slot"}
                        </h3>
                        <span
                          className={`welzone-chip text-xs ${
                            slot.booked
                              ? "bg-sage-100 text-sage-700"
                              : "bg-peach-100 text-peach-500"
                          }`}
                        >
                          {slot.booked ? "Booked" : "Open"}
                        </span>
                      </div>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-stone mt-1">
                        <FaClock className="text-sage-500" /> {formatRange(slot)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(slot)}
                      disabled={deleting === slotId}
                      className="welzone-btn-ghost !px-3.5 !py-2 text-xs shrink-0 hover:!bg-peach-50 hover:!text-peach-500"
                      title="Delete slot"
                    >
                      <FaTrash /> {deleting === slotId ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Calendar */}
        <div>
          {loading ? (
            <div className="welzone-card p-6 flex items-center justify-center h-72 text-stone">
              Loading your schedule...
            </div>
          ) : (
            <SessionCalendar
              sessions={upcomingSessions}
              title="Your Schedule"
            />
          )}
          <div className="welzone-card p-6 mt-6">
            <h3 className="text-lg font-extrabold text-cocoa mb-3 flex items-center gap-2">
              <FaCalendarCheck className="text-sage-500" /> Quick summary
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-sage-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-sage-700">
                  {upcomingSessions.length}
                </p>
                <p className="text-xs text-stone">Booked</p>
              </div>
              <div className="rounded-2xl bg-peach-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-peach-500">
                  {availableSlots.length}
                </p>
                <p className="text-xs text-stone">Open</p>
              </div>
              <div className="rounded-2xl bg-cream-200 p-4 text-center">
                <p className="text-2xl font-extrabold text-cocoa">
                  {allSlots.length}
                </p>
                <p className="text-xs text-stone">Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-bold transition ${
      active
        ? "bg-white text-sage-700 shadow-soft"
        : "text-stone hover:text-cocoa"
    }`}
  >
    {label}
  </button>
);

TabButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default CounselorSessions;