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
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-16 max-w-3xl text-center space-y-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-blue-600">Register As</h2>
        <p className="text-gray-600 text-lg">
          Choose whether you want to register as a User or as a Counselor.
        </p>

        {/* Registration Options */}
        <div className="flex justify-center space-x-8">
          {/* Register as User */}
          <button
            onClick={handleUserRegistration}
            className="flex flex-col items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out w-40"
          >
            <FaUser className="text-4xl mb-2" />
            <span className="font-semibold">User</span>
          </button>

          {/* Register as Counselor */}
          <button
            onClick={handleCounselorRegistration}
            className="flex flex-col items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out w-40"
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
