import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Lock, 
  Mail, 
  User, 
  Send, 
  RotateCcw, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Eye, 
  EyeOff,
  Sparkles,
  Award,
  ShieldCheck,
  LogOut
} from 'lucide-react';

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

  // Email format regex matching original validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (activeMode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    if (!cleanEmail) {
      setErrorMessage('Enter an email');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Invalid Email Address');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password');
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
    <div className="min-h-[calc(100vh-70px)] bg-slate-950 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(230, 57, 70, 0.16), transparent 45%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.14), transparent 45%)'
        }}
      />

      {user ? (
        /* =====================================================================
           LOGGED IN VIP MEMBER DASHBOARD CARD
           ===================================================================== */
        <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-8 sm:p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-500/25">
            <User size={36} />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-widest uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 mb-3">
            <Award size={13} />
            <span>SK STYLES VIP MEMBER</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user.name}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{user.email}</p>

          <div className="grid grid-cols-2 gap-3 my-6 text-left">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Vault Tier
              </span>
              <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                Priority Access
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Member Credit
              </span>
              <strong className="text-sm font-extrabold text-emerald-600">
                ₹500 Active
              </strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-sm font-bold transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={logout}
              className="py-3 px-5 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 border border-stone-200 text-sm font-bold transition-colors inline-flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      ) : (
        /* =====================================================================
           SPLIT LUXURY EDITORIAL AUTH PORTAL
           ===================================================================== */
        <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Editorial Visual Panel (Desktop / Tablet Landscape) */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-slate-900 text-white p-8 flex-col justify-between overflow-hidden">
            <img
              src="/collections-editorial.jpg"
              alt="SK STYLES Atelier"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
              onError={(e) => {
                e.target.src = '/about-atelier.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />

            <div className="relative z-10 flex items-center gap-3">
              <img
                src="/sk style.png"
                alt="SK STYLES"
                className="w-10 h-10 rounded-xl bg-white p-1 object-contain shadow-md"
              />
              <div>
                <span className="font-black text-base tracking-wide block leading-none">
                  SK STYLES<span className="text-rose-500">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                  Client Atelier
                </span>
              </div>
            </div>

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-amber-300">
                <Sparkles size={12} />
                <span>SEASON 2026 VIP ACCESS</span>
              </div>

              <h2 className="text-3xl font-black leading-tight tracking-tight">
                Curated Streetwear & Kestrel Footwear.
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                Sign in to manage orders, unlock early-access vault drops, and sync your wishlist across devices.
              </p>

              <div className="pt-3 border-t border-white/15 space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-amber-400 shrink-0" />
                  <span>Early 48-hour access to limited capsules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-rose-400 shrink-0" />
                  <span>₹500 bonus voucher on friend referrals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-stone-900">
            {/* Mode Switcher */}
            <div className="flex p-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 mb-7">
              {[
                { id: 'login', label: 'Login' },
                { id: 'signup', label: 'Sign Up' },
                { id: 'contact', label: 'Contact Us' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveMode(tab.id);
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    activeMode === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-stone-500 hover:text-slate-900 dark:text-stone-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeMode !== 'contact' ? (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600">
                    {activeMode === 'login' ? 'MEMBER SIGN IN' : 'NEW ACCOUNT'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                    {activeMode === 'login' ? 'Welcome back' : 'Create your account'}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {activeMode === 'login'
                      ? 'Enter your credentials to access your SK STYLES profile.'
                      : 'Join the club for priority drops and ₹500 referral rewards.'}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                  {activeMode === 'signup' && (
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <User size={16} className="absolute left-3.5 text-stone-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Johnathan Mercer"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-slate-900 dark:text-white outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={16} className="absolute left-3.5 text-stone-400 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-slate-900 dark:text-white outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-500 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative flex items-center">
                      <Lock size={16} className="absolute left-3.5 text-stone-400 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        className="w-full pl-10 pr-11 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-slate-900 dark:text-white outline-none focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3.5 text-stone-400 hover:text-slate-900 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white font-extrabold text-sm shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{activeMode === 'login' ? 'Sign In to SK STYLES' : 'Create Account'}</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            ) : (
              /* Contact Support View */
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600">
                    CONCIERGE DESK
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                    Contact Support
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                    Questions about sizing, orders, or custom styling? Reach our team directly.
                  </p>
                </div>

                {!contactSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="relative flex items-center">
                      <User size={16} className="absolute left-3.5 text-stone-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={contactData.fullName}
                        onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-slate-900 dark:text-white outline-none focus:bg-white focus:border-slate-900 transition-all"
                      />
                    </div>

                    <div className="relative flex items-center">
                      <Mail size={16} className="absolute left-3.5 text-stone-400 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={contactData.contactEmail}
                        onChange={(e) => setContactData({ ...contactData, contactEmail: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-slate-900 dark:text-white outline-none focus:bg-white focus:border-slate-900 transition-all"
                      />
                    </div>

                    <textarea
                      placeholder="How can we help you?"
                      rows={4}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-slate-900 dark:text-white outline-none focus:bg-white focus:border-slate-900 transition-all resize-y"
                    />

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleContactReset}
                        className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <RotateCcw size={14} /> Reset
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-sm font-bold transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <Send size={15} /> Send Message
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle size={40} className="text-emerald-600 mx-auto" />
                    <h3 className="text-lg font-extrabold text-slate-900">Message Received!</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Thanks, <strong>{contactData.fullName}</strong>. Our support team will reply to{' '}
                      <strong>{contactData.contactEmail}</strong> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleContactReset}
                      className="px-4 py-2 rounded-lg bg-white border border-stone-200 text-xs font-bold text-slate-800 hover:bg-stone-50"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="font-bold text-stone-600 hover:text-slate-900 dark:text-stone-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to Store</span>
              </button>
              <span>Protected by 256-bit SSL</span>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Reset Password</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Enter the email address associated with your SK STYLES account and we will send you a recovery link.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-stone-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-slate-900 outline-none focus:bg-white focus:border-slate-900"
                />
              </div>
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors"
                >
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
