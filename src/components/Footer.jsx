import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Mail, 
  Phone, 
  Clock, 
  Send,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const { setActiveTab, showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Check your inbox for 15% off coupon.', 'success');
  };

  return (
    <>
      {/* =========================================================================
         1. DISTINCT ELEVATED TRUST & VALUE PROPOSITIONS STRIP
         Crisp light contrast surface placed above dark footer
         ========================================================================= */}
      <section className="site-trust-strip" aria-label="Store Guarantees">
        <div className="footer-trust-grid">
          <div className="trust-card">
            <div className="trust-icon-box">
              <Truck size={22} />
            </div>
            <div>
              <strong>Fast Express Shipping</strong>
              <span>Delivered in 3–5 working days</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <RotateCcw size={22} />
            </div>
            <div>
              <strong>7-Day Easy Returns</strong>
              <span>Hassle-free replacement policy</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong>100% Secure Checkout</strong>
              <span>256-bit encrypted transactions</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <Award size={22} />
            </div>
            <div>
              <strong>Premium Craftsmanship</strong>
              <span>Organic combed cotton & fleece</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. MAIN LUXURY DARK FOOTER
         ========================================================================= */}
      <footer className="modern-footer">
        {/* Main Multi-Column Footer Content */}
        <div className="footer-content-wrap">
        {/* Brand & Newsletter Column */}
        <div className="footer-brand-info">
          <div className="footer-logo-row">
            <img src="/sk style.png" alt="SK STYLES" />
            <span>SK STYLES</span>
          </div>
          <p className="footer-bio">
            Crafting The Unconventional Fashion Statements. A stellar collection of sophisticated and contemporary pieces of apparel for modern men.
          </p>

          <div className="newsletter-box">
            <label>Get 15% Off Your Next Order</label>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mt-1">
                <CheckCircle2 size={16} />
                <span>You're on the VIP list! Welcome.</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4>Navigation</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => setActiveTab('products')}>Products Catalog</button></li>
            <li><button onClick={() => setActiveTab('about')}>About Us</button></li>
            <li><button onClick={() => setActiveTab('offers')}>Trending Offers</button></li>
            <li><button onClick={() => setActiveTab('collections')}>Collections & Lookbook</button></li>
            <li><button onClick={() => setActiveTab('login')}>My Account</button></li>
          </ul>
        </div>

        {/* Collections */}
        <div className="footer-links-col">
          <h4>Collections</h4>
          <ul className="footer-links-list">
            <li><span>Shirts & Polos</span></li>
            <li><span>Heavyweight Hoodies</span></li>
            <li><span>Cargo & Flex Joggers</span></li>
            <li><span>Denim Outerwear & Jackets</span></li>
            <li><span>Anime Graphic Tees</span></li>
            <li><span>Slim Fit Jeans</span></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-links-col">
          <h4>Contact & Support</h4>
          <div className="contact-pill-item">
            <Mail size={16} />
            <span>support@skstyles.com</span>
          </div>
          <div className="contact-pill-item">
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-pill-item">
            <Clock size={16} />
            <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} <strong>SK STYLES Group</strong>. All rights reserved.</p>

        <div className="payments-badge-row">
          <span className="payment-tag">VISA</span>
          <span className="payment-tag">MASTERCARD</span>
          <span className="payment-tag">UPI</span>
          <span className="payment-tag">APPLE PAY</span>
          <span className="payment-tag">COD</span>
        </div>
      </div>
    </footer>
  </>
);
}
