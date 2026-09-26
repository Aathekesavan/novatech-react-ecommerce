import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ productId = 'prod-1', setActivePage, onSelectProduct }) {
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  // Sync state if productId changes
  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors?.[0] || 'Standard');
    setQuantity(1);
  }, [productId]);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setActivePage('cart');
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="container section" style={{ paddingTop: 'var(--space-6)' }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <span className="breadcrumb-item">
          <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">
          <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>{product.categoryLabel}</a>
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active" aria-current="page">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="product-detail-layout">
        {/* Left Column: Gallery */}
        <div className="gallery-container">
          <div className="main-preview-img-box">
            <img
              src={selectedImage}
              alt={product.name}
              className="main-preview-img"
            />
          </div>

          <div className="thumbnails-strip" role="group" aria-label="Product thumbnails">
            {product.thumbnails?.map((thumb, idx) => (
              <button
                key={idx}
                className={`thumbnail-btn ${selectedImage === thumb ? 'active' : ''}`}
                onClick={() => setSelectedImage(thumb)}
                aria-label={`View thumbnail ${idx + 1}`}
              >
                <img src={thumb} alt={`View ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="product-detail-info">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {product.badge && (
                <span className="badge badge-sale">{product.badgeText}</span>
              )}
              <span className="badge badge-success">
                {product.inStock ? 'In Stock • Ships in 24h' : 'Backorder'}
              </span>
            </div>

            <h1 className="product-detail-title">{product.name}</h1>

            <div className="rating">
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
              <span style={{ color: 'var(--color-text-light)', margin: '0 0.5rem' }}>|</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                SKU: {product.sku}
              </span>
            </div>
          </div>

          <div className="product-detail-price-box">
            <span className="product-detail-current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="badge badge-sale" style={{ fontSize: '0.85rem' }}>
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Selected Finish: <strong style={{ color: 'var(--color-primary)' }}>{selectedColor}</strong>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {product.colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{
                      border: selectedColor === color ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontWeight: selectedColor === color ? 600 : 400,
                      fontSize: '0.85rem',
                      backgroundColor: selectedColor === color ? 'var(--color-primary-light)' : '#ffffff',
                      color: selectedColor === color ? 'var(--color-primary)' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    ● {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            <div className="quantity-stepper">
              <button
                className="stepper-btn stepper-dec"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="text"
                className="stepper-input"
                value={quantity}
                readOnly
                aria-label="Quantity"
              />
              <button
                className="stepper-btn stepper-inc"
                onClick={() => setQuantity(prev => Math.min(99, prev + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary btn-lg add-to-cart-btn"
              onClick={() => addToCart(product, quantity, selectedColor)}
              style={{ flex: 1, minWidth: '180px' }}
            >
              🛒 Add {quantity} to Cart
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={handleBuyNow}
              style={{ flex: 1, minWidth: '180px' }}
            >
              ⚡ Instant Checkout
            </button>
          </div>

          {/* Value Assurances */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-bg-subtle)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <span>🚚</span>
              <span><strong>Free Express Delivery:</strong> Estimated arrival in 2–3 business days.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <span>🛡️</span>
              <span><strong>2-Year Manufacturer Warranty</strong> with free express replacement.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tab-container">
        <nav className="tab-nav" role="tablist" aria-label="Product Tabs">
          <button
            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Technical Specifications
          </button>
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Detailed Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </nav>

        {activeTab === 'specs' && (
          <div className="tab-pane active">
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="tab-pane active">
            <h3>Precision Engineering for Creators & Professionals</h3>
            <p>{product.description}</p>
            <p>
              Each {product.name} is constructed from premium acoustic materials and thoroughly benchmarked against strict industry standards before shipment.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="tab-pane active">
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem', padding: '1.5rem', background: 'var(--color-bg-subtle)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                  {product.rating.toFixed(1)}
                </div>
                <StarRating rating={product.rating} />
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Based on {product.reviewsCount} customer reviews
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>5 Stars: 91%</div>
                <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>4 Stars: 8%</div>
                <div style={{ fontSize: '0.85rem' }}>3 Stars: 1%</div>
              </div>
            </div>

            <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Verified Buyer <span className="badge badge-success">Verified Purchase</span></strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Recent review</span>
              </div>
              <div className="rating-stars" style={{ marginBottom: '0.5rem' }}>★★★★★</div>
              <p style={{ marginBottom: 0 }}>
                "Exceptional performance and durability. Exactly as described, fast shipping, and high quality."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Products */}
      <div style={{ marginTop: 'var(--space-16)' }}>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>Frequently Paired With This Item</h2>
        <div className="grid grid-cols-3">
          {relatedProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
