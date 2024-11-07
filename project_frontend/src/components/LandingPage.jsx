import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaBook,
  FaHeadset,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2E3B4E] to-[#6C8FAD]">
      {/* Website Name Section */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center text-white">
        {/* Website Name */}
        <h1 className="text-6xl font-bold mb-4 text-[#F5A623]">WelZone</h1>

        <h2 className="text-5xl font-bold mb-4 text-[#F5A623]">
          Your mental wellness counselling space
        </h2>
        <p className="text-lg mb-8">
          Transform your organization by building a proactive culture of care,
          resilience, and well-being.
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center px-6 py-3 bg-[#4C6A92] text-white rounded-full shadow-lg hover:bg-[#3B4C63] transition duration-300"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center px-6 py-3 bg-[#F5A623] text-white rounded-full shadow-lg hover:bg-[#D88D1E] transition duration-300"
          >
            <FaUserPlus className="mr-2" />
            Register
          </button>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#4C6A92]">
            Our Solutions
          </h2>
          <p className="text-gray-600 mb-10">
            A truly comprehensive suite of products for your people's care,
            well-being, and belongingness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SolutionCard
              title="Employee Assistance"
              description="24/7 access to expert psychologists for all employees."
              icon={
                <FaHeadset className="text-[#F5A623] text-5xl mb-4 mx-auto" />
              }
            />
            <SolutionCard
              title="Career Counseling"
              description="Guidance and support for students to excel in their careers."
              icon={<FaBook className="text-[#F5A623] text-5xl mb-4 mx-auto" />}
            />
            <SolutionCard
              title="Engagement Programs"
              description="Interactive sessions to boost team morale and productivity."
              icon={
                <FaUsers className="text-[#F5A623] text-5xl mb-4 mx-auto" />
              }
            />
          </div>
        </div>
      </div>

      {/* Impact Statistics Section */}
      <div className="bg-gradient-to-r from-[#F0F0F0] to-[#D9D9D9] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#4C6A92]">
            Creating Waves of Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactStat
              number="30L+"
              description="Therapy Sessions Conducted"
            />
            <ImpactStat number="1000+" description="Qualified Experts" />
            <ImpactStat number="10,000+" description="Lives Saved" />
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#4C6A92]">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AwardCard
              title="National Startup Awards"
              description="Recognized for Health & Wellness."
              icon={
                <FaTrophy className="text-yellow-500 text-5xl mb-4 mx-auto" />
              }
            />
            <AwardCard
              title="IHW Gold Award"
              description="Excellence in Mental Well-being."
              icon={
                <FaTrophy className="text-yellow-500 text-5xl mb-4 mx-auto" />
              }
            />
            <AwardCard
              title="Forbes 30 Under 30"
              description="Impactful leaders in Asia."
              icon={
                <FaTrophy className="text-yellow-500 text-5xl mb-4 mx-auto" />
              }
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-[#4C6A92] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="mb-8">
            Need a safe space to talk or want to know more? Connect with us
            today.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 bg-white text-[#4C6A92] rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Contact Us: 9876543210
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Components
const SolutionCard = ({ title, description, icon }) => (
  <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 text-center">
    {icon}
    <h3 className="text-xl font-bold text-[#4C6A92] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ImpactStat = ({ number, description }) => (
  <div className="text-center">
    <h3 className="text-4xl font-bold text-[#4C6A92]">{number}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AwardCard = ({ title, description, icon }) => (
  <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 text-center">
    {icon}
    <h3 className="text-xl font-bold text-[#4C6A92] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
