import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Lock, Mail, User, Send, RotateCcw, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { user, login, logout, setActiveTab, showToast } = useCart();
  const [activeMode, setActiveMode] = useState('login'); // 'login' | 'signup' | 'contact'
  
  // Login / Signup State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Contact Form State
  const [contactData, setContactData] = useState({
    fullName: '',
    contactEmail: '',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Forgot Password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Email format regex matching original skstyle.js:
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage("Enter an email");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage("Invalid Email Address");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }

    setErrorMessage('');
    login(cleanEmail);
    setActiveTab('home');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.fullName || !contactData.contactEmail || !contactData.message) {
      showToast('Please fill out all contact fields.', 'warning');
      return;
    }
    setContactSubmitted(true);
    showToast('Your message has been sent to SK STYLES support!', 'success');
  };

  const handleContactReset = () => {
    setContactData({ fullName: '', contactEmail: '', message: '' });
    setContactSubmitted(false);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !emailRegex.test(forgotEmail)) {
      showToast('Please provide a valid email address.', 'warning');
      return;
    }
    showToast(`Password reset link sent to ${forgotEmail}!`, 'success');
    setShowForgotModal(false);
    setForgotEmail('');
  };

  return (
    <div className="login-page-container">
      {/* If already logged in */}
      {user ? (
        <div className="logged-in-card">
          <div className="user-avatar-circle">
            <User size={40} />
          </div>
          <h2>Hello, {user.name}!</h2>
          <p className="user-email-text">{user.email}</p>
          <div className="user-status-pill">
            <span>SK STYLE VIP Member</span>
          </div>

          <div className="account-actions">
            <button className="primary-shop-btn" onClick={() => setActiveTab('home')}>
              Continue Shopping
            </button>
            <button className="logout-action-btn" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="auth-card-wrapper">
          {/* Mode Switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeMode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('login');
                setErrorMessage('');
              }}
            >
              Login
            </button>
            <button
              className={`auth-tab ${activeMode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('signup');
                setErrorMessage('');
              }}
            >
              Sign Up
            </button>
            <button
              className={`auth-tab ${activeMode === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveMode('contact')}
            >
              Contact Us
            </button>
          </div>

          {activeMode !== 'contact' ? (
            <div className="login-box-inner">
              <h1 className="bname">SK STYLE</h1>
              <h2>{activeMode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}</h2>

              <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
                {activeMode === 'signup' && (
                  <div className="form-input-group">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-input-group">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                  />
                </div>

                <div className="form-input-group">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {errorMessage && <p className="auth-error-msg">{errorMessage}</p>}

                <button type="submit" className="login-submit-btn">
                  {activeMode === 'login' ? 'Login' : 'Sign Up'}
                </button>
              </form>

              <div className="auth-footer-links">
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forget Password?
                </button>
              </div>
            </div>
          ) : (
            /* Contact Form matching login.html / box3.css */
            <div className="contact-box-inner">
              <h1 className="bname">SK STYLE</h1>
              <h2>Contact Support</h2>

              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-input-group">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={contactData.fullName}
                      onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-input-group">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={contactData.contactEmail}
                      onChange={(e) => setContactData({ ...contactData, contactEmail: e.target.value })}
                    />
                  </div>

                  <div className="form-input-group textarea-group">
                    <textarea
                      placeholder="How can we help you?"
                      rows={4}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    />
                  </div>

                  <div className="contact-btn-row">
                    <button type="button" className="reset-btn" onClick={handleContactReset}>
                      <RotateCcw size={15} /> Reset
                    </button>
                    <button type="submit" className="submit-btn">
                      <Send size={15} /> Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="contact-success-box">
                  <CheckCircle size={48} className="success-icon" />
                  <h3>Message Received!</h3>
                  <p>Thanks for reaching out, <strong>{contactData.fullName}</strong>. Our customer support team will reply to <strong>{contactData.contactEmail}</strong> within 24 hours.</p>
                  <button className="reset-btn" onClick={handleContactReset}>
                    Send Another Message
                  </button>
                </div>
              )}

              <button className="back-to-home-link" onClick={() => setActiveTab('home')}>
                <ArrowLeft size={14} /> Back to Store
              </button>
            </div>
          )}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Password</h3>
            <p>Enter the email address associated with your SK STYLE account and we will send you a recovery link.</p>
            <form onSubmit={handleForgotSubmit}>
              <div className="form-input-group">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <div className="modal-actions-row">
                <button type="button" className="cancel-btn" onClick={() => setShowForgotModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="confirm-btn">
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
