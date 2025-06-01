import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Services = lazy(() => import('./pages/services'));
const Contact = lazy(() => import('./pages/Contact'));
const BuySellpage = lazy(() => import('./pages/BuySellpage'));
const Review = lazy(() => import('./pages/Review'));

const Admin = lazy(() => import('./pages/Auth'));
const AdminDashboard = lazy(() => import('./pages/Dashboard'));
const ProductsAdmin = lazy(() => import('./pages/ProductsAdmin'));
const AdminReview = lazy(() => import('./pages/ReviewsPage'));
const AdminBlog = lazy(() => import('./pages/BlogsPages'));

// Authentication hook
const useAuth = () => ({
  isLoggedIn: localStorage.getItem('isAdminLoggedIn') === 'true',
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

// Language Switcher component
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      {['en', 'fr'].map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          style={{ marginRight: lng === 'en' ? 10 : 0 }}
          aria-label={`Switch language to ${lng.toUpperCase()}`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

// Main App Content
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AGX Global</title>
        <meta
          name="description"
          content="Discover AGX Global's international import/export business, offering high-quality products and exceptional services worldwide."
        />
        <meta name="keywords" content="AGX Global, import, export, products, services, international trade" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {!isAdminRoute && <Header />}
      <LanguageSwitcher />

      <main className="flex-grow pt-24 px-0">
        <Suspense fallback={<div className="text-center text-gray-500 py-10">Loading page...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/buy-sell" element={<BuySellpage />} />
            <Route path="/review" element={<Review />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/admindashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admindashboard/products"
              element={
                <ProtectedRoute>
                  <ProductsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admindashboard/reviews"
              element={
                <ProtectedRoute>
                  <AdminReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admindashboard/blogs"
              element={
                <ProtectedRoute>
                  <AdminBlog />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <>
                  <Helmet>
                    <title>404 - Page Not Found</title>
                    <meta name="robots" content="noindex" />
                  </Helmet>
                  <div className="text-center py-20 text-red-500">404 - Page Not Found</div>
                </>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

// App wrapper with HelmetProvider and Router
const App = () => (
  <HelmetProvider>
    <Router>
      <AppContent />
    </Router>
  </HelmetProvider>
);

export default App;
