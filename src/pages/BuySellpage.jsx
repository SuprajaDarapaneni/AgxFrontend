import React, { useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

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

  // Map raw options to translated label/value objects for react-select
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
    message: '',  // <-- Added message field here
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
      industries: selectedOptions ? selectedOptions.map(option => option.value) : [],
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
        setSuccessMessage(t('form.successMessage'));
        setFormData({
          buySell: 'buy',
          name: '',
          phone: '',
          email: '',
          country: '',
          industries: [],
          timing: 'Immediately',
          message: '',  // <-- Reset message here too
        });
      } else {
        setSuccessMessage(t('form.failureMessage'));
      }
    } catch (error) {
      setSuccessMessage(t('form.errorMessage'));
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 flex items-center justify-center px-0 py-0">
      <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-xl border border-pink-200 space-y-6">
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
                <span className="ml-2 capitalize">{t(`form.${option}`)}</span>
              </label>
            ))}
          </div>

          {/* Input Fields */}
          {[
            { labelKey: 'name', name: 'name', type: 'text', placeholderKey: 'name' },
            { labelKey: 'phone', name: 'phone', type: 'tel', placeholderKey: 'phone' },
            { labelKey: 'email', name: 'email', type: 'email', placeholderKey: 'email' },
          ].map(({ labelKey, name, type, placeholderKey }) => (
            <div key={name}>
              <label className="block text-pink-600 font-medium mb-1">{t(`form.${labelKey}`)}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={t(`form.${placeholderKey}`)}
                required
                className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          ))}

          {/* Country Dropdown */}
          <div>
            <label className="block text-pink-600 font-medium mb-1">{t('form.country')}</label>
            <select
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
          <div>
            <label className="block text-pink-600 font-medium mb-1">{t('form.industries')}</label>
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
            <label className="block text-pink-600 font-medium mb-1">{t('form.timing')}</label>
            <select
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
          <div>
            <label className="block text-pink-600 font-medium mb-1">{t('form.message')}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('form.messagePlaceholder')}
              rows={4}
              className="w-full border border-pink-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
            />
            <p className="mt-1 text-sm text-pink-500 italic">
              {t('form.messageNote')}
            </p>
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
