import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// Guards routes: requires an authenticated session, and optionally a role.
// `role` can be "user", "counselor", or undefined (any logged-in user).
const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const whoLogged = localStorage.getItem("whoLogged");

  // If the user is not logged in, redirect to the login page
  if (!isAuthenticated || !whoLogged) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required and it does not match, send them to
  // their own dashboard instead of the protected page
  if (role && whoLogged !== role) {
    return <Navigate to={whoLogged === "counselor" ? "/dashboardcounsellor" : "/dashboarduser"} />;
  }

  // If the user is logged in, render the child components
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  role: PropTypes.string,
};

export default ProtectedRoute;