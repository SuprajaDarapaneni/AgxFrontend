import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10 text-red-500">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/blogs" className="text-blue-500 underline text-sm mb-4 block">← Back to Blogs</Link>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{new Date(blog.date).toDateString()}</p>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetail;
