import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardUser from "./components/DashboardUser";
import DashboardCounselor from "./components/DashboardCounselor";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogbyCounselor from "./components/BlogbyCounselor";
import LandingPage from "./components/LandingPage";
import CoursesPage from "./components/CoursesPage";
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
import CalendarPage from "./components/CalendarPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  return (
    <div className="app">
      {localStorage.getItem("Id") && <Header />}
      <main className="flex-1">
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userregistration" element={<UserRegistration />} />
            <Route
              path="/counselorregistration"
              element={<CounselorRegistration />}
            />
            <Route path="/login/user" element={<Login userType="user" />} />
            <Route
              path="/login/counselor"
              element={<Login userType="counselor" />}
            />

            {/* Protected routes */}
            <Route
              path="/dashboarduser"
              element={
                <ProtectedRoute role="user">
                  <DashboardUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboardcounsellor"
              element={
                <ProtectedRoute role="counselor">
                  <DashboardCounselor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/counselor/sessions"
              element={
                <ProtectedRoute role="counselor">
                  <CounselorSessions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/counselor/sessions/:sessionId"
              element={
                <ProtectedRoute role="counselor">
                  <CounselorFeedback />
                </ProtectedRoute>
              }
            />
            <Route
              path="/counselor/add-slot"
              element={
                <ProtectedRoute role="counselor">
                  <AddSlot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute role="user">
                  <MoodProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogbyme"
              element={
                <ProtectedRoute role="counselor">
                  <BlogbyCounselor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/myCourses"
              element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-session"
              element={
                <ProtectedRoute role="user">
                  <BookSession />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-session/:sessionId"
              element={
                <ProtectedRoute role="user">
                  <UserFeedback />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute role="user">
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/counselor/profile"
              element={
                <ProtectedRoute role="counselor">
                  <CounselorProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {!location.pathname.startsWith("/chat") && <Footer />}
      </div>
    );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;