import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo-removebg-preview.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Keep language state in sync with i18n language
  const [language, setLanguage] = useState(i18n.language || "en");

  // Navigation items keys (for translation keys)
  const navItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.aboutUs", path: "/about" },
    { key: "nav.services", path: "/services" },
    { key: "nav.products", path: "/products" },
    { key: "nav.blog", path: "/blogs" },
    { key: "nav.contactUs", path: "/contact" },
    { key: "nav.review", path: "/review" },
  ];

  const handleLanguageChange = (e) => {
    const lang = e.target.value.toLowerCase();
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
   
  <header className="bg-orange-500 shadow-md fixed w-full -top-4 left-0 z-50 border-b border-orange-700">
  <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            onError={(e) => (e.target.style.display = "none")}
            alt="AGX Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map(({ key, path }) => (
            <Link
              key={path}
              to={path}
              className={`relative font-semibold hover:text-pink-600 transition ${
                location.pathname === path ? "text-pink-700" : "text-[#42002E]"
              }`}
            >
              {t(key)}
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
              value={language.toUpperCase()}
              onChange={handleLanguageChange}
              className="border border-pink-300 bg-pink-50 rounded px-2 py-1 focus:outline-none"
            >
              <option value="EN">EN</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
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
          {navItems.map(({ key, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`font-semibold ${
                location.pathname === path
                  ? "text-pink-700"
                  : "text-[#42002E] hover:text-pink-600"
              }`}
            >
              {t(key)}
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
                value={language.toUpperCase()}
                onChange={handleLanguageChange}
                className="border border-pink-300 bg-pink-50 rounded px-2 py-1"
              >
                <option value="EN">EN</option>
                <option value="FR">FR</option>
                <option value="DE"> DE</option>
              </select>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
