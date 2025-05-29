import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://agxbackend.onrender.com/client/getproduct/${id}`);
        setProduct(res.data);

        if (res.data.coverImage) {
          setMainImage(`https://agxbackend.onrender.com${res.data.coverImage}`);
        } else if (res.data.multipleImages?.length > 0) {
          setMainImage(`https://agxbackend.onrender.com${res.data.multipleImages[0]}`);
        } else {
          setMainImage("https://via.placeholder.com/700x500?text=No+Image+Available");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-2xl font-semibold animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-red-600 text-2xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-2xl font-semibold">Product not found.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Images */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-h-[600px] object-contain transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-indigo-600 pb-2">
              More Views
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {product.coverImage && (
                <button
                  aria-label="Select cover image"
                  className={`border-4 rounded-lg overflow-hidden focus:outline-none transition ${
                    mainImage === `https://agxbackend.onrender.com${product.coverImage}`
                      ? 'border-indigo-600 shadow-lg'
                      : 'border-gray-300 hover:border-indigo-400'
                  }`}
                  onClick={() => setMainImage(`https://agxbackend.onrender.com${product.coverImage}`)}
                >
                  <img
                    src={`https://agxbackend.onrender.com${product.coverImage}`}
                    alt="Cover Thumbnail"
                    className="w-full h-20 object-cover"
                    loading="lazy"
                  />
                </button>
              )}

              {product.multipleImages?.length > 0 &&
                product.multipleImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    aria-label={`Select image ${idx + 1}`}
                    className={`border-4 rounded-lg overflow-hidden focus:outline-none transition ${
                      mainImage === `https://agxbackend.onrender.com${imgUrl}`
                        ? 'border-indigo-600 shadow-lg'
                        : 'border-gray-300 hover:border-indigo-400'
                    }`}
                    onClick={() => setMainImage(`https://agxbackend.onrender.com${imgUrl}`)}
                  >
                    <img
                      src={`https://agxbackend.onrender.com${imgUrl}`}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-20 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          {/* Category */}
          <div className="mb-6">
            <h3 className="uppercase text-indigo-600 font-bold tracking-wide mb-1 text-sm">
              Category
            </h3>
            <p className="text-gray-900 text-xl font-semibold">{product.category}</p>
          </div>

          {/* Introduction */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3 border-b-2 border-indigo-600 pb-2">
              Product Overview
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Discover the excellence of our <strong>{product.name}</strong>, a standout solution in the <strong>{product.category}</strong> industry. Designed to combine quality and performance, this product is a result of careful innovation and precision. Whether you're looking to enhance your workflow or add value to your business, this product delivers reliability, versatility, and long-term efficiency.
            </p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Key Features</h2>
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Why Choose Us */}
          {product.whyChooseUsContent && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Choose Us</h2>
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {product.whyChooseUsContent}
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Interested in this product?</h3>
            <p className="text-gray-600 mb-6">
              Reach out today for more information, pricing details, or to place an order. We’re here to support your needs with reliable service and expert guidance.
            </p>
            <a
              href="/contact"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
