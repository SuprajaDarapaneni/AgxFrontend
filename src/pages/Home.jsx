import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Corrected Image Imports:
// Assuming the 'assets' folder is located directly under 'src',
// the path from 'src/pages/Home.jsx' to 'src/assets/' should be '../assets/'.
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
    // Function to fetch products from the backend
    const fetchProducts = async () => {
      try {
        // Fetching products from the specified endpoint
        const response = await fetch('https://agxbackend.onrender.com/client/getproducts');
        const data = await response.json();
        setProducts(data); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error); // Log any errors
      }
    };
    fetchProducts(); // Call the fetch function on component mount
  }, []); // Empty dependency array ensures this runs once on mount

  // Services section component
  const ServicesSection = () => (
    <section className="py-16 bg-white animate-fade-in-up">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-pink-500 rounded-full"></div> {/* Decorative line */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              title: 'Import Assistance',
              desc: 'Navigate the complexities of international import regulations and processes with our expert guidance.',
            },
            {
              title: 'Export Solutions',
              desc: 'Expand your market reach globally with our tailored export strategies and support.',
            },
            {
              title: 'Business Brokering',
              desc: 'Find the right international business partners and opportunities through our extensive network.',
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-md p-6 hover:shadow-xl transition duration-500 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/services">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );

  // Testimonials section component
  const TestimonialsSection = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
        <div className="flex justify-center mb-10">
          <div className="w-24 h-1 bg-pink-500 rounded-full"></div> {/* Decorative line */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              name: 'Ravi Kumar',
              feedback: 'Their export support helped me expand my business overseas. Highly professional and dependable!',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            {
              name: 'Anjali Mehta',
              feedback: 'They made international trade feel easy. Trustworthy and experienced team!',
              image: 'https://randomuser.me/api/portraits/women/44.jpg',
            },
            {
              name: 'Mohammed Irfan',
              feedback: 'Great service and excellent communication throughout our import process.',
              image: 'https://randomuser.me/api/portraits/men/85.jpg',
            },
          ].map((testi, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300"
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

  return (
    <div className="flex flex-col bg-white text-gray-900 font-inter"> {/* Added font-inter */}
      {/* Hero Slider Section */}
      <section className="relative w-full mt-0 pt-0 animate-fade-in">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // disableOnInteraction: false keeps autoplaying after user interaction
          loop
          className="w-full h-[600px]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                {/* Overlay CTA */}
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
            <div>
              <img src={globalBusinessImage} alt="About Us" className="rounded-md shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Products Section */}
      <section className="bg-white py-16 px-4 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Products</h2>
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-pink-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              // Ensure each card is a flex column and fills its height
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group flex flex-col"
            >
              {/* Fixed height image container with object-cover for consistent image display */}
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
                    e.target.onerror = null; // Prevents infinite loop if placeholder also fails
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; // Placeholder image
                  }}
                />
              </div>
              {/* Product details section: Use flex-grow to take remaining space, and justify-between for internal layout */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                {/* Category text with increased font size and line-clamp for consistent display */}
                <p className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.category}
                </p>

                {/* Button aligned to bottom using flexbox properties */}
                <button className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-pink-600 hover:shadow-xl shadow-lg">
                  View More
                  {/* SVG icon for visual appeal */}
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

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
