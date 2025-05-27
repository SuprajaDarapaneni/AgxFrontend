import React, { useEffect, useState } from 'react';
import globalBusinessImage from '../assets/about.jpeg';

const About = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Inline style for fade-in-up animation and delays
  const styles = `
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .fade-in-up {
      animation: fadeInUp 0.8s ease forwards;
      opacity: 0;
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
  `;

  // Helper to conditionally add animation classes
  const animClass = (delay) => (animate ? `fade-in-up ${delay}` : '');

  return (
    <>
      {/* Inject styles directly */}
      <style>{styles}</style>

      <section className="bg-gradient-to-b from-pink-50 to-white text-black min-h-screen flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">

          {/* Main Heading */}
          <h2
            className={`text-4xl sm:text-5xl font-extrabold text-center text-pink-500 mb-6 tracking-wide drop-shadow-md ${animClass('delay-100')}`}
          >
            About AGX International
          </h2>
          <div className={`flex justify-center mb-12 ${animClass('delay-200')}`}>
            <div className="w-32 h-1 bg-pink-300 rounded-full animate-pulse"></div>
          </div>

          {/* Intro + Image Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 ${animClass('delay-300')}`}>
            {/* Text Content */}
            <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left space-y-6">
              <p className="text-lg leading-relaxed font-semibold text-gray-800">
                Welcome to <span className="font-bold text-pink-500">AGX International</span>, your trusted
                partner in global trade, specializing in seamless import and export services across industries.
              </p>
              <p className="leading-relaxed text-gray-700 text-lg">
                Whether you are a business seeking new markets or a buyer looking for top-quality international
                products, we provide the expertise, infrastructure, and trust you need to succeed on the
                global stage.
              </p>
            </div>

            {/* Image */}
            <div className="mx-auto md:mx-0 max-w-md rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <img
                src={globalBusinessImage}
                alt="Global Business Logistics"
                className="object-cover w-full h-80 sm:h-[420px]"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Our Story Section */}
          <div
            className={`bg-pink-100 rounded-3xl p-12 max-w-5xl mx-auto mb-24 shadow-xl border border-pink-300 ${animClass('delay-400')}`}
          >
            <h3 className="text-3xl font-semibold text-pink-500 mb-8 text-center tracking-wide drop-shadow-sm">
              Our Story
            </h3>
            <p className="leading-relaxed text-gray-800 text-lg max-w-3xl mx-auto space-y-5">
              Founded on <span className="font-bold text-pink-600">July 10th, 2022</span>,{' '}
              <span className="font-bold text-pink-500">AGX International</span> was born from a vision to create
              a strong bridge between Indian industries and global markets.
              <br />
              What started as a small idea has grown into a trusted name in the{' '}
              <span className="font-bold text-pink-600">import and export sector</span>, driven by the
              commitment to deliver the highest quality products across diverse industries — from agriculture
              and textiles to industrial machinery and consumer goods.
              <br />
              Our foundation is built on{' '}
              <span className="font-bold text-pink-600">expertise, integrity, and innovation</span>. Every
              shipment we handle carries not just products but also trust, partnership, and long-term value.
              <br />
              As we continue to expand our global footprint, we remain dedicated to building meaningful
              relationships and setting new benchmarks in international trade.
            </p>
          </div>

          {/* Meet the Founder Section */}
          <div
            className={`bg-gradient-to-br from-pink-50 to-white rounded-3xl p-12 max-w-5xl mx-auto mb-24 shadow-xl border border-pink-200 ${animClass('delay-500')}`}
          >
            <h3 className="text-4xl font-extrabold text-pink-600 mb-10 text-center drop-shadow-md tracking-wide">
              Meet the Founder
            </h3>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              {/* Founder Image */}
              <div className="flex-shrink-0 w-56 h-56 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden shadow-lg border-4 border-pink-300 cursor-pointer transform hover:scale-110 transition-transform duration-500">
                <img
                  src="https://placehold.co/224x224/FCE7F3/EC4899?text=Anudeep"
                  alt="Anudeep - Founder & CEO, AGX International"
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              {/* Founder Details */}
              <div className="text-center md:text-left flex-grow max-w-xl">
                <h4 className="text-3xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                  Anudeep – Founder & CEO, AGX International
                </h4>
                <p className="leading-relaxed text-gray-700 mb-6 text-lg">
                  Anudeep is a visionary entrepreneur driven by a singular mission — to connect global buyers with
                  quality Indian products through transparent, efficient, and reliable trade partnerships. With
                  deep insights into product sourcing, cross-border logistics, and multi-industry trends, Anudeep
                  founded AGX International to empower international businesses—especially in Canada.
                </p>
                <p className="leading-relaxed text-gray-700 mb-6 text-lg">
                  From agricultural commodities and textiles to industrial tools, home décor, and cosmetics,
                  Anudeep has built a multi-category export platform that prioritizes quality, compliance, and
                  client satisfaction. His commitment to ethical trade and scalable logistics has earned him a
                  reputation for delivering not just products—but long-term value.
                </p>
                <blockquote className="italic text-gray-800 border-l-4 border-pink-500 pl-6 py-4 mt-8 bg-pink-50 rounded-r-lg shadow-inner drop-shadow-sm">
                  <p className="text-xl font-semibold">
                    “Global business isn’t just about imports—it’s about building bridges of trust, service, and
                    shared growth.”
                  </p>
                  <footer className="mt-3 text-pink-600 font-bold text-lg">— Anudeep</footer>
                </blockquote>
                <p className="leading-relaxed text-gray-700 mt-8 text-lg">
                  With a strong entrepreneurial spirit and hands-on industry knowledge, Anudeep continues to lead AGX
                  International with integrity, innovation, and a future-ready mindset. His focus remains on
                  expanding to new markets, building sustainable partnerships, and making global trade simpler for
                  businesses of all sizes.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center ${animClass('delay-600')}`}
          >
            {[
              {
                title: 'Our Mission',
                content:
                  'To simplify global trade by offering reliable, transparent, and efficient import-export services that empower businesses to thrive internationally.',
              },
              {
                title: 'Why Choose AGX International?',
                content:
                  'With our deep industry knowledge, robust logistics network, and customer-first approach, we ensure smooth and secure cross-border transactions — every time.',
              },
              {
                title: 'Our Values',
                content:
                  'Integrity, reliability, and partnership guide everything we do — ensuring every interaction builds lasting relationships and global opportunities.',
              },
            ].map(({ title, content }, i) => (
              <div
                key={i}
                className="bg-white border border-pink-300 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h4 className="text-2xl font-semibold text-pink-500 mb-5 tracking-wide">{title}</h4>
                <p className="leading-relaxed text-gray-800 text-lg">{content}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`mt-24 text-center max-w-3xl mx-auto px-6 ${animClass('delay-600')}`}>
            <h4 className="text-3xl font-extrabold text-pink-500 mb-6 tracking-wide">
              Ready to trade globally with AGX International?
            </h4>
            <p className="text-gray-800 mb-10 text-lg max-w-xl mx-auto">
              Contact us today and let’s unlock new opportunities together.
            </p>
            <a
              href="/contact"
              className="inline-block bg-pink-500 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
