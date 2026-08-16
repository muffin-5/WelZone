import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaVideo,
  FaArrowLeft,
  FaCheckCircle,
  FaComments,
  FaTimesCircle,
} from "react-icons/fa";
import PageShell from "./PageShell";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const SessionDetails = () => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMsg, setCancelMsg] = useState("");
  const { sessionId } = useParams();

  const fetchSessionDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/slots/${sessionId}`
      );
      setSessionDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch session details:", err);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchSessionDetails();
  }, [fetchSessionDetails]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booked session?")) {
      return;
    }
    setCancelling(true);
    setCancelMsg("");
    try {
      const response = await axios.post(
        `http://localhost:8080/slots/cancel/${sessionId}`
      );
      if (response.status === 200) {
        setCancelMsg("Session cancelled successfully.");
        fetchSessionDetails();
      }
    } catch (err) {
      console.error("Failed to cancel session:", err);
      setCancelMsg("Failed to cancel session. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="welzone-card p-6">
      <h3 className="text-lg font-extrabold text-cocoa mb-4 flex items-center gap-2">
        <FaVideo className="text-sage-500" /> Session Details
      </h3>
      {cancelMsg && (
        <div
          className={`rounded-2xl border text-sm font-semibold px-4 py-3 mb-4 ${
            cancelMsg.includes("successfully")
              ? "bg-sage-50 border-sage-200 text-sage-700"
              : "bg-peach-50 border-peach-200 text-peach-600"
          }`}
        >
          {cancelMsg}
        </div>
      )}
      {sessionDetails ? (
        <div className="space-y-2.5">
          <DetailRow
            label="Counsellor"
            value={sessionDetails.counselorName || "–"}
          />
          <DetailRow
            label="Date"
            value={
              convertArrayToDate(sessionDetails.startTime)?.toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              ) || "–"
            }
          />
          <DetailRow
            label="Start"
            value={
              convertArrayToDate(sessionDetails.startTime)?.toLocaleTimeString(
                "en-US",
                { hour: "2-digit", minute: "2-digit" }
              ) || "–"
            }
          />
          <DetailRow
            label="End"
            value={
              convertArrayToDate(sessionDetails.endTime)?.toLocaleTimeString(
                "en-US",
                { hour: "2-digit", minute: "2-digit" }
              ) || "–"
            }
          />
          <DetailRow
            label="Status"
            value={sessionDetails.booked ? "Booked" : "Available"}
          />
          {sessionDetails.booked && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="welzone-btn-danger w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaTimesCircle /> {cancelling ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-stone">Loading session details...</p>
      )}
    </div>
  );
};

const UserFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { sessionId } = useParams();

  const fetchFeedbackList = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedback/${sessionId}`
      );
      const data = Array.isArray(response.data) ? response.data : [];
      data.reverse();
      setFeedbackList(data);
    } catch (err) {
      console.error("Failed to fetch feedback list:", err);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchFeedbackList();
  }, [fetchFeedbackList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!comments) {
      setError("Please provide your comments.");
      return;
    }
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:8080/api/feedback", {
        sessionId,
        rating,
        comments,
      });
      setSuccess("Feedback submitted successfully!");
      setRating(0);
      setHover(0);
      setComments("");
      fetchFeedbackList();
    } catch {
      console.error("Failed to submit feedback. Please try again later.");
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  const labels = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };

  return (
    <PageShell
      eyebrow="Feedback"
      title="Share Your Feedback"
      subtitle="Your honest feedback helps counsellors grow and future members choose wisely."
      action={
        <Link to="/book-session" className="welzone-btn-ghost">
          <FaArrowLeft /> Back to sessions
        </Link>
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Feedback form */}
        <div className="welzone-card p-7">
          <h2 className="text-xl font-extrabold text-cocoa mb-6">
            Submit your feedback
          </h2>
          {error && (
            <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-2xl bg-sage-50 border border-sage-200 text-sage-700 text-sm font-semibold px-4 py-3 mb-4 flex items-center gap-2">
              <FaCheckCircle /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="welzone-label mb-3">How was the session?</label>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="text-3xl transition-transform hover:scale-110"
                  aria-label={`${star} star`}
                >
                  <FaStar
                    className={
                      (hover || rating) >= star
                        ? "text-yellow-400"
                        : "text-cream-300"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-stone mb-5 h-5">
              {labels[hover || rating] || "Tap a star to rate"}
            </p>

            <label className="welzone-label">Your comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={5}
              placeholder="Share your experience..."
              className="welzone-input resize-none mb-5"
            />

            <button type="submit" className="welzone-btn-primary w-full">
              <FaComments /> Submit Feedback
            </button>
          </form>
        </div>

        {/* Session + feedback list */}
        <div className="space-y-6">
          <SessionDetails />

          <div className="welzone-card p-6">
            <h3 className="text-lg font-extrabold text-cocoa mb-4">
              Feedback from others
            </h3>
            {feedbackList.length === 0 ? (
              <p className="text-sm text-stone">
                No feedback yet – be the first to share your thoughts.
              </p>
            ) : (
              <ul className="space-y-3">
                {feedbackList.map((feedback, index) => (
                  <li
                    key={index}
                    className="rounded-2xl bg-cream-50 p-4"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar
                          key={s}
                          className={
                            s <= feedback.rating
                              ? "text-yellow-400 text-xs"
                              : "text-cream-300 text-xs"
                          }
                        />
                      ))}
                      <span className="text-xs text-stone ml-2">
                        {convertArrayToDate(feedback.createdAt)?.toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-cocoa">{feedback.comments}</p>
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

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 rounded-xl bg-cream-50 px-4 py-2.5">
    <span className="text-sm text-stone">{label}</span>
    <span className="text-sm font-bold text-cocoa text-right">{value}</span>
  </div>
);

DetailRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default UserFeedback;