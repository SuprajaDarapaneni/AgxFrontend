import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import globalBusinessImage from '../assets/about.jpeg';
import '../i18n';

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
  const company = 'AGX International';
  const foundedDate = 'July 10th, 2022';

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white text-black min-h-screen flex flex-col items-center py-20">
      <Helmet>
        <html lang="en" />
        <title>About Us | AGX International</title>
        <meta
          name="description"
          content="Learn about AGX International – a global import-export company founded in 2022, driven by innovation, trust, and a commitment to excellence."
        />
        <meta
          name="keywords"
          content="AGX International, import export company, global trade, founder Anudeep, our mission, our values"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={`About Us | ${company}`} />
        <meta
          property="og:description"
          content="Learn about AGX International – a global import-export company founded in 2022, driven by innovation, trust, and a commitment to excellence."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:image" content="https://yourdomain.com/social-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About Us | ${company}`} />
        <meta
          name="twitter:description"
          content="Learn about AGX International – a global import-export company founded in 2022, driven by innovation, trust, and a commitment to excellence."
        />
        <meta name="twitter:image" content="https://yourdomain.com/social-image.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "${company}",
              "url": "https://yourdomain.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/logo.png",
                "width": 250,
                "height": 60
              },
              "founder": {
                "@type": "Person",
                "name": "Anudeep"
              },
              "foundingDate": "2022-07-10",
              "description": "Global import-export company driven by innovation and trust.",
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://twitter.com/yourprofile",
                "https://www.linkedin.com/company/yourcompany"
              ]
            }
          `}
        </script>
      </Helmet>

      <main aria-label={`About ${company}`} className="container mx-auto max-w-7xl">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center text-pink-500 mb-6 tracking-wide drop-shadow-md"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {t('aboutus.title')}
        </motion.h1>

        <motion.div
          className="flex justify-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <div className="w-32 h-1 bg-pink-300 rounded-full animate-pulse"></div>
        </motion.div>

        <motion.article
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left space-y-6">
            <p className="text-lg leading-relaxed font-semibold text-gray-800">
              {t('aboutus.intro1', { company })}
            </p>
            <p className="leading-relaxed text-gray-700 text-lg">{t('aboutus.intro2')}</p>
          </div>
          <motion.figure
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="mx-auto md:mx-0 max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <img
              src={globalBusinessImage}
              alt="AGX International global import-export operations"
              className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl"
              loading="lazy"
              draggable={false}
            />
          </motion.figure>
        </motion.article>

        {/* Our Story */}
        <motion.article
          className="bg-pink-100 rounded-3xl p-12 max-w-5xl mx-auto mb-24 shadow-xl border border-pink-300"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-10 text-center tracking-tight">
            ✨ {t('aboutus.ourStoryTitle')} ✨
          </h2>
          <p className="leading-relaxed text-gray-800 text-lg max-w-3xl mx-auto">
            {t('aboutus.ourStoryContent', { company, date: foundedDate })}
          </p>
        </motion.article>

        {/* Founder Section */}
        <motion.article
          className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-12 max-w-5xl mx-auto mb-24 shadow-xl border border-pink-200"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <h2 className="text-4xl font-extrabold text-pink-600 mb-10 text-center drop-shadow-md tracking-wide">
            {t('aboutus.founderTitle')}
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <motion.figure
              className="w-56 h-56 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden shadow-lg border-4 border-pink-300"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://placehold.co/224x224/FCE7F3/EC4899?text=Anudeep"
                alt="Anudeep – Founder of AGX International"
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
            </motion.figure>
            <div className="text-center md:text-left flex-grow max-w-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                {t('aboutus.founderName')}
              </h3>

              <blockquote className="italic text-gray-800 border-l-4 border-pink-500 pl-6 py-4 mt-8 bg-pink-50 rounded-r-lg shadow-inner drop-shadow-sm">
                <p className="text-xl font-semibold">“{t('aboutus.founderQuote')}”</p>
                <footer className="mt-3 text-pink-600 font-bold text-lg">— Anudeep</footer>
              </blockquote>
              <p className="leading-relaxed text-gray-700 mt-8 text-lg">{t('aboutus.founderVision')}</p>
            </div>
          </div>
        </motion.article>

        {/* Call to Action */}
        <motion.div
          className="mt-24 text-center max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          <h3 className="text-3xl font-extrabold text-pink-500 mb-6 tracking-wide">{t('aboutus.ctaTitle')}</h3>
          <p className="text-gray-800 mb-10 text-lg max-w-xl mx-auto">{t('aboutus.ctaDesc')}</p>
          <a
            href="/contact"
            aria-label={t('aboutus.ctaBtn')}
            className="inline-block bg-pink-500 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
          >
            {t('aboutus.ctaBtn')}
          </a>
        </motion.div>
      </main>
    </section>
  );
};

export default About;
