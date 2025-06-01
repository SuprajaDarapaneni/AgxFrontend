import React, { useState } from 'react';

const Admin = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const clearImage = () => setImage(null);

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin Page</h1>

      <label htmlFor="imageUpload" style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
        Upload an Image:
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
          <h2>Image Preview:</h2>
          <img
            src={image}
            alt="Preview"
            style={{ width: '100%', maxWidth: 300, height: 'auto', borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
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
            Clear Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
