import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-4xl font-extrabold text-white transition-transform transform hover:scale-105">
          WelZone
        </h1>
      </div>
    </header>
  );
};

export default Header;
