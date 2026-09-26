import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Home({ setActivePage, onSelectProduct, setSelectedCategory }) {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Real-time ticking countdown for Amazon Lightning Deals
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
      showToast('✓ Subscribed! You will receive exclusive Amazon/Flipkart flash sale alerts.');
      setNewsletterEmail('');
    }
  };

  // Top deals (products on sale)
  const dealsProducts = PRODUCTS.filter((p) => p.badge === 'sale' || p.originalPrice);

  return (
    <div className="main-content" style={{ padding: 0 }}>
      {/* 1. Flipkart Style Circular Category Ribbon */}
      <div className="category-ribbon">
        <div className="category-pill-item" onClick={() => handleCategoryClick('audio')}>
          <div className="category-pill-icon">🎧</div>
          <span className="category-pill-name">Audio & Sound</span>
        </div>
        <div className="category-pill-item" onClick={() => handleCategoryClick('wearables')}>
          <div className="category-pill-icon">⌚</div>
          <span className="category-pill-name">Smartwatches</span>
        </div>
        <div className="category-pill-item" onClick={() => handleCategoryClick('computing')}>
          <div className="category-pill-icon">💻</div>
          <span className="category-pill-name">Laptops & PCs</span>
        </div>
        <div className="category-pill-item" onClick={() => handleCategoryClick('gaming')}>
          <div className="category-pill-icon">⌨️</div>
          <span className="category-pill-name">Gaming Tech</span>
        </div>
        <div className="category-pill-item" onClick={() => handleCategoryClick('cameras')}>
          <div className="category-pill-icon">📷</div>
          <span className="category-pill-name">Cameras</span>
        </div>
        <div className="category-pill-item" onClick={() => handleCategoryClick('all')}>
          <div className="category-pill-icon" style={{ backgroundColor: '#fff4e5', borderColor: '#febd69' }}>⚡</div>
          <span className="category-pill-name" style={{ color: '#c7511f', fontWeight: 700 }}>Top Deals</span>
        </div>
      </div>

      {/* 2. Amazon Style Mega Hero Promotional Banner */}
      <div className="hero-carousel">
        <div className="hero-content">
          <div>
            <span className="hero-tag">⚡ Grand Festive Electronics Sale</span>
            <h1 className="hero-title">
              Up to 50% Off on Premium Audio & Next-Gen Laptops
            </h1>
            <p className="hero-subtitle">
              Shop flagship studio headphones, ultraportables, 4K action cameras, and AMOLED smartwatches with instant bank discounts & No-Cost EMI.
            </p>
            <div className="hero-cta-group">
              <button
                className="btn btn-cart-yellow btn-lg"
                onClick={() => setActivePage('products')}
              >
                Shop Deals Now &rarr;
              </button>
              <button
                className="btn btn-orange btn-lg"
                onClick={() => onSelectProduct('prod-1')}
              >
                Explore NovaPro Studio ANC
              </button>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              src={PRODUCTS[0].image}
              alt="NovaPro Studio ANC"
              className="hero-image"
            />
          </div>
        </div>
      </div>

      <div className="container">
        {/* 3. Today's Lightning Deals with Live Countdown */}
        <section style={{ marginBottom: '24px' }}>
          <div className="deals-header-bar">
            <div className="deals-title-group">
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <h2 className="deals-title">Today's Lightning Deals</h2>
              <div className="deals-timer-badge">
                <span>⏱ Ends in:</span>
                <strong>
                  {String(timer.hours).padStart(2, '0')}h : {String(timer.minutes).padStart(2, '0')}m : {String(timer.seconds).padStart(2, '0')}s
                </strong>
              </div>
            </div>
            <a
              href="#products"
              className="section-link"
              onClick={(e) => { e.preventDefault(); setActivePage('products'); }}
            >
              See all lightning deals &rarr;
            </a>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderTop: 'none',
            borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
            padding: '16px'
          }}>
            <div className="product-grid" style={{ marginBottom: 0 }}>
              {dealsProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Amazon Quad-Cluster 4-in-1 Cards */}
        <section className="quad-grid">
          {/* Quad 1 */}
          <div className="quad-card">
            <h3 className="quad-card-title">Upgrade Your Work Setup</h3>
            <div className="quad-card-grid">
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-3')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[2].image} alt="Laptop" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Ultrabook Laptops</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-7')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[6].image} alt="Keyboard" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Mechanical Keyboards</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-1')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[0].image} alt="Headphones" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Studio ANC Headsets</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-2')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[1].image} alt="Watch" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Smart AMOLED Watches</div>
              </div>
            </div>
            <a
              href="#products"
              className="quad-card-link"
              onClick={(e) => { e.preventDefault(); setActivePage('products'); }}
            >
              Explore productivity tech &rarr;
            </a>
          </div>

          {/* Quad 2 */}
          <div className="quad-card">
            <h3 className="quad-card-title">Best Sellers in Audio & Music</h3>
            <div className="quad-card-grid">
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-1')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[0].image} alt="Studio Headphones" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Over-Ear ANC (4.9★)</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-4')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[3].image} alt="Earbuds" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">Spatial Earbuds</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-5')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[4].image} alt="Speaker" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">IPX7 Rugged Speakers</div>
              </div>
              <div className="quad-mini-item" onClick={() => onSelectProduct('prod-8')}>
                <div className="quad-mini-img-wrap">
                  <img src={PRODUCTS[7].image} alt="Drone" className="quad-mini-img" />
                </div>
                <div className="quad-mini-label">4K Video Drones</div>
              </div>
            </div>
            <a
              href="#products"
              className="quad-card-link"
              onClick={(e) => { e.preventDefault(); handleCategoryClick('audio'); }}
            >
              See all audio gear &rarr;
            </a>
          </div>

          {/* Quad 3: Exclusive Bank & Finance Offers */}
          <div className="quad-card">
            <h3 className="quad-card-title">Bank Discounts & Savings</h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f7fafa', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '10px' }}>
                <strong style={{ color: '#0f1111', fontSize: '0.85rem' }}>🏷 HDFC / ICICI Bank Cards</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#565959' }}>
                  10% Instant Discount up to ₹1,500 on minimum cart value of ₹5,000.
                </p>
              </div>
              <div style={{ background: '#f7fafa', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '10px' }}>
                <strong style={{ color: '#0f1111', fontSize: '0.85rem' }}>💳 No-Cost EMI Available</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#565959' }}>
                  Zero down payment and zero interest for up to 12 months.
                </p>
              </div>
              <div style={{ background: '#f7fafa', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '10px' }}>
                <strong style={{ color: '#007600', fontSize: '0.85rem' }}>🎟 Coupon TECH20</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#565959' }}>
                  Use code TECH20 at checkout for an extra 20% discount.
                </p>
              </div>
            </div>
            <a
              href="#cart"
              className="quad-card-link"
              onClick={(e) => { e.preventDefault(); setActivePage('cart'); }}
            >
              View checkout discounts &rarr;
            </a>
          </div>
        </section>

        {/* 5. Complete Catalog Grid */}
        <section className="section" style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '20px', marginBottom: '24px' }}>
          <div className="section-header" style={{ padding: 0, marginBottom: '16px' }}>
            <div>
              <h2 className="section-title">Trending Tech & New Releases</h2>
              <p style={{ fontSize: '0.85rem', color: '#565959', margin: 0 }}>
                Handcrafted electronics with industry-leading warranty and next-day delivery.
              </p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setActivePage('products')}
            >
              View Full Catalog (8) &rarr;
            </button>
          </div>

          <div className="product-grid" style={{ marginBottom: 0 }}>
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
            <span className="trust-icon">🚚</span>
            <div>
              <div className="trust-title">Free & Fast Delivery</div>
              <p className="trust-desc">Complimentary shipping on orders above ₹999</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔄</span>
            <div>
              <div className="trust-title">7 Days Replacement</div>
              <p className="trust-desc">Hassle-free replacement for defective items</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <div>
              <div className="trust-title">2 Years Official Warranty</div>
              <p className="trust-desc">Comprehensive brand service protection</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <div>
              <div className="trust-title">100% Secure Transaction</div>
              <p className="trust-desc">Encrypted payments via UPI, Cards, and COD</p>
            </div>
          </div>
        </div>

        {/* 7. Newsletter Subscription Box */}
        <section style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '32px 24px',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: '#0f1111' }}>
            Be the First to Know About Lightning Deals
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#565959', maxWidth: '520px', margin: '0 auto 20px' }}>
            Subscribe to the NovaTech VIP mailing list for early access to festival sales, exclusive promo codes, and technical releases.
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
                padding: '10px 14px',
                border: '1px solid #d5d9d9',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            />
            <button type="submit" className="btn btn-cart-yellow">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
