import React from 'react';

const Services = () => {
  return (
    <section className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-7xl">

        {/* Main Heading */}
        <h2 className="text-4xl font-extrabold text-center text-pink-500 mb-4 tracking-wide">
          Our Services
        </h2>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-pink-300 rounded-full"></div>
        </div>

        {/* Intro Paragraph */}
        <p className="text-gray-800 text-lg leading-8 text-center max-w-4xl mx-auto mb-12">
          At <span className="font-semibold text-pink-500">AGX International</span>, we offer a comprehensive suite of <span className="font-semibold text-pink-500">import and export services</span> designed to simplify global trade and unlock business opportunities across borders.
          <br /><br />
          Our team specializes in multiple sectors, ensuring smooth operations from sourcing to final delivery.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-pink-50 p-6 rounded-3xl shadow-md hover:shadow-lg transition duration-300 text-center border border-pink-200">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Export Services</h3>
            <p className="text-gray-700">
              We assist Indian businesses in exporting premium-quality products globally with complete compliance, documentation, and logistics support.
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-3xl shadow-md hover:shadow-lg transition duration-300 text-center border border-pink-200">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Import Services</h3>
            <p className="text-gray-700">
              From sourcing to doorstep delivery, our import services are designed to handle international purchases with ease and efficiency.
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-3xl shadow-md hover:shadow-lg transition duration-300 text-center border border-pink-200">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Global Sourcing</h3>
            <p className="text-gray-700">
              Gain access to trusted international suppliers with our global sourcing services that ensure quality and competitive pricing.
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-3xl shadow-md hover:shadow-lg transition duration-300 text-center border border-pink-200">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Logistics Management</h3>
            <p className="text-gray-700">
              We provide end-to-end logistics solutions to ensure your goods move safely and cost-effectively across borders.
            </p>
          </div>
        </div>

        {/* Industries We Serve */}
        <div className="bg-pink-100 rounded-3xl p-10 mb-16 border border-pink-200 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-pink-600 mb-6 text-center">
            Industries We Serve
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-pink-800 font-medium text-center">
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Fashion & Textiles</li>
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Imitation Jewellery</li>
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Agricultural Products</li>
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Automobiles & Auto Parts</li>
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Spices & Food Ingredients</li>
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Home Decor & Handicrafts</li>
            <li className="bg-white rounded-xl shadow py-3 px-6 hover:bg-pink-50 transition">Industrial Machinery</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <h4 className="text-2xl font-semibold text-pink-600 mb-4">
            Looking for a reliable global trade partner?
          </h4>
          <p className="text-gray-800 mb-6">
            Collaborate with AGX International and expand your business horizons.
          </p>
          <a
            href="/contact"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full shadow hover:bg-pink-600 transition duration-300 font-semibold"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
