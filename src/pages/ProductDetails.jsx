import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ReadMore = ({ children, maxChars = 250 }) => {
  const text = children;
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;
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

        if (res.data.coverImage) {
          setMainImage(`https://agxbackend.onrender.com${res.data.coverImage}`);
        } else if (res.data.multipleImages?.length > 0) {
          setMainImage(
            `https://agxbackend.onrender.com${res.data.multipleImages[0]}`
          );
        } else {
          setMainImage(
            "https://via.placeholder.com/700x500?text=No+Image+Available"
          );
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-gray-500 text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <motion.img
            src={zoomedImage}
            alt="Zoomed product"
            className="max-h-screen max-w-screen object-contain rounded-lg shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(null);
            }}
            aria-label="Close zoomed image"
          >
            &times;
          </button>
        </div>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center text-sm text-gray-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-indigo-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Images */}
          <div>
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative group cursor-zoom-in"
              onClick={() => setZoomedImage(mainImage)}
            >
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 rounded-3xl">
                <span className="text-white font-semibold tracking-wide">
                  Click to zoom
                </span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-indigo-600 inline-block">
                More Views
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.coverImage && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select cover image"
                    className={`rounded-xl overflow-hidden focus:outline-none transition-all duration-300 ${
                      mainImage ===
                      `https://agxbackend.onrender.com${product.coverImage}`
                        ? "ring-4 ring-indigo-600 shadow-lg"
                        : "ring-1 ring-gray-200 hover:ring-indigo-400"
                    }`}
                    onClick={() =>
                      setMainImage(
                        `https://agxbackend.onrender.com${product.coverImage}`
                      )
                    }
                  >
                    <img
                      src={`https://agxbackend.onrender.com${product.coverImage}`}
                      alt="Cover Thumbnail"
                      className="w-full h-20 object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                )}

                {product.multipleImages?.length > 0 &&
                  product.multipleImages.map((imgUrl, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Select image ${idx + 1}`}
                      className={`rounded-xl overflow-hidden focus:outline-none transition-all duration-300 ${
                        mainImage ===
                        `https://agxbackend.onrender.com${imgUrl}`
                          ? "ring-4 ring-indigo-600 shadow-lg"
                          : "ring-1 ring-gray-200 hover:ring-indigo-400"
                      }`}
                      onClick={() =>
                        setMainImage(`https://agxbackend.onrender.com${imgUrl}`)
                      }
                    >
                      <img
                        src={`https://agxbackend.onrender.com${imgUrl}`}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-20 object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              <ReadMore maxChars={60}>{product.name}</ReadMore>
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                </span>
                Introduction
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-200">
                <ReadMore maxChars={300}>
                  {`Discover the excellence of our ${product.name}, a premium solution in the ${product.category} sector. Meticulously engineered for superior performance and durability.`}
                </ReadMore>
              </div>
            </section>

            {/* Key Features */}
            {product.description && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  </span>
                  Key Features
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-200">
                  <ReadMore maxChars={300}>{product.description}</ReadMore>
                </div>
              </section>
            )}

            {/* Why Choose Us */}
            {product.whyChooseUsContent && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  </span>
                  Why Choose Our Product
                </h2>
                <div className="bg-indigo-50 rounded-xl p-6 shadow-inner border border-indigo-200">
                  <ReadMore maxChars={300}>{product.whyChooseUsContent}</ReadMore>
                </div>
              </section>
            )}

            {/* Interior Details */}
            {product.interiorContent && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  </span>
                  Interior Details
                </h2>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-inner">
                  <ReadMore maxChars={300}>{product.interiorContent}</ReadMore>
                </div>
              </section>
            )}

            {/* Contact CTA */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-12 border-t border-gray-200 pt-8 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Interested in this product?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get in touch for pricing, specifications, or to request a
                sample. Our experts are ready to assist you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-pink-700"
                >
                  Contact Sales
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition"
                >
                  Back to Products
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default ProductDetails;
