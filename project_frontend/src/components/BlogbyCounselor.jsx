import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogByCounselor = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const counselorId = localStorage.getItem("Id"); // Retrieve counselor ID from local storage

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/blogs/counselor/${counselorId}`
        );
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          setBlogs([]);
          setError("No blogs found.");
        }
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, [counselorId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs by Counselor</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
              <p className="text-sm text-gray-500">
                Published on: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </ul>
    </div>
  );
};

export default BlogByCounselor;
