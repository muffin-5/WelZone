import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaUser,
  FaBook,
  FaCalendarCheck,
  FaCalendarPlus,
  FaBriefcase,
  FaGraduationCap,
  FaLeaf,
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

const CounselorProfile = () => {
  const [counselor, setCounselor] = useState(null);
  const [error, setError] = useState("");
  const counselorId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchCounselorProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/counselors/id/${counselorId}`
        );
        setCounselor(response.data);
      } catch {
        setError("Failed to load profile. Please try again later.");
      }
    };
    fetchCounselorProfile();
  }, [counselorId]);

  if (error)
    return <p className="text-peach-500 text-center mt-10">{error}</p>;
  if (!counselor)
    return <p className="text-center text-stone mt-10">Loading profile...</p>;

  const initials = counselor.username
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <PageShell
      eyebrow="My Account"
      title="Counsellor Profile"
      subtitle="Show the community who you are, what you specialise in, and how to reach you."
    >
      <div className="max-w-3xl">
        {/* Header */}
        <div className="relative overflow-hidden welzone-card p-8 mb-6">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-peach-100 rounded-full opacity-60" />
          <div className="absolute left-40 -bottom-16 w-32 h-32 bg-sage-100 rounded-full opacity-50" />
          <div className="relative flex items-center gap-5 flex-wrap">
            <span className="w-20 h-20 rounded-3xl bg-peach-400 text-white flex items-center justify-center text-2xl font-extrabold shadow-glow">
              {initials}
            </span>
            <div className="flex-1 min-w-[200px]">
              <h2 className="text-2xl font-extrabold text-cocoa">
                {counselor.username}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="welzone-chip bg-sage-100 text-sage-700 text-xs">
                  {counselor.specialization}
                </span>
                <span className="welzone-chip bg-peach-100 text-peach-500 text-xs">
                  <FaStar /> {counselor.rating}/5
                </span>
              </div>
            </div>
            <p className="text-sm text-stone flex items-center gap-1.5">
              <FaLeaf className="text-sage-500" /> Since{" "}
              {convertArrayToDate(counselor.createdAt)?.toLocaleDateString(
                "en-US",
                { month: "long", year: "numeric" }
              )}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="welzone-card p-8">
          <h3 className="text-lg font-extrabold text-cocoa mb-5">
            Professional details
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <InfoRow
              icon={<FaUser className="text-sage-500" />}
              label="Username"
              value={counselor.username}
            />
            <InfoRow
              icon={<FaEnvelope className="text-peach-400" />}
              label="Email"
              value={counselor.email}
            />
            <InfoRow
              icon={<FaPhone className="text-sage-500" />}
              label="Phone"
              value={counselor.phone}
            />
            <InfoRow
              icon={<FaBirthdayCake className="text-peach-400" />}
              label="Date of Birth"
              value={
                convertArrayToDate(counselor.dateOfBirth)?.toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                ) || "–"
              }
            />
            <InfoRow
              icon={<FaBook className="text-sage-500" />}
              label="Specialization"
              value={counselor.specialization}
            />
            <InfoRow
              icon={<FaGraduationCap className="text-peach-400" />}
              label="Qualification"
              value={counselor.qualification}
            />
            <InfoRow
              icon={<FaBriefcase className="text-sage-500" />}
              label="Experience"
              value={`${counselor.experience} years`}
            />
            <InfoRow
              icon={<FaStar className="text-yellow-400" />}
              label="Rating"
              value={`${counselor.rating} / 5`}
            />
            <InfoRow
              icon={<FaCalendarCheck className="text-sage-500" />}
              label="Account created"
              value={
                convertArrayToDate(counselor.createdAt)?.toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                ) || "–"
              }
            />
            <InfoRow
              icon={<FaCalendarPlus className="text-peach-400" />}
              label="Last updated"
              value={
                convertArrayToDate(counselor.updatedAt)?.toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                ) || "–"
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

export default CounselorProfile;