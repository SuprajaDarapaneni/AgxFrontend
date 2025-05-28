import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useTranslation } from 'react-i18next';

import globalBusinessImage from '../assets/about.jpeg';
import img1 from '../assets/IMG_3489.png';
import img2 from '../assets/IMG_3502.jpeg';
import img3 from '../assets/IMG_3503.jpeg';
import img4 from '../assets/IMG_3504.jpeg';
import img5 from '../assets/IMG_3506.jpeg';
import img6 from '../assets/IMG_3507.jpeg';

const HomePage = () => {
  const { t } = useTranslation();

  const ServicesSection = () => (
    <section className="py-16 bg-white animate-fade-in-up transition-opacity duration-700">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('services.title')}</h2>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              title: t('services.importAssistance.title'),
              desc: t('services.importAssistance.desc'),
            },
            {
              title: t('services.exportSolutions.title'),
              desc: t('services.exportSolutions.desc'),
            },
            {
              title: t('services.businessBrokering.title'),
              desc: t('services.businessBrokering.desc'),
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-md p-6 hover:shadow-xl transition duration-500 transform hover:-translate-y-2 animate-fade-in-up"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/services">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
              {t('services.learnMore')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-16 bg-white animate-fade-in-up transition-opacity duration-700">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('testimonials.title')}</h2>
        <div className="flex justify-center mb-10">
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              name: 'Ravi Kumar',
              feedback: t('testimonials.ravi'),
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            {
              name: 'Anjali Mehta',
              feedback: t('testimonials.anjali'),
              image: 'https://randomuser.me/api/portraits/women/44.jpg',
            },
            {
              name: 'Mohammed Irfan',
              feedback: t('testimonials.mohammed'),
              image: 'https://randomuser.me/api/portraits/men/85.jpg',
            },
          ].map((testi, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white animate-fade-in-up"
            >
              <img
                src={testi.image}
                alt={testi.name}
                className="w-16 h-16 mx-auto rounded-full mb-4"
              />
              <p className="text-gray-700 italic">"{testi.feedback}"</p>
              <h4 className="mt-4 text-lg font-semibold text-pink-600">{testi.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const [products, setProducts] = useState([]);
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

  return (
    <div className="bg-white text-gray-900 font-inter">
      {/* Hero Slider */}
      <section className="relative w-screen h-screen p-0 m-0">
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
                <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl animate-fade-in-up">
                    {t('hero.title')}
                  </h2>
                  <Link to="/buy-sell">
                    <button className="bg-white text-pink-600 font-semibold px-8 py-4 text-lg rounded-md hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                      {t('hero.cta')}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Us */}
      <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 animate-fade-in-up transition-opacity duration-700">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.title')}</h2>
          <p className="text-lg text-gray-800 leading-relaxed">{t('about.description')}</p>
          <div className="mt-6">
            <Link to="/about">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
                {t('about.learnMore')}
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src={globalBusinessImage} alt={t('about.title')} className="rounded-md shadow-xl" />
        </div>
      </section>

      <ServicesSection />

      {/* Products */}
      <section className="py-16 bg-white animate-fade-in-up transition-opacity duration-700">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">{t('products.title')}</h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 text-center cursor-pointer group flex flex-col"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={
                    product.coverImage?.startsWith('http')
                      ? product.coverImage
                      : `https://agxbackend.onrender.com/${product.coverImage?.replace(/^\/+/, '')}`
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between">
                <p className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.category}
                </p>
                <button className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-pink-600 hover:shadow-xl shadow-lg">
                  {t('products.viewMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/products">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
              {t('products.viewAll')}
            </button>
          </Link>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
