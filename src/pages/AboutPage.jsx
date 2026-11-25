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
  HeartHandshake
} from 'lucide-react';

export default function AboutPage() {
  const { setActiveTab, showToast } = useCart();
  const [copied, setCopied] = useState(false);

  const referralCode = "SKSTYLE100";

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    showToast('Referral code copied to clipboard! Share with friends.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const sections = [
    {
      num: "01",
      icon: Shirt,
      title: "Shirts For Men",
      desc: "Tailored for every occasion from boardroom sharp to evening relaxed. Innovating high-grade fabrics, French-felled seams, and breathable organic cotton that drapes naturally without creasing.",
      tag: "100% Organic Cotton",
      spec: "Single-Needle Stitching"
    },
    {
      num: "02",
      icon: Flame,
      title: "Hoodies & Sweatshirts",
      desc: "Engineered for warmth, form, and modern streetwear expression. Pushing boundaries in fabric innovation, 420 GSM French Terry, double-lined hoods, and structured drop-shoulder silhouettes.",
      tag: "Thermal Fleece Blend",
      spec: "420 GSM Heavyweight"
    },
    {
      num: "03",
      icon: Activity,
      title: "Joggers & Track Pants",
      desc: "From intense workout sessions to urban commute and lounge days. Blending 4-way stretch flex with reinforced gusset construction, ergonomic zip pockets, and sleek tapered cuffs.",
      tag: "4-Way Stretch Flex",
      spec: "Reinforced Seams"
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Jackets & Outerwear",
      desc: "Redefining outer layers with durable weather-resistant twill, stone-washed denim, and lightweight utility windbreakers designed to withstand everyday city adventures in all seasons.",
      tag: "Weather-Resistant Denim",
      spec: "Vintage Washed Finish"
    },
    {
      num: "05",
      icon: Sparkles,
      title: "Anime & Graphic Tees",
      desc: "Pop-culture reverence meets luxury apparel craftsmanship. High-definition screenprints and vibrant manga art on 240 GSM combed cotton that won't fade, crack, or peel after washing.",
      tag: "Fade-Resistant Silk Print",
      spec: "240 GSM Carded Cotton"
    },
    {
      num: "06",
      icon: Layers,
      title: "Everyday Denim & Jeans",
      desc: "Evergreen silhouettes engineered for enduring comfort and contemporary styling. From raw selvage cuts to relaxed tapered fits, crafted with premium stretch for non-restrictive all-day mobility.",
      tag: "Raw & Washed Stretch Denim",
      spec: "Custom Rivets & Hardware"
    }
  ];

  return (
    <div className="about-page-container">
      {/* =========================================================================
         1. LUXURY EDITORIAL BRAND HERITAGE COVER HERO
         ========================================================================= */}
      <section className="cover-landing-hero">
        <div className="cover-hero-container">
          <div className="cover-hero-content">
            <div className="cover-hero-tag">
              <Sparkles size={14} className="text-amber-400" />
              <span>BRAND HERITAGE • EST. 2024</span>
            </div>

            <h1 className="cover-hero-title">
              THE ART OF <br />
              <span className="cover-title-accent">MODERN TAILORING</span>
            </h1>

            <p className="cover-hero-subtitle">
              At SK STYLES, we reject fast-fashion compromises. Each piece is engineered with dense organic cotton, architectural drapes, and reinforced stitching to deliver enduring luxury.
            </p>

            <div className="cover-hero-actions">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="cover-primary-btn"
              >
                <span>Explore Catalog</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('membership-perks');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cover-secondary-btn"
              >
                <Award size={16} />
                <span>VIP Club & Rewards</span>
              </button>
            </div>

            {/* Craftsmanship Highlights */}
            <div className="cover-hero-perks">
              <div className="cover-perk-item">
                <ShieldCheck size={18} className="perk-icon" />
                <span>100% Organic Fibers</span>
              </div>
              <div className="cover-perk-item">
                <Award size={18} className="perk-icon" />
                <span>Micro-Stitch Precision</span>
              </div>
              <div className="cover-perk-item">
                <Truck size={18} className="perk-icon" />
                <span>Express Dispatch</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="cover-hero-visual">
            <div className="cover-visual-card">
              <img
                src="/about hd.png"
                alt="SK STYLES Craftsmanship"
                className="cover-visual-img"
                onError={(e) => {
                  e.target.src = '/fashon 2.jpg';
                }}
              />
              <div className="cover-visual-glass-badge">
                <span className="glass-badge-eyebrow">ATELIER PHILOSOPHY</span>
                <span className="glass-badge-title">Unconventional Form & Function</span>
                <span className="glass-badge-price">Bespoke Cuts • Zero Compromise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. CORE PRODUCT PILLARS SECTION
         ========================================================================= */}
      <section className="about-pillars-section">
        <div className="about-pillars-header">
          <div className="rail-header-badge">
            <Sparkles size={13} />
            <span>FABRIC INNOVATION & ARCHITECTURE</span>
          </div>
          <h2 className="rail-header-title">The Six Pillars of SK STYLES</h2>
          <p className="rail-header-subtitle">
            Every garment begins with intentional fiber selection and ends with meticulous quality checks.
          </p>
        </div>

        <div className="about-narrative-grid">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.num} className="narrative-card">
                <div className="card-top-header">
                  <div className="flex items-center gap-2.5">
                    <div className="pillar-icon-box">
                      <Icon size={18} />
                    </div>
                    <span className="sec-number">{sec.num}</span>
                  </div>
                  <span className="sec-tag">{sec.tag}</span>
                </div>
                <h3>{sec.title}</h3>
                <p>{sec.desc}</p>
                <div className="narrative-card-footer">
                  <span className="spec-label">Specification:</span>
                  <span className="spec-val">{sec.spec}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         3. VIP MEMBERSHIP PERKS
         ========================================================================= */}
      <div id="membership-perks" className="membership-banner">
        <div className="membership-inner">
          <div className="membership-brand">
            <img src="/sk style.png" alt="SK STYLES" className="member-logo" />
            <div>
              <h3>SK STYLE VIP MEMBER</h3>
              <p className="member-sub">Exclusive Loyalty Club & Priority Access</p>
            </div>
          </div>

          <div className="membership-rewards">
            <div className="reward-highlight">
              <Award size={28} className="gold-icon" />
              <div>
                <h4>EARN POINTS ON EVERY PURCHASE</h4>
                <p>Register with us to get first access to limited drops, members-only secret sales, and redeem points toward free garments.</p>
              </div>
            </div>
          </div>

          <button className="member-signup-btn" onClick={() => setActiveTab('login')}>
            SIGN UP NOW <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* =========================================================================
         4. REFERRAL REWARDS
         ========================================================================= */}
      <div className="referral-box">
        <div className="referral-icon-circle">
          <Gift size={32} />
        </div>
        <div className="referral-text">
          <h3>REFER & EARN WITH THE VIP REFERRAL PROGRAM</h3>
          <p>Invite friends and earn up to <strong>$100 in shopping vouchers</strong>. Your friends get 20% off their first order, and your account is rewarded immediately!</p>
        </div>

        <div className="referral-code-wrapper">
          <div className="code-pill">
            <span className="code-label">YOUR CODE:</span>
            <strong className="code-val">{referralCode}</strong>
          </div>
          <button className="copy-code-btn" onClick={handleCopyCode}>
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
