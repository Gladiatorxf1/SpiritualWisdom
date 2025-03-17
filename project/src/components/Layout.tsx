import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  BookOpenText,
  Menu,
  X,
  Sun,
  Moon,
  Home
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen ${isDarkMode 
      ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
      : 'bg-gradient-to-b from-amber-50 to-orange-100'} flex flex-col`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-purple-700'} text-white shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <BookOpenText size={28} />
            <h1 className="text-xl font-bold hidden sm:block">
              Spiritual Wisdom Platform
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
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-purple-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/hinduism"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-purple-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <span>Hinduism</span>
            </NavLink>
            <NavLink
              to="/sikhism"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-purple-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <span>Sikhism</span>
            </NavLink>
            <NavLink
              to="/buddhism"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:${isDarkMode ? 'text-gray-300' : 'text-purple-200'} transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              <span>Buddhism</span>
            </NavLink>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className={`md:hidden ${isDarkMode ? 'bg-gray-700' : 'bg-purple-800'} py-2`}>
            <div className="container mx-auto px-4 flex flex-col">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/hinduism"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Hinduism</span>
              </NavLink>
              <NavLink
                to="/sikhism"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Sikhism</span>
              </NavLink>
              <NavLink
                to="/buddhism"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'} px-2 rounded ${
                    isActive ? `font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'}` : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Buddhism</span>
              </NavLink>
              <div className="mt-2 border-t border-gray-600 pt-2 px-2">
                <button 
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 py-2 w-full text-left hover:${isDarkMode ? 'bg-gray-600' : 'bg-purple-700'} px-2 rounded`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
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
            : 'bg-purple-700 hover:bg-purple-800 text-white'} transition-colors`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 flex justify-center">
        <Outlet />
      </main>

      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-purple-700'} text-white py-4`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Spiritual Wisdom Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;