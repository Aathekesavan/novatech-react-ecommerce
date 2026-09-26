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
      {/* Clean Badges */}
      {product.badge === 'sale' && (
        <span className="badge badge-deal product-card-badge">
          Save {discountPercent}%
        </span>
      )}
      {product.badge === 'featured' && (
        <span className="badge badge-primary product-card-badge">
          Staff Pick
        </span>
      )}
      {product.badge === 'new' && (
        <span className="badge badge-new product-card-badge">
          New Release
        </span>
      )}

      {/* Wishlist Heart Icon */}
      <button
        className="product-card-wishlist"
        style={{ color: isWishlisted ? 'var(--color-rose)' : undefined }}
        onClick={() => setIsWishlisted(!isWishlisted)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      {/* Product Real Image Preview */}
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

        {/* Price Row (INR Currency) */}
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
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Dispatch & Delivery Guarantee (No Prime) */}
        <div className="product-card-delivery">
          <span className="badge-dispatch">⚡ Fast Dispatch</span>
          <span>• Free delivery above ₹999</span>
        </div>

        {/* Action Button: Sleek Indigo Pill Button */}
        <div className="product-card-actions">
          <button
            className="btn btn-primary btn-block btn-sm"
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
