import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Home({ setActivePage, onSelectProduct, setSelectedCategory }) {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActivePage('products');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('✓ Thank you for subscribing to NovaTech VIP updates!');
      setNewsletterEmail('');
    }
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tagline">🚀 Breakthrough Technology 2026</div>
            <h1 className="hero-title">
              Experience Audio & Computing <span className="highlight">Reimagined.</span>
            </h1>
            <p className="hero-description">
              Discover precision-engineered electronics crafted for high performance, audiophile-grade acoustics, and unmatched reliability.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setActivePage('products')}
              >
                Explore Catalog &rarr;
              </button>
              <button
                className="btn btn-outline btn-lg"
                style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
                onClick={() => onSelectProduct('prod-1')}
              >
                View Flagship Product
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-banner-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-sale">Limited Edition</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>In Stock (42 units)</span>
              </div>
              <img
                src={PRODUCTS[0].image}
                alt="NovaPro Wireless ANC Headphones"
                style={{ maxHeight: '220px', margin: '0 auto', cursor: 'pointer' }}
                onClick={() => onSelectProduct('prod-1')}
              />
              <h3 style={{ color: '#ffffff', marginTop: '1rem', fontSize: '1.25rem' }}>
                {PRODUCTS[0].name}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: 0 }}>
                {PRODUCTS[0].tagline}
              </p>
              <div className="hero-stat-row">
                <div className="hero-stat-item">
                  <div className="hero-stat-value">45h</div>
                  <div className="hero-stat-label">Playtime</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-value">-40dB</div>
                  <div className="hero-stat-label">Noise Cancel</div>
                </div>
                <div className="hero-stat-item">
                  <div className="hero-stat-value">4.9 ★</div>
                  <div className="hero-stat-label">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Strip */}
      <section className="features-strip" aria-label="Key Benefits">
        <div className="container features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrap">🚚</div>
            <div>
              <h2 className="feature-title">Free Express Shipping</h2>
              <p className="feature-desc">Complimentary shipping on all orders over $50</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrap">🛡️</div>
            <div>
              <h2 className="feature-title">2-Year Full Warranty</h2>
              <p className="feature-desc">Official factory coverage and instant replacements</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrap">🔄</div>
            <div>
              <h2 className="feature-title">30-Day Free Returns</h2>
              <p className="feature-desc">Hassle-free return policy with zero restocking fees</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrap">🎧</div>
            <div>
              <h2 className="feature-title">24/7 Expert Support</h2>
              <p className="feature-desc">Certified hardware specialists ready to assist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="section" id="categories">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-subtitle">Curated Departments</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-desc">Browse our premium selection engineered for creators, gamers, and working professionals.</p>
          </div>

          <div className="grid grid-cols-4">
            {CATEGORIES.filter(c => c.id !== 'all').slice(0, 4).map(cat => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => handleCategoryClick(cat.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-icon-box">{cat.icon}</div>
                <h3 className="category-title">{cat.name}</h3>
                <span className="category-count">{cat.count} Products Available</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-subtitle">Staff Picks & Best Sellers</span>
            <h2 className="section-title">Trending Tech Deals</h2>
            <p className="section-desc">Top-rated items favored by our worldwide community of tech enthusiasts.</p>
          </div>

          <div className="grid grid-cols-4">
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => setActivePage('products')}
            >
              Browse Full Catalog ({PRODUCTS.length} Items) &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Dual Banners */}
      <section className="section">
        <div className="container">
          <div className="promo-banners-grid">
            <div className="promo-card dark">
              <div style={{ maxWidth: '60%' }}>
                <span className="badge badge-sale" style={{ marginBottom: '0.75rem' }}>Special Offer</span>
                <h3>Audiophile Soundstage</h3>
                <p>Get a complimentary hardshell case and 3 months of lossless streaming with any headset.</p>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '1rem' }}
                  onClick={() => handleCategoryClick('audio')}
                >
                  Shop Audio Deals
                </button>
              </div>
              <img src={PRODUCTS[0].image} alt="Audio Deal" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
            </div>

            <div className="promo-card accent">
              <div style={{ maxWidth: '60%' }}>
                <span className="badge badge-new" style={{ marginBottom: '0.75rem' }}>Workstation Ready</span>
                <h3>Pro Developer Setup</h3>
                <p>Boost your productivity with ultra-fast Thunderbolt laptops and wireless mechanical peripherals.</p>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '1rem' }}
                  onClick={() => handleCategoryClick('computing')}
                >
                  Explore Workstations
                </button>
              </div>
              <img src={PRODUCTS[2].image} alt="Laptop Deal" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-subtitle">Verified Feedback</span>
            <h2 className="section-title">Loved by Over 50,000 Customers</h2>
            <p className="section-desc">See what audio engineers, programmers, and creators have to say about NovaTech products.</p>
          </div>

          <div className="grid grid-cols-3">
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div className="rating-stars" style={{ marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "The NovaPro ANC headphones have completely replaced my office headset. The noise cancellation creates instant quiet, and battery life is genuinely stellar."
              </p>
              <div>
                <strong>David Chen</strong>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Senior Software Engineer, Seattle</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div className="rating-stars" style={{ marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "Super fast shipping and top notch customer service. I received my Zenith Pro laptop in 2 days, and the build quality is astonishingly premium."
              </p>
              <div>
                <strong>Sarah Jenkins</strong>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Creative Director, London</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div className="rating-stars" style={{ marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "The Apex Pro mechanical keyboard has the most satisfying tactile keystrokes I have ever used. Plus RGB custom lighting syncs seamlessly."
              </p>
              <div>
                <strong>Marcus Brody</strong>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Game Developer & Streamer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Strip */}
      <section className="section" style={{ backgroundColor: 'var(--color-secondary)', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Stay Ahead of the Curve</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            Subscribe for exclusive hardware drops, early VIP access, and weekly tech firmware roundups.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: '#ffffff',
                minWidth: '280px'
              }}
            />
            <button type="submit" className="btn btn-primary">Join Community</button>
          </form>
        </div>
      </section>
    </div>
  );
}
