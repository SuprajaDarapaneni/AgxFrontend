import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Admin = () => {
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert(t('admin.invalidImage'));
    }
  };

  const clearImage = () => setImage(null);

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>{t('admin.title')}</h1>

      <label htmlFor="imageUpload" style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
        {t('admin.uploadLabel')}
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: '1rem' }}
      />

      {image && (
        <div>
          <h2>{t('admin.preview')}</h2>
          <img
            src={image}
            alt={t('admin.previewAlt')}
            style={{
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              borderRadius: 8,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          />
          <button
            onClick={clearImage}
            style={{
              marginTop: 12,
              padding: '8px 16px',
              backgroundColor: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {t('admin.clear')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
