import React, { useState } from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card">
      {/* Badges: NovaTech's Choice or Deal of the Day */}
      {product.badge === 'sale' && (
        <span className="badge badge-deal product-card-badge">
          Deal of the Day
        </span>
      )}
      {product.badge === 'featured' && (
        <span className="badge badge-choice product-card-badge">
          Nova<span className="badge-accent">Choice</span>
        </span>
      )}

      {/* Wishlist Heart Icon */}
      <button
        className="product-card-wishlist"
        style={{ color: isWishlisted ? 'var(--color-deal-red)' : undefined }}
        onClick={() => setIsWishlisted(!isWishlisted)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      {/* Product Image Preview */}
      <div
        className="product-card-img-wrap"
        onClick={() => onSelectProduct && onSelectProduct(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        {/* Brand */}
        <span className="product-card-brand">{product.brand || 'NovaTech'}</span>

        {/* Title */}
        <h3
          className="product-card-title"
          onClick={() => onSelectProduct && onSelectProduct(product.id)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Ratings & Star Count */}
        <div style={{ margin: '4px 0' }}>
          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        {/* Price Row (Amazon / Flipkart Style) */}
        <div className="product-card-price-row">
          <span className="product-price-current">
            <span className="currency-symbol">₹</span>
            {product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <>
              <span className="product-price-original">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="badge-discount-tag">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>

        {/* Delivery Guarantee */}
        <div className="product-card-delivery">
          <span className="badge-prime" style={{ marginRight: '6px' }}>Prime</span>
          <span>Get it by <strong>Tomorrow, 27 Sept</strong></span>
          <br />
          <span>FREE Delivery by NovaTech</span>
        </div>

        {/* Action Button: Amazon Signature Yellow */}
        <div className="product-card-actions">
          <button
            className="btn btn-cart-yellow btn-block btn-sm"
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
