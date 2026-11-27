import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Home, 
  Info, 
  Tag, 
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    totalCount, 
    wishlist, 
    setIsCartOpen,
    user,
    logout
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="site-navbar">
        <div className="navbar-inner">
          {/* Brand Logo & Name */}
          <div className="brand-section" onClick={() => handleNavClick('home')}>
            <img src="/sk style.png" alt="SK STYLES" className="brand-logo-img" />
            <div className="brand-text-block">
              <span className="brand-name">
                SK STYLES<span className="brand-dot">•</span>
              </span>
              <span className="brand-tagline">Men's Apparel</span>
            </div>
          </div>

          {/* Desktop Nav Pills (Unified: Single Product Catalog Tab, removed duplicate Store) */}
          <nav className="navbar-links" aria-label="Main Navigation">
            <button 
              className={`nav-item-btn ${(activeTab === 'products' || activeTab === 'home') ? 'active' : ''}`}
              onClick={() => handleNavClick('products')}
            >
              <ShoppingBag size={16} />
              <span>Products</span>
            </button>

            <button 
              className={`nav-item-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              <Info size={16} />
              <span>About Us</span>
            </button>

            <button 
              className={`nav-item-btn ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => handleNavClick('offers')}
            >
              <Tag size={16} />
              <span>Offers</span>
            </button>

            <button 
              className={`nav-item-btn ${(activeTab === 'showcase' || activeTab === 'collections') ? 'active' : ''}`}
              onClick={() => handleNavClick('collections')}
            >
              <Sparkles size={16} />
              <span>Collections</span>
            </button>
          </nav>

          {/* Search Bar */}
          <div className="nav-search-container">
            <Search className="nav-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search shirts, hoodies, jeans..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'home') setActiveTab('home');
              }}
              className="nav-search-input"
            />
            {searchQuery && (
              <button 
                className="nav-search-clear" 
                onClick={() => setSearchQuery('')}
                title="Clear"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Actions: Wishlist, Cart, User Profile */}
          <div className="navbar-actions">
            {/* Wishlist */}
            <button 
              className="icon-action-btn"
              onClick={() => {
                setActiveTab('home');
              }}
              title={`Wishlist (${wishlist.length} saved)`}
            >
              <Heart size={19} className={wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''} />
              {wishlist.length > 0 && (
                <span className="action-count-pill wishlist-pill">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag */}
            <button 
              className="icon-action-btn"
              onClick={() => setIsCartOpen((prev) => !prev)}
              title="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {totalCount > 0 && (
                <span className="action-count-pill cart-pill">{totalCount}</span>
              )}
            </button>

            {/* User Chip */}
            {user ? (
              <div className="user-profile-chip" onClick={() => handleNavClick('login')}>
                <User size={15} />
                <span>{user.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                  className="ml-1 text-slate-400 hover:text-red-400"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                className="user-profile-chip"
                onClick={() => handleNavClick('login')}
              >
                <User size={15} />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="flex items-center gap-2 bg-slate-800/80 rounded-lg px-3 py-2 mb-3">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'home') setActiveTab('home');
                }}
                className="bg-transparent text-white text-sm outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${(activeTab === 'products' || activeTab === 'home') ? 'bg-red-600 text-white' : 'text-slate-200 hover:bg-slate-800'}`}
                onClick={() => handleNavClick('products')}
              >
                <ShoppingBag size={18} /> Products & Footwear
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${activeTab === 'about' ? 'bg-red-600 text-white' : 'text-slate-200 hover:bg-slate-800'}`}
                onClick={() => handleNavClick('about')}
              >
                <Info size={18} /> About Us
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${activeTab === 'offers' ? 'bg-red-600 text-white' : 'text-slate-200 hover:bg-slate-800'}`}
                onClick={() => handleNavClick('offers')}
              >
                <Tag size={18} /> Trending Offers
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${(activeTab === 'showcase' || activeTab === 'collections') ? 'bg-red-600 text-white' : 'text-slate-200 hover:bg-slate-800'}`}
                onClick={() => handleNavClick('collections')}
              >
                <Sparkles size={18} /> Collections & Lookbook
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${activeTab === 'login' ? 'bg-red-600 text-white' : 'text-slate-200 hover:bg-slate-800'}`}
                onClick={() => handleNavClick('login')}
              >
                <User size={18} /> {user ? `My Account (${user.name})` : 'Login / Register'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
