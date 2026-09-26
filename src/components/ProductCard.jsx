import React, { useState } from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getBadgeClass = (type) => {
    switch (type) {
      case 'sale': return 'badge-sale';
      case 'new': return 'badge-new';
      case 'featured': return 'badge-featured';
      default: return 'badge-primary';
    }
  };

  return (
    <article className="product-card">
      {product.badge && (
        <span className={`badge ${getBadgeClass(product.badge)} product-card-badge`}>
          {product.badgeText}
        </span>
      )}

      <button
        className="product-card-wishlist"
        style={{ color: isWishlisted ? 'var(--color-danger)' : undefined }}
        onClick={() => setIsWishlisted(!isWishlisted)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      <div
        className="product-card-img-wrap"
        onClick={() => onSelectProduct && onSelectProduct(product.id)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.categoryLabel}</span>
        
        <h3 className="product-card-title">
          <a
            href={`#detail-${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectProduct && onSelectProduct(product.id);
            }}
          >
            {product.name}
          </a>
        </h3>

        <div className="product-card-rating">
          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        <div className="product-card-footer">
          <div className="product-price-wrap">
            <span className="product-current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className="btn btn-sm btn-primary add-to-cart-btn"
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}
