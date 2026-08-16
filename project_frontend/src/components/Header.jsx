import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaLeaf,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChartLine,
} from "react-icons/fa";

const NAV_ITEMS = {
  user: [
    { label: "Dashboard", to: "/dashboarduser" },
    { label: "Book Session", to: "/book-session" },
    { label: "Calendar", to: "/calendar" },
    { label: "Courses", to: "/courses" },
    { label: "Blog", to: "/blog" },
    { label: "Chat", to: "/chat" },
  ],
  counselor: [
    { label: "Dashboard", to: "/dashboardcounsellor" },
    { label: "Sessions", to: "/counselor/sessions" },
    { label: "Calendar", to: "/calendar" },
    { label: "Chat", to: "/chat" },
    { label: "My Blogs", to: "/blogbyme" },
    { label: "Profile", to: "/counselor/profile" },
  ],
};

const Header = () => {
  const [username, setUsername] = useState("");
  const whoLogged = localStorage.getItem("whoLogged");
  const isLoggedIn = whoLogged === "user" || whoLogged === "counselor";
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const userId = localStorage.getItem("Id");
      const userType = localStorage.getItem("whoLogged");
      const fetchUsername = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/${userType}s/id/${userId}`
          );
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };
      fetchUsername();
    } else {
      setUsername("");
    }
  }, [location.pathname, whoLogged, isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItems = NAV_ITEMS[whoLogged] || NAV_ITEMS.user;
  const initials =
    username
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "WZ";

  return (
    <header className="sticky top-0 z-40 bg-cream-100/85 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={whoLogged === "user" ? "/dashboarduser" : "/dashboardcounsellor"}
            className="flex items-center gap-2"
          >
            <span className="w-9 h-9 rounded-2xl bg-sage-500 text-white flex items-center justify-center shadow-glow">
              <FaLeaf />
            </span>
            <span className="text-xl font-extrabold text-cocoa tracking-tight">
              WelZone
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  location.pathname === item.to
                    ? "bg-sage-100 text-sage-700"
                    : "text-stone hover:text-cocoa hover:bg-cream-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to={whoLogged === "user" ? "/progress" : "/calendar"}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-sage-50 text-sage-700 text-sm font-semibold hover:bg-sage-100 transition"
            >
              <FaChartLine className="text-sage-500" />
              {whoLogged === "user" ? "My Progress" : "My Calendar"}
            </Link>

            {/* Profile dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 hover:bg-cream-200 transition"
              >
                <span className="w-9 h-9 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-sm">
                  {initials}
                </span>
                <span className="hidden sm:block text-sm font-bold text-cocoa">
                  {username}
                </span>
                <FaChevronDown
                  className={`text-xs text-stone transition ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lift border border-cream-200 p-2 animate-pop">
                  <div className="px-3 py-2 border-b border-cream-200 mb-1">
                    <p className="text-sm font-bold text-cocoa">{username}</p>
                    <p className="text-xs text-stone capitalize">
                      {whoLogged}
                    </p>
                  </div>
                  <Link
                    to={whoLogged === "user" ? "/user/profile" : "/counselor/profile"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-cream-100 text-sm font-semibold text-cocoa"
                  >
                    <FaUserCircle className="text-sage-500" /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-peach-50 text-sm font-semibold text-peach-500"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setNavOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl hover:bg-cream-200 text-cocoa"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-5 h-0.5 bg-cocoa transition ${navOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-cocoa transition ${navOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-cocoa transition ${navOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {navOpen && (
        <div className="lg:hidden border-t border-cream-200 bg-white px-4 py-3 animate-fadeUp">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setNavOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold mb-1 ${
                location.pathname === item.to
                  ? "bg-sage-100 text-sage-700"
                  : "text-cocoa hover:bg-cream-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;