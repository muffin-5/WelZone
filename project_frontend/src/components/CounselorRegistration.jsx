import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CounselorRegistration = () => {
  // Initialize form fields using useState
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    specialization: "",
    qualification: "",
    experience: "",
  });

  const [message, setMessage] = useState(""); // Message for registration status
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate(); // For redirecting to the landing page

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dobParts = formData.dateOfBirth.split("-");
    const dateArray = [
      parseInt(dobParts[0]), // Year
      parseInt(dobParts[1]), // Month
      parseInt(dobParts[2]), // Day
      0, // Placeholder
      0, // Placeholder
    ];

    const payload = {
      ...formData,
      dateOfBirth: dateArray,
    };

    try {
      await axios.post("http://localhost:8080/api/counselors", payload);
      setMessage("Counselor registered successfully! Please login.");

      setTimeout(() => {
        navigate("/"); // Redirect after successful registration
      }, 2000); // 2-second delay for the message to be visible
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#2E3B4E] to-[#6C8FAD]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-[#4C6A92] text-center mb-8">
          Register as a Counselor
        </h2>
        {message && (
          <div className="text-center mb-6">
            <p className="text-lg text-[#F5A623] font-semibold">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Conditional rendering for input type
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-[#4C6A92]">
                Show Password
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#4C6A92]">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C6A92]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#4C6A92] text-white font-bold rounded-lg hover:bg-[#3B4C63] transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CounselorRegistration;
