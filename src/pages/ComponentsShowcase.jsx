import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Layers,
  ShieldCheck,
  ArrowDown,
  ArrowRight,
  ShoppingBag,
  Compass,
  Ruler
} from 'lucide-react';

export default function ComponentsShowcase() {
  const { showToast, addToCart, setActiveTab, setSelectedCategory } = useCart();

  // Lookbook slider state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselSlides = [
    {
      title: "Kestrel Vapor Pace 3 Capsule",
      subtitle: "Carbon responsive kinetic plate in Onyx Black, Electric Cobalt & Cloud White.",
      image: "/onyx.png",
      tag: "FOOTWEAR DROP",
      category: "Shoes",
      priceLabel: "₹5,499"
    },
    {
      title: "Streetwear Heavyweight Fleece",
      subtitle: "420 GSM French Terry oversized hoodies & cargo joggers built for urban structure.",
      image: "/hood.png",
      tag: "AUTUMN / WINTER",
      category: "Hoodie",
      priceLabel: "From ₹1,699"
    },
    {
      title: "Classic Outerwear Archive",
      subtitle: "Rugged stone-washed black denim jackets finished with reinforced brass rivets.",
      image: "/jack.png",
      tag: "TRENDING ARCHIVE",
      category: "Jacket",
      priceLabel: "From ₹1,999"
    },
    {
      title: "Urban Motion Street Runners",
      subtitle: "Low-profile lightweight street silhouette engineered for 12-hour daily comfort.",
      image: "/onyx-34.png",
      tag: "STREET EDITION",
      category: "Shoes",
      priceLabel: "₹4,299"
    },
    {
      title: "Organic Tailored Shirting",
      subtitle: "Breathable long-staple combed cotton shirts tailored for effortless drape.",
      image: "/shir.png",
      tag: "SIGNATURE FIT",
      category: "Shirt",
      priceLabel: "From ₹999"
    }
  ];

  // Curated Capsules (Apparel + Shoes pairings)
  const capsules = [
    {
      id: "stealth",
      eyebrow: "CAPSULE 01",
      title: "Monochrome Stealth",
      subtitle: "Charcoal Urban Motion Hoodie + Cargo Joggers + Kestrel Onyx",
      comboPrice: 7499,
      origPrice: 9999,
      images: ["/hod.png", "/jojoj.png", "/onyx.png"],
      items: [
        { id: 8, name: "Charcoal Grey Urban Motion Hoodie", price: 1999, image: "/hod.png", category: "Hoodie", size: "L" },
        { id: 13, name: "Kestrel Vapor Pace 3 - Onyx Black", price: 5499, image: "/onyx.png", category: "Shoes", size: "9" }
      ]
    },
    {
      id: "cobalt",
      eyebrow: "CAPSULE 02",
      title: "Electric Cobalt Casual",
      subtitle: "Organic Oxford Shirt + Deep Blue Denim + Kestrel Cobalt",
      comboPrice: 6499,
      origPrice: 8499,
      images: ["/shir.png", "/jean.png", "/cobalt.webp"],
      items: [
        { id: 1, name: "Men green Full Sleeves Shirt", price: 999, image: "/shir.png", category: "Shirt", size: "M" },
        { id: 14, name: "Kestrel Vapor Pace 3 - Cobalt Blue", price: 5499, image: "/cobalt.webp", category: "Shoes", size: "9" }
      ]
    },
    {
      id: "cloud",
      eyebrow: "CAPSULE 03",
      title: "Street Minimal Contrast",
      subtitle: "Heavy Black Denim Jacket + Anime Graphic Tee + Kestrel Cloud",
      comboPrice: 7999,
      origPrice: 10499,
      images: ["/jack.png", "/onepiece.png", "/cloud.webp"],
      items: [
        { id: 4, name: "Black Heavy Denim Jacket", price: 2499, image: "/jack.png", category: "Jacket", size: "L" },
        { id: 15, name: "Kestrel Vapor Pace 3 - Cloud White", price: 5499, image: "/cloud.webp", category: "Shoes", size: "9" }
      ]
    }
  ];

  // Interactive Fit Guide state
  const [fitMode, setFitMode] = useState('apparel'); // 'apparel' | 'footwear'
  const [selectedFit, setSelectedFit] = useState('M (38–40" Chest)');

  const apparelSizes = [
    { label: 'S (36–38" Chest)', chest: '36–38 in', length: '27.5 in', fit: 'Tailored Slim' },
    { label: 'M (38–40" Chest)', chest: '38–40 in', length: '28.5 in', fit: 'Signature Regular' },
    { label: 'L (40–42" Chest)', chest: '40–42 in', length: '29.5 in', fit: 'Relaxed Street' },
    { label: 'XL (42–44" Chest)', chest: '42–44 in', length: '30.5 in', fit: 'Oversized Boxy' }
  ];

  const shoeSizes = [
    { label: 'Size 8 (UK/IN)', chest: '26.5 cm', length: 'EU 42', fit: 'True to Size' },
    { label: 'Size 9 (UK/IN)', chest: '27.3 cm', length: 'EU 43', fit: 'Most Popular' },
    { label: 'Size 10 (UK/IN)', chest: '28.0 cm', length: 'EU 44', fit: 'Wide Toe Comfort' },
    { label: 'Size 11 (UK/IN)', chest: '28.8 cm', length: 'EU 45', fit: 'Extended Length' }
  ];

  const activeFitData = fitMode === 'apparel' ? apparelSizes : shoeSizes;
  const currentFitDetail = activeFitData.find((s) => s.label === selectedFit) || activeFitData[1];

  const handleAddCapsule = (cap) => {
    cap.items.forEach((item) => addToCart(item, item.size));
    showToast(`Added "${cap.title}" full capsule to your bag! ✨`, 'success');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* =========================================================================
         1. FULL-BLEED EDITORIAL COLLECTIONS RUNWAY HERO
         ========================================================================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-white/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-65"
          style={{
            background:
              'radial-gradient(circle at 75% 28%, rgba(59, 130, 246, 0.16), transparent 45%), radial-gradient(circle at 20% 78%, rgba(245, 158, 11, 0.14), transparent 50%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-bold tracking-[0.18em] uppercase text-amber-300">
              <Compass size={13} />
              <span>SEASON 2026 • CURATED CAPSULE LOOKBOOK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
              SIGNATURE CAPSULES <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                DRESS & FOOTWEAR
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore coordinated seasonal capsules combining our heavyweight organic hoodies and raw denim outerwear with engineered Kestrel running sneakers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('capsules-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>Shop Capsule Looks</span>
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('footwear-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all"
              >
                <Layers size={16} className="text-amber-400" />
                <span>Footwear Lineup</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 aspect-[4/4.5] max-w-md mx-auto group">
              <img
                src="/collections-editorial.jpg"
                alt="SK STYLES Editorial Capsule"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/onyx.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/15">
                <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-rose-400">
                  EDITORIAL RUNWAY
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Autumn / Winter 2026 Drop
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  3 Curated Capsules • Shoes & Streetwear Pairings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. SEASONAL RUNWAY LOOKBOOK SLIDER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 mb-2">
              <Sparkles size={12} />
              <span>RUNWAY SPOTLIGHT</span>
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              The Curated Lookbook
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCarouselIndex((p) => (p === 0 ? carouselSlides.length - 1 : p - 1))}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setCarouselIndex((p) => (p === carouselSlides.length - 1 ? 0 : p + 1))}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[360px] p-8 sm:p-12 gap-8">
            <div className="md:col-span-6 space-y-4 z-10">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-widest uppercase bg-rose-600 text-white">
                {carouselSlides[carouselIndex].tag}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black leading-tight">
                {carouselSlides[carouselIndex].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
                {carouselSlides[carouselIndex].subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(carouselSlides[carouselIndex].category);
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  <span>Shop {carouselSlides[carouselIndex].category}</span>
                  <ArrowRight size={14} />
                </button>
                <span className="text-sm font-bold text-amber-400">
                  {carouselSlides[carouselIndex].priceLabel}
                </span>
              </div>
            </div>

            <div className="md:col-span-6 flex items-center justify-center">
              <img
                src={carouselSlides[carouselIndex].image}
                alt={carouselSlides[carouselIndex].title}
                className="max-h-72 object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Slide Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setCarouselIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  carouselIndex === idx ? 'w-7 bg-rose-500' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. CURATED CAPSULE LOOKS (APPAREL + SHOES COMBOS)
         ========================================================================= */}
      <section id="capsules-grid" className="max-w-7xl mx-auto px-6 pt-16">
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 mb-2">
            <Layers size={12} />
            <span>COMPLETE WARDROBE SETS</span>
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Signature Style Capsules
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Pre-styled head-to-toe pairings combining heavyweight garments and performance footwear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {capsules.map((cap) => (
            <div
              key={cap.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-black tracking-widest uppercase text-rose-600">
                    {cap.eyebrow}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                    Save 15% Bundle
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/60 mb-5">
                  {cap.images.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-white dark:bg-stone-900 p-2 flex items-center justify-center border border-stone-200/70 dark:border-stone-700"
                    >
                      <img src={img} alt={cap.title} className="max-h-20 object-contain" />
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{cap.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  {cap.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    ₹{cap.comboPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs line-through text-stone-400 ml-2">
                    ₹{cap.origPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddCapsule(cap)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>Add Capsule</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         4. CURATED SHOE & SNEAKER COLLECTION
         ========================================================================= */}
      <section id="footwear-collection" className="max-w-7xl mx-auto px-6 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 mb-2">
              <Sparkles size={12} />
              <span>FOOTWEAR ARCHIVE</span>
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Kestrel Footwear & Street Runners
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Available in UK/IN sizes 8, 9, 10, and 11 with 7-day fit exchange guarantee.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Shoes');
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-slate-900 dark:text-white hover:text-rose-600 inline-flex items-center gap-1.5"
          >
            <span>Open In Product Store</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.category === 'Shoes')
            .map((shoe) => (
              <ProductCard key={shoe.id} product={shoe} />
            ))}
        </div>
      </section>

      {/* =========================================================================
         5. INTERACTIVE FIT & FABRIC SPECIFICATION STUDIO
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-20">
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-slate-900 dark:text-white">
              <Ruler size={13} className="text-rose-600" />
              <span>ATELIER FIT STUDIO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Precision Fit & Sizing Reference
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Toggle between apparel and footwear measurements before picking your size so every silhouette lands cleanly out of the box.
            </p>

            <div className="inline-flex p-1 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <button
                type="button"
                onClick={() => {
                  setFitMode('apparel');
                  setSelectedFit(apparelSizes[1].label);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  fitMode === 'apparel'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                Apparel Fit (S–XL)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFitMode('footwear');
                  setSelectedFit(shoeSizes[1].label);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  fitMode === 'footwear'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                Footwear Sizing (8–11)
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
              {activeFitData.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedFit(item.label)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedFit === item.label
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-stone-50 dark:bg-stone-800 text-slate-800 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:border-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  {selectedFit === item.label && <Check size={14} className="text-amber-400" />}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  {fitMode === 'apparel' ? 'Chest' : 'Foot Length'}
                </span>
                <strong className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">
                  {currentFitDetail.chest}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  {fitMode === 'apparel' ? 'Body Length' : 'EU Equivalent'}
                </span>
                <strong className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">
                  {currentFitDetail.length}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  Silhouette
                </span>
                <strong className="text-sm font-black text-rose-600 mt-0.5 block">
                  {currentFitDetail.fit}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
              <span>Unsure between sizes? Enjoy free 7-day doorstep size exchanges on every order.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
