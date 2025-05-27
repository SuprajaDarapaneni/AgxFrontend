import React, { useState } from 'react';

const Admin = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f9f0ff 0%, #fce4ec 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2.5rem',
          borderRadius: '12px',
          boxShadow: '0 15px 30px rgba(236, 72, 153, 0.25)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#db2777', marginBottom: '1.5rem' }}>
          Admin Image Upload
        </h1>

        <label
          htmlFor="image-upload"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.4rem',
            backgroundColor: '#ec4899',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
            marginBottom: '1.5rem',
            userSelect: 'none',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#db2777')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#ec4899')
          }
        >
          Choose Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        {image && (
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ color: '#444', marginBottom: '1rem' }}>
              Image Preview
            </h2>
            <img
              src={image}
              alt="Preview"
              style={{
                maxWidth: '100%',
                borderRadius: '12px',
                boxShadow: '0 10px 20px rgba(236, 72, 153, 0.3)',
                transition: 'transform 0.3s ease',
                cursor: 'zoom-in',
              }}
              onClick={() => window.open(image, '_blank')}
              title="Click to open full size"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
