import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Home({ setActivePage, onSelectProduct, setSelectedCategory }) {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Real-time ticking countdown for Flash Deals
  const [timer, setTimer] = useState({ hours: 4, minutes: 48, seconds: 22 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (catId) => {
    if (setSelectedCategory) setSelectedCategory(catId);
    setActivePage('products');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('✓ Subscribed! You will receive exclusive technical release alerts.');
      setNewsletterEmail('');
    }
  };

  // Top deals (products on sale)
  const dealsProducts = PRODUCTS.filter((p) => p.badge === 'sale' || p.originalPrice);

  return (
    <div className="main-content" style={{ padding: 0 }}>
      {/* 1. Modern Flagship Tech Hero Showcase */}
      <section className="hero-showcase">
        <div className="hero-showcase-content">
          <div>
            <div className="hero-pill-badge">
              <span>✦</span> Next-Gen Tech Architecture 2026
            </div>
            <h1 className="hero-showcase-title">
              Engineered for <span>Peak Performance</span> & Audio Clarity
            </h1>
            <p className="hero-showcase-desc">
              Discover industry-defining noise cancelling headphones, ultrabooks, 4K aerial drones, and smart AMOLED wearables with official 2-year NovaCare warranty.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setActivePage('products')}
              >
                Explore Full Catalog &rarr;
              </button>
              <button
                className="btn btn-outline btn-lg"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                onClick={() => onSelectProduct('prod-1')}
              >
                View NovaPro ANC (₹19,999)
              </button>
            </div>
          </div>

          <div className="hero-preview-card">
            <img
              src={PRODUCTS[0].image}
              alt="NovaPro Studio ANC Real Device"
              className="hero-preview-img"
            />
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '1rem', display: 'block' }}>NovaPro Studio ANC</strong>
                <span style={{ color: '#a5b4fc', fontSize: '0.85rem' }}>Active Noise Cancellation • 45h Battery</span>
              </div>
              <span style={{ background: '#4f46e5', color: '#ffffff', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700 }}>
                ₹19,999
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Pills */}
      <div className="category-pill-strip">
        <button className="category-pill-btn active" onClick={() => handleCategoryClick('all')}>
          ⚡ All Categories
        </button>
        <button className="category-pill-btn" onClick={() => handleCategoryClick('audio')}>
          🎧 Audio Gear
        </button>
        <button className="category-pill-btn" onClick={() => handleCategoryClick('wearables')}>
          ⌚ Smartwatches
        </button>
        <button className="category-pill-btn" onClick={() => handleCategoryClick('computing')}>
          💻 Computing
        </button>
        <button className="category-pill-btn" onClick={() => handleCategoryClick('gaming')}>
          ⌨️ Gaming
        </button>
        <button className="category-pill-btn" onClick={() => handleCategoryClick('cameras')}>
          📷 Cameras & Drones
        </button>
      </div>

      <div className="container">
        {/* 3. Flash Deals with Live Countdown */}
        <section style={{ marginBottom: '32px' }}>
          <div className="deals-banner">
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
                ⚡ Limited-Time Tech Deals
              </h2>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Instant savings and complimentary express delivery on selected items.
              </span>
            </div>
            <div className="deals-timer-box">
              <span>⏱ Deal Closes In:</span>
              <strong>
                {String(timer.hours).padStart(2, '0')}h : {String(timer.minutes).padStart(2, '0')}m : {String(timer.seconds).padStart(2, '0')}s
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-4" style={{ gap: '20px' }}>
            {dealsProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* 4. Innovation & Gear Collections (Clean Modern Quad Cards) */}
        <section className="quad-grid">
          {/* Card 1 */}
          <div className="quad-card">
            <h3 className="quad-card-title">Creator & Pro Workstations</h3>
            <div className="quad-card-grid">
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-3')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[2].image} alt="Ultrabook" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">M3 Ultrabooks</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-7')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[6].image} alt="Keyboard" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">RGB Keyboards</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-1')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[0].image} alt="Headphones" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Studio ANC</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-2')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[1].image} alt="Smartwatch" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">AMOLED Watch</div>
              </div>
            </div>
            <a
              href="#products"
              className="quad-card-link"
              onClick={(e) => { e.preventDefault(); setActivePage('products'); }}
            >
              Explore productivity suite &rarr;
            </a>
          </div>

          {/* Card 2 */}
          <div className="quad-card">
            <h3 className="quad-card-title">Acoustic Audio Excellence</h3>
            <div className="quad-card-grid">
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-1')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[0].image} alt="Headphones" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Hi-Res ANC</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-4')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[3].image} alt="Earbuds" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">ANC Earbuds</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-5')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[4].image} alt="Speaker" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Waterproof 360</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-8')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[7].image} alt="Drone" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">4K Camera Drones</div>
              </div>
            </div>
            <a
              href="#products"
              className="quad-card-link"
              onClick={(e) => { e.preventDefault(); handleCategoryClick('audio'); }}
            >
              See all sound gear &rarr;
            </a>
          </div>

          {/* Card 3: Exclusive Member Perks & Offers */}
          <div className="quad-card">
            <h3 className="quad-card-title">NovaCare & Special Offers</h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>💳 Instant Card Discount</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                  ₹1,500 off on checkout with all major bank credit and debit cards.
                </p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>🛡️ 2-Year Official Protection</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                  Factory warranty with door-step collection & instant replacements.
                </p>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                <strong style={{ color: '#059669', fontSize: '0.9rem' }}>🎟 Promo Code TECH20</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                  Apply code TECH20 at cart for an additional 20% off on your order.
                </p>
              </div>
            </div>
            <a
              href="#cart"
              className="quad-card-link"
              onClick={(e) => { e.preventDefault(); setActivePage('cart'); }}
            >
              View checkout benefits &rarr;
            </a>
          </div>
        </section>

        {/* 5. Complete Catalog Grid */}
        <section style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
                Trending Tech & New Releases
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                Authentic premium electronics with instant dispatch and 2-year manufacturer guarantee.
              </p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setActivePage('products')}
            >
              View Full Catalog (8) &rarr;
            </button>
          </div>

          <div className="grid grid-cols-4" style={{ gap: '20px' }}>
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* 6. Brand Trust Guarantees */}
        <div className="trust-bar">
          <div className="trust-item">
            <span className="trust-icon">⚡</span>
            <div>
              <div className="trust-title">24h Express Dispatch</div>
              <p className="trust-desc">Complimentary shipping on orders above ₹999</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔄</span>
            <div>
              <div className="trust-title">30-Day Hassle-Free Returns</div>
              <p className="trust-desc">100% money back with free doorstep return</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <div>
              <div className="trust-title">2-Year NovaCare Warranty</div>
              <p className="trust-desc">Comprehensive hardware and component coverage</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <div>
              <div className="trust-title">100% Encrypted Checkout</div>
              <p className="trust-desc">Verified transactions via UPI, Cards, NetBanking, COD</p>
            </div>
          </div>
        </div>

        {/* 7. Newsletter Subscription Box */}
        <section style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 24px',
          textAlign: 'center',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>
            Stay Ahead of Next-Gen Hardware Drops
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '520px', margin: '0 auto 20px' }}>
            Subscribe to the NovaTech technical newsletter for early access to flagship launches, insider discounts, and performance benchmarks.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            style={{ display: 'flex', gap: '8px', maxWidth: '440px', margin: '0 auto' }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
