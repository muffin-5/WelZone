import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaComment,
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaBookOpen,
  FaUser,
} from "react-icons/fa";
import MoodTracker from "./MoodTracker";
import AffirmationDisplay from "./AffirmationDisplay";
import Header from "./Header";

const DashboardUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#2E3B4E] via-[#6C8FAD] to-[#4C6A92]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-white">
              Welcome to WelZone Dashboard
            </h2>
            <button
              onClick={handleLogout}
              className="bg-[#F5A623] text-white px-4 py-2 rounded-md hover:bg-[#F5A623] transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* <DashboardCard
              title="Start Chat"
              description="Connect with our AI companion"
              icon={<FaComment className="text-4xl" />}
              gradient="from-blue-400 to-blue-600"
              link="/chat"
            /> */}
            <DashboardCard
              title="View Blogs"
              description="Explore wellness articles"
              icon={<FaBook className="text-4xl" />}
              gradient="from-emerald-400 to-emerald-600"
              link="/blog"
            />
            <DashboardCard
              title="Book Session"
              description="Schedule a counseling session"
              icon={<FaCalendarAlt className="text-4xl" />}
              gradient="from-purple-400 to-purple-600"
              link="/book-session"
            />
            <DashboardCard
              title="Progress"
              description="Monitor your wellness journey"
              icon={<FaChartLine className="text-4xl" />}
              gradient="from-amber-400 to-amber-600"
              link="/progress"
            />
            <DashboardCard
              title="Courses"
              description="Self-paced wellness programs"
              icon={<FaBookOpen className="text-4xl" />}
              gradient="from-rose-400 to-rose-600"
              link="/courses"
            />
            <DashboardCard
              title="My Profile"
              description="Manage your profile settings"
              icon={<FaUser className="text-4xl" />}
              gradient="from-teal-400 to-teal-600"
              link="/user/profile"
            />
          </div>

          {/* Wellness Tracking Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90">
              <h3 className="text-2xl font-semibold text-[#4C6A92] mb-6">
                Mood Tracker
              </h3>
              <MoodTracker />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90">
              <h3 className="text-2xl font-semibold text-[#4C6A92] mb-6">
                Today's Affirmation
              </h3>
              <AffirmationDisplay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardCard = ({ title, description, icon, gradient, link }) => {
  return (
    <Link
      to={link}
      className={`w-full rounded-2xl bg-gradient-to-r ${gradient} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="p-6 h-full">
        <div className="text-white opacity-100 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white text-sm opacity-100">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardUser;
