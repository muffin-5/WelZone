import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaLeaf,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

const CounselorRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    specialization: "",
    qualification: "",
    experience: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dobParts = formData.dateOfBirth.split("-");
    const dateArray = [
      parseInt(dobParts[0]),
      parseInt(dobParts[1]),
      parseInt(dobParts[2]),
      0,
      0,
    ];

    const payload = {
      ...formData,
      dateOfBirth: dateArray,
      experience: formData.experience ? parseInt(formData.experience, 10) : 0,
      rating: 0,
    };

    try {
      await axios.post("http://localhost:8080/api/counselors", payload);
      setMessage("Counsellor registered successfully! Redirecting to login...");
      setIsError(false);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("Registration failed. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-peach-100 rounded-full blur-3xl opacity-70 translate-x-20 -translate-y-20" />

      <div className="relative w-full max-w-2xl animate-fadeUp">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone hover:text-sage-600 mb-6"
        >
          <FaArrowLeft /> Back to registration
        </Link>

        <div className="welzone-card shadow-lift p-8 md:p-10">
          <div className="text-center mb-8">
            <span className="w-14 h-14 mx-auto rounded-2xl bg-peach-400 text-white flex items-center justify-center mb-4 shadow-glow">
              <FaLeaf className="text-2xl" />
            </span>
            <h2 className="text-3xl font-extrabold text-cocoa">
              Register as a Counsellor
            </h2>
            <p className="text-stone mt-2">
              Share your expertise and make a real difference.
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center gap-2 ${
                isError
                  ? "bg-peach-50 border border-peach-200 text-peach-600"
                  : "bg-sage-50 border border-sage-200 text-sage-700"
              }`}
            >
              {!isError && <FaCheckCircle />}
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
            <Field label="Username">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className="welzone-input"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="welzone-input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone/50 hover:text-sage-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </Field>
            <Field label="Email">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="welzone-input"
              />
            </Field>
            <Field label="Phone Number">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className="welzone-input"
              />
            </Field>
            <Field label="Date of Birth">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="welzone-input"
              />
            </Field>
            <Field label="Specialization">
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                placeholder="e.g. Anxiety & Stress"
                className="welzone-input"
              />
            </Field>
            <Field label="Qualification">
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                placeholder="e.g. M.Phil in Clinical Psychology"
                className="welzone-input"
              />
            </Field>
            <Field label="Experience (in years)">
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="e.g. 5"
                className="welzone-input"
              />
            </Field>

            <div className="sm:col-span-2 mt-2">
              <button type="submit" className="welzone-btn-primary w-full py-3.5">
                Register as Counsellor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="welzone-label">{label}</label>
    {children}
  </div>
);

Field.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default CounselorRegistration;