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
  const [deliveryPincode, setDeliveryPincode] = useState('600001');

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
    <div className="container" style={{ paddingTop: '16px', paddingBottom: '40px' }}>
      {/* Amazon Breadcrumb */}
      <nav style={{ fontSize: '0.8rem', color: '#565959', marginBottom: '16px' }} aria-label="Breadcrumb">
        <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} style={{ color: 'var(--color-link)' }}>Electronics</a>
        <span style={{ margin: '0 6px' }}>&rsaquo;</span>
        <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }} style={{ color: 'var(--color-link)' }}>{product.categoryLabel}</a>
        <span style={{ margin: '0 6px' }}>&rsaquo;</span>
        <span style={{ color: '#0f1111' }}>{product.name}</span>
      </nav>

      {/* Amazon 3-Column Product Detail Layout */}
      <div className="detail-layout-amazon">
        {/* Column 1: Gallery */}
        <div className="detail-gallery-col">
          <div className="detail-thumbs-list">
            {product.thumbnails?.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                className={`detail-thumb-btn ${selectedImage === thumb ? 'active' : ''}`}
                onClick={() => setSelectedImage(thumb)}
                aria-label={`View angle ${idx + 1}`}
              >
                <img src={thumb} alt="" className="detail-thumb-img" />
              </button>
            ))}
          </div>

          <div className="detail-main-img-box">
            <img
              src={selectedImage}
              alt={product.name}
              className="detail-main-img"
            />
          </div>
        </div>

        {/* Column 2: Product Information & Specifications */}
        <div className="detail-center-col">
          <a
            href="#products"
            className="detail-brand-link"
            onClick={(e) => { e.preventDefault(); setActivePage('products'); }}
          >
            Visit the {product.brand || 'NovaTech'} Store
          </a>

          <h1 className="detail-title">{product.name}</h1>

          {/* Star Ratings + Review Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
            <span style={{ color: '#007185', fontSize: '0.85rem' }}>| 124 answered questions</span>
          </div>

          {/* Badge */}
          {product.badge && (
            <div style={{ marginBottom: '12px' }}>
              <span className="badge badge-choice">
                Nova<span className="badge-accent">Choice</span> for "{product.categoryLabel}"
              </span>
            </div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid #e7e7e7', margin: '8px 0 16px' }} />

          {/* Price Box */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {discountPercent > 0 && (
                <span style={{ color: 'var(--color-deal-red)', fontSize: '1.75rem', fontWeight: 300 }}>
                  -{discountPercent}%
                </span>
              )}
              <span style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0f1111' }}>
                <span style={{ fontSize: '0.65em', verticalAlign: 'top' }}>₹</span>
                {product.price.toLocaleString('en-IN')}
              </span>
            </div>
            {product.originalPrice && (
              <div style={{ fontSize: '0.85rem', color: '#565959', marginTop: '2px' }}>
                Typical price: <span style={{ textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ fontSize: '0.8rem', color: '#565959', marginTop: '4px' }}>
              Inclusive of all taxes. Free shipping on this item.
            </div>
          </div>

          {/* Bank Offers Callout Box (Real Amazon Style) */}
          <div className="bank-offers-box">
            <div className="bank-offers-title">
              <span>🏷️</span> Bank Offers & Partner Discounts
            </div>
            <div className="bank-offers-text">
              <strong>10% Instant Discount</strong> up to ₹1,500 on HDFC / ICICI Bank Credit Cards.
              <br />
              <strong>No-Cost EMI:</strong> Avail No Cost EMI on select cards for orders above ₹5,000.
            </div>
          </div>

          {/* Color Finish Picker */}
          {product.colors && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: '#0f1111' }}>
                Color Finish: <span style={{ fontWeight: 400, color: '#565959' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      border: selectedColor === color ? '2px solid var(--color-cta-orange)' : '1px solid #d5d9d9',
                      backgroundColor: selectedColor === color ? '#fff8f0' : '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: selectedColor === color ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* About this Item */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#0f1111' }}>
              About this item
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#333333', lineHeight: 1.6, marginBottom: '12px' }}>
              {product.description}
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#333333', lineHeight: 1.6 }}>
              <li>{product.tagline}</li>
              <li>High-durability build backed by NovaTech 2-Year Official Comprehensive Warranty.</li>
              <li>Engineered for professional content creators, developers, and daily power users.</li>
            </ul>
          </div>
        </div>

        {/* Column 3: Amazon Sticky Buy Box */}
        <div>
          <div className="sticky-buy-box">
            <div className="buy-box-price">
              ₹{(product.price * quantity).toLocaleString('en-IN')}
            </div>

            <div className="buy-box-delivery">
              <span className="badge-prime" style={{ marginRight: '6px' }}>Prime</span>
              <span>FREE delivery <strong>Tomorrow, 27 Sept</strong>.</span>
              <br />
              <span style={{ fontSize: '0.8rem', color: '#565959' }}>
                Order within <strong>4 hrs 12 mins</strong>.
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#007185', marginBottom: '12px', cursor: 'pointer' }}>
              📍 Deliver to Chennai {deliveryPincode}
            </div>

            <div className="buy-box-stock">In Stock</div>

            {/* Quantity Dropdown */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="buybox-quantity" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Quantity:
              </label>
              <select
                id="buybox-quantity"
                className="buy-box-qty-select"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Buttons: Yellow Add to Cart & Orange Buy Now */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-cart-yellow btn-block"
                onClick={() => addToCart(product, quantity, selectedColor)}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="btn btn-orange btn-block"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Guarantee Details */}
            <div style={{ fontSize: '0.75rem', color: '#565959', marginTop: '16px', lineHeight: 1.6, borderTop: '1px solid #e7e7e7', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ships from</span>
                <strong style={{ color: '#0f1111' }}>NovaTech Logistics</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sold by</span>
                <strong style={{ color: '#0f1111' }}>NovaTech Official</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Returns</span>
                <strong style={{ color: '#007185' }}>7-day Replacement</strong>
              </div>
            </div>

            <div className="buy-box-security">
              <span>🔒 Secure transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Overview Tabs */}
      <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e7e7e7', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: activeTab === 'specs' ? '3px solid var(--color-cta-orange)' : '3px solid transparent',
              background: 'none',
              fontWeight: activeTab === 'specs' ? 700 : 500,
              color: activeTab === 'specs' ? '#0f1111' : '#565959',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: activeTab === 'reviews' ? '3px solid var(--color-cta-orange)' : '3px solid transparent',
              background: 'none',
              fontWeight: activeTab === 'reviews' ? 700 : 500,
              color: activeTab === 'reviews' ? '#0f1111' : '#565959',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </div>

        {activeTab === 'specs' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <tbody>
              {product.specs && Object.entries(product.specs).map(([specKey, specVal], idx) => (
                <tr key={specKey} style={{ backgroundColor: idx % 2 === 0 ? '#f7fafa' : '#ffffff' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, width: '35%', color: '#0f1111', borderBottom: '1px solid #e7e7e7' }}>
                    {specKey}
                  </td>
                  <td style={{ padding: '10px 16px', color: '#565959', borderBottom: '1px solid #e7e7e7' }}>
                    {specVal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f1111' }}>
                {product.rating}
              </div>
              <div>
                <StarRating rating={product.rating} />
                <div style={{ fontSize: '0.85rem', color: '#565959', marginTop: '4px' }}>
                  Based on {product.reviewsCount} global verified ratings
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid #e7e7e7', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Arun K. (Verified Purchase)</span>
                  <span style={{ fontSize: '0.75rem', color: '#565959' }}>• Reviewed on 20 Sept 2026</span>
                </div>
                <div style={{ color: 'var(--color-star-gold)', fontSize: '0.85rem', marginBottom: '4px' }}>★★★★★</div>
                <p style={{ fontSize: '0.85rem', color: '#333333', margin: 0 }}>
                  Exceptional soundstage and noise cancelling. Delivered within 24 hours in pristine condition!
                </p>
              </div>

              <div style={{ borderBottom: '1px solid #e7e7e7', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Sneha M. (Verified Purchase)</span>
                  <span style={{ fontSize: '0.75rem', color: '#565959' }}>• Reviewed on 14 Sept 2026</span>
                </div>
                <div style={{ color: 'var(--color-star-gold)', fontSize: '0.85rem', marginBottom: '4px' }}>★★★★★</div>
                <p style={{ fontSize: '0.85rem', color: '#333333', margin: 0 }}>
                  Build quality is premium. Battery life easily exceeded 40 hours with ANC activated.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Shelf */}
      <section style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: '#0f1111' }}>
          Customers who viewed this item also viewed
        </h3>
        <div className="product-grid" style={{ marginBottom: 0 }}>
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
