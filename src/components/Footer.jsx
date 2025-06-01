import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Added FaLinkedinIn
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async"; // Changed from 'react-helmet' to 'react-helmet-async'
import logo from "../assets/logo-removebg-preview.png"; // Assuming you've renamed your logo file to something clearer and transparent.

const Footer = () => {
  const { t } = useTranslation();

  // Define your social media links here
  const socialLinks = {
    facebook: "https://www.facebook.com/agxinternational", // Replace with actual Facebook page
    twitter: "https://twitter.com/agx_international",     // Replace with actual Twitter page
    instagram: "https://www.instagram.com/agx_international", // Replace with actual Instagram page
    linkedin: "https://www.linkedin.com/company/agx-international" // Replace with actual LinkedIn page
  };

  return (
    <footer className="bg-pink-50 text-[#6b0657] font-sans mt-16" role="contentinfo">
      {/* SEO JSON-LD Structured Data for Organization */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AGX International",
            "url": "https://www.agx-international.com",
            // Ensure this URL is correct and points to your transparent logo in the public directory
            "logo": "https://www.agx-international.com/logo-agx-transparent.png",
            "sameAs": [
              socialLinks.facebook,
              socialLinks.twitter,
              socialLinks.instagram,
              socialLinks.linkedin // Added LinkedIn
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo & Description */}
          <div className="col-span-2 flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3" aria-label={t('nav.home')}>
              <img
                src={logo} // This will be the hashed/optimized path by your bundler (Vite/Webpack)
                alt="AGX International Logo"
                className="h-16 w-auto object-contain"
                width="128" // Explicit width for CLS
                height="64" // Explicit height for CLS
                loading="lazy"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footer.companyDescription')} {/* Translated description */}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label={t('footer.quickLinks')}>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t('nav.home'), path: "/" },
                { name: t('nav.aboutUs'), path: "/about" },
                { name: t('nav.services'), path: "/services" }, // Added Services to quick links
                { name: t('nav.products'), path: "/products" },
                { name: t('nav.contactUs'), path: "/contact" },
                { name: t('nav.blog'), path: "/blog" } // Added Blog
              ].map(({ name, path }, i) => (
                <li key={i}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-pink-600 transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label={t('footer.legal')}>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t('footer.termsOfService'), path: "/legal/terms" },
                { name: t('footer.privacyPolicy'), path: "/legal/privacy" },
              ].map(({ name, path }, i) => (
                <li key={i}>
                  <Link
                    to={path}
                    className="hover:text-pink-600 transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t('footer.followUs')}</h3>
            <div className="flex space-x-5 text-xl">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaFacebookF />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaTwitter />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaInstagram />
              </a>
              <a
                href={socialLinks.linkedin} // Added LinkedIn
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-pink-200 mt-12 pt-6 text-center text-sm">
          <p className="text-[#6b0657]">&copy; {new Date().getFullYear()} AGX International. {t('footer.rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;