import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Render content blocks with heading and bullet points
  const renderFormattedContent = (content, mainHeading) => {
    if (!content) return null;

    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

    return (
      <section className="mb-6">
        {mainHeading && (
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">
            {mainHeading}
          </h2>
        )}
        {lines.length > 0 && (
          <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed text-lg">
            {lines.map((line, index) => (
              <li key={index} className="hover:text-indigo-600 transition-colors duration-300">
                {line.trim()}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  };

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
        {/* Left Side: Main Image + Thumbnails */}
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
              {/* Cover Image Thumbnail */}
              {product.coverImage && (
                <button
                  aria-label="Select cover image"
                  className={`border-4 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
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

              {/* Multiple Images Thumbnails */}
              {product.multipleImages?.length > 0 ? (
                product.multipleImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    aria-label={`Select image ${idx + 1}`}
                    className={`border-4 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
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
                ))
              ) : (
                !product.coverImage && (
                  <p className="text-gray-400 text-sm col-span-full">
                    No additional images available.
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          {/* Category */}
          <div className="mb-8">
            <h3 className="uppercase text-indigo-600 font-bold tracking-wide mb-2 text-sm">
              Category
            </h3>
            <p className="text-gray-900 text-xl font-semibold">{product.category}</p>
          </div>

          {/* Introduction (Name) */}
          {renderFormattedContent(product.name, "Introduction")}

          {/* Additional Information (Description) */}
          {renderFormattedContent(product.description, "Additional Information")}

          {/* Why Choose Us Section */}
          {product.whyChooseUsContent && (
            <div className="mt-10 border-t border-gray-300 pt-6">
              {renderFormattedContent(product.whyChooseUsContent, "Why Choose Us")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
