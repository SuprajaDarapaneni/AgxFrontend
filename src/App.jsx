import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

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
 

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Main content with top padding to prevent overlap */}
        <main className="flex-grow pt-24 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
             <Route path="/Review" element={<Review />} />



            <Route path="/contact" element={<Contact />} />
            <Route path="/buy-sell" element={< BuySellpage />} />
            <Route path="/product/:id" element={<ProductDetails />} />  
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </main>

        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
