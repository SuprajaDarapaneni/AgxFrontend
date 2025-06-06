import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://agxbackend-1.onrender.com/client/getproducts");
        const sortedProducts = res.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setProducts(sortedProducts);
      } catch (err) {
        setError(t("product.errorLoading", "Failed to load products."));
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [t]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-600 border-opacity-50"></div>
        <span className="mt-4 text-pink-600 text-lg font-medium">{t("product.loading", "Loading products...")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("product.seoTitle", "Products - AGX Global")}</title>
        <meta
          name="description"
          content={t("product.seoDescription", "Explore our wide range of products at AGX Global. Quality guaranteed and tailored for you.")}
        />
        <meta name="keywords" content="AGX Global, products, import, export, international trade" />
        <link rel="canonical" href="https://www.agx-international.com/products" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://www.agx-international.com/product/${product._id}`,
              "name": product.bannerTitle || product.category,
              "image": product.coverImage ? `https://agxbackend-1.onrender.com${product.coverImage}` : undefined,
            })),
          })}
        </script>
      </Helmet>

      <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-indigo-50 min-h-screen">
        <header className="mb-14 text-center">
          <h1 className="text-5xl font-extrabold text-pink-700 mb-4 drop-shadow-sm">
            {t("product.title")}
          </h1>
          <div className="w-20 h-1 bg-pink-500 mx-auto rounded mb-6 animate-pulse"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            {t("product.description")}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product, i) => (
            <motion.article
              key={product._id}
              role="button"
              tabIndex={0}
              aria-label={`${product.bannerTitle || t("product.placeholderAlt")}, ${product.category}`}
              onClick={() => handleCardClick(product._id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCardClick(product._id);
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-5 flex flex-col items-center group"
            >
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-5">
                <img
                  src={
                    product.coverImage
                      ? `https://agxbackend-1.onrender.com${product.coverImage}`
                      : `https://via.placeholder.com/300x200?text=${encodeURIComponent(t("product.placeholderAlt"))}`
                  }
                  alt={product.bannerTitle ? `${product.bannerTitle} - ${product.category}` : t("product.placeholderAlt")}
                  className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <p className="inline-block bg-pink-100 hover:bg-pink-200 font-medium px-4 py-1 rounded-full text-sm mb-4 tracking-wide select-none">
                {product.category}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                aria-label={t("product.viewProductButtonAria", "View details for {{productName}}", { productName: product.bannerTitle || product.category })}
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
    </>
  );
};

export default Products;
