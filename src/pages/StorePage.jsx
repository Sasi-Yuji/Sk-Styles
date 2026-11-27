import React, { useState, useMemo, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/productsData';
import { categories } from '../data/categoriesData';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import CartWidget from '../components/CartWidget';
import ClothingRailHero from '@/components/ui/product-rail-gallery';
import SneakerProductHeroDemo from '@/components/ui/sneaker-demo';
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
         1. DRESS & SHOES COMBO HERO (SNEAKER HERO + APPAREL INTEGRATION)
         ========================================================================= */}
      <section className="dress-shoes-combo-hero relative bg-gradient-to-b from-stone-100 via-stone-50 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 border-b border-stone-200 dark:border-stone-800">
        
        {/* Top Announcement Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm">
              <Sparkles size={12} className="text-amber-400" />
              <span>COLLECTION 2026 • DRESS & FOOTWEAR COMBO</span>
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              Pair Engineered Footwear with Architectural Heavyweight Streetwear
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollToRail}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-900 transition-all"
            >
              <Layers size={13} />
              <span>3D Clothing Rail</span>
            </button>
            <button
              type="button"
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-900 transition-all"
            >
              <ShoppingBag size={13} className="text-amber-500" />
              <span>Catalog</span>
            </button>
          </div>
        </div>

        {/* Sneaker Product Hero Display */}
        <div className="relative">
          <SneakerProductHeroDemo
            height="min(86svh, 820px)"
            onAddToCart={(info) => {
              addToCart({
                id: 999,
                name: `Kestrel Vapor Pace 3 (${info.variant.name})`,
                price: info.price,
                image: info.variant.src,
                category: 'Shoes'
              }, info.size);
              showToast(`Added Kestrel Vapor Pace (${info.variant.name}, Size ${info.size}) for ₹${info.price.toLocaleString("en-IN")} to your bag! 👟`, 'success');
            }}
            onLikeChange={(liked) => {
              showToast(liked ? 'Saved Kestrel Vapor Pace to favorites! ❤️' : 'Removed from favorites', 'info');
            }}
          />
        </div>

        {/* Curated Dress & Shoes Combo Bar */}
        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md rounded-b-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Curated Outfit Combos</span>
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-white">Complete The Look: Dress & Shoes Pairing</h3>
            </div>
            <span className="text-xs font-medium text-stone-500">1-Click Add Combo (Save 15% on Apparel + Shoes)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Combo 1 */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-4">
                  <img src="/hod.png" alt="Hoodie" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-stone-200 shadow-sm" />
                  <img src="/onyx.png" alt="Onyx Sneaker" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-stone-200 shadow-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-white leading-tight">Onyx Stealth Drop</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Charcoal Hoodie + Vapor Pace Onyx</p>
                  <span className="text-xs font-extrabold text-stone-900 dark:text-amber-400 mt-1 block">₹7,499 <span className="line-through text-stone-400 font-normal text-[10px]">₹9,999</span></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart({ id: 2, name: "Dark Brown Premium Hoodie", price: 2499, image: "/hood.png", category: "Hoodie" }, "L");
                  addToCart({ id: 13, name: "Kestrel Vapor Pace 3 - Onyx Black", price: 5499, image: "/onyx.png", category: "Shoes" }, "9");
                  showToast("Added Onyx Stealth Combo (Hoodie + Shoes) to your bag! ✨", "success");
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all whitespace-nowrap shadow-sm"
              >
                + Pick Combo
              </button>
            </div>

            {/* Combo 2 */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-4">
                  <img src="/jack.png" alt="Denim Jacket" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-stone-200 shadow-sm" />
                  <img src="/cloud.webp" alt="Cloud Sneaker" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-stone-200 shadow-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-white leading-tight">Street Clean Minimal</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Heavy Denim Jacket + Vapor Pace Cloud</p>
                  <span className="text-xs font-extrabold text-stone-900 dark:text-amber-400 mt-1 block">₹7,999 <span className="line-through text-stone-400 font-normal text-[10px]">₹10,499</span></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart({ id: 4, name: "Black Heavy Denim Jacket", price: 2999, image: "/jack.png", category: "Jacket" }, "L");
                  addToCart({ id: 15, name: "Kestrel Vapor Pace 3 - Cloud White", price: 5499, image: "/cloud.webp", category: "Shoes" }, "9");
                  showToast("Added Street Clean Minimal Combo (Jacket + Shoes) to your bag! ✨", "success");
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all whitespace-nowrap shadow-sm"
              >
                + Pick Combo
              </button>
            </div>

            {/* Combo 3 */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-4">
                  <img src="/shir.png" alt="Shirt" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-stone-200 shadow-sm" />
                  <img src="/cobalt.webp" alt="Cobalt Sneaker" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-stone-200 shadow-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-white leading-tight">Electric Casual Pace</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Full Sleeves Shirt + Vapor Pace Cobalt</p>
                  <span className="text-xs font-extrabold text-stone-900 dark:text-amber-400 mt-1 block">₹6,499 <span className="line-through text-stone-400 font-normal text-[10px]">₹8,499</span></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart({ id: 1, name: "Men green Full Sleeves Shirt", price: 1499, image: "/shir.png", category: "Shirt" }, "M");
                  addToCart({ id: 14, name: "Kestrel Vapor Pace 3 - Cobalt Blue", price: 5499, image: "/cobalt.webp", category: "Shoes" }, "9");
                  showToast("Added Electric Casual Combo (Shirt + Shoes) to your bag! ✨", "success");
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all whitespace-nowrap shadow-sm"
              >
                + Pick Combo
              </button>
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
         CATALOG EXPLORER CALL-TO-ACTION BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-stone-900 via-stone-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-stone-700/60">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-400 mb-3 border border-amber-500/30">
              <Sparkles size={12} />
              <span>COMPLETE STORE ARCHIVE</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Ready to Shop All Products? Explore Footwear & Apparel Mixed Catalog
            </h3>
            <p className="text-sm text-stone-300 mt-2">
              Browse our full inventory of Kestrel sneakers, heavyweight hoodies, denim jackets, cargo joggers, and shirts with quick category filters.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-white text-stone-900 font-extrabold text-sm hover:bg-stone-100 transition-all shadow-xl hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            <span>Open Products Page (16 Items)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

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
