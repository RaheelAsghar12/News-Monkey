import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'science', 'health'];

  return (
    <nav className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-green-600 text-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/">
              <img
                className="h-10 w-auto border rounded"
                src="/Newsmokey.png"
                alt="NewsMonkey"
              />
            </Link>
          </div>

          {/* Hamburger button (mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menu links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/${cat === 'general' ? '' : cat}`}
                className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-4 px-4 py-2 rounded-md font-medium ${
                darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
              }`}
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className={`md:hidden mt-2 space-y-1 pb-4`}>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/${cat === 'general' ? '' : cat}`}
                onClick={() => setMenuOpen(false)} // close menu on link click
                className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full text-left px-3 py-2 rounded-md font-medium ${
                darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
              }`}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
