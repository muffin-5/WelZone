import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarPlus,
  FaCalendarCheck,
  FaComments,
  FaStar,
  FaBriefcase,
  FaUserGraduate,
  FaPencilAlt,
  FaLeaf,
} from "react-icons/fa";
import SessionCalendar from "./SessionCalendar";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const DashboardCounsellor = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const counselorId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookedRes, availRes, profileRes] = await Promise.all([
          axios.get(`http://localhost:8080/slots/booked/${counselorId}`),
          axios.get(`http://localhost:8080/slots/available/${counselorId}`),
          axios.get(`http://localhost:8080/api/counselors/id/${counselorId}`),
        ]);
        setUpcomingSessions(Array.isArray(bookedRes.data) ? bookedRes.data : []);
        setAvailableSlots(Array.isArray(availRes.data) ? availRes.data : []);
        setCounselor(profileRes.data);
      } catch {
        setUpcomingSessions([]);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [counselorId]);

  const nextSession = upcomingSessions[0]
    ? convertArrayToDate(upcomingSessions[0].startTime)
    : null;
  const firstName = counselor?.username?.split(" ")[0] || "Counsellor";

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Welcome banner */}
        <div className="relative overflow-hidden welzone-card p-8 md:p-10 mb-8 animate-fadeUp">
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-peach-100 rounded-full opacity-60" />
          <div className="absolute right-20 -bottom-14 w-40 h-40 bg-sage-100 rounded-full opacity-50" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <span className="w-16 h-16 rounded-3xl bg-peach-400 text-white flex items-center justify-center shadow-glow animate-float">
              <FaLeaf className="text-3xl" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-peach-400 uppercase tracking-widest">
                Counsellor Dashboard
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-cocoa mt-1">
                Welcome back, {firstName}
              </h2>
              <p className="text-stone mt-2 max-w-xl">
                Here&apos;s a snapshot of your sessions and availability.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/counselor/add-slot" className="welzone-btn-primary">
                <FaCalendarPlus /> Add Slot
              </Link>
              <Link to="/blogbyme" className="welzone-btn-ghost">
                <FaPencilAlt /> My Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<FaCalendarCheck className="text-sage-500" />}
            value={upcomingSessions.length}
            label="Upcoming sessions"
            color="bg-sage-50"
          />
          <StatCard
            icon={<FaCalendarPlus className="text-peach-400" />}
            value={availableSlots.length}
            label="Available slots"
            color="bg-peach-50"
          />
          <StatCard
            icon={<FaStar className="text-yellow-400" />}
            value={counselor ? `${counselor.rating}/5` : "–"}
            label="Your rating"
            color="bg-cream-200"
          />
          <StatCard
            icon={<FaUserGraduate className="text-clay-400" />}
            value={counselor ? `${counselor.experience}y` : "–"}
            label="Experience"
            color="bg-clay-50"
          />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Session calendar */}
          {loading ? (
            <div className="welzone-card p-6 flex items-center justify-center h-72 text-stone">
              Loading your schedule...
            </div>
          ) : (
            <SessionCalendar
              sessions={upcomingSessions}
              title="Your Booked Sessions"
            />
          )}

          {/* Side panel */}
          <div className="space-y-6">
            {/* Next session */}
            <div className="welzone-card p-6">
              <h3 className="text-lg font-extrabold text-cocoa mb-4">
                Next Up
              </h3>
              {nextSession ? (
                <div className="flex items-center gap-4 rounded-2xl bg-sage-50 p-4">
                  <span className="p-3 rounded-2xl bg-sage-200 text-sage-700">
                    <FaComments className="text-2xl" />
                  </span>
                  <div>
                    <p className="font-bold text-sage-800">
                      {nextSession.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-stone">
                      {nextSession.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone">
                  No upcoming sessions. Add availability to start receiving
                  bookings.
                </p>
              )}
              <Link
                to="/counselor/sessions"
                className="mt-4 inline-block welzone-btn-secondary text-sm"
              >
                Manage sessions
              </Link>
            </div>

            {/* Profile mini */}
            <div className="welzone-card p-6">
              <h3 className="text-lg font-extrabold text-cocoa mb-4">
                Your Profile
              </h3>
              {counselor ? (
                <div className="space-y-3">
                  <ProfileRow
                    icon={<FaBriefcase className="text-sage-500" />}
                    label="Specialization"
                    value={counselor.specialization}
                  />
                  <ProfileRow
                    icon={<FaUserGraduate className="text-peach-400" />}
                    label="Qualification"
                    value={counselor.qualification}
                  />
                  <ProfileRow
                    icon={<FaStar className="text-yellow-400" />}
                    label="Rating"
                    value={`${counselor.rating} / 5`}
                  />
                </div>
              ) : (
                <p className="text-sm text-stone">Loading profile...</p>
              )}
              <Link
                to="/counselor/profile"
                className="mt-4 inline-block welzone-btn-ghost text-sm"
              >
                View full profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, color }) => (
  <div className="welzone-card p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lift transition-all duration-300">
    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
      {icon}
    </span>
    <div>
      <p className="text-2xl font-extrabold text-cocoa">{value}</p>
      <p className="text-xs text-stone">{label}</p>
    </div>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  color: PropTypes.string,
};

const ProfileRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <span className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center shrink-0">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-xs text-stone">{label}</p>
      <p className="text-sm font-bold text-cocoa truncate">{value}</p>
    </div>
  </div>
);

ProfileRow.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default DashboardCounsellor;