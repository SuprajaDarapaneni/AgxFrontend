import React, { useState } from 'react';
import Select from 'react-select';

const INDUSTRY_OPTIONS = [
  { value: 'Agricultural Products', label: 'Agricultural Products' },
  { value: 'Textiles and Garments', label: 'Textiles and Garments' },
  { value: 'Automobiles and Parts', label: 'Automobiles and Parts' },
  { value: 'Machinery and Tools', label: 'Machinery and Tools' },
  { value: 'Home Decor', label: 'Home Decor' },
  { value: 'Imitation Jewellery', label: 'Imitation Jewellery' },
  { value: 'Cosmetics', label: 'Cosmetics' },
];

const COUNTRY_OPTIONS = [
  'India',
  'United States',
  'China',
  'Germany',
  'Brazil',
  'United Kingdom',
  'United Arab Emirates',
  'Other',
];

const BuySellForm = () => {
  const [formData, setFormData] = useState({
    buySell: 'buy',
    name: '',
    phone: '',
    email: '',
    country: '',
    industries: [],
    timing: 'Immediately',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIndustrySelect = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      industries: selectedOptions.map(option => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    setSuccessMessage('');

    try {
      const response = await fetch('https://agxbackend.onrender.com/buyform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('🎉 Your request has been submitted successfully!');
        setFormData({
          buySell: 'buy',
          name: '',
          phone: '',
          email: '',
          country: '',
          industries: [],
          timing: 'Immediately',
        });
      } else {
        setSuccessMessage('❌ Submission failed. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('⚠️ Something went wrong. Please try later.');
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-xl border border-pink-200 space-y-6">
        {/* <div className="text-center">
          <h2 className="text-4xl font-bold text-pink-700">Connecting Continents with Confidence</h2>
          <p className="text-pink-500 mt-2 text-lg">Seamless Global Trade Starts Here</p>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Buy or Sell */}
          <div className="flex justify-center space-x-6">
            {['buy', 'sell'].map(option => (
              <label key={option} className="inline-flex items-center text-lg font-medium text-pink-600">
                <input
                  type="radio"
                  name="buySell"
                  value={option}
                  checked={formData.buySell === option}
                  onChange={handleChange}
                  className="form-radio text-pink-500 w-5 h-5"
                />
                <span className="ml-2 capitalize">{option}</span>
              </label>
            ))}
          </div>

          {/* Input Fields */}
          {[
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
            { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Enter phone number' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email address' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-pink-600 font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          ))}

          {/* Country Dropdown */}
          <div>
            <label className="block text-pink-600 font-medium mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-pink-300 px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-pink-400"
            >
              <option value="" disabled>Select your country</option>
              {COUNTRY_OPTIONS.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Industries Multi-Select Dropdown using react-select */}
          <div>
            <label className="block text-pink-600 font-medium mb-1">Select Industries</label>
            <Select
              options={INDUSTRY_OPTIONS}
              isMulti
              value={INDUSTRY_OPTIONS.filter(opt => formData.industries.includes(opt.value))}
              onChange={handleIndustrySelect}
              className="text-gray-900"
              classNamePrefix="select"
            />
          </div>

          {/* Timing Dropdown */}
          <div>
            <label className="block text-pink-600 font-medium mb-1">Preferred Timing</label>
            <select
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              className="w-full border border-pink-300 px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-pink-400"
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
              className={`w-full py-3 font-bold text-white rounded-lg transition duration-300
                ${isSubmitDisabled ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'}
              `}
            >
              {isSubmitDisabled ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <p className="text-center text-green-600 font-semibold">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BuySellForm;
