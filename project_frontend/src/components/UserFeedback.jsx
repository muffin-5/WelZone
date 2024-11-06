import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        const response = await axios.get(`http://localhost:8080/slots/${sessionId}`);
        setSessionDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch session details:", err);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md flex-1">
      <h2 className="text-xl font-semibold mb-4">Session Details</h2>
      {sessionDetails ? (
        <div>
          <p><strong>Counselor Name:</strong> {sessionDetails.counselorName}</p>
          <p><strong>Start Time:</strong> {new Date(convertArrayToDate(sessionDetails.startTime)).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(convertArrayToDate(sessionDetails.endTime)).toLocaleString()}</p>
          <p><strong>Booked:</strong> {sessionDetails.booked ? "Yes" : "No"}</p>
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
      const response = await axios.get(`http://localhost:8080/api/feedback/${sessionId}`);
      const data=response.data;
      data.reverse();
      setFeedbackList(response.data);
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

      // Refresh the feedback list after submission
      // const updatedFeedback = await axios.get(`http://localhost:8080/api/feedback/${sessionId}`);
      // setFeedbackList(updatedFeedback.data);
      fetchFeedbackList();
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Feedback Page</h1>
      <div className="flex gap-6">
        {/* Session Details Section */}
        <div>
        <SessionDetails />
        {/* Feedback List Section */}
        <h2 className="text-xl font-bold mt-6">Feedback from Users</h2>
          <ul className="mt-4">
            {feedbackList.map((feedback, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <p><strong>Rating:</strong> {feedback.rating}</p>
                <p><strong>Comments:</strong> {feedback.comments}</p>
              </li>
            ))}
          </ul>
          </div>

        {/* Feedback Form Section */}
        <div className="max-w-md p-5 bg-white shadow-md rounded-lg flex-1">
          <h2 className="text-2xl font-bold mb-4">Submit Your Feedback</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Comments:</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="border rounded p-2 w-full h-32"
                placeholder="Share your experience..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Submit Feedback
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
