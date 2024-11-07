import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUsers, FaUserTie } from "react-icons/fa"; // Import icons from react-icons

const Login = () => {
  const [userType, setUserType] = useState(""); // To track selected user type
  const [username, setUsername] = useState(""); // To track username input
  const [password, setPassword] = useState(""); // To track password input
  const [errorMessage, setErrorMessage] = useState(""); // To track error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserTypeSelection = (type) => {
    setUserType(type); // Set user type based on selection
    setUsername(""); // Clear username field
    setPassword(""); // Clear password field
    setErrorMessage(""); // Clear error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = "http://localhost:8080"; // Adjust the port number if necessary
    const endpoint =
      userType === "user"
        ? `${baseUrl}/api/users/login`
        : `${baseUrl}/api/counselors/login`;

    try {
      const response = await axios.post(endpoint, { username, password });

      // Handle successful login
      const responseData = response.data; // Assuming the response contains user/counselor ID
<<<<<<< HEAD
=======
      localStorage.setItem("token", responseData.token);
>>>>>>> 46737418a34eb6d8b03160ee99bc0af28e9380fe

      if (userType === "user") {
        // Assuming responseData contains userId for users
        localStorage.setItem("Id", responseData.userId); // Store the user ID
        localStorage.setItem("whoLogged", "user");
      } else if (userType === "counselor") {
        // Assuming responseData contains counselorId for counselors
        localStorage.setItem("Id", responseData.counselorId); // Store the counselor ID
        localStorage.setItem("whoLogged", "counselor");
      }
      localStorage.setItem("isAuthenticated", "true");
<<<<<<< HEAD
=======
      console.log(responseData.token)
>>>>>>> 46737418a34eb6d8b03160ee99bc0af28e9380fe

      // Redirect based on user type
      if (userType === "user") {
        navigate("/dashboarduser"); // Redirect to User Dashboard
      } else {
        navigate("/dashboardcounsellor"); // Redirect to Counselor Dashboard
      }
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#2E3B4E] to-[#6C8FAD]">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-[#4C6A92] text-center flex items-center justify-center">
          <FaLock className="mr-2" /> Login
        </h2>

        {/* User Type Selection */}
        {!userType ? (
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-medium text-[#4C6A92]">
              Select User Type
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleUserTypeSelection("user")}
                className="px-6 py-3 bg-[#4C6A92] text-white rounded-lg hover:bg-[#3B4C63] transition duration-300 flex items-center"
              >
                <FaUsers className="mr-2" /> User
              </button>
              <button
                onClick={() => handleUserTypeSelection("counselor")}
                className="px-6 py-3 bg-[#F5A623] text-white rounded-lg hover:bg-[#D88D1E] transition duration-300 flex items-center"
              >
                <FaUserTie className="mr-2" /> Counselor
              </button>
            </div>
          </div>
        ) : (
          // Login Form
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="w-full p-2 border-none focus:outline-none"
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full p-2 border-none focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#4C6A92] text-white rounded-lg hover:bg-[#3B4C63] transition duration-300 flex justify-center items-center"
            >
              <FaLock className="mr-2" /> Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
