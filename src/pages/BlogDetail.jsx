import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://agxbackend.onrender.com/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-pink-600 animate-pulse" aria-live="polite">
        Loading...
      </p>
    );
  if (!blog)
    return (
      <p className="text-center mt-20 text-red-500 font-semibold" role="alert">
        Blog not found.
      </p>
    );

  // Create a short description (first 150 chars, fallback)
  const metaDescription = blog.content
    ? blog.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 150) + '...'
    : `Read this blog post titled "${blog.title}" on AGX-International.`;

  return (
    <>
      <Helmet>
        <title>{blog.title} | AGX-International</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://www.agx-international.com/blogs/${id}`} />
        <meta name="robots" content="index, follow" />
        {/* Optional Open Graph tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.agx-international.com/blogs/${id}`} />
      </Helmet>

      <main
        className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg border border-pink-200 animate-fadeIn"
        tabIndex={-1}
        aria-label={`Blog post titled ${blog.title}`}
      >
        <Link
          to="/blogs"
          className="inline-block mb-6 text-pink-600 hover:text-pink-800 font-medium transition-colors duration-300"
          aria-label="Back to Blogs"
        >
          ← Back to Blogs
        </Link>

        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">{blog.title}</h1>

        <div className="flex items-center text-gray-500 text-sm mb-8 space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
            />
          </svg>
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <article
          className="prose prose-pink max-w-none text-gray-800 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </main>
    </>
  );
};

export default BlogDetail;
