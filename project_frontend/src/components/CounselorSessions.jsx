import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const CounselorSessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const counselorId = localStorage.getItem("Id");

    const fetchUpcomingSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/booked/${counselorId}`
        );

        if (Array.isArray(response.data)) {
          setUpcomingSessions(response.data);
        } else {
          setUpcomingSessions([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        setUpcomingSessions([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/available/${counselorId}`
        );

        if (Array.isArray(response.data)) {
          setAvailableSlots(response.data);
        } else {
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setAvailableSlots([]);
      }
    };

    fetchUpcomingSessions();
    fetchAvailableSlots();
  }, []);

  const handleAddSlot = () => {
    console.log("Add new slot button clicked");
    navigate("/counselor/add-slot"); // Redirect to the AddSlot page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Manage Your Sessions
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddSlot}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add New Slot
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-700">Upcoming Sessions</h3>
        {loading ? (
          <p className="mt-4 text-gray-500">Loading sessions...</p>
        ) : upcomingSessions.length === 0 ? (
          <p className="mt-4 text-gray-500">No upcoming sessions found.</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-300">
            {upcomingSessions.map((session) => {
              const startTime = convertArrayToDate(session.startTime);
              const endTime = convertArrayToDate(session.endTime);

              return (
                <li
                  key={session.id}
                  className="flex justify-between py-2 items-center"
                  >
                  <div className="text-gray-700">
                    <span className="font-medium">Session with a User</span>
                  </div>
                  <div className="text-gray-600">
                    {startTime.toLocaleString()} - {endTime.toLocaleString()}
                  </div>
                  <button onClick={()=>navigate(`./${session.id}`)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">See details</button>
                </li>
              );
            })}
          </ul>
        )}

        <h3 className="text-xl font-bold text-gray-700 mt-8">
          Available Slots
        </h3>
        {availableSlots.length === 0 ? (
          <p className="mt-4 text-gray-500">No available slots found.</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-300">
            {availableSlots.map((slot) => {
              const startTime = convertArrayToDate(slot.startTime);
              const endTime = convertArrayToDate(slot.endTime);

              return (
                <li
                  key={slot.id}
                  className="flex justify-between py-2 items-center"
                >
                  
                  <div className="text-gray-700">
                    <span className="font-medium">Available Slot</span>
                  </div>
                  <div className="text-gray-600">
                    {startTime.toLocaleString()} - {endTime.toLocaleString()}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CounselorSessions;
