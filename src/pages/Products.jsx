import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9000/client/getproducts");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleCoverImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Industry Solutions</h1>

      {/* Optional: Industry-wide introduction text */}
      <p className="text-center max-w-3xl mx-auto mb-10 text-gray-600 text-lg">
        Discover our wide range of industry solutions tailored to meet various business needs.
          Explore categories to find what fits you best.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
            <img
              src={
                product.coverImage
                  ? `http://localhost:9000${product.coverImage}`
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={product.category}
              className="rounded-lg w-full h-48 object-contain cursor-pointer"
              onClick={() => handleCoverImageClick(product._id)}
            />
            <div className="mt-4 text-center">
              <p className="text-blue-700 text-lg font-semibold">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
