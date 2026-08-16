import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaCalendarPlus, FaArrowLeft, FaCheckCircle, FaClock } from "react-icons/fa";
import PageShell from "./PageShell";

const AddSlot = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const counselorId = localStorage.getItem("Id");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ];
    };

    if (new Date(endTime) <= new Date(startTime)) {
      setIsError(true);
      setMessage("End time must be after the start time.");
      return;
    }

    const slot = {
      counselorId: counselorId,
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
      booked: false,
    };

    try {
      await axios.post("http://localhost:8080/slots/create", slot);
      setMessage("Slot created successfully! Redirecting...");
      setIsError(false);
      setTimeout(() => navigate("/counselor/sessions"), 1500);
    } catch (error) {
      console.error("Error creating slot:", error);
      setIsError(true);
      setMessage("Failed to create slot. Please try again.");
    }
  };

  return (
    <PageShell
      eyebrow="Counsellor"
      title="Add New Slot"
      subtitle="Open up your availability so members can book a session with you."
      action={
        <Link to="/counselor/sessions" className="welzone-btn-ghost">
          <FaArrowLeft /> Back to sessions
        </Link>
      }
    >
      <div className="max-w-xl">
        <div className="welzone-card p-8">
          {message && (
            <div
              className={`mb-6 rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center gap-2 ${
                isError
                  ? "bg-peach-50 border border-peach-200 text-peach-600"
                  : "bg-sage-50 border border-sage-200 text-sage-700"
              }`}
            >
              {!isError && <FaCheckCircle />}
              {message}
            </div>
          )}

          <div className="flex items-center gap-3 mb-6 rounded-2xl bg-sage-50 p-4">
            <span className="p-3 rounded-2xl bg-sage-200 text-sage-700">
              <FaClock className="text-xl" />
            </span>
            <p className="text-sm text-sage-800 font-semibold">
              Tip: pick a start time and an end time. The slot will appear in
              the available bookings instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="welzone-label">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="welzone-input"
              />
            </div>
            <div>
              <label className="welzone-label">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="welzone-input"
              />
            </div>
            <button type="submit" className="welzone-btn-primary w-full py-3.5">
              <FaCalendarPlus /> Create Slot
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
};

export default AddSlot;