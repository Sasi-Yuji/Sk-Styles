import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Gift, 
  Award, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Truck,
  Shirt,
  Flame,
  Activity,
  Layers,
  Footprints
} from 'lucide-react';

export default function AboutPage() {
  const { setActiveTab, showToast } = useCart();
  const [copied, setCopied] = useState(false);

  const referralCode = "SKSTYLE100";

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    showToast('Referral code SKSTYLE100 copied! Share with friends for ₹500 credit.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const pillars = [
    {
      num: "01",
      icon: Shirt,
      title: "Tailored Shirts",
      desc: "Boardroom sharp to weekend relaxed. French-felled seams and breathable long-staple organic cotton that drapes effortlessly.",
      tag: "100% Organic Cotton",
      spec: "240 GSM • Single-Needle",
      image: "/shir.png"
    },
    {
      num: "02",
      icon: Flame,
      title: "Heavyweight Hoodies",
      desc: "420 GSM French Terry silhouettes with double-lined hoods and structured drop-shoulders built for lasting warmth and form.",
      tag: "Thermal Fleece",
      spec: "420 GSM • Drop Shoulder",
      image: "/hood.png"
    },
    {
      num: "03",
      icon: Footprints,
      title: "Kestrel Footwear",
      desc: "Engineered foam cores paired with responsive carbon geometry and breathable mesh for weightless all-day motion.",
      tag: "Kinetic Cushion",
      spec: "Sizes 8–11 • Carbon Plate",
      image: "/onyx.png"
    },
    {
      num: "04",
      icon: Activity,
      title: "Tactical Joggers",
      desc: "4-way stretch flex fabric with gusseted mobility, concealed zip pockets, and tapered ankle cuffs for studio to street.",
      tag: "4-Way Stretch",
      spec: "Reinforced Gusset",
      image: "/jojoj.png"
    },
    {
      num: "05",
      icon: ShieldCheck,
      title: "Denim Outerwear",
      desc: "Weather-resistant twill and stone-washed heavyweight denim finished with custom hardware made to age with character.",
      tag: "Washed Heritage",
      spec: "14 oz Selvedge Twill",
      image: "/jack.png"
    },
    {
      num: "06",
      icon: Layers,
      title: "Everyday Denim",
      desc: "Evergreen straight and tapered cuts balancing authentic vintage texture with subtle stretch for unrestricted comfort.",
      tag: "Stretch Selvedge",
      spec: "Custom Alloy Rivets",
      image: "/jean.png"
    }
  ];

  const metrics = [
    { value: "420 GSM", label: "Signature Heavyweight Fleece" },
    { value: "100%", label: "Combed Organic Cotton" },
    { value: "50K+", label: "Orders Delivered Across India" },
    { value: "4.9 ★", label: "Verified Customer Craft Score" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* =========================================================================
         1. FULL-BLEED EDITORIAL BRAND ATELIER HERO
         ========================================================================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-white/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(circle at 78% 22%, rgba(245, 158, 11, 0.16), transparent 45%), radial-gradient(circle at 15% 80%, rgba(230, 57, 70, 0.14), transparent 50%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-bold tracking-[0.18em] uppercase text-amber-300">
              <Sparkles size={13} />
              <span>THE ATELIER • EST. 2024</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
              ARCHITECTURAL SILHOUETTES. <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                ZERO COMPROMISE.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              SK STYLES was founded on a simple obsession: elevating daily menswear and performance footwear with bespoke proportions, dense organic fibers, and enduring construction.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>Explore Full Store</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('membership-perks')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all"
              >
                <Award size={16} className="text-amber-400" />
                <span>VIP Club & Rewards</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 aspect-[4/4.5] max-w-md mx-auto group">
              <img
                src="/about-atelier.jpg"
                alt="SK STYLES Craftsmanship"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/collections-editorial.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/15">
                <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-amber-400">
                  CRAFT PHILOSOPHY
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Built for Longevity, Styled for Now
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Micro-stitch tolerance • Enzyme pre-washed cotton • Carbon-plate footwear
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. ATELIER BENCHMARK METRICS STRIP
         ========================================================================= */}
      <section className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {m.value}
              </div>
              <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         3. SIX PILLARS EDITORIAL BENTO GRID
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-3">
            <Sparkles size={12} />
            <span>FABRIC & FOOTWEAR ARCHITECTURE</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            The Six Pillars of SK STYLES
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            Every garment and silhouette starts with raw material testing and ends with hand-inspected finishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.num}
                className="group bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-black tracking-widest text-stone-400">
                        PILLAR {sec.num}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {sec.tag}
                    </span>
                  </div>

                  <div className="h-36 mb-5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/50 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="max-h-28 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                    />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-400 uppercase tracking-wider">Spec</span>
                  <span className="font-bold text-slate-900 dark:text-stone-200">{sec.spec}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         4. VIP MEMBERSHIP & REFERRAL PROGRAM SPLIT SHOWCASE
         ========================================================================= */}
      <section id="membership-perks" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* VIP Card */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-stone-900 text-white p-8 sm:p-10 border border-white/10 shadow-xl flex flex-col justify-between gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/sk style.png"
                  alt="SK STYLES"
                  className="w-14 h-14 rounded-2xl bg-white p-1.5 object-contain shadow-md"
                />
                <div>
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400">
                    PRIORITY ACCESS CLUB
                  </span>
                  <h3 className="text-2xl font-black mt-0.5">SK STYLES VIP Member</h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Free Enrollment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Award size={22} className="text-amber-400 mb-2" />
                <h4 className="font-bold text-sm">Earn Vault Points</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Collect points on every apparel & sneaker order and redeem toward limited releases.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Truck size={22} className="text-rose-400 mb-2" />
                <h4 className="font-bold text-sm">48-Hour Early Drops</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Unlock private restock alerts, complimentary alterations, and express dispatch.
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 font-extrabold text-sm hover:bg-stone-100 transition-all shadow-lg"
              >
                <span>Join VIP Club Free</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Referral Card */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 sm:p-10 shadow-sm flex flex-col justify-between gap-6">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-5">
                <Gift size={28} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                REFER & EARN
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Give 20% Off, Earn ₹500
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Invite friends to SK STYLES with your personal atelier code. They save 20% on their first order, and you unlock <strong>₹500 in shopping vouchers</strong>—up to ₹5,000 total!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  YOUR REFERRAL CODE
                </span>
                <strong className="font-mono text-lg font-black text-slate-900 dark:text-white tracking-wider">
                  {referralCode}
                </strong>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors"
              >
                {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
