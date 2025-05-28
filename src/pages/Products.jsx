import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Assuming you use react-i18next

const Products = () => {
  const { t, i18n } = useTranslation(); // t function and i18n instance
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

  const toggleLanguage = () => {
    // Cycle through languages: en -> fr -> de -> en
    const nextLang = i18n.language === "en" ? "fr" : i18n.language === "fr" ? "de" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          {t("product.title")}
        </h1>
        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded mb-6"></div>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          {t("product.description")}
        </p>
        <button
          onClick={toggleLanguage}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          aria-label="Toggle Language"
        >
          {t("product.langToggle")}
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <article
            key={product._id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(product._id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(product._id);
            }}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col items-center group"
          >
            <div className="w-full h-48 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-5">
              <img
                src={
                  product.coverImage
                    ? `https://agxbackend.onrender.com${product.coverImage}`
                    : `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                        t("product.placeholderAlt")
                      )}`
                }
                alt={product.category || t("product.placeholderAlt")}
                className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="text-center">
              <p className="inline-block bg-indigo-100 text-indigo-700 font-semibold px-4 py-1 rounded-full tracking-wide text-sm select-none">
                {product.category}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(product._id);
              }}
              className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-colors duration-300"
            >
              {t("product.button")}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Products;
