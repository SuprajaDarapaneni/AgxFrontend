import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../assets/logo-removebg-preview.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language || "en");
  const location = useLocation();
  const currentPath = location.pathname;

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

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  const siteUrl = "https://www.agx-international.com";

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{`AGX International | ${t(mainNavItems.find(i => i.path === currentPath)?.key || "nav.home")}`}</title>
        <meta name="description" content="AGX International provides expert freight forwarding, trade services, and global logistics support." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${currentPath}`} />
        <meta property="og:title" content="AGX International" />
        <meta property="og:description" content="Grow globally with AGX's world-class trade and logistics services." />
        <meta property="og:url" content={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AGX International" />
        <meta name="twitter:description" content="Expert logistics and trade services around the world." />
        <meta name="twitter:image" content={`${siteUrl}/logo.png`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AGX International",
            "url": siteUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        {/* Top Bar for Contact & Language */}
        <div className="bg-gray-100 py-2 px-6 border-b border-gray-200 hidden md:block">
          <div className="max-w-screen-xl mx-auto flex justify-end items-center space-x-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-700" />
              <a href="mailto:contact@agx-international.com" className="hover:underline text-gray-700">
                contact@agx-international.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-700" />
              <a href="tel:+4915218154435" className="hover:underline text-gray-700">
                +49 152 1815 4435
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-pink-700" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="border border-pink-300 bg-pink-50 rounded px-2 py-1 focus:outline-none text-gray-700"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Header with Logo and Navigation */}
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label="AGX International Home" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AGX International Logo"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "/fallback-logo.png";
              }}
              loading="lazy"
            />
          </Link>

          {/* Desktop Main Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8" aria-label="Primary navigation">
            {mainNavItems.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative font-semibold hover:text-pink-600 transition ${
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

          {/* Hamburger Menu (for mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none text-pink-700 text-3xl"
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu (collapsible) */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white px-6 ${
            isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
            {mainNavItems.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold ${
                  currentPath === path ? "text-pink-700" : "text-[#42002E] hover:text-pink-600"
                }`}
              >
                {t(key)}
              </Link>
            ))}
            {/* Contact and Language in Mobile Menu */}
            <div className="mt-4 border-t border-pink-200 pt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-pink-700" />
                <span>contact@agx-international.com</span>
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
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;