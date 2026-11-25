import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { trendingOffers, faqs } from '../data/faqData';
import { 
  ChevronDown, 
  Sparkles, 
  Tag, 
  ShoppingBag, 
  Check, 
  HelpCircle, 
  Flame, 
  Percent, 
  Clock, 
  ShieldCheck, 
  ArrowDown, 
  Zap,
  Info
} from 'lucide-react';

export default function OffersPage() {
  const { addToCart, showToast } = useCart();
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [activeFaq, setActiveFaq] = useState(1);
  const [activePopover, setActivePopover] = useState(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('All');

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleDetails = (id) => {
    setExpandedOffer(expandedOffer === id ? null : id);
  };

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleQuickAdd = (offer) => {
    const productItem = {
      id: offer.id,
      name: offer.title,
      price: offer.price,
      image: offer.image,
      category: 'Offer'
    };
    addToCart(productItem, 'M');
    showToast(`Claimed deal: "${offer.title}" added to cart!`, 'success');
  };

  return (
    <div className="offers-page-container">
      {/* =========================================================================
         1. LUXURY EDITORIAL OFFERS COVER HERO
         ========================================================================= */}
      <section className="cover-landing-hero">
        <div className="cover-hero-container">
          <div className="cover-hero-content">
            <div className="cover-hero-tag">
              <Flame size={14} className="text-amber-400" />
              <span>EXCLUSIVE ARCHIVE DROPS • LIMITED ALLOCATIONS</span>
            </div>

            <h1 className="cover-hero-title">
              CURATED VAULT & <br />
              <span className="cover-title-accent">FLASH PROMOTIONS</span>
            </h1>

            <p className="cover-hero-subtitle">
              Save up to 50% on our most demanded heavyweight essentials, premium outerwear, and bundle exclusives before allocation closes.
            </p>

            {/* Live Countdown Ticker */}
            <div className="deal-countdown-strip">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Clock size={14} /> Flash Vault Closes In:
              </div>
              <div className="countdown-digits-row">
                <div className="countdown-box">
                  <span className="digit-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="digit-unit">Hours</span>
                </div>
                <span className="digit-colon">:</span>
                <div className="countdown-box">
                  <span className="digit-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="digit-unit">Mins</span>
                </div>
                <span className="digit-colon">:</span>
                <div className="countdown-box">
                  <span className="digit-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="digit-unit">Secs</span>
                </div>
              </div>
            </div>

            <div className="cover-hero-actions">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('flash-offers-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cover-primary-btn"
              >
                <span>Claim Flash Deals</span>
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('offers-faq');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cover-secondary-btn"
              >
                <HelpCircle size={16} />
                <span>Offer FAQs</span>
              </button>
            </div>

            {/* Highlights */}
            <div className="cover-hero-perks">
              <div className="cover-perk-item">
                <Percent size={18} className="perk-icon" />
                <span>Stackable Discounts</span>
              </div>
              <div className="cover-perk-item">
                <Clock size={18} className="perk-icon" />
                <span>48-Hour Price Lock</span>
              </div>
              <div className="cover-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <span>Guaranteed Authenticity</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="cover-hero-visual">
            <div className="cover-visual-card">
              <img
                src="/jackts.png"
                alt="SK STYLES Limited Deals"
                className="cover-visual-img"
                onError={(e) => {
                  e.target.src = '/cart 1 im.webp';
                }}
              />
              <div className="cover-visual-glass-badge">
                <span className="glass-badge-eyebrow">FEATURED VAULT DEAL</span>
                <span className="glass-badge-title">Rugged Washed Denim Jacket</span>
                <span className="glass-badge-price">Buy 2 Get 1 Free • From $33</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. TRENDING OFFERS CARDS
         ========================================================================= */}
      <section id="flash-offers-grid" className="offers-section-body">
        <div className="about-pillars-header">
          <div className="rail-header-badge">
            <Sparkles size={13} />
            <span>ACTIVE VAULT ALLOCATIONS</span>
          </div>
          <h2 className="rail-header-title">Live Streetwear Deals</h2>
          <p className="rail-header-subtitle">
            Curated pieces at exclusive member pricing. Add straight to your cart to lock in discounts.
          </p>
        </div>

        <div className="offers-card-grid">
          {trendingOffers.map((offer) => {
            const isDetailsOpen = expandedOffer === offer.id;
            const isPopoverOpen = activePopover === offer.id;

            return (
              <div key={offer.id} className="offer-card">
                <div className="offer-image-wrap">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="offer-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                  <span className={`offer-pill badge-${offer.badgeColor}`}>
                    {offer.badge}
                  </span>
                </div>

                <div className="offer-body">
                  <div className="offer-title-row">
                    <h3>{offer.title}</h3>
                    <span className="offer-discount-tag">{offer.discountText}</span>
                  </div>

                  <p className="offer-desc">{offer.description}</p>

                  {/* Progress bar if present */}
                  {offer.progress && (
                    <div className="deal-progress-block">
                      <div className="progress-labels">
                        <span>Claimed: {offer.progress}%</span>
                        <span>Hurry, limited stock!</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${offer.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="offer-actions-row">
                    <button
                      className="view-details-btn"
                      onClick={() => toggleDetails(offer.id)}
                    >
                      <span>{isDetailsOpen ? 'Hide Details' : 'View Details'}</span>
                      <ChevronDown size={14} className={isDetailsOpen ? 'rotate-180' : ''} />
                    </button>

                    {offer.id === 102 && (
                      <div className="popover-wrapper">
                        <button
                          className="check-offer-btn"
                          onClick={() => setActivePopover(isPopoverOpen ? null : offer.id)}
                        >
                          <Percent size={14} /> Check Offer
                        </button>

                        {isPopoverOpen && (
                          <div className="offer-popover-bubble">
                            <strong>SK STYLES PROMO</strong>
                            <p>Buy 2 Get 1 Free on all outerwear this weekend! Discount applies automatically at checkout.</p>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      className="pick-offer-btn"
                      onClick={() => handleQuickAdd(offer)}
                      title="Add deal to cart"
                    >
                      <ShoppingBag size={14} />
                      <span>Pick (${offer.price})</span>
                    </button>
                  </div>

                  {/* Collapsible Details */}
                  {isDetailsOpen && (
                    <div className="collapsible-details-box">
                      <p>{offer.details}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         3. FREQUENTLY ASKED QUESTIONS (Luxury Concierge Center)
         ========================================================================= */}
      <section id="offers-faq" className="faq-section">
        <div className="faq-header">
          <div className="faq-badge">
            <HelpCircle size={13} />
            <span>HELP & CONCIERGE CENTER</span>
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about vouchers, deliveries, bespoke sizing, and effortless returns.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="faq-filter-strip">
          {['All', 'Shipping', 'Returns', 'Tracking', 'Payment', 'Rewards'].map((cat) => (
            <button
              key={cat}
              className={`faq-filter-pill ${selectedFaqCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedFaqCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {faqs
            .filter((faq) => selectedFaqCategory === 'All' || faq.category === selectedFaqCategory)
            .map((faq) => {
              const isOpen = activeFaq === faq.id;

              return (
                <div key={faq.id} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(faq.id)}>
                    <div className="faq-question-left">
                      <span className="faq-cat-badge">{faq.category}</span>
                      <span className="faq-question-text">{faq.question}</span>
                    </div>
                    <div className="faq-chevron-circle">
                      <ChevronDown size={16} className={`faq-arrow ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Concierge Support Banner */}
        <div className="faq-concierge-banner">
          <div className="concierge-info">
            <div className="concierge-icon-circle">
              <Sparkles size={26} />
            </div>
            <div>
              <h3 className="concierge-title">Can't find what you're looking for?</h3>
              <p className="concierge-sub">Our personal styling concierge and support team is on standby 24/7.</p>
            </div>
          </div>
          <div className="concierge-actions">
            <button
              type="button"
              className="concierge-btn-primary"
              onClick={() => showToast('Opening live concierge chat...', 'info')}
            >
              <span>Live Chat Concierge</span>
            </button>
            <a
              href="mailto:support@skstyles.com"
              className="concierge-btn-secondary"
            >
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
