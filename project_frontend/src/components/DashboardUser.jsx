import React from "react";
import { Link } from "react-router-dom";
import { FaComment, FaBook, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import MoodTracker from "./MoodTracker";
import AffirmationDisplay from "./AffirmationDisplay";

const DashboardUser = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold mb-8 text-indigo-700">
          Welcome to WelZone Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Start Chat"
            icon={<FaComment className="text-4xl mb-4" />}
            link="/chat"
            color="bg-blue-500"
            hoverColor="bg-blue-600"
          />
          <DashboardCard
            title="View Blogs"
            icon={<FaBook className="text-4xl mb-4" />}
            link="/blog"
            color="bg-green-500"
            hoverColor="bg-green-600"
          />
          <DashboardCard
            title="Book Session"
            icon={<FaCalendarAlt className="text-4xl mb-4" />}
            link="/book-session"
            color="bg-purple-500"
            hoverColor="bg-purple-600"
          />
          <DashboardCard
            title="Progress"
            icon={<FaChartLine className="text-4xl mb-4" />}
            link="/progress"
            color="bg-yellow-500"
            hoverColor="bg-yellow-600"
          />
          <DashboardCard
            title="Courses"
            icon={<FaChartLine className="text-4xl mb-4" />}
            link="/courses"
            color="bg-red-500"
            hoverColor="bg-yellow-600"
          />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
              Mood Tracker
            </h3>
            <MoodTracker />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
              Today's Affirmation
            </h3>
            <AffirmationDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, link, color, hoverColor }) => {
  return (
    <Link
      to={link}
      className={`${color} hover:${hoverColor} text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {icon}
        <span className="text-xl font-semibold">{title}</span>
      </div>
    </Link>
  );
};

export default DashboardUser;
