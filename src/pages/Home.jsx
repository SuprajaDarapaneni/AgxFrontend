import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              Want to Buy or Sell Products?
            </h2>
            <p className="text-lg md:text-xl text-white mb-6 max-w-xl drop-shadow-md">
              We help connect buyers and sellers across borders. Explore trusted trading with ease.
            </p>
            <Link to="/buy-sell">
              <button className="bg-white text-pink-600 font-semibold px-8 py-4 text-lg rounded-md hover:bg-gray-100 transition duration-300 shadow-lg">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


      {/* About Us */}
      <section className="flex items-center justify-between py-16">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
          <p className="text-lg text-gray-900">
            Our journey began on July 10th, 2022, with a clear vision to create a strong bridge
            between Indian industries and global markets through reliable export services...
          </p>
          <div className="mt-6">
            <Link to="/about">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <img src={globalBusinessImage} alt="About Us" className="rounded-md shadow-lg" />
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Products</h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-pink-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group flex flex-col"
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
                  View More
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
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300">
              View all products
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
