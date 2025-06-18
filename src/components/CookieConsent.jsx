import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_EXPIRY_DAYS = 1;

const CookieConsent = () => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const { status, timestamp } = JSON.parse(savedConsent);
        const now = Date.now();
        const expiryTime = timestamp + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        if (now < expiryTime) {
          setConsent(status);
        } else {
          localStorage.removeItem('cookieConsent');
        }
      } catch {
        localStorage.removeItem('cookieConsent');
      }
    }
  }, []);

  const saveConsent = (status) => {
    const consentData = {
      status,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setConsent(status);
  };

  if (consent) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: 'linear-gradient(90deg, #001F3F, #0074D9)',
        color: '#fff',
        padding: '1.5rem 2rem',
        fontFamily: "'Segoe UI', sans-serif",
        boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 9999,
        animation: 'fadeInUp 0.6s ease-out',
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <style>{`
        @keyframes fadeInUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        button:hover {
          filter: brightness(110%);
        }
        a {
          text-decoration: underline;
          color:rgb(231, 50, 156);
        }
      `}</style>

      <div style={{ maxWidth: '60%', minWidth: '260px', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 600 }}>
          AGX Global | Enhancing Trade, Powered by Trust
        </h3>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
          We use cookies to optimize your browsing experience and ensure secure, seamless logistics services globally.
          By clicking <strong>"Accept"</strong>, you consent to our use of cookies in accordance with our{' '}
          <Link to="/legal/privacy">Privacy Policy</Link> and <Link to="/legal/terms">Terms & Conditions</Link>.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => saveConsent('accepted')}
          style={{
            backgroundColor: '#ffd700',
            color: '#001F3F',
            border: 'none',
            padding: '0.6rem 1.4rem',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(255, 215, 0, 0.5)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Accept
        </button>
        <button
          onClick={() => saveConsent('rejected')}
          style={{
            backgroundColor: 'transparent',
            color: '#fff',
            border: '2px solid #fff',
            padding: '0.6rem 1.4rem',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
