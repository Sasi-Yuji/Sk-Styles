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
    setActiveTab,
    addToCart,
    showToast
  } = useCart();

  const [sortBy, setSortBy] = useState('featured');
  const railRef = useRef(null);

  const scrollToCatalog = () => {
    setSelectedCategory('all');
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategoryInProducts = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Combo 1 */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex flex-wrap items-center justify-between gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex -space-x-4 shrink-0">
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
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex flex-wrap items-center justify-between gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex -space-x-4 shrink-0">
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
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex flex-wrap items-center justify-between gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex -space-x-4 shrink-0">
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
                        price: 999,
                        image: first.image || '/shir.webp',
                        category: 'Shirt'
                      }, 'M');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-400"
                  >
                    <Sparkles size={14} className="text-amber-500" />
                    <span>Pick Rail Favorite (₹999)</span>
                  </button>
                </div>
              }
            />
          </div>
        </div>
      </section>

      
      {/* =========================================================================
         3. EDITORIAL ARCHIVE & MIXED CATALOG SHOWCASE
         ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 py-10 pb-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white border border-white/10 shadow-2xl p-8 sm:p-12 lg:p-14">
          <div
            className="absolute inset-0 pointer-events-none opacity-65"
            style={{
              background:
                'radial-gradient(circle at 82% 25%, rgba(245, 158, 11, 0.16), transparent 45%), radial-gradient(circle at 15% 85%, rgba(230, 57, 70, 0.15), transparent 50%)'
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content & Category Shortcuts */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-[0.18em] uppercase text-amber-300">
                <Sparkles size={13} />
                <span>COMPLETE STORE ARCHIVE • {products.length} PIECES</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08]">
                Step Into The Full <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                  Footwear & Apparel Vault
                </span>
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Explore every Kestrel running silhouette alongside 420 GSM organic hoodies, stone-washed denim jackets, cargo joggers, and tailored shirts.
              </p>

              {/* Quick Category Jump Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'Shoes', label: 'Shoes' },
                  { id: 'Hoodie', label: 'Hoodies' },
                  { id: 'Jacket', label: 'Jackets' },
                  { id: 'Shirt', label: 'Shirts' },
                  { id: 'Joggers', label: 'Joggers' },
                  { id: 'Jean', label: 'Jeans' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => openCategoryInProducts(cat.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-rose-600 border border-white/15 hover:border-rose-500 text-slate-200 hover:text-white transition-all"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openCategoryInProducts('all')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-slate-950 font-extrabold text-sm hover:bg-amber-400 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <ShoppingBag size={16} />
                  <span>Open Product Store ({products.length})</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('collections');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
                >
                  <span>Browse Capsules</span>
                </button>
              </div>
            </div>

            {/* Right 2x2 Visual Product Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                {
                  title: 'Kestrel Vapor Onyx',
                  tag: 'Footwear',
                  price: '₹5,499',
                  img: '/onyx.png',
                  cat: 'Shoes'
                },
                {
                  title: 'Urban Motion Hoodie',
                  tag: '420 GSM Fleece',
                  price: '₹1,999',
                  img: '/Charcoal Grey Urban Motion Hoodie.png',
                  cat: 'Hoodie'
                },
                {
                  title: 'Heavy Denim Jacket',
                  tag: 'Outerwear',
                  price: '₹2,499',
                  img: '/jack.png',
                  cat: 'Jacket'
                },
                {
                  title: 'Kestrel Vapor Cobalt',
                  tag: 'Footwear',
                  price: '₹5,499',
                  img: '/cobalt.webp',
                  cat: 'Shoes'
                }
              ].map((tile) => (
                <button
                  key={tile.title}
                  type="button"
                  onClick={() => openCategoryInProducts(tile.cat)}
                  className="group text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="h-32 sm:h-36 w-full flex items-center justify-center rounded-xl bg-slate-900/60 p-3 mb-3 overflow-hidden">
                    <img
                      src={tile.img}
                      alt={tile.title}
                      className="max-h-28 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-2 w-full">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                        {tile.tag}
                      </span>
                      <strong className="text-xs sm:text-sm font-extrabold text-white block leading-tight mt-0.5">
                        {tile.title}
                      </strong>
                    </div>
                    <span className="text-xs font-black text-slate-200 shrink-0">{tile.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
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
