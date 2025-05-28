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
    <div>
      <h1>Admin Page</h1>
      
     
      <input type="file" onChange={handleImageChange} />
      
      
      {image && (
        <div>
          <h2>Image Preview:</h2>
          <img src={image} alt="Preview" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default Admin;