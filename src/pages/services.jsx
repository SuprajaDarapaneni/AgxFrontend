import React from 'react';

const Services = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-pink-50 min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Main Heading */}
        <h2 className="text-5xl font-extrabold text-center text-pink-600 mb-6 tracking-tight drop-shadow-md">
          Our Premium Services
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-28 h-1 bg-pink-400 rounded-full animate-pulse"></div>
        </div>

        {/* Intro Paragraph */}
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed font-medium">
          At <span className="font-bold text-pink-600">AGX International</span>, we specialize in providing world-class <span className="font-semibold text-pink-600">import & export</span> solutions that open new horizons for your business globally.
        </p>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {[
            {
              title: 'Export Services',
              desc: 'Helping Indian businesses export high-quality products worldwide with seamless compliance and logistics.',
              icon: (
                <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              ),
            },
            {
              title: 'Import Services',
              desc: 'From sourcing to doorstep delivery, experience efficient and hassle-free international imports.',
              icon: (
                <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                </svg>
              ),
            },
            {
              title: 'Global Sourcing',
              desc: 'Access reliable international suppliers for quality products at competitive prices.',
              icon: (
                <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-3.866 0-7 3.134-7 7a7 7 0 0 0 14 0c0-3.866-3.134-7-7-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4" />
                </svg>
              ),
            },
            {
              title: 'Logistics Management',
              desc: 'Comprehensive end-to-end logistics ensuring safe and cost-effective transportation of goods.',
              icon: (
                <svg className="w-12 h-12 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M9 3v4M15 3v4M5 21h14a2 2 0 0 0 2-2v-7H3v7a2 2 0 0 0 2 2z" />
                </svg>
              ),
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 cursor-pointer border border-pink-200"
            >
              {service.icon}
              <h3 className="text-2xl font-semibold text-pink-600 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Industries Section */}
        <div className="bg-pink-100 rounded-3xl p-12 mt-20 border border-pink-300 max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-pink-600 mb-8 text-center">
            Industries We Serve
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-pink-800 font-semibold text-center">
            {[
              'Fashion & Textiles',
              'Imitation Jewellery',
              'Agricultural Products',
              'Automobiles & Auto Parts',
              'Spices & Food Ingredients',
              'Home Decor & Handicrafts',
              'Industrial Machinery',
            ].map((industry, idx) => (
              <li
                key={idx}
                className="bg-white rounded-xl shadow-md py-4 px-6 hover:bg-pink-50 transition cursor-default"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h4 className="text-3xl font-bold text-pink-700 mb-6">
            Ready to grow your global business?
          </h4>
          <p className="text-gray-700 mb-8 max-w-xl mx-auto text-lg">
            Partner with AGX International and experience seamless global trade solutions tailored for your success.
          </p>
          <a
            href="/contact"
            className="inline-block bg-pink-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-pink-700 transition duration-300 font-semibold text-lg"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
