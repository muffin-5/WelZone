import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaHeart,
  FaBookOpen,
  FaComments,
  FaCalendarCheck,
  FaLeaf,
  FaTrophy,
  FaHeadset,
  FaUsers,
  FaArrowRight,
  FaHandSparkles,
  FaMoon,
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-100 overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-50 -translate-y-20 translate-x-20" />
        <div className="absolute top-40 left-0 w-72 h-72 bg-peach-100 rounded-full blur-3xl opacity-60 -translate-x-24" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12">
          {/* Centered copy */}
          <div className="text-center max-w-3xl mx-auto animate-fadeUp">
            <span className="welzone-chip bg-sage-100 text-sage-700 mb-6">
              <FaLeaf className="text-sage-500" />
              Your safe space for mental wellness
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.08] text-cocoa">
              Welcome to{" "}
              <span className="text-sage-500">WelZone</span> – your mental
              wellness counselling space
            </h1>
            <p className="mt-6 text-lg text-stone max-w-2xl mx-auto">
              Transform your life by building a proactive culture of care,
              resilience, and well-being with expert counsellors, mood
              tracking, and a supportive community.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="welzone-btn-primary text-lg"
              >
                <FaSignInAlt /> Get Started
              </button>
              <button
                onClick={() => navigate("/register")}
                className="welzone-btn-ghost text-lg"
              >
                <FaUserPlus /> Join as Member
              </button>
            </div>

            {/* mini stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <MiniStat number="24/7" label="Support" />
              <MiniStat number="1000+" label="Experts" />
              <MiniStat number="30L+" label="Sessions" />
            </div>
          </div>

          {/* Centered illustration card */}
          <div className="relative mt-16 animate-fadeUp max-w-md mx-auto" style={{ animationDelay: "150ms" }}>
            <div className="welzone-card p-8 shadow-lift rotate-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold text-peach-400 uppercase tracking-widest">
                    Daily Check-in
                  </p>
                  <p className="text-xl font-extrabold text-cocoa">
                    How are you today?
                  </p>
                </div>
                <span className="text-4xl animate-breathe">🌿</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["😊", "😟", "😐", "😔", "😌"].map((e, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center py-2 rounded-2xl ${
                      i === 0 ? "bg-sage-100 ring-2 ring-sage-300" : "bg-cream-50"
                    }`}
                  >
                    <span className="text-2xl">{e}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-sage-50 p-4 flex items-center gap-3">
                <FaMoon className="text-peach-400 text-xl" />
                <div>
                  <p className="text-sm font-bold text-sage-800">
                    Sleep quality: 4/5
                  </p>
                  <p className="text-xs text-stone">
                    Log your rest to keep insights glowing
                  </p>
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -left-6 top-8 welzone-card px-4 py-3 shadow-soft animate-float hidden sm:block">
              <p className="text-sm font-bold text-cocoa flex items-center gap-2">
                <FaCalendarCheck className="text-sage-500" /> 2 sessions booked
              </p>
            </div>
            <div
              className="absolute -right-4 bottom-10 welzone-card px-4 py-3 shadow-soft animate-floatSlow hidden sm:block"
            >
              <p className="text-sm font-bold text-cocoa flex items-center gap-2">
                <FaHeart className="text-peach-400" /> Mood logged today
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            eyebrow="Our Solutions"
            title="A complete suite for your well-being"
            subtitle="Everything you need to feel supported, understood, and empowered."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FaHeadset className="text-3xl text-peach-400" />}
              title="24/7 Counselling"
              desc="Round-the-clock access to expert psychologists for employees and students alike."
              color="bg-peach-50"
            />
            <FeatureCard
              icon={<FaHeart className="text-3xl text-sage-500" />}
              title="Mood & Sleep Tracking"
              desc="Log how you feel and how you slept to discover patterns in your wellbeing."
              color="bg-sage-50"
            />
            <FeatureCard
              icon={<FaCalendarCheck className="text-3xl text-clay-400" />}
              title="Session Booking"
              desc="Browse counsellors, view availability on a calendar, and book in seconds."
              color="bg-clay-50"
            />
            <FeatureCard
              icon={<FaBookOpen className="text-3xl text-sage-400" />}
              title="Courses & Blogs"
              desc="Self-paced wellness programs and articles written by caring professionals."
              color="bg-cream-200"
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to a calmer mind"
            subtitle="Getting started with WelZone is effortless."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <Step
              num="01"
              icon={<FaUserPlus className="text-sage-500" />}
              title="Create your account"
              desc="Register as a member or a counsellor in under two minutes."
            />
            <Step
              num="02"
              icon={<FaComments className="text-sage-500" />}
              title="Track & connect"
              desc="Log your mood, rate your sleep, and chat with your counsellor."
            />
            <Step
              num="03"
              icon={<FaHandSparkles className="text-sage-500" />}
              title="Grow your wellbeing"
              desc="Follow courses, read insights, and watch your progress bloom."
            />
          </div>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="welzone-card overflow-hidden shadow-lift">
            <div className="bg-gradient-to-br from-sage-500 to-sage-700 p-10 md:p-14 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Creating Waves of Impact
              </h2>
              <p className="mt-3 text-sage-100 max-w-xl mx-auto">
                Every session, every log, and every conversation moves us closer
                to a world that cares about mental health.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                <ImpactStat number="30L+" label="Therapy Sessions" />
                <ImpactStat number="1000+" label="Qualified Experts" />
                <ImpactStat number="10,000+" label="Lives Touched" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            eyebrow="Achievements"
            title="Recognised for making a difference"
            subtitle="We are honoured to be celebrated for our work in mental well-being."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <AwardCard
              icon={<FaTrophy className="text-yellow-400 text-3xl" />}
              title="National Startup Awards"
              desc="Recognised for Health & Wellness innovation."
            />
            <AwardCard
              icon={<FaTrophy className="text-yellow-400 text-3xl" />}
              title="IHW Gold Award"
              desc="Excellence in Mental Well-being initiatives."
            />
            <AwardCard
              icon={<FaTrophy className="text-yellow-400 text-3xl" />}
              title="Forbes 30 Under 30"
              desc="Impactful leaders building care-first communities."
            />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="welzone-card bg-gradient-to-br from-peach-50 to-cream-100 p-10 md:p-16 text-center">
            <FaUsers className="text-4xl text-peach-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-cocoa">
              Need a safe space to talk?
            </h2>
            <p className="mt-3 text-stone max-w-xl mx-auto">
              Whether you want support or want to offer it, connect with the
              WelZone community today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="welzone-btn-primary text-lg"
              >
                Start your journey <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const MiniStat = ({ number, label }) => (
  <div className="rounded-2xl bg-white shadow-card px-3 py-4 text-center">
    <p className="text-xl font-extrabold text-sage-600">{number}</p>
    <p className="text-xs text-stone">{label}</p>
  </div>
);

MiniStat.propTypes = {
  number: PropTypes.string,
  label: PropTypes.string,
};

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-12">
    <p className="text-sm font-bold text-peach-400 uppercase tracking-widest">
      {eyebrow}
    </p>
    <h2 className="text-3xl md:text-4xl font-extrabold text-cocoa mt-2">
      {title}
    </h2>
    {subtitle && <p className="text-stone mt-3">{subtitle}</p>}
  </div>
);

SectionHeading.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="welzone-card p-6 hover:-translate-y-1 hover:shadow-lift transition-all duration-300">
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-extrabold text-cocoa">{title}</h3>
    <p className="text-sm text-stone mt-1.5">{desc}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  desc: PropTypes.string,
  color: PropTypes.string,
};

const Step = ({ num, icon, title, desc }) => (
  <div className="relative text-center px-6 py-8">
    <div className="w-14 h-14 mx-auto rounded-2xl bg-sage-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <span className="absolute top-2 right-2 text-5xl font-extrabold text-cream-300">
      {num}
    </span>
    <h3 className="text-lg font-extrabold text-cocoa">{title}</h3>
    <p className="text-sm text-stone mt-1.5">{desc}</p>
  </div>
);

Step.propTypes = {
  num: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  desc: PropTypes.string,
};

const ImpactStat = ({ number, label }) => (
  <div className="rounded-3xl bg-white/10 backdrop-blur px-6 py-6">
    <p className="text-4xl font-extrabold">{number}</p>
    <p className="text-sage-100 text-sm mt-1">{label}</p>
  </div>
);

ImpactStat.propTypes = {
  number: PropTypes.string,
  label: PropTypes.string,
};

const AwardCard = ({ icon, title, desc }) => (
  <div className="welzone-card p-6 text-center hover:-translate-y-1 hover:shadow-lift transition-all duration-300">
    <div className="flex justify-center mb-3">{icon}</div>
    <h3 className="font-extrabold text-cocoa">{title}</h3>
    <p className="text-sm text-stone mt-1">{desc}</p>
  </div>
);

AwardCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default LandingPage;