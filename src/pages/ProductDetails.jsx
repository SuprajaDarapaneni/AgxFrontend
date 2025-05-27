import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to render text with a bold main heading and bullet points
  // mainHeading: The primary bold heading for the content block (e.g., "Introduction")
  // content: The raw string from the database field (e.g., product.name, product.description)
  const renderFormattedContent = (content, mainHeading) => {
    if (!content) return null;

    // Split content by newline characters for bullet points
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');

    return (
      <div>
        {/* Render the main heading boldly */}
        {mainHeading && <h2 className="text-2xl font-bold text-gray-800 mb-2">{mainHeading}</h2>}

        {/* Render content as bullet points */}
        {lines.length > 0 && (
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
            {lines.map((line, index) => (
              <li key={index} className="text-base">{line.trim()}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://agxbackend.onrender.com/client/getproduct/${id}`);
        setProduct(res.data);

        // Prioritize coverImage, then first multipleImage, then placeholder
        if (res.data.coverImage) {
          setMainImage(`https://agxbackend.onrender.com${res.data.coverImage}`);
        } else if (res.data.multipleImages?.length > 0) {
          setMainImage(`https://agxbackend.onrender.com${res.data.multipleImages[0]}`);
        } else {
          setMainImage("https://via.placeholder.com/600x400?text=No+Image+Available");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-xl font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-red-700 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-xl font-semibold">Product not found.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* Left: Image Display */}
        <div className="w-full">
          <div className="relative w-full bg-white rounded-lg shadow-xl overflow-hidden mb-6">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto max-h-[550px] object-contain rounded-lg"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">More Views:</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {/* Cover Image Thumbnail */}
              {product.coverImage && (
                <div
                  className={`border-2 p-1 rounded-md cursor-pointer transition-all duration-200 ${
                    mainImage === `https://agxbackend.onrender.com${product.coverImage}`
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onClick={() => setMainImage(`https://agxbackend.onrender.com${product.coverImage}`)}
                >
                  <img
                    src={`https://agxbackend.onrender.com${product.coverImage}`}
                    alt="Cover Thumbnail"
                    className="w-full h-16 object-cover rounded"
                  />
                </div>
              )}

              {/* Multiple Images Thumbnails */}
              {product.multipleImages?.length > 0 ? (
                product.multipleImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`border-2 p-1 rounded-md cursor-pointer transition-all duration-200 ${
                      mainImage === `https://agxbackend.onrender.com${imgUrl}`
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onClick={() => setMainImage(`https://agxbackend.onrender.com${imgUrl}`)}
                  >
                    <img
                      src={`https://agxbackend.onrender.com${imgUrl}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-16 object-cover rounded"
                    />
                  </div>
                ))
              ) : (
                !product.coverImage && (
                  <p className="text-gray-500 text-sm col-span-full">No additional images available.</p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">

          {/* Category */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</h3>
            <p className="text-blue-700 text-base font-semibold mb-2">{product.category}</p>
          </div>

          {/* Introduction and Product Range (from name) */}
          {renderFormattedContent(product.name, "Introduction")}

          {/* Additional Features (from description) */}
          {renderFormattedContent(product.description, "Additional Information")}

          {/* Why Choose Us (optional field whyChooseUsContent) */}
          {product.whyChooseUsContent && (
            <div className="border-t pt-4">
              {renderFormattedContent(product.whyChooseUsContent, "Why Choose Us")}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;