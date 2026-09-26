import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ productId = 'prod-1', setActivePage, onSelectProduct }) {
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors?.[0] || 'Standard');
    setQuantity(1);
  }, [productId]);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setActivePage('cart');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '24px', paddingBottom: '48px' }}>
      {/* Modern Breadcrumb */}
      <nav style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }} aria-label="Breadcrumb">
        <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} style={{ color: 'var(--color-brand)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>/</span>
        <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }} style={{ color: 'var(--color-brand)', textDecoration: 'none' }}>{product.categoryLabel}</a>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Modern Split Product Detail View */}
      <div className="product-detail-view">
        <div className="product-detail-grid">
          {/* Left: Gallery with Real Photography */}
          <div>
            <div className="detail-gallery-main">
              <img
                src={selectedImage}
                alt={product.name}
                className="detail-main-img"
              />
            </div>
            <div className="detail-thumbs-strip">
              {product.thumbnails?.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`detail-thumb-btn ${selectedImage === thumb ? 'active' : ''}`}
                  onClick={() => setSelectedImage(thumb)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={thumb} alt="" className="detail-thumb-img" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Specifications & Modern Buy Box */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand)' }}>
                {product.brand || 'NovaTech'}
              </span>
              <span className="badge badge-primary">Staff Pick</span>
            </div>

            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '12px' }}>
              {product.name}
            </h1>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>• Verified Customer Purchase</span>
            </div>

            {/* Price Box */}
            <div style={{ background: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="badge-discount-tag">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>
                Inclusive of 18% GST • Complimentary Express Shipping Across India
              </div>
            </div>

            {/* Color Finish Picker */}
            {product.colors && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
                  Select Finish: <span style={{ fontWeight: 500, color: 'var(--color-brand)' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        border: selectedColor === color ? '2px solid var(--color-brand)' : '1px solid var(--color-border)',
                        backgroundColor: selectedColor === color ? 'var(--color-brand-light)' : '#ffffff',
                        color: selectedColor === color ? 'var(--color-brand)' : '#0f172a',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modern Buy Box Controls */}
            <div className="detail-buy-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Select Quantity:</span>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    className="stepper-input"
                    value={quantity}
                  />
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => addToCart(product, quantity, selectedColor)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={handleBuyNow}
                >
                  Buy Now &rarr;
                </button>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#64748b' }}>
                <span>⚡ 24h Express Dispatch</span>
                <span>🛡️ 2-Year NovaCare Warranty</span>
                <span>🔄 30-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Overview Tabs */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '24px' }}>
          <button
            type="button"
            className={`btn ${activeTab === 'specs' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveTab('specs')}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveTab('overview')}
          >
            Product Overview
          </button>
          <button
            type="button"
            className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </div>

        {activeTab === 'specs' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <tbody>
              {Object.entries(product.specs || {}).map(([key, val], idx) => (
                <tr key={key} style={{ backgroundColor: idx % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, width: '35%', color: '#0f172a', borderBottom: '1px solid var(--color-border)' }}>
                    {key}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569', borderBottom: '1px solid var(--color-border)' }}>
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'overview' && (
          <div style={{ lineHeight: 1.7, color: '#334155' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>
              Engineered with Precision Architecture
            </h3>
            <p style={{ marginBottom: '16px' }}>{product.description}</p>
            <p>Every unit undergoes strict quality validation, acoustic isolation testing, and factory burn-in to ensure 100% compliance with NovaTech audio and electronics standards.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a' }}>{product.rating}</span>
              <div>
                <StarRating rating={product.rating} />
                <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
                  Based on {product.reviewsCount} verified customer ratings
                </span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', color: '#0f172a' }}>Aditya R. — ★★★★★ Outstanding Build & Acoustics</strong>
                <p style={{ margin: '4px 0', fontSize: '0.875rem', color: '#475569' }}>
                  Exceeded expectations. The build quality, battery endurance, and instant pairing work seamlessly. Delivered within 24 hours in Chennai!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <section>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: '#0f172a' }}>
          Customers Also Evaluated
        </h2>
        <div className="grid grid-cols-4" style={{ gap: '20px' }}>
          {relatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
