import { Link } from "react-router-dom";
import React, { useState, useEffect, useTransition } from "react";
import axios from "axios";

const Header = () => {
  const [username, setUsername] = useState("");
  const [whoLogged, setWhoLogged] = useState(localStorage.getItem('whoLogged'))

  useEffect(() => {
    // Fetch the userId from localStorage
    const userId = localStorage.getItem("Id");
    const userType = localStorage.getItem("whoLogged");

    // Define a function to fetch the username from the API
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${userType}s/id/${userId}`);
        setUsername(response.data.username); // Assuming the API response has a `username` field
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    // Call the fetch function if userId is available
    if (userId) {
      fetchUsername();
    }
  }, []);



  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        { whoLogged==='user'&&
          <Link
            to="/dashboarduser"
            className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105"
          >
            WelZone
          </Link>
        }
        { whoLogged==='counselor'&&
          <Link
            to="/dashboardcounsellor"
            className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105"
          >
            WelZone
          </Link>
        }
        { whoLogged!=='user'&& whoLogged!=="counselor" &&
          <Link
            to="/"
            className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105"
          >
            WelZone
          </Link>
        }
        <div className="flex items-center space-x-4">
          {username && (
            <span className="text-xl font-semibold text-white me-4">
              {username}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
