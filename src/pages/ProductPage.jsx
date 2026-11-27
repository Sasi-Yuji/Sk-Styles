import React, { useState, useMemo, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/productsData';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import CartWidget from '../components/CartWidget';
import { 
  SlidersHorizontal, 
  PackageSearch, 
  X, 
  ShoppingBag,
  Sparkles,
  ArrowDown,
  Layers,
  ShieldCheck,
  Truck
} from 'lucide-react';

export default function ProductPage() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const [sortBy, setSortBy] = useState('featured');
  const catalogRef = useRef(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter & sort logic across combined shoes & dress/apparel products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'new') return p.isNew;
        return p.category.toLowerCase() === selectedCategory.toLowerCase();
      })
      .filter((p) => {
        // Search query match
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="product-page-root min-h-screen bg-stone-50/50 dark:bg-stone-950">
      {/* =========================================================================
         1. LUXURY EDITORIAL PRODUCT STORE HERO
         ========================================================================= */}
      <section className="cover-landing-hero">
        <div className="cover-hero-container">
          <div className="cover-hero-content">
            <div className="cover-hero-tag">
              <Sparkles size={14} className="text-amber-400" />
              <span>OFFICIAL PRODUCT STORE • SHOES & APPAREL</span>
            </div>

            <h1 className="cover-hero-title">
              THE COMPLETE <br />
              <span className="cover-title-accent">STYLE ARCHIVE</span>
            </h1>

            <p className="cover-hero-subtitle">
              Discover our unified collection pairing engineered Kestrel running sneakers with heavyweight organic cotton hoodies, tailored jackets, and street joggers.
            </p>

            <div className="cover-hero-actions">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  scrollToCatalog();
                }}
                className="cover-primary-btn"
              >
                <span>Browse All Products ({products.length})</span>
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Shoes');
                  scrollToCatalog();
                }}
                className="cover-secondary-btn"
              >
                <Layers size={16} />
                <span>Footwear Lineup</span>
              </button>
            </div>

            <div className="cover-hero-perks">
              <div className="cover-perk-item">
                <Sparkles size={18} className="perk-icon" />
                <span>Mixed Shoes & Streetwear</span>
              </div>
              <div className="cover-perk-item">
                <Truck size={18} className="perk-icon" />
                <span>Free Express Shipping Over ₹999</span>
              </div>
              <div className="cover-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <span>7-Day Fit Guarantee</span>
              </div>
            </div>
          </div>

          <div className="cover-hero-visual">
            <div className="cover-visual-card bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-6">
              <div className="grid grid-cols-2 gap-3 w-full items-center justify-items-center mb-16">
                <img
                  src="/onyx.png"
                  alt="Kestrel Vapor Pace 3 Onyx"
                  className="w-full max-h-44 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
                />
                <img
                  src="/hod.png"
                  alt="Urban Motion Hoodie"
                  className="w-full max-h-48 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="cover-visual-glass-badge">
                <span className="glass-badge-eyebrow">CURATED MIX • {filteredProducts.length} ITEMS</span>
                <strong className="glass-badge-title">Kestrel Footwear & Organic Apparel</strong>
                <span className="glass-badge-price">Sizes 8–11 & S–XXL Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. MAIN STORE CATALOG: SINGLE CATEGORY FILTER SIDEBAR + MIXED PRODUCTS
         ========================================================================= */}
      <div id="products-catalog" ref={catalogRef} className="store-container">
        {/* Category Sidebar (Single Clean Filter UI) */}
        <Sidebar />

        {/* Main Products Area */}
        <main className="store-main">
          {/* Toolbar & Controls */}
          <div className="store-toolbar">
            <div className="toolbar-info">
              <h2>
                {selectedCategory === 'all'
                  ? 'All Products (Shoes & Apparel)'
                  : selectedCategory === 'new'
                  ? 'New Arrivals'
                  : `${selectedCategory} Collection`}
              </h2>
              <span className="product-count">
                Showing {filteredProducts.length} of {products.length} products
              </span>
            </div>

            <div className="toolbar-actions">
              {searchQuery && (
                <div className="active-filter-pill">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X size={13} />
                  </button>
                </div>
              )}

              <div className="sort-dropdown">
                <SlidersHorizontal size={15} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* View Shopping Bag Button */}
              <button 
                type="button" 
                className="view-bag-btn"
                onClick={() => setIsCartOpen(true)}
                title="View Shopping Bag"
              >
                <ShoppingBag size={16} />
                <span>Bag</span>
              </button>
            </div>
          </div>

          {/* Combined Products Grid (Shoes + Apparel Mixed Together) */}
          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <PackageSearch size={48} className="no-products-icon" />
              <h3>No products found</h3>
              <p>We couldn't find anything matching your current filters or search query.</p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating / Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)}>
              <X size={20} />
            </button>
            <CartWidget />
          </div>
        </div>
      )}
    </div>
  );
}
