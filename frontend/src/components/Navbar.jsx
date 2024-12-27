import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full p-2 px-4 bg-gray-100 border-b-2 text-zinc-800">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-medium font-serif">StepCloser</div>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link to="/goals" className="text-lg mx-2">
            Goals
          </Link>
          <Link to="/create" className="text-lg mx-2">
            StartOne
          </Link>
          <button className="bg-zinc-900 rounded-full text-white p-2 px-3">
            SignIn/Up
          </button>
        </div>
      </div>

      {/* Navigation Links (Mobile) */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-4">
          <Link
            to="/goals"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Goals
          </Link>
          <Link
            to="/create"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            StartOne
          </Link>
          <button
            className="bg-zinc-900 rounded-full text-white p-2 px-3"
            onClick={() => setIsMenuOpen(false)}
          >
            SignIn/Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
