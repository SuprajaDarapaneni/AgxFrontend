import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";

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
const Careers = lazy(() => import('./pages/careers')); // <-- IMPORT THE NEW PAGE

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

// Language Switcher component (Keeping as is, not relevant to the gap issue)
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

        {/* Override the generator meta tag (removes 'Vite 4.0') */}
        <meta name="generator" content="" />
      </Helmet>

      {!isAdminRoute && <Header className="fixed top-0 w-full z-50 bg-white shadow-md" />}
      {/* <LanguageSwitcher /> */}

      <main className="flex-grow pt-20 px-0">
        <Suspense fallback={<div className="text-center text-gray-500 py-10">Loading page...</div>}>
            <ScrollToTop />
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
            <Route path="/careers" element={<Careers />} /> {/* <-- ADD THE NEW ROUTE HERE */}
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />

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