import React, { useState } from 'react';

const INDUSTRY_OPTIONS = [
  'Agricultural Products',
  'Textiles and Garments',
  'Automobiles and Parts',
  'Machinery and Tools',
  'Home Decor',
  'Imitation Jewellery',
  'Cosmetics',
];

const BuySellForm = () => {
  const [formData, setFormData] = useState({
    buySell: 'buy',
    name: '',
    phone: '',
    email: '',
    industries: [],
    timing: 'Immediately',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIndustryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        industries: [...formData.industries, value],
      });
    } else {
      setFormData({
        ...formData,
        industries: formData.industries.filter(ind => ind !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    setSuccessMessage('');

    try {
      const response = await fetch('https://agxbackend.onrender.com/buyform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Your request has been submitted successfully! 🎉');
        setFormData({
          buySell: 'buy',
          name: '',
          phone: '',
          email: '',
          industries: [],
          timing: 'Immediately',
        });
      } else {
        setSuccessMessage('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-pink-200">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-pink-700 mb-2">
            Buy or Sell Form
          </h2>
          <p className="text-center text-pink-600 font-medium text-lg">
            Quickly submit your buying or selling request
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Buy/Sell Radio */}
          <div className="flex justify-center space-x-8 mb-6">
            {['buy', 'sell'].map((option) => (
              <label key={option} className="inline-flex items-center cursor-pointer text-lg font-semibold text-pink-700 hover:text-pink-900 transition-colors duration-200">
                <input
                  type="radio"
                  name="buySell"
                  value={option}
                  checked={formData.buySell === option}
                  onChange={handleChange}
                  className="form-radio h-6 w-6 text-pink-600 transition duration-200"
                />
                <span className="ml-2 capitalize">{option}</span>
              </label>
            ))}
          </div>

          {/* Inputs */}
          {[
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Your Name' },
            { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your Phone Number' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Your Email Address' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-semibold text-pink-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full rounded-lg border border-pink-300 px-4 py-3 text-gray-900 text-lg placeholder-pink-400
                  focus:border-pink-500 focus:ring-2 focus:ring-pink-400 focus:outline-none transition duration-300"
              />
            </div>
          ))}

          {/* Industries */}
          <fieldset>
            <legend className="text-pink-700 font-semibold mb-3 text-sm">
              Select Industries (multiple)
            </legend>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100">
              {INDUSTRY_OPTIONS.map(industry => (
                <label key={industry} className="inline-flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-colors duration-200">
                  <input
                    type="checkbox"
                    value={industry}
                    checked={formData.industries.includes(industry)}
                    onChange={handleIndustryChange}
                    className="form-checkbox h-5 w-5 text-pink-600 transition duration-200"
                  />
                  <span className="ml-2">{industry}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Timing */}
          <div>
            <label htmlFor="timing" className="block text-sm font-semibold text-pink-700 mb-1">
              When do you want to buy/sell?
            </label>
            <select
              id="timing"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              className="w-full rounded-lg border border-pink-300 px-4 py-3 text-gray-900 text-lg
                focus:border-pink-500 focus:ring-2 focus:ring-pink-400 focus:outline-none transition duration-300"
            >
              <option value="Immediately">Immediately</option>
              <option value="0-20days">0-20 days</option>
              <option value="20-45days">20-45 days</option>
              <option value="45-60days">45-60 days</option>
              <option value="60-90days">60-90 days</option>
              <option value="90-120days">90-120 days</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-3 text-white font-bold rounded-lg shadow-md
                ${isSubmitDisabled ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300' }
                transition duration-300`}
            >
              {isSubmitDisabled ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {/* Success message */}
          {successMessage && (
            <p className="mt-4 text-center text-green-600 font-semibold animate-fadeIn">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BuySellForm;
