import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../assets/logo-removebg-preview.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-pink-50 text-[#6b0657] font-sans mt-16" role="contentinfo">
      {/* JSON-LD Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AGX Consulting",
            url: "https://yourdomain.com",
            logo: "https://yourdomain.com/assets/logo-removebg-preview.png",
            sameAs: [
              "https://www.facebook.com/yourpage",
              "https://twitter.com/yourpage",
              "https://www.instagram.com/yourpage"
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* Logo & Brand Info */}
          <div className="col-span-2 flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="AGX Consulting Logo"
                className="h-16 w-auto object-contain"
                width="128"
                height="64"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-[#6b0657] leading-relaxed">
              AGX Consulting is a leading digital and business consulting firm, specializing in automation, strategy, and innovative product solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t('nav.home'), path: "/" },
                { name: t('nav.aboutUs'), path: "/about" },
                { name: t('nav.products'), path: "/products" },
                { name: t('nav.contactUs'), path: "/contact" },
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
          </div>

          {/* Legal Links */}
          <div>
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
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t('footer.followUs')}</h3>
            <div className="flex space-x-5 text-xl">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-200 mt-12 pt-6 text-center text-sm text-[#6b0657]">
          &copy; {new Date().getFullYear()} AGX Consulting. {t('footer.rightsReserved')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
