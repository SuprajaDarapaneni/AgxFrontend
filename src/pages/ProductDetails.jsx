import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  const navigate = useNavigate();

  const baseUrl = "https://agxbackend.onrender.com";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}/client/getproduct/${id}`);
        const data = res.data;
        setProduct(data);

        if (data.coverImage) {
          setMainImage(`${baseUrl}${data.coverImage}`);
        } else if (data.multipleImages?.length > 0) {
          setMainImage(`${baseUrl}${data.multipleImages[0]}`);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id, baseUrl]);

  const goToBuySell = () => {
    navigate("/buy-sell");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      {/* Zoomed Image */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <motion.img
              src={zoomedImage}
              alt="Zoomed"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 text-white text-4xl font-bold transition-transform duration-200 hover:scale-110"
              aria-label="Close zoomed image"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-lg rounded-lg my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left side: Images + Why Choose Us */}
          <div className="flex flex-col items-center">
            {mainImage && (
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={product.bannerTitle || "Product main image"}
                className="w-full h-96 object-contain rounded-xl shadow-md cursor-zoom-in border border-gray-200"
                onClick={() => setZoomedImage(mainImage)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {product.multipleImages?.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-6 w-full max-w-lg">
                {product.multipleImages.map((img, index) => {
                  const fullImg = `${baseUrl}${img}`;
                  return (
                    <motion.img
                      key={index}
                      src={fullImg}
                      alt={`Thumbnail ${index + 1}`}
                      className={`h-24 w-full object-cover rounded-lg cursor-pointer transition-all duration-200 shadow-sm
                        ${fullImg === mainImage
                          ? "border-3 border-indigo-600 ring-2 ring-indigo-300 transform scale-105"
                          : "border border-gray-300 hover:border-indigo-400"
                        }`}
                      onClick={() => setMainImage(fullImg)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  );
                })}
              </div>
            )}

            {/* Why Choose Us section below images */}
            <div className="mt-8 w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose Us</h2>
              {product.whyChooseUs ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.whyChooseUs}</p>
              ) : (
                <p className="text-gray-500 italic">No additional info.</p>
              )}
            </div>
          </div>

          {/* Right side: Product Details (without Why Choose Us) */}
          <div className="space-y-8">
            {product.bannerTitle && (
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {product.bannerTitle}
              </h1>
            )}
            {product.category && (
              <p className="text-md text-indigo-700 font-semibold bg-indigo-50 inline-block px-3 py-1 rounded-full shadow-sm">
                {product.category}
              </p>
            )}
            {product.intro && <p className="text-gray-800 text-lg leading-relaxed">{product.intro}</p>}

            {/* Collapsible Sections without Why Choose Us */}
            <ProductDetailSection title="Introduction" content={product.introduction} />
            <ProductDetailSection title="Product Range" content={product.productRange} />
            <ProductDetailSection title="Additional Info" content={product.additionalInfo} />

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/products"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Back to Products
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Contact Us
              </Link>

              <button
                onClick={goToBuySell}
                className="px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg shadow-md hover:bg-green-50 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Go to Buy/Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for collapsible sections
const ProductDetailSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!content) return null;

  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <motion.span
          className="text-gray-500"
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-3 text-gray-700 leading-relaxed"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
