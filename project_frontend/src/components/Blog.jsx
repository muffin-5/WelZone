import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/blogs/all");
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold text-center text-indigo-600 mb-12">
          Blogs
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
              onClick={() => handleBlogClick(blog)}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {blog.content.slice(0, 100)}...
                </p>
                <p className="text-indigo-500 text-sm font-semibold">
                  Posted on{" "}
                  {convertArrayToDate(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for reading the full blog */}
        {isModalOpen && selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">
                {selectedBlog.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedBlog.content}
              </p>
              <p className="text-gray-500 text-sm">
                Posted on{" "}
                {convertArrayToDate(
                  selectedBlog.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
