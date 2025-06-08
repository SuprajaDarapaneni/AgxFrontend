import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

// Import your actual images here:
import globalBusinessImage from '../assets/about.jpeg'; // Existing image
// founderImage import removed as per request
import qualityImage from '../assets/badge.png'; // <--- REPLACE with your actual image path
import directSourcingImage from '../assets/customer-service.png'; // <--- REPLACE with your actual image path
import distributionNetworkImage from '../assets/networking.png'; // <--- REPLACE with your actual image path
import complianceImage from '../assets/networking1.png'; // <--- REPLACE with your actual image path
import b2bSupportImage from '../assets/patent_9259111.png'; // <--- REPLACE with your actual image path
import customerCentricImage from '../assets/process_12112367.png'; // <--- REPLACE with your actual image path

import { FaCheckCircle } from "react-icons/fa"; // Icon for titles
import '../i18n'; // Assuming this correctly sets up i18next

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const About = () => {
  const { t } = useTranslation();
  const company = 'AGX-International'; // Updated company name with hyphen
  const foundedDate = 'July 10th, 2022';
  const founderName = 'Anudeep Gali'; // Full founder name

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white text-black min-h-screen flex flex-col items-center py-16 sm:py-20">
      <Helmet>
        <html lang="en" />
        <title>About AGX-International | Trusted Logistics Company</title>
        <meta name="description" content="Learn about AGX-International, our mission, vision, and the team driving global logistics innovation." />
        <meta name="keywords" content="AGX-International, import export company, global trade, founder Anudeep Gali, our mission, our values" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="About AGX-International | Trusted Logistics Company" />
        <meta property="og:description" content="Learn about AGX-International – a global import-export company founded in 2022, driven by innovation, trust, and a commitment to excellence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.agx-international.com/about" />
        <meta property="og:image" content="https://www.agx-international.com/images/social-about.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About AGX-International | Trusted Logistics Company" />
        <meta name="twitter:description" content="Learn about AGX-International – a global import-export company founded in 2022, driven by innovation, trust, and a commitment to excellence." />
        <meta name="twitter:image" content="https://www.agx-international.com/images/social-about.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AGX-International",
            url: "https://www.agx-international.com",
            logo: {
              "@type": "ImageObject",
              url: "https://www.agx-international.com/images/logo.png",
              width: 250,
              height: 60,
            },
            founder: {
              "@type": "Person",
              name: founderName,
            },
            foundingDate: "2022-07-10",
            description: "AGX-International is a global import-export company driven by innovation and trust.",
            sameAs: [
              "https://www.facebook.com/yourpage", // Replace with actual social links
              "https://twitter.com/yourprofile",   // Replace with actual social links
              "https://www.linkedin.com/company/yourcompany" // Replace with actual social links
            ]
          })}
        </script>
      </Helmet>

      <main aria-label={`About ${company}`} className="container mx-auto px-4 max-w-7xl">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center text-pink-500 mb-4 sm:mb-6 tracking-wide drop-shadow-md"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1} // Start animation order
        >
          {t('aboutus.title')}
        </motion.h1>

        <motion.div
          className="flex justify-center mb-8 sm:mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2} // Next in animation order
        >
          <div className="w-24 sm:w-32 h-1 bg-pink-300 rounded-full animate-pulse"></div>
        </motion.div>

        <motion.article
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 sm:mb-20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3} // Next in animation order
        >
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left space-y-4 sm:space-y-6">
            <p className="text-lg leading-relaxed font-semibold text-gray-800">
              {t('aboutus.intro1', { company })}
            </p>
            <p className="leading-relaxed text-gray-700 text-base sm:text-lg">{t('aboutus.intro2')}</p>
          </div>
          <motion.figure
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="mx-auto md:mx-0 max-w-2xl rounded-3xl shadow-2xl overflow-hidden w-full"
          >
            <img
              src={globalBusinessImage}
              alt="AGX-International global import-export operations"
              className="object-cover w-full h-60 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl"
              loading="lazy"
              draggable={false}
            />
          </motion.figure>
        </motion.article>

        {/* Our Story */}
        <motion.article
          className="bg-pink-100 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto mb-16 sm:mb-24 shadow-xl border border-pink-300"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={4} // Next in animation order
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-6 sm:mb-10 text-center tracking-tight">
            ✨ {t('aboutus.ourStoryTitle')} ✨
          </h2>
          <p className="leading-relaxed text-gray-800 text-base sm:text-lg max-w-3xl mx-auto">
            {t('aboutus.ourStoryContent', { company, date: foundedDate }).split(' ').map((word, index) => {
              const lowerCaseWord = word.toLowerCase();
              const highlightedWords = ['global', 'trade', 'innovation', 'excellence', 'solutions', 'partnerships', 'customer-centric', 'reliability', 'agx-international']; // Added agx-international
              const isHighlighted = highlightedWords.some(hw => lowerCaseWord.includes(hw));

              return (
                <React.Fragment key={index}>
                  {isHighlighted ? (
                    <span className="font-bold text-pink-600 drop-shadow-sm">{word} </span>
                  ) : (
                    `${word} `
                  )}
                </React.Fragment>
              );
            })}
          </p>
        </motion.article>

        <motion.article
          className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto mb-16 sm:mb-24 shadow-xl border border-pink-200"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-600 mb-8 sm:mb-10 text-center drop-shadow-md tracking-wide">
            {t('aboutus.founderTitle')}
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <motion.figure
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden shadow-lg border-4 border-pink-300 flex-shrink-0"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            >
              {/* Text for the founder's name inside the circle */}
              <span className="font-bold text-pink-500 text-center text-xl sm:text-2xl drop-shadow-sm">{founderName}</span>
            </motion.figure>
            <div className="text-center md:text-left flex-grow max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight tracking-tight">
                {founderName}
              </h3>

              <blockquote className="italic text-gray-800 border-l-4 border-pink-500 pl-4 py-3 sm:pl-6 sm:py-4 mt-6 sm:mt-8 bg-pink-50 rounded-r-lg shadow-inner drop-shadow-sm">
                <p className="text-lg sm:text-xl font-semibold">“{t('aboutus.founderQuote')}”</p>
                <footer className="mt-2 sm:mt-3 text-pink-600 font-bold text-base sm:text-lg">— {founderName}</footer>
              </blockquote>
              <p className="leading-relaxed text-gray-700 mt-6 sm:mt-8 text-base sm:text-lg">{t('aboutus.founderVision')}</p>
            </div>
          </div>
        </motion.article>

        {/* NEW: Why Choose Us Section */}
        <motion.article
          className="relative bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 rounded-3xl p-8 sm:p-12 max-w-7xl mx-auto mb-16 sm:mb-24 shadow-2xl border border-pink-200 overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {/* 🔮 Background SVG */}
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="400" cy="200" r="200" fill="url(#grad)" />
            <defs>
              <radialGradient id="grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 200) rotate(90) scale(200)">
                <stop stopColor="#f9a8d4" />
                <stop offset="1" stopColor="#f3e8ff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* 🎯 Heading */}
          <h2 className="relative text-4xl sm:text-5xl font-extrabold text-pink-600 mb-12 sm:mb-20 text-center drop-shadow-lg tracking-wide z-10">
            {t("aboutus.whyChooseUsTitle")}
          </h2>

          {/* 📦 Features Grid */}
          <div className="grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {[
              {
                img: qualityImage,
                title: "aboutus.whyChooseUs.qualityTitle",
                content: "aboutus.whyChooseUs.qualityContent",
                custom: 1,
              },
              {
                img: directSourcingImage,
                title: "aboutus.whyChooseUs.directSourcingTitle",
                content: "aboutus.whyChooseUs.directSourcingContent",
                custom: 2,
              },
              {
                img: distributionNetworkImage,
                title: "aboutus.whyChooseUs.distributionNetworkTitle",
                content: "aboutus.whyChooseUs.distributionNetworkContent",
                custom: 3,
              },
              {
                img: complianceImage,
                title: "aboutus.whyChooseUs.complianceTitle",
                content: "aboutus.whyChooseUs.complianceContent",
                custom: 4,
              },
              {
                img: b2bSupportImage,
                title: "aboutus.whyChooseUs.b2bSupportTitle",
                content: "aboutus.whyChooseUs.b2bSupportContent",
                custom: 5,
              },
              {
                img: customerCentricImage,
                title: "aboutus.whyChooseUs.customerCentricTitle",
                content: "aboutus.whyChooseUs.customerCentricContent",
                custom: 6,
              },
            ].map(({ img, title, content, custom }) => (
              <motion.div
                key={title}
                className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md border border-pink-200 hover:shadow-xl transition-all duration-300 text-center"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={custom}
              >
                <img
                  src={img}
                  alt={t(title)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-4 border-pink-300 mb-4 shadow" /* Adjusted image size */
                  loading="lazy"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-pink-800 mb-2 flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-pink-500" />
                  {t(title)}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {t(content)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.article>

        {/* Call to Action */}
        <motion.div
          className="mt-16 sm:mt-24 text-center px-4 max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={8} // Next in animation order
        >
          <h3 className="text-3xl font-extrabold text-pink-500 mb-4 sm:mb-6 tracking-wide">{t('aboutus.ctaTitle')}</h3>
          <p className="text-gray-800 mb-8 sm:mb-10 text-base sm:text-lg max-w-xl mx-auto">{t('aboutus.ctaDesc')}</p>
          <a
            href="/contact"
            aria-label={t('aboutus.ctaBtn')}
            className="inline-block bg-pink-500 text-white text-lg font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
          >
            {t('aboutus.ctaBtn')}
          </a>
        </motion.div>
      </main>
    </section>
  );
};

export default About;