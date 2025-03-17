import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  BookOpenText,
  MessageCircle,
  Info,
  BookOpen,
  Menu,
  X,
  Home,
  Sun,
  Moon
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const HinduismLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen ${isDarkMode 
      ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
      : 'bg-gradient-to-b from-amber-50 to-orange-100'} flex flex-col`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-orange-600'} text-white shadow-md mb-8`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <NavLink to="/hinduism" className="flex items-center gap-2">
            <BookOpenText size={28} />
            <h1 className="text-xl font-bold hidden sm:block">
              Bhagavad Gita Wisdom
            </h1>
          </NavLink>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/hinduism"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-orange-200'} transition-colors ${
                  isActive && location.pathname === "/hinduism" ? "font-bold" : ""
                }`
              }
            >
              <BookOpenText size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/hinduism/chat"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-orange-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <MessageCircle size={20} />
              <span>Chat</span>
            </NavLink>
            <NavLink
              to="/hinduism/teachings"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-orange-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <BookOpen size={20} />
              <span>Teachings</span>
            </NavLink>
            <NavLink
              to="/hinduism/about"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-orange-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <Info size={20} />
              <span>About</span>
            </NavLink>
            <Link
              to="/"
              className={`flex items-center gap-1 ml-6 px-4 py-1.5 rounded-full ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-700 hover:bg-orange-800'
              } transition-colors`}
            >
              <Home size={18} />
              <span>Main Platform</span>
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className={`md:hidden ${isDarkMode ? 'bg-gray-700' : 'bg-orange-700'} py-2`}>
            <div className="container mx-auto px-4 flex flex-col">
              <NavLink
                to="/hinduism"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'} px-2 rounded ${
                    isActive && location.pathname === "/hinduism" ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpenText size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/hinduism/chat"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle size={20} />
                <span>Chat</span>
              </NavLink>
              <NavLink
                to="/hinduism/teachings"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={20} />
                <span>Teachings</span>
              </NavLink>
              <NavLink
                to="/hinduism/about"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-orange-600'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Info size={20} />
                <span>About</span>
              </NavLink>
              <div className="border-t border-orange-600 mt-2 pt-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 py-2 px-2 rounded hover:bg-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={20} />
                  <span>Main Platform</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Fixed side button for dark mode toggle */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg ${isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-orange-700 hover:bg-orange-800 text-white'} transition-colors`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 flex justify-center">
        <Outlet />
      </main>

      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-orange-600'} text-white py-4`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Spiritual Wisdom Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HinduismLayout;