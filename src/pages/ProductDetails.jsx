import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ReadMore = ({ children, maxChars = 250 }) => {
  const text = children;
  const [isExpanded, setIsExpanded] = useState(false);
  if (!text) return null; // Handle cases where children might be null or undefined
  if (text.length <= maxChars) return <p>{text}</p>;
  return (
    <>
      <p className="text-gray-700 leading-relaxed">
        {isExpanded ? text : text.slice(0, maxChars) + "..."}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-indigo-600 font-semibold hover:underline focus:outline-none"
        aria-label={isExpanded ? "Show less" : "View more"}
      >
        {isExpanded ? "Show Less" : "View More"}
      </button>
    </>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://agxbackend.onrender.com/client/getproduct/${id}`
        );
        setProduct(res.data);
        const baseUrl = "https://agxbackend.onrender.com";
        // Prioritize coverImage, then first multipleImage, then a placeholder
        if (res.data.coverImage) {
          setMainImage(`${baseUrl}${res.data.coverImage}`);
        } else if (res.data.multipleImages?.length > 0) {
          setMainImage(`${baseUrl}${res.data.multipleImages[0]}`);
        } else {
          setMainImage("https://via.placeholder.com/700x500?text=No+Image+Available");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-fetch when the product ID changes

  // Loading state UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-8 bg-white shadow-md rounded-lg text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <p className="text-lg text-gray-800 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Product not found UI
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <p className="text-gray-600 my-4">It seems this product does not exist or has been removed.</p>
          <Link to="/products" className="text-indigo-600 font-medium hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = "https://agxbackend.onrender.com";

  return (
    <>
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 sm:p-10" // Added padding for smaller screens
          onClick={() => setZoomedImage(null)}
        >
          <motion.img
            src={zoomedImage}
            alt="Zoomed product image"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl cursor-pointer" // Adjusted max-height/width
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking image
          />
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
            aria-label="Close zoomed image"
          >
            &times;
          </button>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image Gallery */}
          <div className="space-y-6">
            <div
              className="rounded-xl shadow-xl overflow-hidden border border-gray-200 cursor-zoom-in"
              onClick={() => setZoomedImage(mainImage)}
            >
              <img
                src={mainImage}
                alt={product.name}
                className="w-full max-h-[500px] object-contain transition-transform duration-300 hover:scale-105" // Added hover effect
              />
            </div>

            {product.multipleImages?.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.multipleImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${baseUrl}${img}`}
                    alt={`Preview ${idx + 1}`}
                    className={`cursor-pointer rounded-lg border object-cover h-20 w-full ${ // Added object-cover and fixed height/width
                      mainImage === `${baseUrl}${img}`
                        ? "border-indigo-500 ring-2 ring-indigo-300" // Enhanced active state
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    onClick={() => setMainImage(`${baseUrl}${img}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Content Sections */}
          <div className="space-y-8"> {/* Adjusted spacing for better flow */}
            <section id="introduction" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"> {/* Softer shadow/border */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2"> {/* Increased heading size */}
                {product.name}
              </h1>
              <span className="text-indigo-600 uppercase text-sm font-bold tracking-wider mb-4 block"> {/* Category styling */}
                {product.category}
              </span>
              {/* Using ReadMore for the intro as well for consistency */}
              <ReadMore maxChars={150}>
                {product.introduction || `Discover the excellence of our ${product.name}, a premium solution in the ${product.category} sector. Meticulously engineered for superior performance and durability.`}
              </ReadMore>
            </section>

            {product.description && (
              <section id="features" className="bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2> {/* Consistent heading style */}
                <ReadMore maxChars={250}>{product.description}</ReadMore>
              </section>
            )}

            {product.whyChooseUsContent && (
              <section id="why-us" className="bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
                <ReadMore maxChars={250}>{product.whyChooseUsContent}</ReadMore>
              </section>
            )}

            {product.interiorContent && (
              <section id="interior" className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Interior Details</h2>
                <ReadMore maxChars={300}>{product.interiorContent}</ReadMore>
              </section>
            )}

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.01 }} // Slightly reduced scale for subtlety
              className="bg-gradient-to-r from-indigo-100 to-pink-100 p-6 rounded-xl border border-indigo-200 shadow-md transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900">Interested in this product?</h3>
              <p className="text-gray-700 my-2">
                Get in touch for pricing, customizations, or bulk inquiries.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
                >
                  Contact Sales
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                >
                  Back to Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetails;