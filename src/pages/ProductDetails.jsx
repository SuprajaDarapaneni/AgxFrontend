import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const baseUrl = "https://agxbackend.onrender.com";

// Helper function to translate text using LibreTranslate API
const translateText = async (text, targetLang = "en") => {
  if (!text) return "";
  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
        api_key: "" // Add your API key here if you have one
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.translatedText || text;
  } catch (error) {
    console.error("Translation API error:", error);
    return text; // fallback to original text on error
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [translated, setTranslated] = useState({
    bannerTitle: "",
    intro: "",
    additionalInfo: "",
  });
  const [mainImage, setMainImage] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndTranslate = async () => {
      try {
        const res = await axios.get(`${baseUrl}/client/getproduct/${id}`);
        const data = res.data;
        setProduct(data);

        if (data.coverImage) {
          setMainImage(`${data.coverImage}`);
        } else if (data.multipleImages?.length > 0) {
          setMainImage(`${data.multipleImages[0]}`);
        }

        // Translate required fields in parallel
        const [bannerTitle, intro, additionalInfo] = await Promise.all([
          translateText(data.bannerTitle, "en"),
          translateText(data.intro, "en"),
          translateText(data.additionalInfo, "en"),
        ]);

        setTranslated({ bannerTitle, intro, additionalInfo });
      } catch (err) {
        console.error("Error fetching or translating product:", err);
      }
    };
    fetchAndTranslate();
  }, [id]);

  const goToBuySell = () => {
    navigate("/buy-sell");
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && zoomedImage) {
        setZoomedImage(null);
      }
    },
    [zoomedImage]
  );

  useEffect(() => {
    if (zoomedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [zoomedImage, handleKeyDown]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-600">Loading product details...</p>
      </div>
    );
  }

  const pageTitle = translated.bannerTitle
    ? `${translated.bannerTitle} | AGX Global`
    : product.bannerTitle
    ? `${product.bannerTitle} | AGX Global`
    : "Product Details | AGX Global";

  const metaDescription =
    translated.intro || translated.additionalInfo || product.intro || product.additionalInfo || "Discover our product at AGX Global";

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: translated.bannerTitle || product.bannerTitle || "Product",
    image: [mainImage, ...(product.multipleImages?.map((img) => baseUrl + img) || [])],
    description: metaDescription,
    category: product.category || "",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price || "0",
      availability: "https://schema.org/InStock",
      url: window.location.href,
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Zoomed Image */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
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
              className="absolute top-6 right-6 text-white text-4xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-lg rounded-lg my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Images */}
          <div className="flex flex-col items-center">
            {mainImage && (
              <motion.img
                key={mainImage}
                src={mainImage}
                alt="Main"
                className="w-full h-96 object-contain rounded-xl shadow-md cursor-zoom-in border border-gray-200"
                onClick={() => setZoomedImage(mainImage)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                role="button"
              />
            )}
            {product.multipleImages?.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-6 w-full max-w-lg">
                {product.multipleImages.map((img, index) => {
                  const fullImg = `${img}`;
                  return (
                    <motion.img
                      key={index}
                      src={fullImg}
                      alt={`Thumb ${index + 1}`}
                      className={`h-24 w-full object-cover rounded-lg cursor-pointer transition-all duration-200
                        ${fullImg === mainImage
                          ? "border-2 border-indigo-600 ring-2 ring-indigo-300 scale-105"
                          : "border border-gray-300 hover:border-indigo-400"
                        }`}
                      onClick={() => setMainImage(fullImg)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Details */}
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-gray-900">{translated.bannerTitle || product.bannerTitle}</h1>
            {product.category && (
              <p className="text-md text-indigo-700 font-semibold bg-indigo-50 inline-block px-3 py-1 rounded-full">
                {product.category}
              </p>
            )}
            <p className="text-gray-800 text-lg leading-relaxed">{translated.intro || product.intro}</p>

            {/* Custom Sections */}
            <ProductDetailSection title="Introduction" content={product.introduction} />
            <ProductDetailSection title="Product Range" content={product.productRange} />
            <ProductDetailSection title="Additional Info" content={translated.additionalInfo || product.additionalInfo} />

            <div className="flex gap-4 mt-8 flex-wrap">
              <Link to="/products" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Back to Products
              </Link>
              <Link to="/contact" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                Contact Us
              </Link>
              <button
                onClick={goToBuySell}
                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
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

// 🔧 Only "Product Range" uses bullets
const ProductDetailSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!content) return null;

  const isBulletList = title.toLowerCase() === "product range";
  const contentArray = isBulletList
    ? content.split("•").map((item) => item.trim()).filter(Boolean)
    : null;

  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <motion.span
          className="text-gray-500"
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
            transition={{ duration: 0.3 }}
            className="mt-3 text-gray-700 leading-relaxed"
          >
            {isBulletList ? (
              <ul className="list-disc list-inside space-y-2">
                {contentArray.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{content}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
