import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const SessionDetails = () => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/${sessionId}`
        );
        setSessionDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch session details:", err);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Session Details
      </h2>
      {sessionDetails ? (
        <div className="text-gray-800 space-y-3">
          <p>
            <strong>Counselor Name:</strong> {sessionDetails.counselorName}
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {convertArrayToDate(sessionDetails.startTime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong>{" "}
            {convertArrayToDate(sessionDetails.endTime).toLocaleString()}
          </p>
          <p>
            <strong>Booked:</strong> {sessionDetails.booked ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p>Loading session details...</p>
      )}
    </div>
  );
};

const UserFeedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { sessionId } = useParams();

  const fetchFeedbackList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedback/${sessionId}`
      );
      const data = response.data;
      data.reverse();
      setFeedbackList(data);
    } catch (err) {
      console.error("Failed to fetch feedback list:", err);
    }
  };

  useEffect(() => {
    fetchFeedbackList();
  }, [sessionId]);

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
      setComments("");
      fetchFeedbackList();
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="p-10 bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-blue-900 text-center">
          Feedback Page
        </h1>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column */}
          <div className="lg:w-1/2 space-y-6">
            <SessionDetails />
            <h2 className="text-2xl font-semibold text-blue-700">
              Feedback from Users
            </h2>
            <ul className="space-y-4">
              {feedbackList.map((feedback, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg bg-white shadow-md"
                >
                  <p>
                    <strong>Rating:</strong> {feedback.rating}
                  </p>
                  <p>
                    <strong>Comments:</strong> {feedback.comments}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              Submit Your Feedback
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="border rounded p-2 w-full"
                >
                  <option value={0}>Select Rating</option>
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Comments:</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="border rounded-lg p-4 w-full h-32 resize-none"
                  placeholder="Share your experience..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-2 transition duration-200 shadow-lg"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFeedback;
