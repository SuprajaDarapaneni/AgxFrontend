// src/components/Header.jsx

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Globe } from "lucide-react";
import logo from "../assets/logo.png"; // Use pink version if available

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Blog", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
    { name: "Review", path: "/Review" },
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  return (
    <header className="bg-gradient-to-r from-pink-50 via-white to-pink-50 text-[#42002E] font-sans fixed top-0 left-0 w-full z-50 shadow-lg border-b border-pink-200 animate-fade-in">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3 px-6">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Agx Logo" className="h-20 w-auto" />
        </div>

        {/* Nav: Desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative font-medium transition duration-300 ease-in-out transform hover:-translate-y-0.5 ${
                location.pathname === item.path
                  ? "text-pink-700"
                  : "text-[#42002E] hover:text-pink-600"
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded animate-slide-in"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Contact Info + Language */}
        <div className="hidden md:flex flex-col items-end space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-pink-800" />
            <span>contact@consulting.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-pink-800" />
            <span>+49 152 1815 4435</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-pink-800" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="text-[#42002E] bg-pink-50 border border-pink-300 rounded px-2 py-1 text-sm focus:outline-none"
            >
              <option value="EN">EN</option>
              <option value="DE">DE</option>
              <option value="FR">FR</option>
            </select>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#42002E] text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden bg-white px-6 pb-4 border-t border-pink-200 transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
        } origin-top overflow-hidden`}
      >
        <nav className="flex flex-col space-y-4 mt-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium ${
                location.pathname === item.path
                  ? "text-pink-700"
                  : "text-[#42002E] hover:text-pink-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 space-y-2 text-sm border-t border-pink-200 pt-3">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-700" />
              <span>contact@consulting.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-700" />
              <span>+49 152 1815 4435</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Globe size={16} className="text-pink-700" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="text-[#42002E] bg-pink-50 border border-pink-300 rounded px-2 py-1 text-sm focus:outline-none"
              >
                <option value="EN">EN</option>
                <option value="DE">DE</option>
                <option value="FR">FR</option>
              </select>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
