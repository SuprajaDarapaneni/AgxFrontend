import React from 'react';
import globalBusinessImage from '../assets/about.jpeg';

const About = () => {
  return (
    <section className="bg-white text-black min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Main Heading */}
        <h2 className="text-5xl font-extrabold text-center text-pink-400 mb-6 tracking-wide drop-shadow-sm">
          About AGX International
        </h2>
        <div className="flex justify-center mb-12">
          <div className="w-28 h-1 bg-pink-300 rounded-full"></div>
        </div>

        {/* Intro + Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-8 max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <p className="text-lg leading-relaxed font-semibold">
              Welcome to <span className="font-bold text-pink-400">AGX International</span>, your trusted partner in global trade, specializing in seamless import and export services across industries.
            </p>
            <p className="leading-relaxed text-black/90">
              Whether you are a business seeking new markets or a buyer looking for top-quality international products, we provide the expertise, infrastructure, and trust you need to succeed on the global stage.
            </p>
          </div>

          {/* Image */}
          <img
            src={globalBusinessImage}
            alt="Global Business Logistics"
            className="rounded-3xl shadow-xl object-cover w-full max-h-[420px]"
          />
        </div>

        {/* Our Story Section */}
        <div className="bg-pink-50 rounded-3xl p-10 max-w-5xl mx-auto mb-20 shadow-lg border border-pink-200">
          <h3 className="text-3xl font-semibold text-pink-400 mb-6 text-center">
            Our Story
          </h3>
          <p className="leading-relaxed text-black/90 text-lg max-w-3xl mx-auto">
            Founded on <span className="font-bold text-pink-500">July 10th, 2022</span>, <span className="font-bold text-pink-400">AGX International</span> was born from a vision to create a strong bridge between Indian industries and global markets.
            <br /><br />
            What started as a small idea has grown into a trusted name in the <span className="font-bold text-pink-500">import and export sector</span>, driven by the commitment to deliver the highest quality products across diverse industries — from agriculture and textiles to industrial machinery and consumer goods.
            <br /><br />
            Our foundation is built on <span className="font-bold text-pink-500">expertise, integrity, and innovation</span>. Every shipment we handle carries not just products but also trust, partnership, and long-term value.
            <br /><br />
            As we continue to expand our global footprint, we remain dedicated to building meaningful relationships and setting new benchmarks in international trade.
          </p>
        </div>

        {/* Meet the Founder Section - Enhanced Styling */}
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-10 max-w-5xl mx-auto mb-20 shadow-xl border border-pink-100">
          <h3 className="text-4xl font-extrabold text-pink-500 mb-8 text-center drop-shadow-sm">
            Meet the Founder
          </h3>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Founder Image with enhanced styling */}
            <div className="flex-shrink-0 w-56 h-56 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden shadow-lg border-4 border-pink-300 transform hover:scale-105 transition-transform duration-300">
              {/* Replace with actual image of Anudeep */}
              <img
                src="https://placehold.co/224x224/FCE7F3/EC4899?text=Anudeep" // Slightly larger placeholder with pink tones
                alt="Anudeep - Founder & CEO, AGX International"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Founder Details */}
            <div className="text-center md:text-left flex-grow">
              <h4 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Anudeep – Founder & CEO, AGX International</h4>
              <p className="leading-relaxed text-gray-700 mb-4 text-lg">
                Anudeep is a visionary entrepreneur driven by a singular mission — to connect global buyers with quality Indian products through transparent, efficient, and reliable trade partnerships. With deep insights into product sourcing, cross-border logistics, and multi-industry trends, Anudeep founded AGX International to empower international businesses—especially in Canada.
              </p>
              <p className="leading-relaxed text-gray-700 mb-4 text-lg">
                From agricultural commodities and textiles to industrial tools, home décor, and cosmetics, Anudeep has built a multi-category export platform that prioritizes quality, compliance, and client satisfaction. His commitment to ethical trade and scalable logistics has earned him a reputation for delivering not just products—but long-term value.
              </p>
              <blockquote className="italic text-gray-800 border-l-4 border-pink-500 pl-5 py-3 mt-8 bg-pink-50 rounded-r-lg shadow-inner">
                <p className="text-xl font-medium">“Global business isn’t just about imports—it’s about building bridges of trust, service, and shared growth.”</p>
                <footer className="mt-3 text-pink-600 font-bold text-lg">— Anudeep</footer>
              </blockquote>
              <p className="leading-relaxed text-gray-700 mt-6 text-lg">
                With a strong entrepreneurial spirit and hands-on industry knowledge, Anudeep continues to lead AGX International with integrity, innovation, and a future-ready mindset. His focus remains on expanding to new markets, building sustainable partnerships, and making global trade simpler for businesses of all sizes.
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {[
            {
              title: 'Our Mission',
              content: 'To simplify global trade by offering reliable, transparent, and efficient import-export services that empower businesses to thrive internationally.',
            },
            {
              title: 'Why Choose AGX International?',
              content: 'With our deep industry knowledge, robust logistics network, and customer-first approach, we ensure smooth and secure cross-border transactions — every time.',
            },
            {
              title: 'Our Values',
              content: 'Integrity, reliability, and partnership guide everything we do — ensuring every interaction builds lasting relationships and global opportunities.',
            },
          ].map(({ title, content }, i) => (
            <div
              key={i}
              className="bg-white border border-pink-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="text-2xl font-semibold text-pink-400 mb-4">{title}</h4>
              <p className="leading-relaxed text-black/90">{content}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center max-w-3xl mx-auto px-6">
          <h4 className="text-3xl font-bold text-pink-400 mb-6">
            Ready to trade globally with AGX International?
          </h4>
          <p className="text-black/90 mb-8 text-lg">
            Contact us today and let’s unlock new opportunities together.
          </p>
          <a
            href="/contact"
            className="inline-block bg-pink-400 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-pink-500 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
