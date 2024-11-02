import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-16 max-w-4xl text-center space-y-8">
        {/* Website Logo */}
        <div className="text-4xl font-bold text-indigo-600">
          <h1>Welcome to Our Website</h1>
        </div>

        {/* Subheading */}
        <p className="text-gray-600 text-lg">
          Start your journey with us today! Register to get started or login to
          access your account.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-8">
          {/* Login Button */}
          <button
            onClick={() => navigate("/login")} // Navigate to Login page
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>

          {/* Register Button */}
          <button
            onClick={() => navigate("/register")} // Navigate to Register page
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            <FaUserPlus className="mr-2" />
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
