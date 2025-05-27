import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Globe } from "lucide-react";
import logo from "../assets/logo.png";

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
    { name: "Review", path: "/review" },
  ];

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 left-0 z-50 border-b border-pink-200">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            onError={(e) => (e.target.style.display = "none")}
            alt="AGX Logo"
            className="h-14 w-auto object-contain"
          />
          {/* <span className="text-pink-800 font-bold text-xl">AGX Consulting</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`relative font-semibold hover:text-pink-600 transition ${
                location.pathname === path ? "text-pink-700" : "text-[#42002E]"
              }`}
            >
              {name}
              {location.pathname === path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="hidden md:flex flex-col text-sm items-end space-y-1">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-pink-700" />
            <a href="mailto:contact@consulting.com" className="hover:underline">
              contact@consulting.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-pink-700" />
            <a href="tel:+4915218154435" className="hover:underline">
              +49 152 1815 4435
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-pink-700" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="border border-pink-300 bg-pink-50 rounded px-2 py-1 focus:outline-none"
            >
              <option value="EN">EN</option>
              <option value="DE">DE</option>
              <option value="FR">FR</option>
            </select>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none text-pink-700 text-3xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white px-6 ${
          isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`font-semibold ${
                location.pathname === path ? "text-pink-700" : "text-[#42002E] hover:text-pink-600"
              }`}
            >
              {name}
            </Link>
          ))}

          <div className="mt-4 border-t border-pink-200 pt-3 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-700" />
              <span>contact@consulting.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-700" />
              <span>+49 152 1815 4435</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-pink-700" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="border border-pink-300 bg-pink-50 rounded px-2 py-1"
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
