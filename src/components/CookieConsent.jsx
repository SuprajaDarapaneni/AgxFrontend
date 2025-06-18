import React, { useState, useEffect } from 'react';

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
        background: 'linear-gradient(90deg, #004080 0%, #0073e6 100%)',
        color: '#fff',
        boxShadow: '0 -4px 15px rgba(0, 115, 230, 0.5)',
        padding: '1.25rem 2rem',
        fontFamily: "'Roboto', sans-serif",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 9999,
        animation: 'slideUp 0.5s ease-out',
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        button:focus {
          outline: 2px solid #ffd700;
          outline-offset: 2px;
        }
      `}</style>

      <div style={{ maxWidth: '65%', minWidth: '280px', marginBottom: '0.5rem' }}>
        <h2 style={{ margin: '0 0 0.3rem 0', fontWeight: '700', fontSize: '1.25rem' }}>
          AGX Global | International Trade Experts
        </h2>
        <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5' }}>
          We use cookies to enhance your journey with AGX — ensuring seamless logistics and supply chain solutions worldwide.
          By continuing, you agree to our cookie policy.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => saveConsent('accepted')}
          style={{
            backgroundColor: '#ffd700', // Golden yellow
            border: 'none',
            padding: '0.65rem 1.6rem',
            borderRadius: '30px',
            color: '#004080',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(255, 215, 0, 0.7)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 215, 0, 0.5)';
          }}
        >
          Accept
        </button>
        <button
          onClick={() => saveConsent('rejected')}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid #fff',
            padding: '0.65rem 1.6rem',
            borderRadius: '30px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.color = '#004080';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#fff';
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
