import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardUser from "./components/DashboardUser";
import DashboardCounselor from "./components/DashboardCounselor";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogbyCounselor from "./components/BlogbyCounselor";
import LandingPage from "./components/LandingPage";
import CoursesPage from "./components/CoursesPage"; // Import the CoursesPage component
import Register from "./components/Register";
import UserRegistration from "./components/UserRegistration";
import CounselorRegistration from "./components/CounselorRegistration";
import CounselorSessions from "./components/CounselorSessions";
import AddSlot from "./components/AddSlot";
import BookSession from "./components/BookSession";
import MoodProgress from "./components/UserProgress";
import UserProfile from "./components/UserProfile";
import CounselorProfile from "./components/CounselorProfile";
import CounselorFeedback from "./components/CounselorFeedback";
import UserFeedback from "./components/UserFeedback";
import MyCourses from "./components/MyCourses";

function App() {
  return (
    <Router>
      <div className="app">
        {localStorage.getItem("Id") && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route
            path="/counselorregistration"
            element={<CounselorRegistration />}
          />

          <Route path="/dashboarduser" element={<DashboardUser />} />
          <Route path="/dashboardcounsellor" element={<DashboardCounselor />} />
          <Route path="/counselor/sessions" element={<CounselorSessions />} />
          <Route
            path="/counselor/sessions/:sessionId"
            element={<CounselorFeedback />}
          />
          <Route path="/counselor/add-slot" element={<AddSlot />} />
          <Route path="/progress" element={<MoodProgress />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogbyme" element={<BlogbyCounselor />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/myCourses" element={<MyCourses />} />

          <Route path="/book-session" element={<BookSession />} />
          <Route path="/book-session/:sessionId" element={<UserFeedback />} />

          <Route path="/login/user" element={<Login userType="user" />} />
          <Route
            path="/login/counselor"
            element={<Login userType="counselor" />}
          />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/counselor/profile" element={<CounselorProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
