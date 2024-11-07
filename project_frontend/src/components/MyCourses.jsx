import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id"); // Retrieve userId from local storage

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enrollments/${userId}`);
        console.log(response.data)
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch your courses. Please try again later.");
      }
    };

    fetchMyCourses();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Enrolled Courses</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.courseId} className="bg-white shadow-lg rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <p className="text-green-500 font-semibold">Price: ${course.price}</p>
              <p className="text-gray-500 text-sm">
                Enrolled On: {new Date(course.enrollmentDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
