import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [username, setUsername] = useState("");
  const [whoLogged, setWhoLogged] = useState(localStorage.getItem("whoLogged"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect route changes

  // Re-check login status every time the route changes
  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = whoLogged === "user" || whoLogged === "counselor";
    setIsLoggedIn(loggedIn);

    // If logged in, fetch the username
    if (loggedIn) {
      const userId = localStorage.getItem("Id");
      const userType = localStorage.getItem("whoLogged");

      const fetchUsername = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/${userType}s/id/${userId}`
          );
          setUsername(response.data.username); // Assuming the API response has a `username` field
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };

      fetchUsername();
    } else {
      setUsername(""); // Clear username if not logged in
    }
  }, [location.pathname]); // Run the effect whenever the route changes

  // If the user is not logged in, return null (don't render header)
  if (!isLoggedIn) return null;

  return (
    <header className="bg-gray-800 shadow-xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Dynamic Logo and Link based on User Type */}
        {whoLogged === "user" && (
          <Link
            to="/dashboarduser"
            className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105"
          >
            WelZone
          </Link>
        )}
        {whoLogged === "counselor" && (
          <Link
            to="/dashboardcounsellor"
            className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105"
          >
            WelZone
          </Link>
        )}
        {whoLogged !== "user" && whoLogged !== "counselor" && (
          <Link
            to="/"
            className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105"
          >
            WelZone
          </Link>
        )}

        {/* Username Display */}
        <div className="flex items-center space-x-4">
          {username && (
            <span className="text-xl font-semibold text-white">{username}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
