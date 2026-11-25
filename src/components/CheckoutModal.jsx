import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  DollarSign, 
  Smartphone, 
  Package, 
  ShieldCheck, 
  Lock, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export default function CheckoutModal({ onClose }) {
  const { cart, grandTotal, subtotal, shipping, clearCart, showToast, user } = useCart();
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    paymentMethod: 'card'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.phone) {
      showToast('Please fill in all required shipping fields.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = 'SK-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSuccess(true);
      setIsSubmitting(false);
      clearCart();
      showToast('Order placed successfully! 🎉', 'success');
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Checkout"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div className="checkout-modal-content">
            <div className="modal-header">
              <div className="modal-header-badge">
                <Lock size={13} className="text-emerald-500" />
                <span>256-BIT ENCRYPTED CHECKOUT</span>
              </div>
              <h2>Checkout & Payment</h2>
              <p>Complete your order with SK STYLES for express dispatch.</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              {/* 1. Delivery Details */}
              <div className="form-section">
                <div className="section-title-row">
                  <span className="section-num">1</span>
                  <h3>Shipping Address</h3>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Saran Kumar"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. saran@example.com"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House / Flat number, Street, Area"
                    />
                  </div>

                  <div className="form-group">
                    <label>City / District *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Chennai, Mumbai"
                    />
                  </div>

                  <div className="form-group">
                    <label>Postal Code / PIN *</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="e.g. 600001"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method */}
              <div className="form-section">
                <div className="section-title-row">
                  <span className="section-num">2</span>
                  <h3>Payment Method</h3>
                </div>

                <div className="payment-options">
                  <label className={`payment-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <div className="payment-icon-box">
                      <CreditCard size={18} />
                    </div>
                    <div className="payment-text">
                      <strong>Credit / Debit Card</strong>
                      <span>Visa, MasterCard, RuPay, Amex</span>
                    </div>
                  </label>

                  <label className={`payment-card ${formData.paymentMethod === 'upi' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                    />
                    <div className="payment-icon-box">
                      <Smartphone size={18} />
                    </div>
                    <div className="payment-text">
                      <strong>Instant UPI / QR / NetBanking</strong>
                      <span>Google Pay, PhonePe, Paytm, BHIM</span>
                    </div>
                  </label>

                  <label className={`payment-card ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <div className="payment-icon-box">
                      <DollarSign size={18} />
                    </div>
                    <div className="payment-text">
                      <strong>Cash on Delivery (COD)</strong>
                      <span>Pay securely at your doorstep</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary Pill */}
              <div className="order-summary-box">
                <div className="summary-row">
                  <span>Cart Items ({cart.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping & Handling</span>
                  <span className="text-emerald-600 font-bold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="summary-row total-highlight">
                  <strong className="summary-total-label">Total Payable</strong>
                  <strong className="price-tag">${grandTotal.toFixed(2)}</strong>
                </div>
              </div>

              <button 
                type="submit" 
                className="confirm-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ${grandTotal.toFixed(2)}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="modal-trust-footnote">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>30-Day Money-Back Guarantee & Hassle-Free Returns</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="order-success-screen">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="success-icon" />
            </div>
            <h2>Order Placed Successfully!</h2>
            <div className="order-id-label">
              Order Reference: <strong>{orderId}</strong>
            </div>
            <p className="delivery-notice">
              Thank you, <strong>{formData.name}</strong>! Your order has been placed into our atelier queue. A confirmation receipt has been sent to <strong>{formData.email}</strong>.
            </p>
            <div className="delivery-card">
              <div className="delivery-icon-box">
                <Package size={22} />
              </div>
              <div>
                <strong>Estimated Express Delivery:</strong>
                <p>3 to 5 business days to {formData.city || 'your address'}</p>
              </div>
            </div>
            <button 
              type="button" 
              className="continue-shopping-btn" 
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
