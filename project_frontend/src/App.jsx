import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Blog from "./components/Blog";
import CoursesPage from "./components/CoursesPage"; // Import the CoursesPage component

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
