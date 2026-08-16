import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
  FaLeaf,
} from "react-icons/fa";
import PageShell from "./PageShell";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day] = dateValue;
  return new Date(year, month - 1, day);
};

const COURSE_COLORS = [
  "bg-sage-100 text-sage-700",
  "bg-peach-100 text-peach-500",
  "bg-clay-50 text-clay-400",
  "bg-cream-200 text-cocoa",
];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("available");
  const [enrolling, setEnrolling] = useState(null);
  const userId = localStorage.getItem("Id");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [coursesRes, enrolledRes] = await Promise.all([
        axios.get("http://localhost:8080/courses"),
        axios.get(`http://localhost:8080/enrollments/${userId}`),
      ]);
      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      setMyCourses(
        Array.isArray(enrolledRes.data) ? enrolledRes.data : []
      );
      setError(null);
    } catch {
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await axios.post("http://localhost:8080/enrollments", {
        userId,
        courseId,
      });
      await fetchData();
    } catch {
      alert("Failed to enroll in the course. Please try again later.");
    } finally {
      setEnrolling(null);
    }
  };

  const enrolledIds = new Set(myCourses.map((c) => c.courseId));

  return (
    <PageShell
      eyebrow="Learning"
      title="Wellness Courses"
      subtitle="Self-paced programs crafted to help you build healthier habits and a calmer mind."
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-cream-200/60 rounded-full p-1.5 w-fit">
        <TabButton
          active={activeTab === "available"}
          onClick={() => setActiveTab("available")}
          label={`Available (${courses.length})`}
        />
        <TabButton
          active={activeTab === "myCourses"}
          onClick={() => setActiveTab("myCourses")}
          label={`My Courses (${myCourses.length})`}
        />
      </div>

      {error && (
        <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="welzone-card p-10 text-center text-stone">
          Loading courses...
        </div>
      ) : activeTab === "available" ? (
        courses.length === 0 ? (
          <div className="welzone-card p-10 text-center">
            <p className="text-4xl mb-3">📚</p>
            <p className="font-bold text-cocoa">No courses available</p>
            <p className="text-sm text-stone mt-1">
              New courses are being added. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const color = COURSE_COLORS[index % COURSE_COLORS.length];
              const isEnrolled = enrolledIds.has(course.courseId);
              return (
                <div
                  key={course.courseId}
                  className="welzone-card p-6 flex flex-col hover:-translate-y-1 hover:shadow-lift transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}
                    >
                      <FaBookOpen className="text-xl" />
                    </span>
                    {isEnrolled && (
                      <span className="welzone-chip bg-sage-100 text-sage-700 text-xs">
                        <FaCheckCircle /> Enrolled
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-cocoa text-lg">
                    {course.title}
                  </h3>
                  <p className="text-sm text-stone mt-2 flex-1 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-cream-200">
                    <span className="text-lg font-extrabold text-sage-600">
                      ${course.price}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-stone">
                      <FaClock className="text-peach-400" />
                      {convertArrayToDate(course.createdAt)?.toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEnroll(course.courseId)}
                    disabled={isEnrolled || enrolling === course.courseId}
                    className={`mt-4 w-full ${
                      isEnrolled ? "welzone-btn-secondary" : "welzone-btn-primary"
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {enrolling === course.courseId
                      ? "Enrolling..."
                      : isEnrolled
                      ? "Enrolled"
                      : "Enroll Now"}
                  </button>
                </div>
              );
            })}
          </div>
        )
      ) : myCourses.length === 0 ? (
        <div className="welzone-card p-10 text-center">
          <p className="text-4xl mb-3">🌱</p>
          <p className="font-bold text-cocoa">
            You haven&apos;t enrolled in any courses yet
          </p>
          <p className="text-sm text-stone mt-1">
            Browse the available courses and start your learning journey.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course, index) => {
            const color = COURSE_COLORS[index % COURSE_COLORS.length];
            return (
              <div
                key={course.courseId}
                className="welzone-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all duration-300"
              >
                <span
                  className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-4 ${color}`}
                >
                  <FaGraduationCap className="text-xl" />
                </span>
                <h2 className="font-extrabold text-cocoa text-lg">
                  {course.title}
                </h2>
                <p className="text-sm text-stone mt-2 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-cream-200">
                  <span className="p-2 rounded-xl bg-sage-100 text-sage-600">
                    <FaLeaf />
                  </span>
                  <div>
                    <p className="text-xs text-stone">Enrolled on</p>
                    <p className="text-sm font-bold text-cocoa">
                      {new Date(course.enrollmentDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-bold transition ${
      active ? "bg-white text-sage-700 shadow-soft" : "text-stone hover:text-cocoa"
    }`}
  >
    {label}
  </button>
);

TabButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default CoursesPage;