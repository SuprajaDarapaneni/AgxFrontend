import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Products = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://agxbackend.onrender.com/client/getproducts"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // const toggleLanguage = () => {
  //   const nextLang =
  //     i18n.language === "en" ? "fr" : i18n.language === "fr" ? "de" : "en";
  //   i18n.changeLanguage(nextLang);
  // };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      <header className="mb-14 text-center">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4 drop-shadow-sm">
          {t("product.title")}
        </h1>
        <div className="w-20 h-1 bg-pink-500 mx-auto rounded mb-6 animate-pulse"></div>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
          {t("product.description")}
        </p>
        {/* <button
          onClick={toggleLanguage}
          className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          {t("product.langToggle")}
        </button> */}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product, i) => (
          <motion.article
            key={product._id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(product._id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(product._id);
            }}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-5 flex flex-col items-center group"
          >
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-5">
              <img
                src={
                  product.coverImage
                    ? `https://agxbackend.onrender.com${product.coverImage}`
                    : `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                        t("product.placeholderAlt")
                      )}`
                }
                alt={product.category || t("product.placeholderAlt")}
                className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <p className="inline-block bg-pink-100 hover:bg-pink-200 font-medium px-4 py-1 rounded-full text-sm mb-4 tracking-wide select-none">
              {product.category}
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(product._id);
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-colors duration-300"
            >
              {t("product.button")}
            </motion.button>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Products;
