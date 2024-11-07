import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("available"); // Track the active tab
  const userId = localStorage.getItem("Id"); // Retrieve userId from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch available courses. Please try again later.");
      }
    };

    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/enrollments/${userId}`
        );
        setMyCourses(response.data);
      } catch (err) {
        setError("Failed to fetch your courses. Please try again later.");
      }
    };

    fetchCourses();
    fetchMyCourses();
    setLoading(false);
  }, [userId, activeTab]);

  const handleEnroll = async (courseId) => {
    const courseEnrollment = { userId, courseId };
    try {
      const response = await axios.post(
        "http://localhost:8080/enrollments",
        courseEnrollment
      );
      alert(response.data);
    } catch (err) {
      alert("Failed to enroll in the course. Please try again later.");
    }
  };

  if (loading) return <p>Loading courses...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <div className="courses-page p-6">
        {/* Tabs */}
        <div className="flex space-x-6 mb-6 border-b-2 border-gray-300">
          <button
            className={`py-2 px-6 text-lg font-semibold ${
              activeTab === "available"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Courses
          </button>
          <button
            className={`py-2 px-6 text-lg font-semibold ${
              activeTab === "myCourses"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("myCourses")}
          >
            My Courses
          </button>
        </div>

        {/* Available Courses */}
        {activeTab === "available" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course.courseId}
                    className="bg-white shadow-lg rounded-lg p-6"
                  >
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <p className="text-green-500 font-semibold mt-2">
                      Price: ${course.price}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Created At:{" "}
                      {new Date(
                        convertArrayToDate(course.createdAt)
                      ).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleEnroll(course.courseId)}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Enroll
                    </button>
                  </div>
                ))
              ) : (
                <p>No courses available.</p>
              )}
            </div>
          </div>
        )}

        {/* My Courses */}
        {activeTab === "myCourses" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
            {myCourses.length > 0 ? (
              myCourses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-white shadow-lg rounded-lg p-6 mb-4"
                >
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <p className="text-green-500 font-semibold">
                    Price: ${course.price}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Enrolled On:{" "}
                    {new Date(
                      convertArrayToDate(course.enrollmentDate)
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                You are not enrolled in any courses yet.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesPage;
