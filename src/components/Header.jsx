import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Menu, X } from "lucide-react"; // Import Menu and X icons for hamburger/close
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../assets/logo-removebg-preview.png";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const mainNavItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.aboutUs", path: "/about" },
    { key: "nav.services", path: "/services" },
    { key: "nav.products", path: "/products" },
    { key: "nav.blog", path: "/blogs" },
    { key: "nav.contactUs", path: "/contact" },
    { key: "nav.review", path: "/review" },
  ];

  const siteUrl = "https://www.agx-international.com";

  useEffect(() => {
    const addGoogleTranslate = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr,de,nl,zh-CN,es,pt,vi,fa,ar,hi", // Ensure 'en' is included
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        };
      }
    };

    addGoogleTranslate();
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{`AGX-International | ${t(mainNavItems.find(i => i.path === currentPath)?.key || "nav.home")}`}</title>
        <meta name="description" content="AGX-International provides expert freight forwarding, trade services, and global logistics support." />
        <link rel="canonical" href={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
      </Helmet>

      <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        {/* Topbar - Visible on All Devices */}
        <div className="bg-white py-1 px-4 border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-3 text-sm">
            <div className="flex items-center gap-4 text-gray-700 flex-wrap">
              <div className="flex items-center gap-1">
                <Mail size={16} className="text-pink-600" />
                <a href="mailto:info@agx-international.com">info@agx-international.com</a>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-pink-600" />
                <a href="tel:+16479049839">+1 647 904 9839</a>
              </div>
            </div>
            {/* Google Translate element */}
            <div id="google_translate_element" className="text-gray-700" />
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AGX-International Logo"
              className="h-12 w-auto object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/fallback-logo.png"; // Fallback in case logo fails to load
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap gap-5 lg:gap-6 text-sm">
            {mainNavItems.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative font-medium whitespace-nowrap hover:text-pink-600 transition ${
                  currentPath === path ? "text-pink-700" : "text-[#42002E]"
                }`}
              >
                {t(key)}
                {currentPath === path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle Button - Moved to the right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none text-pink-700 text-3xl ml-auto" // ml-auto pushes it to the right
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />} {/* Change icon based on menu state */}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-white border-t">
            <nav className="flex flex-col gap-4 text-sm">
              {mainNavItems.map(({ key, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)} // Close menu on item click
                  className={`font-medium ${
                    currentPath === path ? "text-pink-700" : "text-[#42002E] hover:text-pink-600"
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
              {/* Contact info in mobile menu */}
              <div className="border-t border-pink-200 pt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-pink-700" />
                  <span>info@agx-international.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-pink-700" />
                  <span>+1 647 904 9839</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Google Translate Style Cleanup */}
      <style>{`
        .goog-logo-link,
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-gadget {
          font-size: 0 !important;
        }
        .goog-te-combo {
          font-size: 14px !important;
          border: 1px solid #e2e8f0;
          padding: 4px 6px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Header;