import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { trendingOffers, faqs } from '../data/faqData';
import { 
  ChevronDown, 
  Sparkles, 
  ShoppingBag, 
  HelpCircle, 
  Flame, 
  Percent, 
  Clock, 
  ShieldCheck, 
  ArrowDown, 
  Copy,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function OffersPage() {
  const { addToCart, showToast } = useCart();
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [activeFaq, setActiveFaq] = useState(1);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('All');
  const [copiedCode, setCopiedCode] = useState(false);

  // Live countdown timer state
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

  const handleCopyVaultCode = () => {
    navigator.clipboard?.writeText('SKVAULT15');
    setCopiedCode(true);
    showToast('Promo code SKVAULT15 copied for extra 15% off combos!', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleQuickAdd = (offer) => {
    const defaultSize = offer.id === 104 ? '9' : 'M';
    addToCart(
      {
        id: offer.id,
        name: offer.title,
        price: offer.price,
        image: offer.image,
        category: offer.id === 104 ? 'Shoes' : 'Offer'
      },
      defaultSize
    );
    showToast(`Claimed "${offer.title}" at ₹${offer.price.toLocaleString('en-IN')}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* =========================================================================
         1. FULL-BLEED LUXURY VAULT & FLASH OFFERS HERO
         ========================================================================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-white/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              'radial-gradient(circle at 80% 25%, rgba(230, 57, 70, 0.2), transparent 45%), radial-gradient(circle at 18% 75%, rgba(245, 158, 11, 0.14), transparent 50%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-[11px] font-bold tracking-[0.18em] uppercase text-rose-300">
              <Flame size={13} className="text-amber-400" />
              <span>EXCLUSIVE VAULT DROPS • LIMITED ALLOCATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
              PRIVATE ARCHIVE <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                FLASH OFFERS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Lock in member-only reductions up to 50% off across heavyweight organic outerwear, hoodies, and the Kestrel Vapor Pace 3 before vault inventory resets.
            </p>

            {/* Countdown + Voucher Pill Row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-2">
                  <Clock size={12} />
                  <span>Vault Window Closes In</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono">
                  <div className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-center min-w-[46px]">
                    <span className="text-lg font-black block leading-tight">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase text-slate-400">Hrs</span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-center min-w-[46px]">
                    <span className="text-lg font-black block leading-tight">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase text-slate-400">Min</span>
                  </div>
                  <span className="text-slate-500 font-bold">:</span>
                  <div className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-center min-w-[46px]">
                    <span className="text-lg font-black text-rose-400 block leading-tight">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase text-slate-400">Sec</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyVaultCode}
                className="px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-dashed border-amber-400/50 text-left transition-all flex items-center gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                    EXTRA 15% COMBO CODE
                  </span>
                  <strong className="font-mono text-base font-black tracking-wider text-white">
                    SKVAULT15
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-amber-400/15 text-amber-300">
                  {copiedCode ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </div>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('flash-offers-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>Claim Live Deals</span>
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('offers-faq')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <HelpCircle size={16} />
                <span>Concierge & FAQs</span>
              </button>
            </div>
          </div>

          {/* Right Featured Deal Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-slate-800 to-slate-950 p-6 shadow-2xl max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold tracking-wider uppercase">
                  50% OFF VAULT PICK
                </span>
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <Zap size={13} /> 84% Claimed
                </span>
              </div>
              <div className="h-64 flex items-center justify-center">
                <img
                  src="/jackts.png"
                  alt="Rugged Washed Denim Jacket"
                  className="max-h-60 object-contain drop-shadow-[0_22px_35px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/jack.png';
                  }}
                />
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-white">Rugged Denim Jacket</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg font-black text-amber-400">₹1,999</span>
                    <span className="text-xs line-through text-slate-400">₹3,999</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(trendingOffers[1])}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>Claim</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. LIVE VAULT DEALS GRID
         ========================================================================= */}
      <section id="flash-offers-grid" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3">
              <Percent size={12} />
              <span>ACTIVE ALLOCATIONS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Curated Vault Deals
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1">
              Exclusive pricing locked for 48 hours. Add directly to your bag with free returns.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>100% Authentic • Free Exchange</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingOffers.map((offer) => {
            const isOpen = expandedOffer === offer.id;
            return (
              <div
                key={offer.id}
                className="group bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 bg-stone-100/80 dark:bg-stone-800/50 p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    />
                    <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-rose-600 text-white shadow-sm">
                      {offer.badge}
                    </span>
                    <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-stone-900/90 text-slate-900 dark:text-white border border-stone-200 dark:border-stone-700">
                      {offer.discountText}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                      {offer.description}
                    </p>

                    {offer.progress && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                          <span className="text-rose-600">{offer.progress}% Claimed</span>
                          <span className="text-stone-400">Limited Stock</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-600"
                            style={{ width: `${offer.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {isOpen && (
                      <div className="mt-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300">
                        {offer.details}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900 dark:text-white">
                        ₹{offer.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs line-through text-stone-400">
                        ₹{offer.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedOffer(isOpen ? null : offer.id)}
                      className="text-xs font-bold text-stone-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
                    >
                      <span>{isOpen ? 'Less' : 'Details'}</span>
                      <ChevronDown size={13} className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(offer)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag size={14} />
                    <span>Pick Deal (₹{offer.price.toLocaleString('en-IN')})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         3. LUXURY CONCIERGE & FAQ ACCORDION
         ========================================================================= */}
      <section id="offers-faq" className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 mb-3">
            <HelpCircle size={12} />
            <span>HELP & CONCIERGE CENTER</span>
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5">
            Instant clarity on delivery timelines, vouchers, sizing exchanges, and payments.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {['All', 'Shipping', 'Returns', 'Tracking', 'Payment', 'Rewards'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFaqCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedFaqCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {faqs
            .filter((faq) => selectedFaqCategory === 'All' || faq.category === selectedFaqCategory)
            .map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/10 text-rose-600">
                        {faq.category}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-stone-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-rose-600' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Concierge CTA Card */}
        <div className="mt-10 rounded-3xl bg-slate-900 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold">Need Personal Styling Assistance?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Our concierge team responds within minutes for fit guidance and order priority.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => showToast('Live styling concierge connected — check support chat!', 'info')}
              className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Live Concierge Chat
            </button>
            <a
              href="mailto:support@skstyles.com"
              className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-xs hover:bg-white/20 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
