import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dz5noprbz/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

const INDUSTRY_OPTIONS_RAW = [
  'Agricultural Products',
  'Textiles and Garments',
  'Automobiles and Parts',
  'Machinery and Tools',
  'Home Decor',
  'Imitation Jewellery',
  'Cosmetics',
  'Other',
];

const COUNTRY_OPTIONS_RAW = [
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
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const INDUSTRY_OPTIONS = INDUSTRY_OPTIONS_RAW.map(item => ({
    value: item,
    label: t(`industryOptions.${item}`),
  }));

  const COUNTRY_OPTIONS = COUNTRY_OPTIONS_RAW.map(item => ({
    value: item,
    label: t(`countryOptions.${item}`),
  }));

  const [formData, setFormData] = useState({
    buySell: 'buy',
    name: '',
    phone: '',
    email: '',
    dropOffLocation: '',
    country: '',
    industries: [],
    otherIndustry: '',
    timing: 'Immediately',
    message: '',
    expectedDate: '',
  });

  const [files, setFiles] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIndustrySelect = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      industries: selectedOptions ? selectedOptions.map(option => option.value) : [],
      otherIndustry: selectedOptions && selectedOptions.some(o => o.value === 'Other') ? prev.otherIndustry : '',
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{8,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validation
    if (!formData.name.trim() || !/^[a-zA-Z\s]{2,50}$/.test(formData.name)) {
      setErrorMessage('Please enter a valid name (2-50 letters).');
      setIsSubmitDisabled(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('Invalid email format.');
      setIsSubmitDisabled(false);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrorMessage('Phone number should contain 8 to 15 digits only.');
      setIsSubmitDisabled(false);
      return;
    }
    if (formData.industries.length === 0) {
      setErrorMessage('Please select at least one industry.');
      setIsSubmitDisabled(false);
      return;
    }
    if (formData.industries.includes('Other') && formData.otherIndustry.trim() === '') {
      setErrorMessage('Please specify the "Other" industry.');
      setIsSubmitDisabled(false);
      return;
    }
    if (!formData.dropOffLocation.trim()) {
      setErrorMessage('Please provide your location.');
      setIsSubmitDisabled(false);
      return;
    }
    if (!formData.country) {
      setErrorMessage('Please select your country.');
      setIsSubmitDisabled(false);
      return;
    }
    if (!formData.expectedDate) {
      setErrorMessage('Please select the expected date.');
      setIsSubmitDisabled(false);
      return;
    }

    try {
      const uploadedImageUrls = [];

      for (const file of files) {
        const cloudForm = new FormData();
        cloudForm.append('file', file);
        cloudForm.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const cloudRes = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: cloudForm,
        });

        const cloudData = await cloudRes.json();
        if (cloudData.secure_url) {
          uploadedImageUrls.push(cloudData.secure_url);
        } else {
          throw new Error('Image upload failed');
        }
      }

      const finalIndustries = formData.industries.includes('Other') && formData.otherIndustry
        ? [...formData.industries.filter(ind => ind !== 'Other'), formData.otherIndustry]
        : formData.industries;

      const finalData = {
        buySell: formData.buySell,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        dropOffLocation: formData.dropOffLocation.trim(),
        country: formData.country,
        industries: finalIndustries,
        timing: formData.timing,
        message: formData.message.trim(),
        expectedDate: formData.expectedDate,
        imageUrls: uploadedImageUrls,
      };

      const response = await fetch('https://agxbackend.onrender.com/buyform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setSuccessMessage('Form submitted successfully.');
        setFormData({
          buySell: 'buy',
          name: '',
          phone: '',
          email: '',
          dropOffLocation: '',
          country: '',
          industries: [],
          otherIndustry: '',
          timing: 'Immediately',
          message: '',
          expectedDate: '',
        });
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        setErrorMessage('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Global Trade Inquiry Buy/Sell With Us</title>
        <meta
          name="description"
          content="Submit your buy or sell request with AGX-International using our easy-to-use form."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 flex items-center justify-center px-6 py-8">
        <section className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-pink-200 space-y-8">
          <h1 className="text-2xl font-bold text-pink-600 text-center">
            Global Trade Inquiry Buy/Sell With Us
          </h1>
          <p className="text-center text-gray-800 mt-2">
            Submit your buying or selling interest below. Our trade team will review and respond with tailored
            solutions.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset className="flex justify-center space-x-6 mb-6">
              {['buy', 'sell'].map(option => (
                <label
                  key={option}
                  className="inline-flex items-center text-lg font-medium text-pink-600 cursor-pointer"
                  htmlFor={`buySell-${option}`}
                >
                  <input
                    type="radio"
                    id={`buySell-${option}`}
                    name="buySell"
                    value={option}
                    checked={formData.buySell === option}
                    onChange={handleChange}
                    className="form-radio text-pink-500 w-5 h-5"
                  />
                  <span className="ml-2 capitalize">{option}</span>
                </label>
              ))}
            </fieldset>

            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-pink-600 font-medium mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                pattern="^[a-zA-Z\s]{2,50}$"
                maxLength="50"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-pink-600 font-medium mb-1">
                Phone<span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                pattern="^\d{8,15}$"
                maxLength="15"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-pink-600 font-medium mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <label htmlFor="dropOffLocation" className="block text-pink-600 font-medium mb-1">
                {formData.buySell === 'buy' ? 'Drop-Off Location' : 'Pick-Up Location'}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="dropOffLocation"
                name="dropOffLocation"
                type="text"
                required
                value={formData.dropOffLocation}
                onChange={handleChange}
                placeholder="Town/City/State"
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Country */}
            <div className="mb-6">
              <label htmlFor="country" className="block text-pink-600 font-medium mb-1">
                Country<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Industries */}
            <div className="mb-6">
              <label htmlFor="industries" className="block text-pink-600 font-medium mb-1">
                Industries<span className="text-red-500">*</span>
              </label>
              <Select
                inputId="industries"
                isMulti
                options={INDUSTRY_OPTIONS}
                value={INDUSTRY_OPTIONS.filter(opt => formData.industries.includes(opt.value))}
                onChange={handleIndustrySelect}
              />
              {formData.industries.includes('Other') && (
                <input
                  type="text"
                  name="otherIndustry"
                  required
                  placeholder="Please specify other industry"
                  value={formData.otherIndustry}
                  onChange={handleChange}
                  className="mt-3 w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                />
              )}
            </div>

            {/* Expected Date */}
            <div className="mb-6">
              <label htmlFor="expectedDate" className="block text-pink-600 font-medium mb-1">
                {formData.buySell === 'buy'
                  ? 'When are you expecting the shipment?'
                  : 'When will the products be ready to ship?'}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="expectedDate"
                name="expectedDate"
                type="date"
                required
                value={formData.expectedDate}
                onChange={handleChange}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-pink-600 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                maxLength="500"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400 resize-none"
              />
            </div>

            {/* Upload Image */}
            <div className="mb-6">
              <label htmlFor="images" className="block text-pink-600 font-medium mb-1">
                Upload the Image
              </label>
              <input
                ref={fileInputRef}
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-pink-600"
              />
              {files.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">{files.length} file(s) selected</p>
              )}
            </div>

            {/* Messages */}
            {errorMessage && <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 font-semibold mb-4">{successMessage}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                isSubmitDisabled ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
              } transition-colors duration-300`}
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default BuySellForm;
