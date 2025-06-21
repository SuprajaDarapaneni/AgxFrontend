import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Blogs = () => {
  const { t } = useTranslation();

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://agx-backedn.onrender.com/blogs');
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
    <section className="min-h-screen bg-[#fff5fa] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{t('blogs.title')} | AGX-International</title>
        <meta
          name="description"
          content="Read the latest blog posts from AGX-International about global trade, innovation, and business insights."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-[#8A0C5A] mb-4 sm:mb-6">
        {t('blogs.title')}
      </h2>
      <div className="w-20 h-1 bg-pink-400 mx-auto rounded mb-12 animate-pulse"></div>

      <main aria-label={t('blogs.title')}>
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
              <article
                key={post._id || post.title}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h3>
                <time
                  dateTime={new Date(post.date).toISOString()}
                  className="text-sm text-gray-500 mb-4 block"
                >
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link
                  to={`/blogs/${post._id}`}
                  className="text-blue-500 hover:underline text-sm"
                  aria-label={`${t('blogs.readMore')} - ${post.title}`}
                >
                  {t('blogs.readMore')}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default Blogs;
