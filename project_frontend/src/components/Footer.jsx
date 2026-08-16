import { Link } from "react-router-dom";
import { FaLeaf, FaHeart } from "react-icons/fa";

const Footer = () => {
  const isLoggedIn = localStorage.getItem("whoLogged") === "user" || localStorage.getItem("whoLogged") === "counselor";

  return (
    <footer className="mt-auto bg-cream-200/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-sage-500 text-white flex items-center justify-center">
              <FaLeaf />
            </span>
            <span className="font-extrabold text-cocoa">WelZone</span>
          </div>

          {!isLoggedIn && (
            <div className="flex items-center gap-6 text-sm font-semibold text-stone">
              <Link to="/" className="hover:text-sage-600 transition">
                Home
              </Link>
              <Link to="/login" className="hover:text-sage-600 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-sage-600 transition">
                Register
              </Link>
            </div>
          )}

          <p className="text-sm text-stone flex items-center gap-1.5">
            © {new Date().getFullYear()} WelZone. Made with
            <FaHeart className="text-peach-400" /> for mental wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;