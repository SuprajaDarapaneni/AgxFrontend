import React, { useState } from 'react';
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
    country: '',
    industries: [],
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
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    setSuccessMessage('');
    setErrorMessage('');

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

      const finalData = {
        ...formData,
        imageUrls: uploadedImageUrls,
      };

      const response = await fetch('https://agxbackend-1.onrender.com/buyform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setSuccessMessage(
          t('form.successMessage') +
          (uploadedImageUrls.length > 0
            ? `\n\n${t('form.uploadedImages') || 'Uploaded Images:'}\n${uploadedImageUrls.join('\n')}`
            : '')
        );

        setFormData({
          buySell: 'buy',
          name: '',
          phone: '',
          email: '',
          country: '',
          industries: [],
          timing: 'Immediately',
          message: '',
        });
        setFiles([]);
      } else {
        setErrorMessage(t('form.failureMessage'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(t('form.errorMessage'));
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('form.pageTitle') || 'Buy/Sell Request Form - AGX International'}</title>
        <meta
          name="description"
          content={t('form.pageDescription') || 'Submit your buy or sell request with AGX International using our easy-to-use form.'}
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 flex items-center justify-center px-6 py-8">
        <section className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-pink-200 space-y-8">
          <h1 className="text-3xl font-bold text-pink-600 text-center">
            {t('form.heading') || 'Buy/Sell Request Form'}
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Buy/Sell Radio */}
            <fieldset className="flex justify-center space-x-6 mb-6">
              {['buy', 'sell'].map(option => (
                <label key={option} className="inline-flex items-center text-lg font-medium text-pink-600 cursor-pointer">
                  <input
                    type="radio"
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

            {/* Input Fields */}
            {[
              { labelKey: 'name', name: 'name', type: 'text' },
              { labelKey: 'phone', name: 'phone', type: 'tel' },
              { labelKey: 'email', name: 'email', type: 'email' },
            ].map(({ labelKey, name, type }) => (
              <div key={name} className="mb-6">
                <label htmlFor={name} className="block text-pink-600 font-medium mb-1">
                  {t(`form.${labelKey}`)}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={t(`form.${labelKey}`)}
                  required
                  className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                />
              </div>
            ))}

            {/* Country Dropdown */}
            <div className="mb-6">
              <label htmlFor="country" className="block text-pink-600 font-medium mb-1">
                {t('form.country')}
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-pink-400"
              >
                <option value="" disabled>{t('form.selectCountry')}</option>
                {COUNTRY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Industries Multi-Select */}
            <div className="mb-6">
              <label htmlFor="industries" className="block text-pink-600 font-medium mb-1">
                {t('form.industries')}
              </label>
              <Select
                inputId="industries"
                isMulti
                options={INDUSTRY_OPTIONS}
                value={INDUSTRY_OPTIONS.filter(opt => formData.industries.includes(opt.value))}
                onChange={handleIndustrySelect}
                classNamePrefix="select"
              />
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
                className="w-full border border-pink-300 px-4 py-3 rounded-lg"
              >
                <option value="Immediately">{t('form.immediately')}</option>
                <option value="0-20days">{t('form.days0to20')}</option>
                <option value="20-45days">{t('form.days20to45')}</option>
                <option value="45-60days">{t('form.days45to60')}</option>
                <option value="60-90days">{t('form.days60to90')}</option>
                <option value="90-120days">{t('form.days90to120')}</option>
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
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label htmlFor="files" className="block text-pink-600 font-medium mb-1">
                {t('form.attachFiles')}
              </label>
              <input
                id="files"
                name="files"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
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
                {isSubmitDisabled ? t('form.submitting') : t('form.submitRequest')}
              </button>
            </div>

            {/* Messages */}
            {(successMessage || errorMessage) && (
              <div className="mt-4 text-center whitespace-pre-line">
                <p className={`font-semibold ${successMessage ? 'text-green-600' : 'text-red-600'}`}>
                  {successMessage || errorMessage}
                </p>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default BuySellForm;
