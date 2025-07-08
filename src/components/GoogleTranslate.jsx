import { useEffect, useState } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = ({ showTranslate }) => {
  const [isInitialized, setIsInitialized] = useState(false); // Track if the widget is initialized
  const [scriptLoaded, setScriptLoaded] = useState(false); // Track if the script is loaded

  useEffect(() => {
    // Check if the Google Translate script is already added to avoid reloading
    const existingScript = document.querySelector(
      'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]',
    );

    if (!existingScript) {
      const addGoogleTranslateScript = () => {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;

        // Handle script load event
        script.onload = () => {
          setScriptLoaded(true);
        };

        document.body.appendChild(script);
      };

      // Load the Google Translate script
      addGoogleTranslateScript();
    } else {
      setScriptLoaded(true); // Script is already loaded
    }
  }, []);

  useEffect(() => {
    // Initialize Google Translate when the script is loaded
    if (scriptLoaded && !isInitialized) {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,bn,te,mr,ta,gu,ur,pa,kn,ml,or,as,sa,kok,mai,doi,brx,sat,ks,sd", // Indian languages
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element",
        );
        setIsInitialized(true); // Mark initialization complete
      };

      // Initialize immediately if the Google Translate API is ready
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    }
  }, [scriptLoaded, isInitialized]);

  return (
    <div
      id="google_translate_element"
      className={showTranslate ? "show" : ""}
    />
  );
};

export default GoogleTranslate;
