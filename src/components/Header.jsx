import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Globe2 } from "lucide-react"; // Using Globe icon for language
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
    { key: "nav.careers", path: "/careers" },
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
          setTimeout(() => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,fr,de,nl,zh-CN,es,pt,vi,fa,ar,hi",
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              "google_translate_element"
            );
          }, 100);
        };
      }
    };

    addGoogleTranslate();
  }, []);

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
        {/* Topbar (Only Translate & Icon) */}
      <div className="bg-white py-1 px-4 border-b border-gray-200">
  <div className="max-w-screen-xl mx-auto flex items-center justify-end text-sm relative">
    {/* Language Dropdown Trigger */}
    <div className="relative group cursor-pointer">
      <div className="flex items-center gap-1 text-gray-700">
             {/* <button
          
          className="bg-pink-600 text-white px-4 py-1.5 rounded hover:bg-pink-700 transition text-sm"
        >
          Translate <Globe2 size={28} className="text-black-600" />
        </button> */}
<Globe2 size={18} className="text-pink-600" />

      </div>

      {/* Hidden Translate Menu — shows on hover or click */}
      <div
        className="absolute right-0 mt-2 z-50 bg-white border rounded shadow-md p-2 transition-all duration-200 scale-0 group-hover:scale-100"
        style={{ transformOrigin: "top right" }}
      >
        <div id="google_translate_element" />
      </div>
    </div>
  </div>
</div>


        {/* Main Header */}
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-3">
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto text-pink-700 text-3xl focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-wrap justify-end gap-4 lg:gap-6 text-sm w-full md:w-auto">
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-white border-t">
            <nav className="flex flex-col gap-4 text-sm">
              {mainNavItems.map(({ key, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium ${
                    currentPath === path ? "text-pink-700" : "text-[#42002E] hover:text-pink-600"
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
              {/* Translate shown below nav links for mobile */}
              <div className="border-t border-pink-200 pt-3 text-sm flex items-center gap-2 text-gray-700">
                <Globe2 size={18} className="text-pink-600" />
                <div id="google_translate_element_mobile" />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Translate Styling Cleanup */}
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
      `}
      {`
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
