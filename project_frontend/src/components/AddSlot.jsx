import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddSlot = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const counselorId = localStorage.getItem("Id");

  const navigate = useNavigate(); // Initialize useNavigate

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

    const slot = {
      counselorId: counselorId,
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/slots/create",
        slot
      );
      setMessage(response.data);

      // Redirect to /counselor/sessions after successful slot creation
      navigate("/counselor/sessions");

      // Reset fields (optional if redirecting immediately)
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error creating slot:", error);
      setMessage("Failed to create slot. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Add New Slot
        </h2>
        {message && (
          <div className="text-center mb-6">
            <p className="text-lg text-green-600 font-semibold">{message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Start Time:
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              End Time:
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Slot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSlot;
