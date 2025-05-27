import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-[#6b0657] font-sans mt-16">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Logo & Brand Info */}
          <div className="col-span-2 flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="AGX Logo" className="h-16 w-auto object-contain" />
              {/* <span className="text-2xl font-bold text-pink-600">AGX Consulting</span> */}
            </Link>
            <p className="text-sm text-[#6b0657] leading-relaxed">
              We deliver excellence through innovation and strategy. Discover our range of solutions and stay inspired.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Products", "Contact"].map((text, i) => (
                <li key={i}>
                  <Link
                    to={`/${text.toLowerCase() === "home" ? "" : text.toLowerCase()}`}
                    className="hover:text-pink-600 transition-colors duration-200"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-pink-700 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Terms of Service", path: "/legal/terms" },
                { name: "Privacy Policy", path: "/legal/privacy" },
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
            <h3 className="text-lg font-semibold text-pink-700 mb-4">Follow Us</h3>
            <div className="flex space-x-5 text-xl">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="text-[#6b0657] hover:text-pink-600 transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pink-200 mt-12 pt-6 text-center text-sm text-[#6b0657]">
          &copy; {new Date().getFullYear()} AGX Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
