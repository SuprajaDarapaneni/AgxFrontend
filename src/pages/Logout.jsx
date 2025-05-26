import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token
    localStorage.removeItem('admin-token');

    // Optional: clear other sensitive info
    localStorage.clear(); // if you want a full clear

    // Redirect to login page
    navigate('/auth');
  }, [navigate]);

  return null; // No UI needed for logout
};

export default Logout;
