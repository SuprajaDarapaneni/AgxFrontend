// src/pages/legal/PrivacyPolicy.jsx

import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <main className="bg-white text-gray-800 font-sans pt-20 pb-32 px-6 lg:px-0">
      <Helmet>
        <title>Privacy Policy | AGX-International</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Effective Date: July 10, 2022</p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              AGX-International values your privacy. This policy explains how we collect, use, and protect your personal data when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">1. Information We Collect</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li><strong>Personal:</strong> name, email, phone, company name</li>
              <li><strong>Technical:</strong> IP address, browser type, cookies</li>
              <li><strong>Usage:</strong> browsing behavior and site interactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is used to provide services, respond to inquiries, improve website performance, and send occasional updates if you have opted in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">3. Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We never sell your data. It may only be shared with trusted service providers or legal authorities when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">4. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You may access, modify, or request deletion of your data. You also have the right to withdraw consent and lodge a complaint with a data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">5. Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We follow industry-standard practices to safeguard your information. However, no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">6. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to improve user experience. You can adjust your cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">7. Changes to this Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              AGX-International reserves the right to update this policy. All changes will be reflected here along with the updated date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related concerns, please reach out to us:
            </p>
            <ul className="mt-2 ml-6 list-none space-y-1">
              <li>📧 <a href="mailto:info@agx-international.com" className="text-pink-700 underline"> info@agx-international.com</a></li>
              <li>📞  +1 647 904 9839</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
