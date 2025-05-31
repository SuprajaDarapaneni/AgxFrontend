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
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://agxbackend.onrender.com/client/getproducts');
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
    <div className="bg-gradient-to-b from-white to-pink-50 text-gray-900 font-inter selection:bg-pink-300 selection:text-white">

      <Helmet>
        <title>AGX Global | Import Export, Products & Services</title>
        <meta name="description" content="Explore AGX Global's international trade services, premium products, and global import/export solutions. Trusted by clients worldwide." />
        <meta name="keywords" content="AGX Global, import export, international trade, global products, logistics services, export company" />
        <meta property="og:title" content="AGX Global | Import Export Experts" />
        <meta property="og:description" content="Explore our premium services and international products. Discover why AGX Global is your ideal partner in trade." />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section
        style={{ height: `${viewportHeight}px` }}
        className="relative w-screen overflow-hidden shadow-lg"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="w-full h-full"
          speed={1200}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full group">
                <img
                  src={src}
                  alt={`AGX Hero Banner ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-center items-center text-center px-6 md:px-20">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl animate-fade-in-up">
                    {t('homepage.heroTitle')}
                  </h1>
                  <Link to="/buy-sell" onClick={scrollToTop}>
                    <button className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
                      {t('homepage.heroButton')}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-20 bg-white rounded-lg shadow-xl max-w-7xl mx-auto mt-16 animate-fade-in-up">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <h2 className="text-5xl font-bold text-pink-600 mb-8 tracking-wide drop-shadow-md">
            {t('homepage.aboutTitle')}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed tracking-wide max-w-xl">
            {t('homepage.aboutDesc')}
          </p>
          <div className="mt-8">
            <Link to="/about" onClick={scrollToTop}>
              <button className="bg-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-pink-700 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                {t('homepage.learnMore')}
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-2xl hover:shadow-pink-500 transition-shadow duration-500 transform hover:scale-105">
          <img
            src={globalBusinessImage}
            alt="AGX About Section"
            className="object-cover w-full h-96 md:h-[400px]"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 via-white to-pink-50">
        <div className="container mx-auto text-center max-w-6xl px-6">
          <h2 className="text-5xl font-extrabold text-pink-600 mb-6 drop-shadow-md animate-fade-in-up">
            {t('homepage.servicesTitle')}
          </h2>
          <div className="flex justify-center mb-10">
            <div className="w-28 h-1 rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((num, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition duration-500 transform hover:-translate-y-3 cursor-pointer animate-fade-in-up"
              >
                <h3 className="text-2xl font-semibold text-pink-600 mb-3">{t(`homepage.service${num}Title`)}</h3>
                <p className="text-gray-700 leading-relaxed">{t(`homepage.service${num}Desc`)}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link to="/services" onClick={scrollToTop}>
              <button className="bg-pink-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-pink-700 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                {t('homepage.learnMore')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white max-w-7xl mx-auto px-6 rounded-lg shadow-xl animate-fade-in-up">
        <h2 className="text-5xl font-bold text-center mb-12 text-pink-700 drop-shadow-md">
          {t('homepage.productsTitle')}
        </h2>
        <div className="flex justify-center mb-16">
          <div className="w-28 h-1 rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              onClick={scrollToTop}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 text-center cursor-pointer group flex flex-col"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={
                    product.coverImage?.startsWith('http')
                      ? product.coverImage
                      : `https://agxbackend.onrender.com/${product.coverImage?.replace(/^\/+/, '')}`
                  }
                  alt={product.name || 'Product Image'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <p className="text-lg font-semibold text-pink-700 mb-3 line-clamp-2">{product.category}</p>
                <button className="bg-pink-600 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:bg-pink-700 hover:shadow-xl shadow-lg">
                  {t('homepage.viewMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link to="/products" onClick={scrollToTop}>
            <button className="bg-pink-600 text-white px-10 py-4 rounded-full hover:bg-pink-700 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              {t('homepage.viewAllProducts')}
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 via-white to-pink-50 max-w-7xl mx-auto px-6 rounded-lg shadow-xl animate-fade-in-up">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-pink-600 mb-10 drop-shadow-md animate-fade-in-up">
            {t('homepage.testimonialsTitle')}
          </h2>
          <div className="flex justify-center mb-14">
            <div className="w-28 h-1 rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow-lg animate-pulse"></div>
          </div>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-10">
            {[
              {
                name: 'Sankar',
                role: 'Client',
                message: t('homepage.testimonial1'),
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
              },
              {
                name: 'Ritika',
                role: 'Supplier',
                message: t('homepage.testimonial2'),
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
              },
              {
                name: 'Manoj',
                role: 'Partner',
                message: t('homepage.testimonial3'),
                image: 'https://randomuser.me/api/portraits/men/54.jpg',
              },
            ].map(({ name, role, message, image }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-pink-400 transition-shadow duration-500"
              >
                <img
                  src={image}
                  alt={`${name} photo`}
                  className="w-24 h-24 rounded-full object-cover mb-6 ring-4 ring-pink-300 shadow-md"
                />
                <p className="text-lg text-gray-700 italic mb-4 max-w-xs">{`"${message}"`}</p>
                <p className="font-semibold text-pink-600">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-10 right-10 p-3 rounded-full bg-pink-600 text-white shadow-lg hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Global styles for fade-in animations */}
      <style>{`
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
        .animate-fade-in-up {
          animation: fadeInUp 1s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
