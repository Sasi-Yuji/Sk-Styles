import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle, CreditCard, DollarSign, Smartphone, Package, ShieldCheck } from 'lucide-react';

export default function CheckoutModal({ onClose }) {
  const { cart, grandTotal, clearCart, showToast, user } = useCart();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      showToast('Please fill in the required delivery details.', 'warning');
      return;
    }

    const generatedId = 'SK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSuccess(true);
    clearCart();
    showToast('Order placed successfully! 🎉', 'success');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div className="checkout-modal-content">
            <div className="modal-header">
              <h2>Checkout & Payment</h2>
              <p>Complete your order with SK STYLES</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3>1. Delivery Address</h3>
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
                      placeholder="House/Flat number, Street name"
                    />
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City / District"
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code / ZIP *</label>
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

              <div className="form-section">
                <h3>2. Payment Method</h3>
                <div className="payment-options">
                  <label className={`payment-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <CreditCard size={20} />
                    <div className="payment-text">
                      <strong>Credit / Debit Card</strong>
                      <span>Visa, MasterCard, RuPay</span>
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
                    <Smartphone size={20} />
                    <div className="payment-text">
                      <strong>UPI / NetBanking</strong>
                      <span>Google Pay, PhonePe, Paytm</span>
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
                    <DollarSign size={20} />
                    <div className="payment-text">
                      <strong>Cash on Delivery (COD)</strong>
                      <span>Pay at your doorstep</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="order-summary-box">
                <div className="summary-row">
                  <span>Items ({cart.length})</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row total-highlight">
                  <strong>Total Payable:</strong>
                  <strong className="price-tag">${grandTotal.toFixed(2)}</strong>
                </div>
              </div>

              <button type="submit" className="confirm-order-btn">
                Confirm & Place Order
              </button>
            </form>
          </div>
        ) : (
          <div className="order-success-screen">
            <CheckCircle size={64} className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <p className="order-id-label">
              Order ID: <strong>{orderId}</strong>
            </p>
            <p className="delivery-notice">
              Thank you, <strong>{formData.name}</strong>! Your order has been placed and is being packed. A confirmation has been sent to <strong>{formData.email}</strong>.
            </p>
            <div className="delivery-card">
              <Package size={24} />
              <div>
                <strong>Estimated Delivery:</strong>
                <p>3 to 5 business days to {formData.city || 'your address'}</p>
              </div>
            </div>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
