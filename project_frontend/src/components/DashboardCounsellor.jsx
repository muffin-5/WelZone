import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  // Note: JavaScript Date months are zero-indexed, so we subtract 1 from the month
  return new Date(year, month - 1, day, hour, minute);
};

const DashboardCounsellor = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const counselorId = localStorage.getItem("Id");
    console.log(counselorId);

    const fetchUpcomingSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/slots/booked/${counselorId}`
        );
        console.log(response);

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setUpcomingSessions(response.data);
        } else {
          setUpcomingSessions([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        setUpcomingSessions([]); // Handle error by setting an empty array
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingSessions();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            Counselor Dashboard
          </h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/counselor/sessions"
                className="block p-4 text-gray-600 hover:bg-gray-200"
              >
                Manage Sessions
              </Link>
            </li>
            <li>
              <Link
                to="/blogbyme"
                className="block p-4 text-gray-600 hover:bg-gray-200"
              >
                My Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/counselor/feedback"
                className="block p-4 text-gray-600 hover:bg-gray-200"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                to="/counselor/profile"
                className="block p-4 text-gray-600 hover:bg-gray-200"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/counselor/logout"
                className="block p-4 text-gray-600 hover:bg-gray-200"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Welcome, Counselor!
        </h2>
        <p className="mt-2 text-gray-600">
          Here are your upcoming sessions and tasks:
        </p>

        {/* Upcoming Sessions */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-700">Upcoming Sessions</h3>
          {loading ? (
            <p className="mt-4 text-gray-500">Loading sessions...</p>
          ) : upcomingSessions.length === 0 ? (
            <p className="mt-4 text-gray-500">No upcoming sessions found.</p>
          ) : (
            <ul className="mt-4">
              {upcomingSessions.map((session) => {
                const startTime = convertArrayToDate(session.startTime);
                const endTime = convertArrayToDate(session.endTime);

                return (
                  <li
                    key={session.id}
                    className="flex justify-between p-2 border-b border-gray-300"
                  >
                    <span>Session with a User</span>
                    <span>
                      {startTime.toLocaleString()} - {endTime.toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Additional Widgets or Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700">
              Feedback Received
            </h3>
            <p className="mt-2 text-gray-600">You have 5 new feedbacks.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700">Statistics</h3>
            <p className="mt-2 text-gray-600">
              You have conducted 10 sessions this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCounsellor;
