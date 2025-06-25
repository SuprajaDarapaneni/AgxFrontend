import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
// import badge from '../assets/badge.png';
// import customer from '../assets/customer-service.png';

const Services = () => {
  const { t } = useTranslation();
  const company = 'AGX-International';

  const serviceIcons = [
    (
      <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    (
      <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" />
      </svg>
    ),
    (
      <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-3.866 0-7 3.134-7 7a7 7 0 0 0 14 0c0-3.866-3.134-7-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4" />
      </svg>
    ),
    (
      <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M9 3v4M15 3v4M5 21h14a2 2 0 0 0 2-2v-7H3v7a2 2 0 0 0 2 2z" />
      </svg>
    )
  ];

  // Fetch industries from translation only (no 'Cosmetics' manually added)
  const industries = t('industries', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>Our Services | Freight Forwarding & Trade Consulting - AGX</title>
        <meta name="description" content="Explore AGX's logistics services including customs clearance, freight forwarding, and supply chain consulting." />
        <meta name="keywords" content="services, industries, AGX-International" />
        <meta name="author" content={company} />
        <meta property="og:title" content={`${t('title')} - ${company}`} />
        <meta property="og:description" content={t('intro', { company })} />
      </Helmet>

      <section className="bg-gradient-to-br from-pink-50 via-white to-pink-50 min-h-screen py-20">
        <div className="container mx-auto px-6 max-w-7xl">

          <h2 className="text-5xl font-extrabold text-center text-pink-800 mb-6">
            {t('title')}
          </h2>
          <div className="flex justify-center mb-12">
            <div className="w-28 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          </div>

          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed font-medium">
            {t('intro', { company })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {t('services', { returnObjects: true }).map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 cursor-pointer border border-pink-200"
              >
                {serviceIcons[i]}
                <h3 className="text-2xl font-semibold text-pink-600 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-pink-100 rounded-3xl p-12 mt-20 border border-pink-300 max-w-6xl mx-auto">
            <h3 className="text-3xl font-semibold text-pink-600 mb-10 text-center">
              {t('industriesTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {industries.map((industry, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center border border-pink-200"
                >
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-pink-700">{industry}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <h4 className="text-3xl font-bold text-pink-700 mb-6">{t('ctaTitle')}</h4>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto text-lg">{t('ctaDesc')}</p>
            <a
              href="/contact"
              className="inline-block bg-pink-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-pink-700 transition duration-300 font-semibold text-lg"
            >
              {t('ctaBtn')}
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default Services;
