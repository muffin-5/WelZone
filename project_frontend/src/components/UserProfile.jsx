import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaPhone,
  FaTransgender,
  FaUser,
  FaCalendarCheck,
  FaCalendarPlus,
  FaLeaf,
  FaHeart,
} from "react-icons/fa";
import PageShell from "./PageShell";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/id/${userId}`
        );
        setUser(response.data);
      } catch {
        setError("Failed to load profile. Please try again later.");
      }
    };
    fetchUserProfile();
  }, [userId]);

  if (error) return <p className="text-peach-500 text-center mt-10">{error}</p>;
  if (!user) return <p className="text-center text-stone mt-10">Loading profile...</p>;

  const initials =
    user.username
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <PageShell
      eyebrow="My Account"
      title="My Profile"
      subtitle="A little more about you – keep it up to date so your experience stays personal."
    >
      <div className="max-w-3xl">
        {/* Profile header */}
        <div className="relative overflow-hidden welzone-card p-8 mb-6">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-peach-100 rounded-full opacity-60" />
          <div className="absolute left-32 -bottom-16 w-32 h-32 bg-sage-100 rounded-full opacity-50" />
          <div className="relative flex items-center gap-5">
            <span className="w-20 h-20 rounded-3xl bg-sage-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-glow">
              {initials}
            </span>
            <div>
              <h2 className="text-2xl font-extrabold text-cocoa">
                {user.username}
              </h2>
              <p className="text-sm text-stone flex items-center gap-1.5 mt-1">
                <FaLeaf className="text-sage-500" /> Member since{" "}
                {convertArrayToDate(user.createdAt)?.toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="welzone-card p-8">
          <h3 className="text-lg font-extrabold text-cocoa mb-5 flex items-center gap-2">
            <FaHeart className="text-peach-400" /> Account details
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <InfoRow
              icon={<FaUser className="text-sage-500" />}
              label="Username"
              value={user.username}
            />
            <InfoRow
              icon={<FaEnvelope className="text-peach-400" />}
              label="Email"
              value={user.email}
            />
            <InfoRow
              icon={<FaPhone className="text-sage-500" />}
              label="Phone"
              value={user.phoneNumber}
            />
            <InfoRow
              icon={<FaTransgender className="text-peach-400" />}
              label="Gender"
              value={user.gender}
            />
            <InfoRow
              icon={<FaBirthdayCake className="text-sage-500" />}
              label="Date of Birth"
              value={
                convertArrayToDate(user.dateOfBirth)?.toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                ) || "–"
              }
            />
            <InfoRow
              icon={<FaCalendarCheck className="text-peach-400" />}
              label="Account created"
              value={
                convertArrayToDate(user.createdAt)?.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }) || "–"
              }
            />
            <InfoRow
              icon={<FaCalendarPlus className="text-sage-500" />}
              label="Last updated"
              value={
                convertArrayToDate(user.updatedAt)?.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }) || "–"
              }
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-cream-50 p-4">
    <span className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center shrink-0">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-xs text-stone">{label}</p>
      <p className="font-bold text-cocoa truncate">{value}</p>
    </div>
  </div>
);

InfoRow.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default UserProfile;