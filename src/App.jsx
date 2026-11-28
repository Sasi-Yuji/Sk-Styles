import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import OffersPage from './pages/OffersPage';
import LoginPage from './pages/LoginPage';
import ComponentsShowcase from './pages/ComponentsShowcase';
import CheckoutModal from './components/CheckoutModal';

function MainContent() {
  const { activeTab, isCheckoutOpen, setIsCheckoutOpen } = useCart();

  // Always reset scroll position to top when switching pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-viewport">
        {activeTab === 'home' && <StorePage />}
        {activeTab === 'products' && <ProductPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'offers' && <OffersPage />}
        {activeTab === 'login' && <LoginPage />}
        {(activeTab === 'showcase' || activeTab === 'collections') && <ComponentsShowcase />}
      </div>
      {activeTab !== 'login' && <Footer />}
      <Toast />
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
