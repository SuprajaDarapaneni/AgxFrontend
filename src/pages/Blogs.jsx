import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Blogs = () => {
  const { t } = useTranslation();

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://agxbackend.onrender.com/blogs');
        setBlogPosts(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError(t('blogs.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [t]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">{t('blogs.title')}</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="ml-3 text-gray-500">{t('blogs.loading')}</span>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : blogPosts.length === 0 ? (
        <p className="text-center text-gray-500">{t('blogs.noBlogs')}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div
              key={post._id || post.title}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                to={`/blogs/${post._id}`}
                className="text-blue-500 hover:underline text-sm"
              >
                {t('blogs.readMore')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;
