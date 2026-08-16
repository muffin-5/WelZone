import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaClock,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";
import PageShell from "./PageShell";

const COURSE_COLORS = [
  "bg-sage-100 text-sage-700",
  "bg-peach-100 text-peach-500",
  "bg-clay-50 text-clay-400",
  "bg-cream-200 text-cocoa",
];

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/enrollments/${userId}`
        );
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch {
        setError("Failed to fetch your courses. Please try again later.");
      }
    };
    fetchMyCourses();
  }, [userId]);

  return (
    <PageShell
      eyebrow="Learning"
      title="My Enrolled Courses"
      subtitle="Everything you're currently learning, all in one place."
    >
      {error && (
        <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="welzone-card p-10 text-center">
          <p className="text-4xl mb-3">🌱</p>
          <p className="font-bold text-cocoa">
            You are not enrolled in any courses yet
          </p>
          <Link to="/courses" className="welzone-btn-primary mt-4 inline-flex">
            Browse courses <FaArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
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
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-cream-200">
                  <div className="flex items-center gap-2">
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
                  <span className="welzone-chip bg-sage-100 text-sage-700 text-xs">
                    <FaClock /> In progress
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
};

export default MyCourses;