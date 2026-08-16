import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaComments,
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaBookOpen,
  FaMoon,
  FaHeart,
  FaSun,
  FaLeaf,
} from "react-icons/fa";
import MoodTracker from "./MoodTracker";
import AffirmationDisplay from "./AffirmationDisplay";
import SleepQuality from "./SleepQuality";
import SessionCalendar from "./SessionCalendar";

const DashboardUser = () => {
  const [bookedSessions, setBookedSessions] = useState([]);
  const [username, setUsername] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/id/${userId}`
        );
        setUsername(res.data.username);
      } catch {
        /* ignore */
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/slots/bookedbyme/${userId}`
        );
        setBookedSessions(Array.isArray(res.data) ? res.data : []);
      } catch {
        setBookedSessions([]);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchBooked();
  }, [userId]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = username.split(" ")[0] || "there";

  const quickActions = [
    { title: "Start Chat", desc: "Talk with your counsellor", icon: <FaComments className="text-2xl" />, link: "/chat", color: "bg-sage-100 text-sage-700" },
    { title: "Book Session", desc: "Schedule counselling", icon: <FaCalendarAlt className="text-2xl" />, link: "/book-session", color: "bg-peach-100 text-peach-400" },
    { title: "Courses", desc: "Self-paced programs", icon: <FaBookOpen className="text-2xl" />, link: "/courses", color: "bg-clay-50 text-clay-400" },
    { title: "Wellness Blogs", desc: "Explore articles", icon: <FaBook className="text-2xl" />, link: "/blog", color: "bg-cream-200 text-cocoa" },
  ];

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Welcome banner */}
        <div className="relative overflow-hidden welzone-card p-8 md:p-10 mb-8 animate-fadeUp">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-sage-100 rounded-full opacity-60" />
          <div className="absolute right-24 -bottom-14 w-40 h-40 bg-peach-100 rounded-full opacity-50" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <span className="w-16 h-16 rounded-3xl bg-sage-500 text-white flex items-center justify-center shadow-glow animate-float">
              <FaLeaf className="text-3xl" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-peach-400 uppercase tracking-widest">
                {greeting}, {firstName}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-cocoa mt-1">
                Welcome to your wellbeing hub
              </h2>
              <p className="text-stone mt-2 max-w-xl">
                Take a mindful moment – log your mood, rest well, and let&apos;s keep
                growing together.
              </p>
            </div>
            <Link
              to="/book-session"
              className="welzone-btn-primary shrink-0"
            >
              <FaCalendarAlt /> Book a Session
            </Link>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.link}
              to={action.link}
              className="welzone-card p-5 hover:-translate-y-1 hover:shadow-lift transition-all duration-300 group"
            >
              <span
                className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-3 ${action.color} group-hover:scale-110 transition`}
              >
                {action.icon}
              </span>
              <p className="font-extrabold text-cocoa">{action.title}</p>
              <p className="text-sm text-stone">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* Wellness tracking */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="welzone-card p-6 animate-fadeUp">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-peach-100 text-peach-400">
                <FaHeart />
              </span>
              <h3 className="text-lg font-extrabold text-cocoa">Mood Tracker</h3>
            </div>
            <MoodTracker />
          </div>
          <div className="welzone-card p-6 animate-fadeUp" style={{ animationDelay: "100ms" }}>
            <SleepQuality />
          </div>
        </div>

        {/* Affirmation + calendar */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="welzone-card p-6 animate-fadeUp">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-cream-200 text-cocoa">
                <FaSun />
              </span>
              <h3 className="text-lg font-extrabold text-cocoa">
                Today&apos;s Affirmation
              </h3>
            </div>
            <AffirmationDisplay />
          </div>
          <div className="animate-fadeUp" style={{ animationDelay: "100ms" }}>
            {loadingSessions ? (
              <div className="welzone-card p-6 flex items-center justify-center h-72 text-stone">
                Loading your sessions...
              </div>
            ) : (
              <SessionCalendar
                sessions={bookedSessions}
                title="Your Booked Sessions"
              />
            )}
          </div>
        </div>

        {/* Progress card */}
        <div className="mt-8">
          <Link
            to="/progress"
            className="group welzone-card p-6 flex items-center justify-between hover:shadow-lift transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="p-3 rounded-2xl bg-sage-100 text-sage-600">
                <FaChartLine className="text-2xl" />
              </span>
              <div>
                <p className="font-extrabold text-cocoa">My Progress</p>
                <p className="text-sm text-stone">
                  See how your mood has evolved over time
                </p>
              </div>
            </div>
            <span className="text-sage-500 group-hover:translate-x-1 transition">
              <FaMoon className="text-xl" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;