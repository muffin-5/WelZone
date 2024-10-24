import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">WelZone</h1>
        <nav>
          <Link to="/dashboard" className="mx-2">
            Dashboard
          </Link>
          <Link to="/chat" className="mx-2">
            Chat
          </Link>
          <Link to="/blog" className="mx-2">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
