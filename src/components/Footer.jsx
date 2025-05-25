import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const pinkColor = "#FF1493"; // Deep pink for accents
  const darkTextColor = "#6b0657"; // Dark pink for main text on light bg
  const lightPinkBg = "#ffe4f0"; // Light pink background

  return (
    <footer className="py-16" style={{ backgroundColor: lightPinkBg, color: darkTextColor }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <Link to="/" className="text-3xl font-bold block mb-4" style={{ color: pinkColor }}>
              {/* YourBrand */}
            </Link>
            <p className="leading-relaxed max-w-xs" style={{ color: darkTextColor }}>
              Delivering quality and style with passion. Explore our products and stay connected.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xl mb-4" style={{ color: pinkColor }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-base">
              {["Home", "About", "Products", "Contact"].map((text, i) => (
                <li key={i}>
                  <Link
                    to={`/${text.toLowerCase() === "home" ? "" : text.toLowerCase()}`}
                    className="transition-colors duration-300"
                    style={{ color: darkTextColor }}
                    onMouseEnter={e => (e.currentTarget.style.color = pinkColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = darkTextColor)}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-xl mb-4" style={{ color: pinkColor }}>
              Legal
            </h3>
            <ul className="space-y-2 text-base">
              {[
                { name: "Terms of Service", path: "/legal/terms" },
                { name: "Privacy Policy", path: "/legal/privacy" },
              ].map(({ name, path }, i) => (
                <li key={i}>
                  <Link
                    to={path}
                    className="transition-colors duration-300"
                    style={{ color: darkTextColor }}
                    onMouseEnter={e => (e.currentTarget.style.color = pinkColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = darkTextColor)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-xl mb-4" style={{ color: pinkColor }}>
              Follow Us
            </h3>
            <div className="flex space-x-6 text-2xl">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  style={{ color: darkTextColor }}
                  className="transition-colors duration-300"
                  onMouseEnter={e => (e.currentTarget.style.color = pinkColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = darkTextColor)}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 border-t pt-6 text-center text-sm"
          style={{ borderColor: "#d69acf", color: darkTextColor }}
        >
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
