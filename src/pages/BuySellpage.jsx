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

    if (!formData.name.trim() || !/^[a-zA-Z\s]{2,50}$/.test(formData.name)) {
      setErrorMessage(t('form.validation.name') || 'Please enter a valid name (2-50 letters).');
      setIsSubmitDisabled(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage(t('form.validation.email') || 'Invalid email format.');
      setIsSubmitDisabled(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMessage(t('form.validation.phone') || 'Phone number should contain 8 to 15 digits only.');
      setIsSubmitDisabled(false);
      return;
    }

    if (formData.industries.length === 0) {
      setErrorMessage(t('form.validation.industries') || 'Please select at least one industry.');
      setIsSubmitDisabled(false);
      return;
    }

    if (formData.industries.includes('Other') && formData.otherIndustry.trim() === '') {
      setErrorMessage(t('form.validation.otherIndustry') || 'Please specify the "Other" industry.');
      setIsSubmitDisabled(false);
      return;
    }

    if (!formData.dropOffLocation.trim()) {
      setErrorMessage(t('form.validation.location') || 'Please provide your location.');
      setIsSubmitDisabled(false);
      return;
    }

    if (!formData.country) {
      setErrorMessage(t('form.validation.country') || 'Please select your country.');
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
        imageUrls: uploadedImageUrls,
      };

      const response = await fetch('https://agxbackend.onrender.com/buyform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setSuccessMessage(t('form.successMessage') || 'Review submitted successfully.');

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
        });
        setFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }

        // Hide success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setErrorMessage(t('form.failureMessage') || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(t('form.errorMessage') || 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  const locationLabelKey = formData.buySell === 'buy' ? 'DropOffLocation' : 'PickUpLocation';

  return (
    <>
      <Helmet>
        <title>{t('form.pageTitle') || 'Global Trade Inquiry Buy/Sell With Us'}</title>
        <meta
          name="description"
          content={t('form.pageDescription') || 'Submit your buy or sell request with AGX-International using our easy-to-use form.'}
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 flex items-center justify-center px-6 py-8">
        <section className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-pink-200 space-y-8">
          <h1 className="text-3xl font-bold text-pink-600 text-center">
            Global Trade Inquiry{' '}
            <span className="uppercase font-bold">Buy/Sell</span>{' '}
            With Us
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset className="flex justify-center space-x-6 mb-6" aria-label={t('form.buySellChoice')}>
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
                  <span className="ml-2 capitalize">{t(`form.${option}`)}</span>
                </label>
              ))}
            </fieldset>

            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-pink-600 font-medium mb-1">
                {t('form.name')}<span className="text-red-500">*</span>
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
                placeholder={t('form.name')}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                aria-describedby="nameHelp"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-pink-600 font-medium mb-1">
                {t('form.phone')}<span className="text-red-500">*</span>
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
                placeholder={t('form.phone')}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                aria-describedby="phoneHelp"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-pink-600 font-medium mb-1">
                {t('form.email')}<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('form.email')}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                aria-describedby="emailHelp"
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <label htmlFor="dropOffLocation" className="block text-pink-600 font-medium mb-1">
                {t(locationLabelKey)}<span className="text-red-500">*</span>
              </label>
              <input
                id="dropOffLocation"
                name="dropOffLocation"
                type="text"
                required
                maxLength="100"
                value={formData.dropOffLocation}
                onChange={handleChange}
                placeholder={'Town/City/State'}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Country */}
            <div className="mb-6">
              <label htmlFor="country" className="block text-pink-600 font-medium mb-1">
                {t('form.country')}<span className="text-red-500">*</span>
              </label>
              <Select
                id="country"
                name="country"
                options={COUNTRY_OPTIONS}
                value={COUNTRY_OPTIONS.find(c => c.value === formData.country) || null}
                onChange={(selected) => setFormData(prev => ({ ...prev, country: selected ? selected.value : '' }))}
                placeholder={t('form.selectCountry')}
                className="react-select-container"
                classNamePrefix="react-select"
                aria-label={t('form.country')}
                isSearchable
                required
              />
            </div>

            {/* Industries */}
            <div className="mb-6">
              <label htmlFor="industries" className="block text-pink-600 font-medium mb-1">
                {t('form.industries')}<span className="text-red-500">*</span>
              </label>
              <Select
                id="industries"
                name="industries"
                options={INDUSTRY_OPTIONS}
                value={INDUSTRY_OPTIONS.filter(opt => formData.industries.includes(opt.value))}
                onChange={handleIndustrySelect}
                placeholder={t('form.selectIndustries')}
                className="react-select-container"
                classNamePrefix="react-select"
                isMulti
                aria-label={t('form.industries')}
              />
              {formData.industries.includes('Other') && (
                <input
                  type="text"
                  name="otherIndustry"
                  value={formData.otherIndustry}
                  onChange={handleChange}
                  placeholder={t('form.otherIndustryPlaceholder')}
                  className="mt-2 w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                  aria-label={t('form.otherIndustry')}
                />
              )}
            </div>

            {/* Timing */}
            <div className="mb-6">
              <label htmlFor="timing" className="block text-pink-600 font-medium mb-1">
                {t('form.timing')}
              </label>
              <select
                id="timing"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                aria-label={t('form.timing')}
              >
                {['Immediately', 'Next Week', 'Next Month', 'Not Sure'].map(option => (
                  <option key={option} value={option}>
                    {t(`form.timingOptions.${option}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-pink-600 font-medium mb-1">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form.messagePlaceholder')}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label htmlFor="images" className="block text-pink-600 font-medium mb-1">
                {t('form.uploadImages')}
              </label>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full text-pink-600"
                aria-describedby="imagesHelp"
              />
              {files.length > 0 && (
                <p className="mt-2 text-pink-700">{files.length} {t('form.filesSelected')}</p>
              )}
            </div>

            {/* Messages */}
            {successMessage && (
              <div
                role="alert"
                className="mb-4 p-4 text-green-700 bg-green-100 rounded"
              >
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 p-4 text-red-700 bg-red-100 rounded"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-3 font-semibold text-white rounded-lg ${
                isSubmitDisabled ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
              }`}
              aria-live="polite"
            >
              {t('form.submit')}
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default BuySellForm;
