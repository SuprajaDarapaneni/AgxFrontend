import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CustomerReviewForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState('');

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    setReviewsError('');
    try {
      const response = await fetch('https://agxbackend-1.onrender.com/reviews');
      if (!response.ok) throw new Error(t('customerReviewForm.reviewsSection.error'));
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setReviewsError(error.message || t('customerReviewForm.reviewsSection.error'));
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitMessage('');
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const submitData = {
      name: formData.name,
      email: formData.email,
      rating: Number(formData.rating),
      comment: formData.review,
    };

    try {
      const response = await fetch('https://agxbackend-1.onrender.com/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || t('customerReviewForm.messages.submitError'));
      }

      await fetchReviews();

      setSubmitMessage(t('customerReviewForm.messages.thankYou'));
      setFormData({
        name: '',
        email: '',
        review: '',
        rating: 0,
      });
    } catch (error) {
      setSubmitMessage(error.message || t('customerReviewForm.messages.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-pink-700 mb-2">{t('customerReviewForm.title')}</h2>
          <p className="text-pink-500 font-medium">{t('customerReviewForm.subtitle')}</p>
        </div>

        {submitMessage && (
          <div
            className={`p-4 rounded-lg text-center mb-6 font-semibold ${
              submitMessage.includes(t('customerReviewForm.messages.thankYou'))
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={t('customerReviewForm.fields.name')}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t('customerReviewForm.fields.email')}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition"
            />
          </div>

          <textarea
            id="review"
            name="review"
            rows="5"
            required
            placeholder={t('customerReviewForm.fields.review')}
            value={formData.review}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border border-pink-300 resize-none focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition"
          ></textarea>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label htmlFor="rating" className="text-lg font-semibold text-pink-700">
              {t('customerReviewForm.fields.ratingLabel')}
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className={`text-2xl ${
                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:scale-125 transition-transform duration-200`}
                  aria-label={`${star} star`}
                >
                  {t('customerReviewForm.ratingStars')}
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-2 text-pink-500 font-medium">
                  ({formData.rating})
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 text-white font-bold rounded-3xl shadow-lg transition ${
              isSubmitting
                ? 'bg-pink-300 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700'
            }`}
          >
            {isSubmitting
              ? t('customerReviewForm.buttons.submitting')
              : t('customerReviewForm.buttons.submit')}
          </button>
        </form>

        {/* Reviews Section */}
        {/* <div className="mt-12">
          <h3 className="text-2xl font-extrabold text-pink-700 mb-6 text-center">
            {t('customerReviewForm.reviewsSection.header')}
          </h3>

          {isLoadingReviews ? (
            <p className="text-center text-pink-500">
              {t('customerReviewForm.reviewsSection.loading')}
            </p>
          ) : reviewsError ? (
            <p className="text-center text-red-600">{reviewsError}</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-pink-600 font-medium">
              {t('customerReviewForm.reviewsSection.noReviews')}
            </p>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {reviews.map(({ _id, name, rating, comment }) => (
                <div
                  key={_id}
                  className="bg-pink-50 rounded-xl p-5 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-pink-700 font-semibold">{name}</p>
                    <p className="text-yellow-400 text-xl select-none">
                      {t('customerReviewForm.ratingStars').repeat(rating)}{' '}
                      <span className="text-pink-500 font-medium ml-1">
                        {`(${rating})`}
                      </span>
                    </p>
                  </div>
                  <p className="text-pink-800">{comment}</p>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CustomerReviewForm;
