import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios to make HTTP requests

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  // Note: JavaScript Date months are zero-indexed, so we subtract 1 from the month
  return new Date(year, month - 1, day, hour, minute);
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/courses"); // API endpoint to fetch courses
        setCourses(response.data); // Set the courses data from the response
        setLoading(false); // Mark the loading as complete
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once after the component mounts

  // If the data is still loading, show a loading message
  if (loading) return <p>Loading courses...</p>;

  // If there's an error, show the error message
  if (error) return <p>{error}</p>;

  return (
    <div className="courses-page p-6">
      <h2 className="text-2xl font-bold mb-4">All Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-green-500 font-semibold mt-2">
                Price: ${course.price}
              </p>
              <p className="text-gray-500 text-sm">
                Created At:{" "}
                {new Date(
                  convertArrayToDate(course.createdAt)
                ).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">
                Last Updated:{" "}
                {new Date(
                  convertArrayToDate(course.updatedAt)
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
