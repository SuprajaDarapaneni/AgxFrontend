// src/pages/legal/TermsOfService.jsx

import React from "react";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <main className="bg-white text-gray-800 font-sans pt-20 pb-32 px-6 lg:px-0">
      <Helmet>
        <title>Terms of Service | AGX International</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-pink-700 mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last Updated: June 5, 2025</p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to AGX International. These Terms of Service ("Terms") govern your use of our
              website and services including import-export, logistics, business brokering, and sourcing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">1. Services Offered</h2>
            <p className="text-gray-700 leading-relaxed">
              AGX International provides international trade solutions such as logistics, product
              sourcing, and B2B support. Use of these services is subject to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">2. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to provide accurate information, comply with all trade laws, and not misuse our
              services or violate any applicable laws during transactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content, including logos, branding, images, and text on this website, is the property of AGX International. Any unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">4. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party sites. We are not responsible for the content or privacy practices of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              AGX International is not liable for any indirect, incidental, or consequential damages resulting from the use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">6. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update these Terms at any time. Changes will be posted on this page with the updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-700 mb-3">7. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms, please contact us:
            </p>
            <ul className="mt-2 ml-6 list-none space-y-1">
              <li>📧 <a href="mailto:contact@agx-international.com" className="text-pink-700 underline">contact@agx-international.com</a></li>
              <li>📞 +49 152 1815 4435</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
