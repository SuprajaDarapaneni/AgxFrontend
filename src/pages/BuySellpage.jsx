import React, { useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('https://agxbackend-1.onrender.com/buyform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(t('form.successMessage'));
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
      } else {
        setErrorMessage(t('form.failureMessage'));
      }
    } catch (error) {
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

      <main
        className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 flex items-center justify-center px-6 py-8"
        aria-label={t('form.ariaLabel') || 'Buy or Sell Request Form'}
      >
        <section
          className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-pink-200 space-y-8"
          aria-labelledby="form-heading"
        >
          <h1
            id="form-heading"
            className="text-3xl font-bold text-pink-600 text-center"
          >
            {t('form.heading') || 'Buy/Sell Request Form'}
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Buy or Sell */}
            <fieldset className="flex justify-center space-x-6 mb-6" aria-label={t('form.buySellGroupAria') || 'Select buy or sell'}>
              <legend className="sr-only">{t('form.buySellLegend') || 'Buy or Sell'}</legend>
              {['buy', 'sell'].map(option => (
                <label key={option} className="inline-flex items-center text-lg font-medium text-pink-600 cursor-pointer">
                  <input
                    type="radio"
                    name="buySell"
                    value={option}
                    checked={formData.buySell === option}
                    onChange={handleChange}
                    className="form-radio text-pink-500 w-5 h-5"
                    aria-checked={formData.buySell === option}
                  />
                  <span className="ml-2 capitalize">{t(`form.${option}`)}</span>
                </label>
              ))}
            </fieldset>

            {/* Input Fields */}
            {[
              { labelKey: 'name', name: 'name', type: 'text', placeholderKey: 'name' },
              { labelKey: 'phone', name: 'phone', type: 'tel', placeholderKey: 'phone' },
              { labelKey: 'email', name: 'email', type: 'email', placeholderKey: 'email' },
            ].map(({ labelKey, name, type, placeholderKey }) => (
              <div key={name} className="mb-6">
                <label htmlFor={name} className="block text-pink-600 font-medium mb-1">
                  {t(`form.${labelKey}`)}
                </label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={t(`form.${placeholderKey}`)}
                  required
                  className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  aria-required="true"
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
                aria-required="true"
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
                options={INDUSTRY_OPTIONS}
                isMulti
                value={INDUSTRY_OPTIONS.filter(opt => formData.industries.includes(opt.value))}
                onChange={handleIndustrySelect}
                className="text-gray-900"
                classNamePrefix="select"
                aria-describedby="industries-desc"
                aria-label={t('form.industries')}
              />
              <p id="industries-desc" className="text-sm text-gray-500 mt-1">
                {t('form.industriesHelper') || 'Select one or more industries'}
              </p>
            </div>

            {/* Timing Dropdown */}
            <div className="mb-6">
              <label htmlFor="timing" className="block text-pink-600 font-medium mb-1">
                {t('form.timing')}
              </label>
              <select
                id="timing"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-pink-400"
              >
                <option value="Immediately">{t('form.immediately')}</option>
                <option value="0-20days">{t('form.days0to20')}</option>
                <option value="20-45days">{t('form.days20to45')}</option>
                <option value="45-60days">{t('form.days45to60')}</option>
                <option value="60-90days">{t('form.days60to90')}</option>
                <option value="90-120days">{t('form.days90to120')}</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-pink-600 font-medium mb-1">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form.messagePlaceholder')}
                rows={4}
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
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
                aria-busy={isSubmitDisabled}
              >
                {isSubmitDisabled ? t('form.submitting') : t('form.submitRequest')}
              </button>
            </div>

            {/* Success / Error Messages */}
            {(successMessage || errorMessage) && (
              <p
                className={`text-center font-semibold mt-4 ${
                  successMessage ? 'text-green-600' : 'text-red-600'
                }`}
                role="alert"
              >
                {successMessage || errorMessage}
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default BuySellForm;
