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
         1. CLEAN PRODUCT CATALOG HEADER (NO HERO SECTION)
         ========================================================================= */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-2.5">
              <Sparkles size={13} />
              <span>OFFICIAL PRODUCT STORE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              All Products & Footwear
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
              Discover our complete mixed catalog of Kestrel running shoes, heavyweight organic hoodies, tailored jackets, and street joggers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-sm">
              {filteredProducts.length} Items Available
            </span>
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
