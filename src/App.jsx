import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from './pages/Dashboard';
import Productsadmin from './pages/productsadmin'; // Changed 'productsadmin' to 'Productsadmin'

import Admin from './pages/Auth';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Products from './pages/Products';
import Services from './pages/services';
import Contact from './pages/Contact';
import BuySellpage from './pages/BuySellpage';
import ProductDetails from './pages/ProductDetails';
import Review from './pages/Review';
import BlogDetail from './pages/BlogDetail';


// Sub-component to handle routes and conditionally hide header/footer
const AppContent = () => {
  const location = useLocation();
  // Check if the current path starts with '/admin' or '/Admin' (case-insensitive for robustness)
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Header based on isAdminRoute */}
      {!isAdminRoute && <Header />}

      <main className="flex-grow pt-24 px-4">
        {/* Define all application routes */}
        <Routes>
          {/* Frontend Routes */}
          
           
            {/* <Route path="/blogs" element={<ProtectedRoute><BlogsPage /></ProtectedRoute>} />
              <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
              <Route path="/logout" element={<Logout />} /> */}
         
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buy-sell" element={<BuySellpage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          {/* Admin Routes */}
          <Route path="/Admin/Admindashboard" element={<AdminDashboard />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Conditionally render WhatsAppButton and Footer based on isAdminRoute */}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

// Main App component that sets up the Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;