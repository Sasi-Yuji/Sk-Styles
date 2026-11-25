import React, { useState, useMemo, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/productsData';
import { categories } from '../data/categoriesData';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import CartWidget from '../components/CartWidget';
import ClothingRailHero from '@/components/ui/product-rail-gallery';
import { RAIL_DEMO_ITEMS } from '@/components/ui/demo';
import { 
  SlidersHorizontal, 
  PackageSearch, 
  X, 
  ArrowDown, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Layers,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export default function StorePage() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    isCartOpen, 
    setIsCartOpen,
    addToCart,
    showToast
  } = useCart();

  const [sortBy, setSortBy] = useState('featured');
  const catalogRef = useRef(null);
  const railRef = useRef(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRail = () => {
    railRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter & sort logic
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
    <div className="store-page-root">
      {/* =========================================================================
         1. LUXURY EDITORIAL COVER LANDING HERO
         ========================================================================= */}
      <section className="cover-landing-hero">
        <div className="cover-hero-container">
          <div className="cover-hero-content">
            <div className="cover-hero-tag">
              <Sparkles size={14} className="text-amber-400" />
              <span>COLLECTION 2026 • AUTUMN-WINTER DROP</span>
            </div>

            <h1 className="cover-hero-title">
              CRAFTING THE <br />
              <span className="cover-title-accent">UNCONVENTIONAL</span>
            </h1>

            <p className="cover-hero-subtitle">
              Architectural silhouettes, heavyweight organic cotton, and tailored streetwear cuts designed for effortless distinction and modern living.
            </p>

            <div className="cover-hero-actions">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="cover-primary-btn"
              >
                <span>Shop The Collection</span>
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={scrollToRail}
                className="cover-secondary-btn"
              >
                <Layers size={16} />
                <span>3D Rail Showroom</span>
              </button>
            </div>

            {/* Trust & Craftsmanship Highlights */}
            <div className="cover-hero-perks">
              <div className="cover-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <span>100% Organic Heavyweight Cotton</span>
              </div>
              <div className="cover-perk-item">
                <Truck size={18} className="perk-icon" />
                <span>Free Express Shipping Over $35</span>
              </div>
              <div className="cover-perk-item">
                <Clock size={18} className="perk-icon" />
                <span>7-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Model Showcase */}
          <div className="cover-hero-visual">
            <div className="cover-visual-card">
              <img
                src="/fashon 2.jpg"
                alt="SK Styles Premium Streetwear"
                className="cover-visual-img"
              />
              <div className="cover-visual-glass-badge">
                <span className="glass-badge-eyebrow">FEATURED DROP</span>
                <strong className="glass-badge-title">Tailored Heavyweight Overshirt</strong>
                <span className="glass-badge-price">$74 • Limited Edition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. INTERACTIVE 3D CLOTHING RAIL SHOWROOM
         ========================================================================= */}
      <section ref={railRef} className="rail-showroom-section">
        <div className="rail-showroom-inner">
          <div className="rail-section-header">
            <div className="rail-header-badge">
              <Layers size={14} />
              <span>VIRTUAL SHOWROOM</span>
            </div>
            <h2>Touch, Slide & Turn Pieces on the Rail</h2>
            <p>Slide hangers along the rail, brush to inspect in 360°, or click any piece to lift and view details.</p>
          </div>

          <div className="rail-stage-box">
            <ClothingRailHero
              items={RAIL_DEMO_ITEMS}
              hanger="wood"
              autoplay={true}
              action={
                <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={scrollToCatalog}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Shop All In Store</span>
                    <ArrowDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const first = RAIL_DEMO_ITEMS[0];
                      addToCart({
                        id: 1,
                        name: first.name,
                        price: 18,
                        image: first.image || '/shir.webp',
                        category: 'Shirt'
                      }, 'M');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-400"
                  >
                    <Sparkles size={14} className="text-amber-500" />
                    <span>Pick Rail Favorite ($18)</span>
                  </button>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. QUICK CATEGORY PILL STRIP
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
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    scrollToCatalog();
                  }}
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
         4. MAIN STORE CATALOG
         ========================================================================= */}
      <div ref={catalogRef} className="store-container">
        {/* Category Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="store-main">
          {/* Filter Bar & Controls */}
          <div className="store-toolbar">
            <div className="toolbar-info">
              <h2>
                {selectedCategory === 'all'
                  ? 'All Products'
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

              {/* Quick Bag Button */}
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

          {/* Product Grid - Refined 3-4 Column Proportions */}
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
