import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBookOpen,
  FaTimes,
  FaClock,
  FaQuoteLeft,
  FaHeart,
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

const BLOG_COLORS = [
  "from-sage-100 to-cream-100",
  "from-peach-100 to-cream-100",
  "from-cream-200 to-sage-50",
  "from-clay-50 to-peach-50",
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/blogs/all");
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch {
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
    <PageShell
      eyebrow="Resources"
      title="Wellness Blog"
      subtitle="Articles and insights written by our caring counsellors to support your journey."
    >
      {error && (
        <div className="rounded-2xl bg-peach-50 border border-peach-200 text-peach-600 text-sm font-semibold px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {blogs.length === 0 && !error ? (
        <div className="welzone-card p-10 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-bold text-cocoa">No blog posts yet</p>
          <p className="text-sm text-stone mt-1">
            Our counsellors are busy writing. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => {
            const postedAt = convertArrayToDate(blog.createdAt);
            const color = BLOG_COLORS[index % BLOG_COLORS.length];
            return (
              <button
                key={blog.id}
                onClick={() => handleBlogClick(blog)}
                className="welzone-card overflow-hidden text-left hover:-translate-y-1 hover:shadow-lift transition-all duration-300 group"
              >
                <div
                  className={`bg-gradient-to-br ${color} p-8 flex items-center justify-center`}
                >
                  <span className="w-16 h-16 rounded-3xl bg-white/80 flex items-center justify-center text-sage-500 group-hover:scale-110 transition">
                    <FaBookOpen className="text-2xl" />
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-extrabold text-cocoa text-lg group-hover:text-sage-700 transition line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-stone mt-2 line-clamp-3">
                    {blog.content}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-stone mt-4">
                    <FaClock className="text-peach-400" />
                    {postedAt
                      ? postedAt.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-4xl shadow-lift w-full max-w-2xl overflow-hidden animate-pop">
            <div className="bg-gradient-to-br from-sage-100 to-cream-100 p-8 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-stone hover:text-peach-500 transition"
              >
                <FaTimes />
              </button>
              <FaQuoteLeft className="text-sage-300 text-4xl mb-3" />
              <h2 className="text-2xl font-extrabold text-cocoa pr-10">
                {selectedBlog.title}
              </h2>
              <p className="text-sm text-stone mt-2 flex items-center gap-1.5">
                <FaClock className="text-peach-400" />
                {convertArrayToDate(selectedBlog.createdAt)?.toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </p>
            </div>
            <div className="p-8">
              <p className="text-cocoa leading-relaxed whitespace-pre-wrap">
                {selectedBlog.content}
              </p>
              <div className="mt-8 pt-6 border-t border-cream-200 flex items-center justify-between">
                <span className="welzone-chip bg-sage-100 text-sage-700">
                  <FaHeart className="text-peach-400" /> Written with care
                </span>
                <button onClick={closeModal} className="welzone-btn-primary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Blog;