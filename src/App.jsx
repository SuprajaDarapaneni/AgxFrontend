import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy-loaded pages
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

// Authentication hook (reads from localStorage)
const useAuth = () => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return { isLoggedIn };
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      <button onClick={() => changeLanguage('en')} style={{ marginRight: 10 }}>
        
      </button>
      <button onClick={() => changeLanguage('fr')}></button>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <LanguageSwitcher />

      <main className="flex-grow pt-24 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Frontend Routes */}
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
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
