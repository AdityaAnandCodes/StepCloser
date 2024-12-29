import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token'); // Check token presence
    console.log("Token present:", token); // Debug log
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      console.log("Storage changed!");
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    checkLoginStatus(); // Update state
    navigate('/'); // Redirect
  };

  return (
    <nav className="w-full p-2 px-4 bg-gray-100 border-b-2 text-zinc-800">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-medium font-serif">
          <Link to="/">StepCloser</Link>
        </div>

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
          <Link to="/mygoals" className="text-lg mx-2">
            My Goals
          </Link> {/* Added My Goals link */}
          <Link to="/create" className="text-lg mx-2">
            StartOne
          </Link>
          {isLoggedIn ? (
            <button
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/authenticate"
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
            >
              Sign In/Up
            </Link>
          )}
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
            to="/mygoals"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            My Goals
          </Link> {/* Added My Goals link */}
          <Link
            to="/create"
            className="text-lg mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            StartOne
          </Link>
          {isLoggedIn ? (
            <button
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/authenticate"
              className="bg-zinc-900 rounded-full text-white p-2 px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In/Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
