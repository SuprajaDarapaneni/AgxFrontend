import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Load translations from backend
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next) // Connect with React
  .init({
    fallbackLng: 'en',
    debug: false, // Set to true only during development

    // Namespace configuration
    ns: ['translation'],         // Default namespace
    defaultNS: 'translation',    // Namespace to use if none is specified

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to load translations
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: true, // If using React Suspense for lazy loading
    }
  });

export default i18n;
