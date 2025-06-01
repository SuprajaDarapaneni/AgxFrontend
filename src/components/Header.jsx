import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Globe, Menu, X } from "lucide-react"; // Import X for close icon
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async"; // Changed from 'react-helmet' to 'react-helmet-async'

// Assuming your optimized, transparent logo is now here
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

  // Map internal language codes to display values in select dropdown
  const languageOptions = {
    en: t('common.english'),
    fr: t('common.french'),
    de: t('common.german'),
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value; // No need for .toLowerCase() if values are already lowercase
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
    // Update language state if i18n.language changes externally
    setLanguage(i18n.language);
  }, [location.pathname, i18n.language]);

  // Determine the current page title for SEO
  const currentPageTitle = t(
    navItems.find((item) => item.path === currentPath)?.key || "nav.home"
  );
  const fullPageTitle = `${currentPageTitle} | AGX International`; // More dynamic title

  const metaDescription = t('homepage.seoDescription'); // Using translation for description

  return (
    <>
      {/* ✅ SEO META + OPEN GRAPH */}
      <Helmet>
        <title>{fullPageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${currentPath}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={fullPageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${siteUrl}${currentPath}`} />
        {/* Use the actual public path for the logo (must be in /public folder) */}
        <meta property="og:image" content={`${siteUrl}/logo-agx-transparent.png`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullPageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${siteUrl}/logo-agx-transparent.png`} />

        {/* Schema.org for WebSite */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AGX International",
            "url": siteUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      <header className="bg-white shadow-lg fixed w-full top-0 left-0 z-50"> {/* Stronger shadow */}
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" aria-label={t('nav.home')} className="flex items-center space-x-3">
            <img
              src={logo} // This is the imported module, handled by bundler
              alt="AGX International Logo"
              className="h-14 w-auto object-contain"
              width="128" // Explicit width
              height="56" // h-14 * 4px/unit = 56px. Ensure this matches your logo's aspect ratio
              onError={(e) => {
                e.currentTarget.src = "/fallback-logo.png"; // Optional fallback
                e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
              }}
              // Removed loading="lazy" for the main logo, as it's typically above the fold and should load quickly
              // Add fetchpriority for critical assets if supported
              // fetchpriority="high" // Add if you want to prioritize logo loading
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Primary navigation"> {/* Increased space */}
            {navItems.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative font-semibold text-lg hover:text-pink-600 transition-colors duration-300 ${ // Stronger hover, larger font
                  currentPath === path ? "text-pink-700" : "text-[#42002E]"
                }`}
                aria-current={currentPath === path ? "page" : undefined} // ARIA for current page
              >
                {t(key)}
                {currentPath === path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded-full animate-fade-in-down"></span> 
                )}
              </Link>
            ))}
          </nav>

          {/* Contact & Language */}
          <div className="hidden md:flex flex-col text-sm items-end space-y-1">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-pink-700" />
              <a
                href="mailto:contact@agx-international.com"
                className="text-[#6b0657] hover:underline hover:text-pink-600 transition-colors"
              >
                contact@agx-international.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-700" />
              <a
                href="tel:+4915218154435"
                className="text-[#6b0657] hover:underline hover:text-pink-600 transition-colors"
              >
                +49 152 1815 4435
              </a>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Globe size={18} className="text-pink-700" /> {/* Slightly larger icon */}
              <label htmlFor="language-select" className="sr-only">
                {t('common.selectLanguage')}
              </label>
              <select
                id="language-select"
                value={language} // Use the actual language code (e.g., 'en', 'fr', 'de')
                onChange={handleLanguageChange}
                className="appearance-none bg-white border border-pink-300 text-[#6b0657] rounded-md px-3 py-1 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevron-down'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.2em' }}
              >
                {Object.entries(languageOptions).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none text-pink-700 p-2 rounded-md hover:bg-pink-100 transition-colors"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />} {/* Use Lucide icons */}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white px-6 shadow-inner ${ // Add shadow for mobile menu
            isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >

          <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
            {navItems.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold text-lg py-1 ${ // Added py-1 for spacing
                  currentPath === path ? "text-pink-700" : "text-[#42002E] hover:text-pink-600"
                }`}
                aria-current={currentPath === path ? "page" : undefined}
              >
                {t(key)}
              </Link>
            ))}
            <div className="mt-4 border-t border-pink-200 pt-3 space-y-3 text-base"> {/* Larger text, more space */}
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-pink-700" />
                <a
                  href="mailto:contact@agx-international.com"
                  className="text-[#6b0657] hover:underline"
                >
                  contact@agx-international.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-pink-700" />
                <a
                  href="tel:+4915218154435"
                  className="text-[#6b0657] hover:underline"
                >
                  +49 152 1815 4435
                </a>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Globe size={20} className="text-pink-700" />
                <label htmlFor="mobile-language-select" className="sr-only">
                  {t('common.selectLanguage')}
                </label>
                <select
                  id="mobile-language-select"
                  value={language}
                  onChange={handleLanguageChange}
                  className="appearance-none bg-white border border-pink-300 text-[#6b0657] rounded-md px-3 py-1 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevron-down'><path d='m6 9 6 6 6-6'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.2em' }}
                >
                  {Object.entries(languageOptions).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
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