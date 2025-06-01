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

  const navItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.aboutUs", path: "/about" },
    { key: "nav.services", path: "/services" },
    { key: "nav.products", path: "/products" },
    { key: "nav.blog", path: "/blogs" },
    { key: "nav.contactUs", path: "/contact" },
    { key: "nav.review", path: "/review" },
  ];

  const siteUrl = "https://www.agx-international.com"; // ✅ Set your live domain here
  const currentLang = language.toUpperCase();

  const handleLanguageChange = (e) => {
    const lang = e.target.value.toLowerCase();
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  return (
    <>
      {/* ✅ SEO META + OPEN GRAPH */}
      <Helmet>
        <title>{`AGX International | ${t(navItems.find(i => i.path === currentPath)?.key || "nav.home")}`}</title>
        <meta name="description" content="AGX International provides expert freight forwarding, trade services, and global logistics support." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${currentPath}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="AGX International" />
        <meta property="og:description" content="Grow globally with AGX's world-class trade and logistics services." />
        <meta property="og:url" content={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AGX International" />
        <meta name="twitter:description" content="Expert logistics and trade services around the world." />
        <meta name="twitter:image" content={`${siteUrl}/logo.png`} />

        {/* Schema.org for Website */}
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

      <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50 border-b border-gray-300">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label="AGX International Home" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="AGX International Logo"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = "/fallback-logo.png"; // Optional fallback
              }}
              loading="lazy"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6" aria-label="Primary navigation">
            {navItems.map(({ key, path }) => (
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

          {/* Contact & Language */}
          <div className="hidden md:flex flex-col text-sm items-end space-y-1">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-700" />
              <a href="mailto:contact@agx-international.com" className="hover:underline">
                contact@agx-international.com
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
                value={currentLang}
                onChange={handleLanguageChange}
                className="border border-pink-300 bg-pink-50 rounded px-2 py-1 focus:outline-none"
              >
                <option value="EN">EN</option>
                <option value="FR">FR</option>
                <option value="DE">DE</option>
              </select>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none text-pink-700 text-3xl"
            aria-label="Toggle mobile menu"
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
          <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
            {navItems.map(({ key, path }) => (
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
                  value={currentLang}
                  onChange={handleLanguageChange}
                  className="border border-pink-300 bg-pink-50 rounded px-2 py-1"
                >
                  <option value="EN">EN</option>
                  <option value="FR">FR</option>
                  <option value="DE">DE</option>
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
