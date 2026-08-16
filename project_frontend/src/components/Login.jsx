import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaUsers,
  FaUserTie,
  FaLeaf,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = "http://localhost:8080";
    const endpoint =
      userType === "user"
        ? `${baseUrl}/api/users/login`
        : `${baseUrl}/api/counselors/login`;

    try {
      const response = await axios.post(endpoint, { username, password });
      const responseData = response.data;

      if (userType === "user") {
        localStorage.setItem("Id", responseData.userId);
        localStorage.setItem("whoLogged", "user");
      } else if (userType === "counselor") {
        localStorage.setItem("Id", responseData.counselorId);
        localStorage.setItem("whoLogged", "counselor");
      }
      localStorage.setItem("isAuthenticated", "true");
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }

      if (userType === "user") {
        navigate("/dashboarduser");
      } else {
        navigate("/dashboardcounsellor");
      }
    } catch {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sage-100 rounded-full blur-3xl opacity-70 -translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-peach-100 rounded-full blur-3xl opacity-70 translate-x-20 translate-y-20" />

      <div className="relative w-full max-w-md animate-fadeUp">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone hover:text-sage-600 mb-6"
        >
          <FaArrowLeft /> Back to home
        </Link>

        <div className="welzone-card shadow-lift p-8">
          <div className="text-center mb-8">
            <span className="w-14 h-14 mx-auto rounded-2xl bg-sage-500 text-white flex items-center justify-center mb-4 shadow-glow">
              <FaLeaf className="text-2xl" />
            </span>
            <h2 className="text-2xl font-extrabold text-cocoa">Welcome back</h2>
            <p className="text-sm text-stone mt-1">
              {!userType
                ? "Choose how you want to sign in"
                : `Signing in as ${userType}`}
            </p>
          </div>

          {/* User type selection */}
          {!userType ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleUserTypeSelection("user")}
                className="group flex flex-col items-center gap-3 rounded-3xl bg-sage-50 border-2 border-sage-100 hover:border-sage-300 p-8 transition hover:-translate-y-1"
              >
                <span className="w-14 h-14 rounded-2xl bg-sage-200 text-sage-700 flex items-center justify-center group-hover:scale-110 transition">
                  <FaUsers className="text-2xl" />
                </span>
                <span className="font-bold text-cocoa">Member</span>
                <span className="text-xs text-stone">I need support</span>
              </button>
              <button
                onClick={() => handleUserTypeSelection("counselor")}
                className="group flex flex-col items-center gap-3 rounded-3xl bg-peach-50 border-2 border-peach-100 hover:border-peach-300 p-8 transition hover:-translate-y-1"
              >
                <span className="w-14 h-14 rounded-2xl bg-peach-100 text-peach-400 flex items-center justify-center group-hover:scale-110 transition">
                  <FaUserTie className="text-2xl" />
                </span>
                <span className="font-bold text-cocoa">Counsellor</span>
                <span className="text-xs text-stone">I provide care</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="welzone-label">Username</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-stone/50" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                    className="welzone-input pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="welzone-label">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="welzone-input pl-11 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone/50 hover:text-sage-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="welzone-btn-primary w-full">
                Sign In
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeSelection("")}
                className="w-full text-sm font-semibold text-stone hover:text-sage-600"
              >
                ← Change account type
              </button>
            </form>
          )}

          {/* Register link */}
          <div className="mt-6 pt-6 border-t border-cream-200 text-center">
            <p className="text-sm text-stone">
              New to WelZone?{" "}
              <Link
                to="/register"
                className="font-bold text-sage-600 hover:text-sage-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;