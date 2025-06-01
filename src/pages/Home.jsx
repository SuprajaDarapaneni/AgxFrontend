import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import globalBusinessImage from '../assets/about.jpeg';
import img1 from '../assets/IMG_3489.png';
import img2 from '../assets/IMG_3502.jpeg';
import img3 from '../assets/IMG_3503.jpeg';
import img4 from '../assets/IMG_3504.jpeg';
import img5 from '../assets/IMG_3506.jpeg';
import img6 from '../assets/IMG_3507.jpeg';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://agxbackend-1.onrender.com/client/getproducts');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-white text-gray-900 font-inter">
    <Helmet>
  <html lang={i18n.language || 'en'} />
  <title>{t('homepage.seoTitle') || 'AGX International | Global Freight & Trade Experts'}</title>
  <meta
    name="description"
    content={
      t('homepage.seoDescription') ||
      "Explore AGX Global's international trade services, premium products, and global import/export solutions. Trusted by clients worldwide."
    }
  />
  <meta
    name="keywords"
    content="AGX Global, AGX International, import export, international trade, global logistics, freight services, global products"
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.agx-international.com/" />

  {/* Open Graph / Facebook */}
  <meta
    property="og:title"
    content={t('homepage.seoTitle') || 'AGX International | Global Freight & Trade Experts'}
  />
  <meta
    property="og:description"
    content={
      t('homepage.seoDescription') ||
      'Explore our premium services and international products. Discover why AGX Global is your ideal partner in trade.'
    }
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.agx-international.com/" />
  <meta property="og:image" content="https://www.agx-international.com/assets/og-banner.jpg" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={t('homepage.seoTitle') || 'AGX Global | International Trade Experts'} />
  <meta name="twitter:description" content={t('homepage.seoDescription') || 'Trusted global trade partner.'} />
  <meta name="twitter:image" content="https://www.agx-international.com/assets/og-banner.jpg" />
</Helmet>


      {/* Skip to main content link (optional) */}
      <a href="#main-content" className="sr-only focus:not-sr-only p-2 bg-pink-600 text-white fixed top-2 left-2 rounded z-50">
        {t('homepage.skipToMain')}
      </a>

      {/* Hero Section */}
      <section
        aria-label={t('homepage.heroAriaLabel') || 'Homepage hero banner'}
        style={{ height: `${viewportHeight}px` }}
        className="relative w-screen overflow-hidden"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={t(`homepage.heroImageAlt${index + 1}`) || `AGX Hero Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
                  <h1
                    className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl animate-fade-in-up"
                    tabIndex={-1}
                  >
                    {t('homepage.heroTitle')}
                  </h1>
                  <Link to="/buy-sell" onClick={scrollToTop}>
                    <button
                      className="bg-white text-pink-600 font-semibold px-8 py-4 text-lg rounded-md hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      aria-label={t('homepage.heroButtonAriaLabel') || 'Buy or Sell Products'}
                    >
                      {t('homepage.heroButton')}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <main id="main-content" tabIndex={-1}>

        {/* About Section */}
        <section
          aria-label={t('homepage.aboutSectionAriaLabel') || 'About AGX Global'}
          className="flex flex-col md:flex-row items-center justify-between py-16 px-4 animate-fade-in-up transition-opacity duration-700"
        >
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('homepage.aboutTitle')}</h2>
            <p className="text-lg text-gray-800 leading-relaxed">{t('homepage.aboutDesc')}</p>
            <div className="mt-6">
              <Link to="/about" onClick={scrollToTop}>
                <button
                  className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                  aria-label={t('homepage.learnMoreAriaLabel') || 'Learn more about AGX Global'}
                >
                  {t('homepage.learnMoreabout')}
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img src={globalBusinessImage} alt={t('homepage.aboutImageAlt') || 'AGX Global business team meeting'} className="rounded-md shadow-xl" />
          </div>
        </section>

        {/* Services Section */}
        <section
          aria-label={t('homepage.servicesSectionAriaLabel') || 'Our Services'}
          className="py-16 bg-white animate-fade-in-up transition-opacity duration-700"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('homepage.servicesTitle')}</h2>
            <div className="flex justify-center mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {[1, 2, 3].map((num, idx) => (
                <article
                  key={idx}
                  className="bg-white shadow-md rounded-md p-6 hover:shadow-xl transition duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  aria-labelledby={`service-title-${num}`}
                >
                  <h3 id={`service-title-${num}`} className="text-xl font-semibold text-gray-900 mb-2">
                    {t(`homepage.service${num}Title`)}
                  </h3>
                  <p>{t(`homepage.service${num}Desc`)}</p>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/services" onClick={scrollToTop}>
                <button
                  className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                  aria-label={t('homepage.learnMoreAriaLabel')}
                >
                  {t('homepage.learnMoreserice')}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          aria-label={t('homepage.productsSectionAriaLabel') || 'Our Products'}
          className="py-16 bg-white animate-fade-in-up transition-opacity duration-700"
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">{t('homepage.productsTitle')}</h2>
          <div className="flex justify-center mb-12">
            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                onClick={scrollToTop}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 text-center cursor-pointer group flex flex-col"
                aria-label={`${product.name || 'Product'} - ${product.category}`}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={
                      product.coverImage?.startsWith('http')
                        ? product.coverImage
                        : `https://agxbackend-1.onrender.com/${product.coverImage?.replace(/^\/+/, '')}`
                    }
                    alt={product.name || 'Product Image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <p className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.category}</p>
                  <button className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-pink-600 hover:shadow-xl shadow-lg">
                    {t('homepage.viewMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/products" onClick={scrollToTop}>
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
                {t('homepage.viewAllProducts')}
              </button>
            </Link>
          </div>
        </section>
         {/* Testimonials Section */}
      <section className="py-16 bg-white animate-fade-in-up transition-opacity duration-700">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('homepage.testimonialsTitle')}</h2>
          <div className="flex justify-center mb-10">
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {[
              { name: 'Ravi Kumar', feedback: t('homepage.testimonial1'), image: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Anjali Mehta', feedback: t('homepage.testimonial2'), image: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Mohammed Irfan', feedback: t('homepage.testimonial3'), image: 'https://randomuser.me/api/portraits/men/85.jpg' }
            ].map((testi, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white animate-fade-in-up">
                <img src={testi.image} alt={`Testimonial by ${testi.name}`} className="w-16 h-16 mx-auto rounded-full mb-4" />
                <p className="text-gray-700 italic">"{testi.feedback}"</p>
                <h4 className="mt-4 text-lg font-semibold text-pink-600">{testi.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Testimonials Section */}
        {/* <section
          aria-label={t('homepage.testimonialsSectionAriaLabel') || 'Customer Testimonials'}
          className="py-16 bg-white animate-fade-in-up transition-opacity duration-700"
          aria-live="polite"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('homepage.testimonialsTitle')}</h2>
            <div className="flex justify-center mb-10">
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              className="max-w-4xl mx-auto"
              aria-label={t('homepage.testimonialsAriaLabel')}
            >
              {[1, 2, 3].map((num) => (
                <SwiperSlide key={num}>
                  <blockquote className="text-gray-700 italic px-6 md:px-12">
                    <p className="mb-4">{t(`homepage.testimonial${num}Text`)}</p>
                    <footer className="font-semibold text-gray-900">{t(`homepage.testimonial${num}Author`)}</footer>
                     
               
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default HomePage;
