import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaUserTie, FaLeaf, FaArrowLeft, FaHeart } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-peach-100 rounded-full blur-3xl opacity-70 translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage-100 rounded-full blur-3xl opacity-70 -translate-x-20 translate-y-20" />

      <div className="relative w-full max-w-2xl animate-fadeUp">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone hover:text-sage-600 mb-6"
        >
          <FaArrowLeft /> Back to home
        </Link>

        <div className="welzone-card shadow-lift p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="w-14 h-14 mx-auto rounded-2xl bg-peach-400 text-white flex items-center justify-center mb-4 shadow-glow">
              <FaLeaf className="text-2xl" />
            </span>
            <h2 className="text-3xl font-extrabold text-cocoa">
              Join WelZone
            </h2>
            <p className="text-stone mt-2">
              Choose whether you want to register as a Member or as a Counsellor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Register as user */}
            <button
              onClick={() => navigate("/userregistration")}
              className="group text-left rounded-4xl bg-sage-50 border-2 border-sage-100 hover:border-sage-300 p-8 transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-14 h-14 rounded-2xl bg-sage-200 text-sage-700 flex items-center justify-center group-hover:scale-110 transition">
                  <FaUser className="text-2xl" />
                </span>
                <FaHeart className="text-sage-300 group-hover:text-sage-400" />
              </div>
              <h3 className="text-xl font-extrabold text-cocoa">
                Join as Member
              </h3>
              <p className="text-sm text-stone mt-2">
                Access counselling, track your mood & sleep, book sessions, and
                grow your well-being.
              </p>
              <span className="mt-5 inline-block welzone-chip bg-sage-200 text-sage-800 group-hover:bg-sage-300 transition">
                Get started →
              </span>
            </button>

            {/* Register as counselor */}
            <button
              onClick={() => navigate("/counselorregistration")}
              className="group text-left rounded-4xl bg-peach-50 border-2 border-peach-100 hover:border-peach-300 p-8 transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-14 h-14 rounded-2xl bg-peach-100 text-peach-400 flex items-center justify-center group-hover:scale-110 transition">
                  <FaUserTie className="text-2xl" />
                </span>
                <FaHeart className="text-peach-200 group-hover:text-peach-300" />
              </div>
              <h3 className="text-xl font-extrabold text-cocoa">
                Join as Counsellor
              </h3>
              <p className="text-sm text-stone mt-2">
                Offer sessions, publish blogs, manage your availability, and
                support those in need.
              </p>
              <span className="mt-5 inline-block welzone-chip bg-peach-200 text-peach-600 group-hover:bg-peach-300 transition">
                Get started →
              </span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-stone">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-sage-600 hover:text-sage-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;