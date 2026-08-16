import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaArrowLeft,
  FaComments,
  FaHeart,
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

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/feedback/${sessionId}`
        );
        const data = Array.isArray(response.data) ? response.data : [];
        data.reverse();
        setFeedbacks(data);
      } catch {
        setError("Failed to fetch feedback. Please try again later.");
      }
    };
    fetchFeedbacks();
  }, [sessionId]);

  const avg =
    feedbacks.length > 0
      ? (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

  return (
    <PageShell
      eyebrow="Counsellor"
      title="Session Feedback"
      subtitle="See what members thought of this session and use it to grow."
      action={
        <Link to="/counselor/sessions" className="welzone-btn-ghost">
          <FaArrowLeft /> Back to sessions
        </Link>
      }
    >
      {error && (
        <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 max-w-md mb-8">
        <SummaryTile value={feedbacks.length} label="Responses" color="text-sage-600" />
        <SummaryTile value={avg} label="Avg rating" color="text-peach-500" />
        <SummaryTile
          value={feedbacks.length ? `${100 * (avg / 5)}%` : "0%"}
          label="Satisfaction"
          color="text-clay-400"
        />
      </div>

      {feedbacks.length === 0 && !error ? (
        <div className="welzone-card p-10 text-center">
          <p className="text-4xl mb-3">💬</p>
          <p className="font-bold text-cocoa">No feedback available yet</p>
          <p className="text-sm text-stone mt-1">
            Members will share their experience after the session.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.feedbackId}
              className="welzone-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-3 rounded-2xl bg-sage-100 text-sage-600">
                  <FaComments className="text-xl" />
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      className={
                        s <= feedback.rating
                          ? "text-yellow-400"
                          : "text-cream-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-cocoa leading-relaxed">{feedback.comments}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-200">
                <span className="text-xs text-stone">
                  {convertArrayToDate(feedback.createdAt)?.toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </span>
                <span className="welzone-chip bg-peach-50 text-peach-500 text-xs">
                  <FaHeart /> {feedback.rating}/5
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}

const SummaryTile = ({ value, label, color }) => (
  <div className="welzone-card p-4 text-center">
    <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
    <p className="text-xs text-stone">{label}</p>
  </div>
);

SummaryTile.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  color: PropTypes.string,
};