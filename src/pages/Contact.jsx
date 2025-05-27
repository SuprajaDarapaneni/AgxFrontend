import { useState } from "react";

function ContactForm() {
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

    try {
      const response = await fetch("https://agxbackend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setSubmitMessage(data.message || "Form submitted successfully!");
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-3xl shadow-lg border border-pink-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600 drop-shadow-sm">
        Contact Us
      </h2>

      {submitMessage && (
        <div
          className={`mb-6 text-center px-5 py-3 rounded-xl font-medium text-sm ${
            isSuccess
              ? "bg-green-100 text-green-800 ring-1 ring-green-300"
              : "bg-red-100 text-red-800 ring-1 ring-red-300"
          }`}
          role="alert"
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Your Name"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="you@example.com"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="+1 (555) 123-4567"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            value={formData.message}
            placeholder="Write your message here..."
            rows="5"
            required
            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition outline-none shadow-sm resize-none"
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-4 bg-pink-600 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
