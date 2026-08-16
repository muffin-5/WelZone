import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaStar,
  FaBriefcase,
  FaGraduationCap,
  FaClock,
  FaArrowRight,
  FaFilter,
  FaCheckCircle,
  FaUser,
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

const formatRange = (slot) => {
  const start = convertArrayToDate(slot.startTime);
  const end = convertArrayToDate(slot.endTime);
  if (!start) return "";
  return `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} · ${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} – ${end ? end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}`;
};

const BookSession = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [booking, setBooking] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    window.setTimeout(() => setNotification(null), 5000);
  };

  const fetchSlots = async () => {
    const userId = localStorage.getItem("Id");
    try {
      const [availRes, bookedRes] = await Promise.all([
        axios.get("http://localhost:8080/slots/available"),
        axios.get(`http://localhost:8080/slots/bookedbyme/${userId}`),
      ]);
      setSlots(Array.isArray(availRes.data) ? availRes.data : []);
      setBookedSlots(Array.isArray(bookedRes.data) ? bookedRes.data : []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const bookSlot = async (slot) => {
    const userId = localStorage.getItem("Id");
    setBooking(slot.slotId);
    try {
      const response = await axios.post(
        `http://localhost:8080/slots/book/${slot.slotId}/user/${userId}`
      );
      if (response.status === 200) {
        showNotification(
          `Session booked with ${slot.counselorName} on ${formatRange(slot)}.`
        );
        setSlots((prev) => prev.filter((s) => s.slotId !== slot.slotId));
        fetchSlots();
      }
    } catch (error) {
      showNotification("Slot booking failed. Please try again.", "error");
      console.error("Error booking slot:", error);
    } finally {
      setBooking(null);
    }
  };

  const specializations = [
    "All",
    ...new Set(slots.map((s) => s.specialization).filter(Boolean)),
  ];
  const filteredSlots =
    filter === "All" ? slots : slots.filter((s) => s.specialization === filter);

  return (
    <PageShell
      eyebrow="Booking"
      title="Book a Session"
      subtitle="Pick a counsellor and an available slot that fits your schedule. Your booked sessions appear in the calendar."
    >
      {notification && (
        <div
          className={`fixed top-24 right-6 z-50 max-w-sm rounded-2xl shadow-lift px-5 py-4 text-sm font-semibold flex items-center gap-3 animate-fadeUp ${
            notification.type === "error"
              ? "bg-peach-50 border border-peach-200 text-peach-600"
              : "bg-sage-50 border border-sage-200 text-sage-700"
          }`}
        >
          {notification.type !== "error" && (
            <FaCheckCircle className="text-sage-500 shrink-0" />
          )}
          {notification.message}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available slots */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-cocoa">
              Available slots
              <span className="welzone-chip bg-sage-100 text-sage-700 ml-3 align-middle">
                {filteredSlots.length}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <FaFilter className="text-stone/60" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="welzone-input !py-2 !w-auto !rounded-full text-sm"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="welzone-card p-8 text-center text-stone">
              Loading available slots...
            </div>
          ) : filteredSlots.length === 0 ? (
            <div className="welzone-card p-10 text-center">
              <p className="text-4xl mb-3">🌿</p>
              <p className="font-bold text-cocoa">No available slots right now</p>
              <p className="text-sm text-stone mt-1">
                Check back later – counsellors add new availability regularly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSlots.map((slot) => (
                <div
                  key={slot.slotId}
                  className="welzone-card p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lift transition-shadow"
                >
                  {/* Avatar */}
                  <span className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center text-xl font-extrabold shrink-0">
                    {slot.counselorName?.charAt(0) || "C"}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-cocoa">
                        {slot.counselorName}
                      </h3>
                      <span className="welzone-chip bg-cream-200 text-stone text-xs">
                        {slot.specialization}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-stone">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" /> {slot.rating}/5
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBriefcase className="text-sage-400" />{" "}
                        {slot.experience} yrs
                      </span>
                      <span className="flex items-center gap-1">
                        <FaGraduationCap className="text-peach-400" />{" "}
                        {slot.qualification}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 mt-1.5">
                      <FaClock className="text-sage-500" /> {formatRange(slot)}
                    </p>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => bookSlot(slot)}
                    disabled={booking === slot.slotId}
                    className="welzone-btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {booking === slot.slotId ? (
                      "Booking..."
                    ) : (
                      <>
                        Book Slot <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Calendar + booked */}
        <div className="space-y-6">
          {loading ? (
            <div className="welzone-card p-6 flex items-center justify-center h-72 text-stone">
              Loading your bookings...
            </div>
          ) : (
            <SessionCalendar
              sessions={bookedSlots}
              title="Your Booked Sessions"
            />
          )}

          {/* Booked list */}
          <div className="welzone-card p-6">
            <h3 className="text-lg font-extrabold text-cocoa mb-4 flex items-center gap-2">
              <FaCalendarCheck className="text-sage-500" /> Your bookings
            </h3>
            {bookedSlots.length === 0 ? (
              <p className="text-sm text-stone">
                You haven&apos;t booked any sessions yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {bookedSlots.map((slot) => (
                  <li
                    key={slot.slotId}
                    className="rounded-2xl bg-cream-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center text-lg font-extrabold shrink-0">
                          {slot.counselorName?.charAt(0) || <FaUser />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-cocoa truncate">
                            {slot.counselorName
                              ? `Session with ${slot.counselorName}`
                              : "Counselling session"}
                          </p>
                          {slot.specialization && (
                            <span className="welzone-chip bg-peach-100 text-peach-500 text-xs mt-1">
                              {slot.specialization}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="welzone-chip bg-sage-100 text-sage-700 text-xs shrink-0">
                        Booked
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-stone">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-sage-500" /> {formatRange(slot)}
                      </span>
                      {slot.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" /> {slot.rating}/5
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => navigate(`/book-session/${slot.slotId}`)}
                        className="welzone-btn-secondary text-xs !py-1.5"
                      >
                        View details
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default BookSession;