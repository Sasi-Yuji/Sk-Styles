import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import SneakerProductHeroDemo from '@/components/ui/sneaker-demo';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Heart, 
  Sparkles, 
  Loader2, 
  Check, 
  Info, 
  Clock, 
  Package,
  Layers,
  ShieldCheck,
  ArrowDown,
  ShoppingBag,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export default function ComponentsShowcase() {
  const { showToast, addToCart } = useCart();

  // Accordion state
  const [openFaq, setOpenFaq] = useState(1);

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselSlides = [
    {
      title: "Summer Collection 2026",
      subtitle: "Lightweight organic cotton shirts & tailored shorts",
      image: "/shir.png",
      tag: "50% OFF"
    },
    {
      title: "Kestrel Vapor Pace 3 Footwear",
      subtitle: "Carbon responsive core in Onyx, Cobalt & Cloud colorways",
      image: "/onyx.png",
      tag: "SNEAKER DROP"
    },
    {
      title: "Streetwear Heavyweight Drop",
      subtitle: "Oversized graphic hoodies & utility joggers",
      image: "/hood.png",
      tag: "NEW DROP"
    },
    {
      title: "Urban Motion Street Runners",
      subtitle: "Low-profile street silhouette engineered for daily performance",
      image: "/onyx-34.png",
      tag: "HOT SNEAKER"
    },
    {
      title: "Classic Outerwear Archive",
      subtitle: "Rugged stone-washed black denim jackets",
      image: "/jack.png",
      tag: "TRENDING"
    }
  ];

  // Collapse state
  const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(false);

  // Dropdown state
  const [selectedDropdownCat, setSelectedDropdownCat] = useState('Select Category');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Selected Size state
  const [selectedSize, setSelectedSize] = useState('Medium (38)');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Popover state
  const [showPopover, setShowPopover] = useState(false);

  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);

  // Progress simulation
  const [progressVal, setProgressVal] = useState(75);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="showcase-page-container">
      {/* =========================================================================
         1. LUXURY EDITORIAL STYLE LAB COVER HERO
         ========================================================================= */}
      <section className="cover-landing-hero">
        <div className="cover-hero-container">
          <div className="cover-hero-content">
            <div className="cover-hero-tag">
              <Sparkles size={14} className="text-amber-400" />
              <span>COLLECTIONS & STYLE LAB • SEASON 2026</span>
            </div>

            <h1 className="cover-hero-title">
              CURATED LOOKBOOK & <br />
              <span className="cover-title-accent">STYLE LAB</span>
            </h1>

            <p className="cover-hero-subtitle">
              Explore dynamic seasonal lookbooks, interactive fabric selectors, fit checkers, and tactile design components crafted for seamless shopping.
            </p>

            <div className="cover-hero-actions">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('featured-lookbook');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cover-primary-btn"
              >
                <span>Browse Lookbook</span>
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('interactive-tools');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cover-secondary-btn"
              >
                <SlidersHorizontal size={16} />
                <span>Style Tools</span>
              </button>
            </div>

            {/* Highlights */}
            <div className="cover-hero-perks">
              <div className="cover-perk-item">
                <Layers size={18} className="perk-icon" />
                <span>Interactive Runway</span>
              </div>
              <div className="cover-perk-item">
                <Sparkles size={18} className="perk-icon" />
                <span>Dynamic Fit Advisor</span>
              </div>
              <div className="cover-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <span>Fabric Lab Tested</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="cover-hero-visual">
            <div className="cover-visual-card">
              <img
                src="/cat.webp"
                alt="SK STYLES Collections"
                className="cover-visual-img"
                onError={(e) => {
                  e.target.src = '/fashon 2.jpg';
                }}
              />
              <div className="cover-visual-glass-badge">
                <span className="glass-badge-eyebrow">EDITORIAL RUNWAY</span>
                <span className="glass-badge-title">Autumn / Winter 2026 Capsule</span>
                <span className="glass-badge-price">Bespoke Fit • Touch & Explore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. FEATURED LOOKBOOK CAROUSEL (Properly Proportioned)
         ========================================================================= */}
      <div id="featured-lookbook" className="showcase-content-wrapper">
        <div className="about-pillars-header">
          <div className="rail-header-badge">
            <Compass size={13} />
            <span>SEASONAL RUNWAY PREVIEW</span>
          </div>
          <h2 className="rail-header-title">The Curated Lookbook</h2>
          <p className="rail-header-subtitle">
            Slide through key silhouettes, textile weights, and seasonal pairings.
          </p>
        </div>

        <section className="showcase-card full-width lookbook-carousel-card">
          <div className="showcase-header">
            <h3>Featured Lookbook Slider</h3>
            <span className="component-tag">Seasonal Lookbook</span>
          </div>

          <div className="carousel-wrapper">
            <div className="carousel-slide-content">
              <img 
                src={carouselSlides[carouselIndex].image} 
                alt={carouselSlides[carouselIndex].title} 
                className="carousel-img"
              />
              <div className="carousel-backdrop-overlay"></div>
              <div className="carousel-caption">
                <span className="carousel-badge">{carouselSlides[carouselIndex].tag}</span>
                <h2>{carouselSlides[carouselIndex].title}</h2>
                <p>{carouselSlides[carouselIndex].subtitle}</p>
                <button
                  className="carousel-cta"
                  onClick={() => showToast(`Added ${carouselSlides[carouselIndex].title} to moodboard!`, 'info')}
                >
                  Explore Capsule Drop
                </button>
              </div>
            </div>

            <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
              <ChevronRight size={20} />
            </button>

            <div className="carousel-dots">
              {carouselSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${carouselIndex === idx ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(idx)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
           FEATURED FOOTWEAR & SHOES COLLECTION
           ========================================================================= */}
        <section className="my-14">
          <div className="about-pillars-header mb-8">
            <div className="rail-header-badge">
              <Sparkles size={13} className="text-amber-500" />
              <span>COLLECTION FOOTWEAR LINEUP</span>
            </div>
            <h2 className="rail-header-title">Curated Shoe & Sneaker Collection</h2>
            <p className="rail-header-subtitle">
              Engineered with responsive foam cores, featherweight uppers, and tailored street styling in sizes 8, 9, 10, and 11.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.category === 'Shoes').map(shoe => (
              <ProductCard key={shoe.id} product={shoe} />
            ))}
          </div>
        </section>

        {/* =========================================================================
           3. INTERACTIVE STYLE & SIZING TOOLS GRID
           ========================================================================= */}
        {/* =========================================================================
           SNEAKER PRODUCT HERO (SHADCN / GSAP / TAILWIND)
           ========================================================================= */}
        <section id="sneaker-hero-section" className="my-12 overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl bg-white dark:bg-stone-900">
          <div className="bg-stone-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-amber-400" />
              <span className="font-bold text-sm tracking-wide uppercase">Interactive Sneaker Product Hero</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-stone-800 text-stone-300 px-3 py-1 rounded-full border border-stone-700">GSAP Motion</span>
              <span className="text-xs bg-stone-800 text-stone-300 px-3 py-1 rounded-full border border-stone-700">shadcn / Tailwind</span>
            </div>
          </div>
          <SneakerProductHeroDemo />
        </section>

        <div id="interactive-tools" className="about-pillars-header" style={{ marginTop: '3rem' }}>
          <div className="rail-header-badge">
            <SlidersHorizontal size={13} />
            <span>INTERACTIVE SIZING & WARDROBE CONTROLS</span>
          </div>
          <h2 className="rail-header-title">Style & Wardrobe Lab</h2>
          <p className="rail-header-subtitle">
            Test size selectors, popover shipping estimators, and real-time inventory feeds.
          </p>
        </div>

        <div className="showcase-grid">
          {/* 1. Tailored Sizing & Fit Advisor */}
          <section className="showcase-card">
            <div className="showcase-header">
              <h3>Tailored Sizing & Fit</h3>
              <span className="component-tag">Fit Selector</span>
            </div>

            <div className="list-group-demo">
              <label className="demo-label">Select Your Fit Profile</label>
              <div className="list-group-container">
                {['Small (36 Chest)', 'Medium (38 Chest)', 'Large (40 Chest)', 'X-Large (42 Chest)'].map((size) => (
                  <button
                    key={size}
                    className={`list-group-item-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span>{size}</span>
                    {selectedSize === size && <Check size={16} />}
                  </button>
                ))}
              </div>

              <div className="pagination-group">
                <label className="demo-label">Lookbook Page</label>
                <div className="pagination-row">
                  <button 
                    className="page-btn" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button 
                    className="page-btn" 
                    disabled={currentPage === 3}
                    onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Signature Silhouette Highlight Card */}
          <section className="showcase-card">
            <div className="showcase-header">
              <h3>Signature Silhouette</h3>
              <span className="component-tag">Hero Piece</span>
            </div>

            <div className="popular-item-card">
              <div className="popular-img-wrap">
                <img src="/shir.png" alt="Popular Item" />
                <span className="hot-tag">Hot Pick</span>
              </div>
              <div className="popular-body">
                <h4>Men's Olive Relaxed Shirt</h4>
                <p>Tailored from 100% combed organic cotton with mother-of-pearl buttons.</p>
                <div className="popular-footer">
                  <span className="price">$18.00</span>
                  <button 
                    className="buy-btn"
                    onClick={() => {
                      addToCart({
                        id: 1,
                        name: "Men's Olive Relaxed Shirt",
                        price: 18,
                        image: "/shir.png",
                        category: "Shirt"
                      });
                    }}
                  >
                    <ShoppingBag size={14} className="mr-1" /> Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Category & Fiber Specification Drawer */}
          <section className="showcase-card">
            <div className="showcase-header">
              <h3>Category & Fiber Specs</h3>
              <span className="component-tag">Fabric Details</span>
            </div>

            <div className="dropdown-demo">
              <label className="demo-label">Category Browser</label>
              <div className="dropdown-relative">
                <button 
                  className="dropdown-toggle-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedDropdownCat}</span>
                  <ChevronDown size={16} />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu-list">
                    {['Formal Shirts', 'Everyday Denim', 'Thermal Hoodies', 'Outerwear', 'Active Joggers'].map((cat) => (
                      <button
                        key={cat}
                        className="dropdown-item-btn"
                        onClick={() => {
                          setSelectedDropdownCat(cat);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="collapse-demo-group">
                <label className="demo-label">Technical Fabric Specs</label>
                <button 
                  className="collapse-toggle-btn"
                  onClick={() => setIsDetailsCollapsed(!isDetailsCollapsed)}
                >
                  {isDetailsCollapsed ? 'Hide Fabric Specifications' : 'View Fabric Specifications'}
                </button>
                {isDetailsCollapsed && (
                  <div className="collapsible-info-card">
                    <strong>100% Long-Staple Combed Cotton</strong>
                    <p className="text-xs text-slate-500 mt-1">
                      Pre-shrunk fabric weight: 240 GSM. Machine wash delicate up to 30°C. Do not tumble dry to preserve fabric drape.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 4. Fabric & Care Knowledge Base Accordion */}
          <section className="showcase-card">
            <div className="showcase-header">
              <h3>Fabric & Garment Care</h3>
              <span className="component-tag">Knowledge Base</span>
            </div>

            <div className="accordion-box">
              <div className={`accordion-row ${openFaq === 1 ? 'open' : ''}`}>
                <button className="accordion-trigger" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                  <span>How should I wash heavyweight fleece?</span>
                  <ChevronDown size={16} className={`arrow-icon ${openFaq === 1 ? 'rotate' : ''}`} />
                </button>
                {openFaq === 1 && (
                  <div className="accordion-body-text">
                    Turn inside out, wash with cold water on gentle cycle, and lay flat to dry to avoid shrinking the dense French Terry loops.
                  </div>
                )}
              </div>

              <div className={`accordion-row ${openFaq === 2 ? 'open' : ''}`}>
                <button className="accordion-trigger" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                  <span>Do you offer bespoke size tailoring?</span>
                  <ChevronDown size={16} className={`arrow-icon ${openFaq === 2 ? 'rotate' : ''}`} />
                </button>
                {openFaq === 2 && (
                  <div className="accordion-body-text">
                    Yes, custom sleeve and inseam adjustments are complimentary for all VIP Club members.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 5. Shipping Estimator & Micro-Interactions */}
          <section className="showcase-card">
            <div className="showcase-header">
              <h3>Express Shipping & Wishlist</h3>
              <span className="component-tag">Micro-Tools</span>
            </div>

            <div className="interactive-toggles">
              <div className="popover-unit">
                <label className="demo-label">Express Delivery Estimator</label>
                <button 
                  className="btn-warning-pop"
                  onClick={() => setShowPopover(!showPopover)}
                >
                  <Clock size={16} /> Check Dispatch Time
                </button>
                {showPopover && (
                  <div className="popover-bubble-card">
                    <strong>Express 48-Hour Dispatch</strong>
                    <p>Orders placed before 2 PM EST ship same-day with end-to-end priority courier tracking.</p>
                  </div>
                )}
              </div>

              <div className="tooltip-unit">
                <label className="demo-label">Wishlist Heart</label>
                <div className="tooltip-anchor">
                  <button
                    className="tooltip-icon-btn"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => showToast('Saved to your private wishlist! ❤️', 'info')}
                  >
                    ❤️
                  </button>
                  {showTooltip && (
                    <div className="floating-tooltip">Add to private wishlist</div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Live Order Allocation & Toast Simulator */}
          <section className="showcase-card">
            <div className="showcase-header">
              <h3>Order Allocation & Toast</h3>
              <span className="component-tag">Live Status</span>
            </div>

            <div className="feedback-controls">
              <label className="demo-label">Vault Allocation Level: {progressVal}%</label>
              <div className="progress-track">
                <div className="progress-fill animated" style={{ width: `${progressVal}%` }}>
                  {progressVal}% Reserved
                </div>
              </div>

              <div className="spinner-toast-row">
                <div className="spinner-item">
                  <label className="demo-label">Inventory Sync</label>
                  <div className="flex items-center gap-2">
                    <Loader2 size={22} className="spin-animation text-amber-500" />
                    <span className="text-xs text-slate-500 font-medium">Live</span>
                  </div>
                </div>

                <div className="toast-trigger-col">
                  <label className="demo-label">Cart Toast Simulator</label>
                  <button 
                    className="btn-trigger-toast"
                    onClick={() => showToast('Lookbook piece added to cart! 🛍️', 'success')}
                  >
                    Trigger Bag Notification
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
