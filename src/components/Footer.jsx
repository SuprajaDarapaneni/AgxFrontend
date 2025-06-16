import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterest,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import logo from "../assets/logo-removebg-preview.png";

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = {
    facebook: " ",
    twitter: " ",
    pinterest: " ",
    instagram: " ",
    linkedin: " ",
  };

  return (
    <footer className="bg-pink-50 text-[#6b0657] font-sans mt-16" role="contentinfo">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AGX-International",
            url: "https://www.agx-international.com",
            logo: "https://www.agx-international.com/logo-agx-transparent.png",
            sameAs: Object.values(socialLinks),
          })}
        </script>
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo & Description */}
          <div className="col-span-2 flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3" aria-label={t("nav.home")}>
              <img
                src={logo}
                alt="AGX-International Logo"
                className="h-16 w-auto object-contain"
                width="128"
                height="64"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              {t("footer.companyDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label={t("footer.quickLinks")}>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.aboutUs"), path: "/about" },
                { name: t("nav.services"), path: "/services" },
                { name: t("nav.products"), path: "/products" },
                { name: t("nav.careers") || "Careers", path: "/careers" },
                { name: t("nav.contactUs"), path: "/contact" },
                { name: t("nav.blog"), path: "/blogs" },
              ].map(({ name, path }, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:text-pink-600 transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-label={t("footer.legal")}>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t("footer.termsOfService"), path: "/legal/terms" },
                { name: t("footer.privacyPolicy"), path: "/legal/privacy" },
              ].map(({ name, path }, index) => (
                <li key={index}>
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

          {/* Contact Info (No heading) */}
          <div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="mt-1" size={16} />
                <a
                  href="mailto:info@agx-international.com"
                  className="hover:text-pink-600 break-all"
                >
                  info@agx-international.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="mt-1" size={16} />
                <span>+1 647 904 9839</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="mt-1" size={16} />
                <span>Toronto, Ontario, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-10 flex justify-center md:justify-end space-x-5 text-xl">
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-pink-600 transition-colors duration-200"
          >
            <FaFacebookF />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-pink-600 transition-colors duration-200"
          >
            <FaXTwitter />
          </a>
          <a
            href={socialLinks.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
            className="hover:text-pink-600 transition-colors duration-200"
          >
            <FaPinterest />
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-600 transition-colors duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-pink-600 transition-colors duration-200"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-pink-200 mt-12 pt-6 text-center text-sm">
          <p className="text-[#6b0657]">
            &copy; {new Date().getFullYear()} AGX-International. {t("footer.rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
