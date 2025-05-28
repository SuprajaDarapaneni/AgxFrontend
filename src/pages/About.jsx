import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import globalBusinessImage from '../assets/about.jpeg';
import '../i18n'; // Make sure your i18n is properly configured

const About = () => {
  const { t } = useTranslation();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const styles = `
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
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

  const animClass = (delay) => (animate ? `fade-in-up ${delay}` : '');

  const company = 'AGX International';
  const foundedDate = 'July 10th, 2022';

  return (
    <>
      <style>{styles}</style>

      <section className="bg-gradient-to-b from-pink-50 to-white text-black min-h-screen flex flex-col items-center py-20">
        <div className="container mx-auto max-w-7xl">
          {/* Title */}
          <h2 className={`text-4xl sm:text-5xl font-extrabold text-center text-pink-500 mb-6 tracking-wide drop-shadow-md ${animClass('delay-100')}`}>
            {t('aboutus.title')}
          </h2>

          {/* Pulse bar */}
          <div className={`flex justify-center mb-12 ${animClass('delay-200')}`}>
            <div className="w-32 h-1 bg-pink-300 rounded-full animate-pulse"></div>
          </div>

          {/* Intro and Image */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 ${animClass('delay-300')}`}>
            <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left space-y-6">
              <p className="text-lg leading-relaxed font-semibold text-gray-800">
                {t('aboutus.intro1', { company })}
              </p>
              <p className="leading-relaxed text-gray-700 text-lg">{t('aboutus.intro2')}</p>
            </div>
            <div className="mx-auto md:mx-0 max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <img
                src={globalBusinessImage}
                alt="Global Business"
                className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Our Story */}
          <div className={`bg-pink-100 rounded-3xl p-12 max-w-5xl mx-auto mb-24 shadow-xl border border-pink-300 ${animClass('delay-400')}`}>
            <h3 className="text-3xl font-semibold text-pink-500 mb-8 text-center tracking-wide drop-shadow-sm">
              {t('aboutus.ourStoryTitle')}
            </h3>
            <p className="leading-relaxed text-gray-800 text-lg max-w-3xl mx-auto space-y-5">
              {t('aboutus.ourStoryContent', { company, date: foundedDate })}
            </p>
          </div>

          {/* Founder Section */}
          <div className={`bg-gradient-to-br from-pink-50 to-white rounded-3xl p-12 max-w-5xl mx-auto mb-24 shadow-xl border border-pink-200 ${animClass('delay-500')}`}>
            <h3 className="text-4xl font-extrabold text-pink-600 mb-10 text-center drop-shadow-md tracking-wide">
              {t('aboutus.founderTitle')}
            </h3>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              <div className="flex-shrink-0 w-56 h-56 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden shadow-lg border-4 border-pink-300">
                <img
                  src="https://placehold.co/224x224/FCE7F3/EC4899?text=Anudeep"
                  alt={t('aboutus.founderName')}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="text-center md:text-left flex-grow max-w-xl">
                <h4 className="text-3xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                  {t('aboutus.founderName')}
                </h4>
                <p className="leading-relaxed text-gray-700 mb-6 text-lg">{t('aboutus.founderBio1')}</p>
                <p className="leading-relaxed text-gray-700 mb-6 text-lg">{t('aboutus.founderBio2')}</p>
                <blockquote className="italic text-gray-800 border-l-4 border-pink-500 pl-6 py-4 mt-8 bg-pink-50 rounded-r-lg shadow-inner drop-shadow-sm">
                  <p className="text-xl font-semibold">“{t('aboutus.founderQuote')}”</p>
                  <footer className="mt-3 text-pink-600 font-bold text-lg">— Anudeep</footer>
                </blockquote>
                <p className="leading-relaxed text-gray-700 mt-8 text-lg">{t('aboutus.founderVision')}</p>
              </div>
            </div>
          </div>

          {/* Mission / Why / Values */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center ${animClass('delay-600')}`}>
            {[
              { title: t('aboutus.mission'), content: t('aboutus.missionDesc') },
              { title: t('aboutus.why'), content: t('aboutus.whyDesc') },
              { title: t('aboutus.values'), content: t('aboutus.valuesDesc') },
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
          <div className={`mt-24 text-center max-w-3xl mx-auto ${animClass('delay-600')}`}>
            <h4 className="text-3xl font-extrabold text-pink-500 mb-6 tracking-wide">{t('aboutus.ctaTitle')}</h4>
            <p className="text-gray-800 mb-10 text-lg max-w-xl mx-auto">{t('aboutus.ctaDesc')}</p>
            <a
              href="/contact"
              className="inline-block bg-pink-500 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
            >
              {t('aboutus.ctaBtn')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
