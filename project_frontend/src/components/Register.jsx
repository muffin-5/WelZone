import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserTie } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  // Navigation to User Registration Page
  const handleUserRegistration = () => {
    navigate("/userregistration"); // Adjusted the path to match the route
  };

  // Navigation to Counselor Registration Page
  const handleCounselorRegistration = () => {
    navigate("/counselorregistration"); // Adjusted the path to match the route
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2E3B4E] to-[#6C8FAD] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-16 max-w-3xl text-center space-y-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#4C6A92]">Register As</h2>
        <p className="text-[#4C6A92] text-lg">
          Choose whether you want to register as a User or as a Counselor.
        </p>

        {/* Registration Options */}
        <div className="flex justify-center space-x-8">
          {/* Register as User */}
          <button
            onClick={handleUserRegistration}
            className="flex flex-col items-center justify-center px-6 py-4 bg-[#4C6A92] text-white rounded-lg shadow-md hover:bg-[#3B4C63] transition duration-300 ease-in-out w-40"
          >
            <FaUser className="text-4xl mb-2" />
            <span className="font-semibold">User</span>
          </button>

          {/* Register as Counselor */}
          <button
            onClick={handleCounselorRegistration}
            className="flex flex-col items-center justify-center px-6 py-4 bg-[#F5A623] text-white rounded-lg shadow-md hover:bg-[#D88D1E] transition duration-300 ease-in-out w-40"
          >
            <FaUserTie className="text-4xl mb-2" />
            <span className="font-semibold">Counselor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
