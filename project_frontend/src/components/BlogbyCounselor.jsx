import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import Header from "./Header";

const BlogByCounselor = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [formMessage, setFormMessage] = useState("");
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

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      counselorId: counselorId,
      title: newTitle,
      content: newContent,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/blogs/create",
        newBlog
      );
      setFormMessage("Blog created successfully!");
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      setNewTitle("");
      setNewContent("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating blog:", error);
      setFormMessage("Failed to create blog. Please try again.");
    }
  };

  return (
    <>
      <Header />
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

        {/* Floating Button */}
        <button
          className="fixed bottom-15 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPencilAlt size={20} />
        </button>

        {/* Blog Creation Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
              {formMessage && (
                <p className="text-green-500 mb-4">{formMessage}</p>
              )}
              <form onSubmit={handleCreateBlog} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700">
                    Title:
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700">
                    Content:
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Create Blog
                </button>
              </form>
              <button
                className="mt-4 text-black-500 font-bold hover:underline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogByCounselor;
