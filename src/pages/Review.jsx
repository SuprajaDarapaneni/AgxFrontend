import React, { useState, useEffect } from 'react';

const CustomerReviewForm = () => {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5,
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState('');

  // Fetch reviews from backend
  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    setReviewsError('');
    try {
      const response = await fetch('http://localhost:9000/reviews');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setReviewsError(error.message || 'Error loading reviews.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Prepare the data to match backend expected fields
 const submitData = {
  name: formData.name,
  email: formData.email, // <--- THIS WAS MISSING
  rating: Number(formData.rating),
  comment: formData.review,
};


    try {
      const response = await fetch('http://localhost:9000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit review');
      }

      // On success, refresh reviews from backend
      await fetchReviews();

      setSubmitMessage('Thank you for your review!');
      setFormData({
        name: '',
        email: '',
        review: '',
        rating: 5,
      });
    } catch (error) {
      setSubmitMessage(error.message || 'An error occurred while submitting your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Leave a Review</h2>
          <p className="mt-2 text-center text-sm text-gray-600">We would love to hear your feedback!</p>
        </div>

        {/* Submission message */}
        {submitMessage && (
          <div
            className={`p-3 rounded-md text-center ${
              submitMessage.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Review Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="review" className="sr-only">
                Your Review
              </label>
              <textarea
                id="review"
                name="review"
                rows="4"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="Write your review here..."
                value={formData.review}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mr-3">
              Your Rating:
            </label>
            <select
              id="rating"
              name="rating"
              className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
              value={formData.rating}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 && 's'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      {/* <div className="max-w-md w-full mt-12 space-y-6 p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>

        {isLoadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviewsError ? (
          <p className="text-red-600">{reviewsError}</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map(({ _id, name, rating, comment }) => (
            <div key={_id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center mb-1">
                <p className="font-semibold text-pink-600">{name}</p>
                <p className="ml-2 text-yellow-500">{'⭐'.repeat(rating)}</p>
              </div>
              <p className="text-gray-700">{comment}</p>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
};

export default CustomerReviewForm;
