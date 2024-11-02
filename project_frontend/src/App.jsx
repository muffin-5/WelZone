import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardUser from "./components/DashboardUser";
import DashboardCounsellor from "./components/DashboardCounsellor";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogbyCounselor from "./components/BlogbyCounselor";
import LandingPage from "./components/LandingPage";
import CoursesPage from "./components/CoursesPage"; // Import the CoursesPage component
import Register from "./components/Register";
import UserRegistration from "./components/UserRegistration";
import CounselorRegistration from "./components/CounselorRegistration";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
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
          <Route
            path="/dashboardcounsellor"
            element={<DashboardCounsellor />}
          />

          <Route path="/chat" element={<Chat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogbyme" element={<BlogbyCounselor />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login/user" element={<Login userType="user" />} />
          <Route
            path="/login/counselor"
            element={<Login userType="counselor" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
