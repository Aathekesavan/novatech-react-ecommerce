import React from 'react';

export default function StarRating({ rating = 5, reviewsCount }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const starsArray = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsArray.push('★');
    } else if (i === fullStars + 1 && hasHalf) {
      starsArray.push('★');
    } else {
      starsArray.push('☆');
    }
  }

  return (
    <div className="rating">
      <span className="rating-stars" aria-label={`${rating} out of 5 stars`}>
        {starsArray.join('')}
      </span>
      <span className="rating-score">{rating.toFixed(1)}</span>
      {reviewsCount && <span className="rating-count">({reviewsCount})</span>}
    </div>
  );
}
