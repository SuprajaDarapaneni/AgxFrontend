import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:9000/blogs');
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Latest Blogs</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogPosts.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post._id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{new Date(post.date).toDateString()}</p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link to={`/blogs/${post._id}`} className="text-blue-500 hover:underline text-sm">Read More →</Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;
