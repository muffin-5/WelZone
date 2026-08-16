import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPencilAlt,
  FaTimes,
  FaClock,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";
import PageShell from "./PageShell";

const BlogByCounselor = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const counselorId = localStorage.getItem("Id");

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
      } catch {
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
      setIsError(false);
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      setNewTitle("");
      setNewContent("");
      setTimeout(() => {
        setShowForm(false);
        setFormMessage("");
      }, 1200);
    } catch (error) {
      console.error("Error creating blog:", error);
      setIsError(true);
      setFormMessage("Failed to create blog. Please try again.");
    }
  };

  return (
    <PageShell
      eyebrow="Counsellor"
      title="My Blogs"
      subtitle="Share your expertise and write wellness articles for the community."
      action={
        <button
          onClick={() => setShowForm((v) => !v)}
          className="welzone-btn-primary"
        >
          <FaPencilAlt /> Write a blog
        </button>
      }
    >
      {error && (
        <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Create form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-4xl shadow-lift w-full max-w-lg overflow-hidden animate-pop">
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-cocoa">
                  Create New Blog
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-stone hover:text-peach-500 transition"
                >
                  <FaTimes />
                </button>
              </div>

              {formMessage && (
                <div
                  className={`mb-4 rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center gap-2 ${
                    isError
                      ? "bg-peach-50 border border-peach-200 text-peach-600"
                      : "bg-sage-50 border border-sage-200 text-sage-700"
                  }`}
                >
                  {!isError && <FaCheckCircle />}
                  {formMessage}
                </div>
              )}

              <form onSubmit={handleCreateBlog} className="space-y-5">
                <div>
                  <label className="welzone-label">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="A catchy, calming title"
                    className="welzone-input"
                  />
                </div>
                <div>
                  <label className="welzone-label">Content</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    placeholder="Share your wisdom, tips, and encouragement..."
                    rows={8}
                    className="welzone-input resize-none"
                  />
                </div>
                <button type="submit" className="welzone-btn-primary w-full">
                  <FaBookOpen /> Publish Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Blog list */}
      {blogs.length === 0 && !error ? (
        <div className="welzone-card p-10 text-center">
          <p className="text-4xl mb-3">✍️</p>
          <p className="font-bold text-cocoa">You haven&apos;t written any blogs yet</p>
          <p className="text-sm text-stone mt-1">
            Click &ldquo;Write a blog&rdquo; to share your first post.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="welzone-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="p-3 rounded-2xl bg-sage-100 text-sage-600">
                  <FaBookOpen className="text-xl" />
                </span>
                <span className="welzone-chip bg-sage-100 text-sage-700 text-xs">
                  Published
                </span>
              </div>
              <h2 className="font-extrabold text-cocoa text-lg line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-sm text-stone mt-2 line-clamp-3">
                {blog.content}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-stone mt-4">
                <FaClock className="text-peach-400" />
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently"}
              </p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export default BlogByCounselor;