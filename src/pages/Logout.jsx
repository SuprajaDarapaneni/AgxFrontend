import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear specific admin token
    localStorage.removeItem('admin-token');

    // Optional: clear all local storage for full cleanup
    // Be careful with this if other apps share localStorage
    // localStorage.clear();

    // Redirect user to login/auth page after clearing data
    navigate('/auth', { replace: true }); // 'replace' to avoid back navigation to protected routes
  }, [navigate]);

  return (
    // Optional: Provide user feedback while redirecting
    <main
      aria-live="polite"
      role="status"
      className="flex items-center justify-center h-screen text-gray-700 text-lg font-medium"
      tabIndex={-1}
    >
      Logging out...
    </main>
  );
};

export default Logout;
