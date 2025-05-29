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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation: name, message required, plus email OR phone required
    if (
      !formData.name.trim() ||
      !formData.message.trim() ||
      (!formData.email.trim() && !formData.phone.trim())
    ) {
      setSubmitMessage("Please fill Name, Message and Email or Phone.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch("https://agxbackend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setSubmitMessage(data.message || t("contactForm.successMessage"));
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitMessage(t("contactForm.errorMessage"));
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">

      <h1 className="text-5xl font-extrabold text-pink-700 mb-4 drop-shadow-sm text-center">
          {t("contactForm.title") }
        </h1>
        <div className="w-20 h-1 bg-pink-500 mx-auto rounded mb-6 animate-pulse"></div>
        

     <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
  Connect with AGX International — your trusted global trade partner. Whether you're looking to import quality products or expand your business across borders, our expert team is here to support you every step of the way. Let's grow together, globally.
</p>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Contact Info */}
        <div className="lg:w-1/3 bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-600">3rd Floor, yashsupraja building</p>
                <p className="text-gray-600">ongole, Andhra Pradesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <FaPhone className="text-green-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Call Us</h3>
                <p className="text-gray-600">+49 152 1815 4435</p>
               
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <FaEnvelope className="text-purple-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Email Us</h3>
                <p className="text-gray-600">contact@consulting.com
</p>
             
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <FaClock className="text-orange-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Open Hours</h3>
                <p className="text-gray-600">Monday - Friday</p>
                <p className="text-gray-600">9:00AM - 10:00PM</p>
              </div>
            </div>
          </div>
        </div>

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                {t("contactForm.fields.name") || "Name"}
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder={t("contactForm.placeholders.name") || "Your name"}
                required
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  {t("contactForm.fields.email") || "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder={t("contactForm.placeholders.email") || "Your email"}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  {t("contactForm.fields.phone") || "Phone"}
                </label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  placeholder={t("contactForm.placeholders.phone") || "Your phone"}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                {t("contactForm.fields.message") || "Message"}
              </label>
              <textarea
                name="message"
                onChange={handleChange}
                value={formData.message}
                placeholder={t("contactForm.placeholders.message") || "Your message"}
                rows="5"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-pink-600 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-700 transition"
            >
              {t("contactForm.buttons.submit") || "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
