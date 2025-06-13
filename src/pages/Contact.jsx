import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

function ContactForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.message.trim() ||
      (!formData.email.trim() && !formData.phone.trim())
    ) {
      setSubmitMessage(t("contactForm.validationError") || "Please fill Name, Message and Email or Phone.");
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("https://agxbackend-1.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setSubmitMessage(data.message || t("contactForm.successMessage"));
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitMessage(t("contactForm.errorMessage") || "There was an error submitting the form.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto my-12 px-4" aria-label={t("contactForm.title") || "Contact Form"}>
      <header>
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4 drop-shadow-sm text-center">
          {t("contactForm.title") || "Contact Us"}
        </h1>
        <div className="w-20 h-1 bg-pink-500 mx-auto rounded mb-6 animate-pulse" aria-hidden="true"></div>
        <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
          {t("contactForm.description") ||
            "Connect with AGX-International — your trusted global trade partner. Whether you're looking to import quality products or expand your business across borders, our expert team is here to support you every step of the way. Let's grow together, globally."}
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Contact Info */}
        <address className="lg:w-1/3 bg-white p-8 rounded-lg shadow-md not-italic">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Address</h2>
                <p className="text-gray-600">North York, M2J 1M6</p>
                <p className="text-gray-600">Canada</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <FaPhone className="text-green-600 text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Call / WhatsApp</h2>
                <p className="text-gray-600">
                  <a href="tel:+16479049839" className="hover:underline">
                    +1 647 904 9839
                  </a>
                </p>
                <p className="text-gray-600">
                  <a href="https://wa.me/16479049839" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <FaEnvelope className="text-purple-600 text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Email Us</h2>
                <p className="text-gray-600">
                  <a href="mailto:info@agx-international.com" className="hover:underline">
                    info@agx-international.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <FaClock className="text-orange-600 text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Open Hours</h2>
                <p className="text-gray-600">Monday - Sunday</p>
                <p className="text-gray-600">9:00AM - 10:00PM</p>
              </div>
            </div>
          </div>
        </address>

        {/* Right Side - Form */}
        <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-lg font-medium ${
                isSuccess
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
              role="alert"
            >
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Your name"
                required
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Your email"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  placeholder="Your phone"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={formData.message}
                placeholder="Your message"
                rows="5"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg transition ${
                isSubmitting ? "bg-pink-300 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
