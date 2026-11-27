import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/productsData';
import { categories } from '../data/categoriesData';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import CartWidget from '../components/CartWidget';
import { 
  SlidersHorizontal, 
  PackageSearch, 
  X, 
  ShoppingBag,
  Sparkles
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
         1. MODERN LUXURY PRODUCT HERO SECTION
         ========================================================================= */}
      <header className="relative bg-gradient-to-r from-stone-950 via-slate-900 to-stone-900 text-white overflow-hidden border-b border-stone-800 py-12 md:py-16 px-6">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-4 shadow-sm backdrop-blur-md">
              <Sparkles size={13} className="text-amber-400" />
              <span>COLLECTION 2026 • OFFICIAL MEN'S APPAREL & SNEAKERS</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Curated Drops & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200">Performance Footwear</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 mt-3.5 leading-relaxed max-w-xl">
              Engineered street silhouettes, heavyweight combed cotton, and responsive race-day soles. Discover our complete mixed catalog of 16 in-demand streetwear and footwear pieces.
            </p>

            {/* Quick Value Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>In Stock & Ready to Ship</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-stone-200">
                <span>Free Express Shipping (₹)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300">
                <span>{filteredProducts.length} Items Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Sneaker & Apparel Showcase Card */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="p-5 sm:p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-5 hover:border-white/20 transition-all">
              <div className="flex items-center -space-x-6">
                <div className="w-24 h-24 rounded-2xl bg-stone-800/90 border border-stone-700/80 p-2 shadow-lg flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
                  <img src="/onyx.png" alt="Kestrel Onyx" className="w-full h-full object-contain" />
                </div>
                <div className="w-24 h-24 rounded-2xl bg-stone-800/90 border border-stone-700/80 p-2 shadow-lg flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform">
                  <img src="/hood.png" alt="Dark Brown Hoodie" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block">Featured Drop Combo</span>
                <h3 className="text-base font-extrabold text-white mt-0.5">Vapor Pace 3 + Heavy Hoodie</h3>
                <p className="text-xs text-stone-400 mt-1">Starting from ₹2,499 • Sizes 8–11 & S–XXL</p>
                <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">
                    ₹5,499
                  </span>
                  <span className="text-stone-400 text-xs">Top Performance Sneaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
         2. QUICK CATEGORY PILL STRIP (MOVED FROM LANDING PAGE)
         ========================================================================= */}
      <section className="quick-category-bar">
        <div className="quick-category-inner">
          <span className="quick-cat-label">QUICK FILTERS:</span>
          <div className="quick-cat-scroll">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`quick-cat-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <img src={cat.image} alt={cat.name} className="quick-cat-icon" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. MAIN STORE CATALOG: SIDEBAR + MIXED PRODUCTS GRID
         ========================================================================= */}
      <div className="store-container">
        {/* Category Sidebar */}
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
