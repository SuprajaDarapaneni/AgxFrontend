import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../assets/logo-removebg-preview.png";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTranslateTooltip, setShowTranslateTooltip] = useState(false);
  const [isTranslateReady, setIsTranslateReady] = useState(false);

  // Navigation links
  const mainNavItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.aboutUs", path: "/about" },
    { key: "nav.services", path: "/services" },
    { key: "nav.products", path: "/products" },
    { key: "nav.careers", path: "/careers" },
    { key: "nav.blog", path: "/blogs" },
    { key: "nav.contactUs", path: "/contact" },
    { key: "nav.review", path: "/review" },
  ];

  const siteUrl = "https://www.agx-international.com";

  // Load Google Translate script once on mount
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        setTimeout(() => {
          if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages:
                  "en,fr,de,nl,zh-CN,es,pt,vi,fa,ar,hi",
                layout:
                  window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              "google_translate_element"
            );
            setIsTranslateReady(true);
          }
        }, 100);
      };
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Show Google Translate dropdown when translate button clicked
  const handleTranslateClick = () => {
    if (!isTranslateReady) {
      setShowTranslateTooltip(true);
      setTimeout(() => setShowTranslateTooltip(false), 3000);
      return;
    }

    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return;

    combo.style.visibility = "visible";
    combo.style.opacity = "1";
    combo.focus();
  };

  // Tooltip styles
  const tooltipStyle = {
    position: "absolute",
    top: "110%",
    right: 0,
    background: "rgba(0,0,0,0.75)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    whiteSpace: "nowrap",
    zIndex: 9999,
  };

  return (
    <>
      {/* SEO and social meta tags */}
      <Helmet>
        <title>{`AGX-International | ${
          t(mainNavItems.find((i) => i.path === currentPath)?.key || "nav.home")
        }`}</title>
        <meta
          name="description"
          content="AGX-International provides expert freight forwarding, trade services, and global logistics support."
        />
        <link rel="canonical" href={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
      </Helmet>

      <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        {/* Topbar */}
        <div className="bg-white py-1 px-4 border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between text-sm flex-nowrap overflow-x-auto">
            {/* Contact Info */}
            <div className="flex items-center gap-4 text-gray-700 flex-shrink-0">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Mail size={16} className="text-pink-600" />
                <a href="mailto:info@agx-international.com" className="hover:underline">
                  info@agx-international.com
                </a>
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Phone size={16} className="text-pink-600" />
                <a href="tel:+16479049839" className="hover:underline">
                  +1 647 904 9839
                </a>
              </div>
            </div>

            {/* Translate widget */}
            <div
              id="google_translate_element"
              className={`text-gray-700 flex-shrink-0 ml-auto cursor-pointer flex items-center gap-1 select-none relative ${
                !isTranslateReady ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleTranslateClick}
              onMouseEnter={() => setShowTranslateTooltip(true)}
              onMouseLeave={() => setShowTranslateTooltip(false)}
              aria-label="Select Language"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isTranslateReady) {
                  e.preventDefault();
                  handleTranslateClick();
                }
                if ((e.key === "Enter" || e.key === " ") && !isTranslateReady) {
                  e.preventDefault();
                  setShowTranslateTooltip(true);
                  setTimeout(() => setShowTranslateTooltip(false), 3000);
                }
              }}
            >
              {/* Added Globe icon here */}
              <Globe size={16} className="text-pink-600" />
              <span>Translate</span>

              {/* Tooltips */}
              {showTranslateTooltip && !isTranslateReady && (
                <div style={tooltipStyle}>Translator is still loading. Please wait a moment.</div>
              )}
              {showTranslateTooltip && isTranslateReady && (
                <div style={tooltipStyle}>Click to select language</div>
              )}

              {/* Hidden native Google Translate select */}
              <select
                className="goog-te-combo"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                  zIndex: 9999,
                  visibility: "hidden",
                  borderRadius: "4px",
                  border: "none",
                }}
                onChange={(e) => {
                  e.target.style.visibility = "hidden";
                }}
                aria-label="Language select"
              ></select>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-nowrap">
          {/* Logo and mobile menu toggle */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
              <img
                src={logo}
                alt="AGX-International Logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-logo.png";
                }}
              />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden ml-auto text-pink-700 text-3xl focus:outline-none"
              aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap justify-center md:justify-end gap-4 lg:gap-6 text-sm w-full md:w-auto">
            {mainNavItems.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative font-medium whitespace-nowrap hover:text-pink-600 transition ${
                  currentPath === path ? "text-pink-700" : "text-[#42002E]"
                }`}
                aria-current={currentPath === path ? "page" : undefined}
              >
                {t(key)}
                {currentPath === path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden px-6 py-4 bg-white border-t shadow-md"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-4 text-sm">
              {mainNavItems.map(({ key, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium ${
                    currentPath === path
                      ? "text-pink-700"
                      : "text-[#42002E] hover:text-pink-600"
                  }`}
                  aria-current={currentPath === path ? "page" : undefined}
                >
                  {t(key)}
                </Link>
              ))}

              {/* Contact info inside mobile menu */}
              <div className="border-t border-pink-200 pt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Mail size={16} className="text-pink-700" />
                  <span>info@agx-international.com</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Phone size={16} className="text-pink-700" />
                  <span>+1 647 904 9839</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Google Translate cleanup styles */}
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
          border: none !important;
          padding: 0 !important;
          background: transparent !important;
          visibility: hidden !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          opacity: 0 !important;
          cursor: pointer !important;
          z-index: 9999 !important;
          border-radius: 4px !important;
        }
      `}</style>
    </>
  );
};

export default Header;
