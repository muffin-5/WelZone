import React from "react";
import { Navigate } from "react-router-dom";

// This component checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // If the user is not logged in, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the child components
  return children;
};

export default ProtectedRoute;
