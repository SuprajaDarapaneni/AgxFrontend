import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import 'swiper/css';
import 'swiper/css/navigation';
import CookieConsent from '../components/CookieConsent';  // adjust path as needed

import 'swiper/css/pagination';

import globalBusinessImage from '../assets/Import-....jpg';
 
//import img3 from '../assets/budha.jpg';
//import img5 from '../assets/Hussain_Sagar_Lake2C_Hyderabad_20230309151019.jpg';
 

 import img0 from '../assets/budha2.jpg';
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
  const [reviews, setReviews] = useState([]);

  const images = [  img0,img1, img2,img3,img4,img5,img6 ];

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
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://agxbackend.onrender.com/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []); // Empty dependency array means this runs once on mount


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
  <title>{t('homepage.seoTitle') || 'AGX-International | Global Freight & Trade Experts'}</title>
  <meta
    name="description"
    content={
      t('homepage.seoDescription') ||
      "Explore AGX Global's international trade services, premium products, and global import/export solutions. Trusted by clients worldwide."
    }
  />
  <meta
    name="keywords"
    content="AGX Global, AGX-International, import export, international trade, global logistics, freight services, global products"
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.agx-international.com/" />

  {/* Open Graph / Facebook */}
  <meta
    property="og:title"
    content={t('homepage.seoTitle') || 'AGX-International | Global Freight & Trade Experts'}
  />
  <meta
    property="og:description"
    content={
      t('homepage.seoDescription') ||
      'Explore our premium services and international products. Discover why AGX Global is your ideal partner in trade.'
    }
  />
{/*   <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.agx-international.com/" />
  <meta property="og:image" content="https://www.agx-international.com/favicon.ico" /> */}

     <meta property="og:type" content="website" />
<meta property="og:url" content="https://www.agx-international.com/" />
<meta property="og:title" content="AGX International – Import & Export Logistics Solutions" />
<meta property="og:description" content="Your trusted global logistics partner for freight, customs, and trade." />
<meta property="og:image" content="https://www.agx-international.com/assets/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />


  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={t('homepage.seoTitle') || 'AGX Global | International Trade Experts'} />
  <meta name="twitter:description" content={t('homepage.seoDescription') || 'Trusted global trade partner.'} />
  <meta name="twitter:image" content="https://www.agx-international.com/assets/og-image.jpg" />
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
                  alt={t(`homepage.heroImageAlt${index + 1}`) || `AGX Hero Banner ${index + 2}`}
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
      <section className="py-16 bg-white animate-fade-in-up">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-pink-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto px-4 text-left">
            <div>
              <p className="text-lg text-gray-900">
                Our journey began on July 10th, 2022, with a clear vision to create a strong bridge
                between Global industries and Global markets through reliable export services...
              </p>
              <div className="mt-6">
                <Link to="/about">
                  <button
  className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
  aria-label={t('homepage.learnMoreabout')}
>
  {t('homepage.learnMoreabout')}
</button>
                </Link>
              </div>
            </div>
            <div>
              <img src={globalBusinessImage} alt="About Us" className="rounded-md shadow-lg" />
            </div>
          </div>
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
                        : `https://agxbackend.onrender.com/${product.coverImage?.replace(/^\/+/, '')}`
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
         <section
      aria-label={t('homepage.testimonialsSectionAriaLabel') || 'What Our Clients Say'}
      className="py-16 bg-white animate-fade-in-up transition-opacity duration-700"
    >
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          {t('homepage.testimonialsTitle') || 'What Our Clients Say'}
        </h2>
        {/* Decorative divider */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full"></div>
        </div>

        {/* Conditionally render Swiper if there are reviews, otherwise show a message */}
        {reviews.length > 0 ? (
          <Swiper
            // Swiper modules for navigation, pagination, and autoplay
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30} // Space between slides
            slidesPerView={1} // Number of slides visible at once for mobile
            navigation // Enable navigation arrows (appear outside the cards)
            pagination={{ clickable: true }} // Enable clickable pagination dots (appear below the carousel)
            autoplay={{ delay: 5000, disableOnInteraction: false }} // Autoplay with 5-second delay
            loop // Loop the slides continuously
            // Responsive breakpoints for different screen sizes
            breakpoints={{
              640: { slidesPerView: 1 }, // 1 slide on screens >= 640px
              768: { slidesPerView: 2 }, // 2 slides on screens >= 768px
              1024: { slidesPerView: 3 }, // 3 slides on screens >= 1024px
            }}
            className="max-w-6xl mx-auto px-4 py-8" // Max width, auto margins, padding
          >
            {/* Map through the reviews array to create each testimonial slide */}
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                {/* Testimonial Card with outline and improved styling */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 h-full transform hover:scale-105">
                  {/* Quote icon SVG */}
                  <svg
                    className="w-12 h-12 text-pink-500 mb-4" // Tailwind classes for size, color, and margin
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Path data for the double quote icon (fixed for better display) */}
                    <path d="M9.25 15.5l1.5-3.5L9 8.25V6.5h4.5v1.75L12 11.5l1.5 3.5zm5.5 0l1.5-3.5L14.5 8.25V6.5h4.5v1.75L17.5 11.5l1.5 3.5z"/>
                  </svg>
                  {/* Testimonial comment */}
                  <p className="text-lg text-gray-800 italic mb-6 leading-relaxed flex-grow">
                    "{review.comment}"
                  </p>

                  {/* Name and Rating - pushed to the bottom of the card using flex-grow on p and mt-auto on this div */}
                  <div className="mt-auto">
                    <p className="font-semibold text-pink-600 text-xl mb-2">{review.name}</p>
                    {/* Rating stars - generated based on review.rating */}
                    <div className="text-yellow-500 flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.959a1 1 0 00-.364-1.118L2.074 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-600 text-lg">
            {t('homepage.noTestimonials') || 'No testimonials available yet.'}
          </p>
        )}
      </div>
    </section>

       {/* <CookieConsent /> */}
 
      </main>
    </div>
  );
};

export default HomePage;
