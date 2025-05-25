import React, { useState } from 'react';

// Updated list of industries
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

    try {
      const response = await fetch('http://localhost:9000/buyform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Using console.log instead of alert for better UX
        console.log('Form submitted successfully!');
        // Optionally show a success message in the UI
        setFormData({
          buySell: 'buy',
          name: '',
          phone: '',
          email: '',
          industries: [],
          timing: 'Immediately',
        });
      } else {
        // Using console.error instead of alert
        console.error('Failed to submit form. Status:', response.status);
        // Optionally show an error message in the UI
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally show an error message in the UI
    } finally {
      setIsSubmitDisabled(false);
    }
  };


  return (
    // Changed background to a light pink shade
    <div className="min-h-screen bg-pink-100 text-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl"> {/* Added white background and shadow */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Form</h2> {/* Changed text color */}
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">

            {/* Buy/Sell Radio Buttons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="buy"
                  type="radio"
                  name="buySell"
                  value="buy"
                  checked={formData.buySell === 'buy'}
                  onChange={handleChange}
                  // Adjusted radio button color
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                />
                <label htmlFor="buy" className="ml-2 text-sm font-medium text-gray-700"> {/* Changed text color */}
                  Buy
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sell"
                  type="radio"
                  type="radio"
                  name="buySell"
                  value="sell"
                  checked={formData.buySell === 'sell'}
                  onChange={handleChange}
                   // Adjusted radio button color
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                />
                <label htmlFor="sell" className="ml-2 text-sm font-medium text-gray-700"> {/* Changed text color */}
                  Sell
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700"> {/* Changed text color */}
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                // Adjusted input styling for white background theme
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm text-gray-900 bg-white"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700"> {/* Changed text color */}
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                 // Adjusted input styling for white background theme
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm text-gray-900 bg-white"
                placeholder="Your Phone Number"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700"> {/* Changed text color */}
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                 // Adjusted input styling for white background theme
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm text-gray-900 bg-white"
                placeholder="Your Email Address"
                required
              />
            </div>

            {/* Industries Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"> {/* Changed text color */}
                Select Industries (You can select multiple)
              </label>
              <div className="space-y-2">
                {INDUSTRY_OPTIONS.map((industry) => (
                  <div key={industry} className="flex items-center">
                    <input
                      type="checkbox"
                      id={industry}
                      value={industry}
                      checked={formData.industries.includes(industry)}
                      onChange={handleIndustryChange}
                      // Adjusted checkbox color
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor={industry} className="ml-2 text-sm text-gray-700"> {/* Changed text color */}
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Timing Select */}
            <div>
              <label htmlFor="timing" className="block text-sm font-medium text-gray-700"> {/* Changed text color */}
                When do you want to buy/sell?
              </label>
              <select
                name="timing"
                id="timing"
                value={formData.timing}
                onChange={handleChange}
                 // Adjusted select styling for white background theme
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm text-gray-900 bg-white"
              >
                <option value="Immediately">Immediately</option>
                <option value="0-20days">0-20 days</option>
                <option value="20-45days">20-45 days</option>
                <option value="45-60days">45-60 days</option>
                <option value="60-90days">60-90 days</option>
                <option value="90-120days">90-120 days</option>
              </select>
            </div>

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              // Adjusted button styling for pink theme
              className={`w-full py-2 px-4 text-white font-medium rounded-md ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'}`}
            >
              {isSubmitDisabled ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuySellForm;
