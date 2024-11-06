import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const counselorId = localStorage.getItem("Id"); // Assuming counselor ID is stored in localStorage
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/feedback/${sessionId}`); // API endpoint to fetch feedbacks
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to fetch feedback. Please try again later.");
      }
    };

    fetchFeedbacks();
  }, [counselorId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Counselor Feedback</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback.feedbackId}
              className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold mb-2">Session Feedback</h2>
              <p className="text-gray-700 mb-2">
                <strong>Rating:</strong> {feedback.rating} / 5
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Comments:</strong> {feedback.comments}
              </p>
              <p className="text-gray-500 text-sm">
                Feedback Date: {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No feedback available.</p>
        )}
      </div>
    </div>
  );
}
