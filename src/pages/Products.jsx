import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Products({
  onSelectProduct,
  searchQuery,
  setSearchQuery,
  selectedCategory = 'all',
  setSelectedCategory
}) {
  const { showToast } = useCart();
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    if (setSelectedCategory) setSelectedCategory('all');
    setMaxPrice(100000);
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    if (setSearchQuery) setSearchQuery('');
    setSortBy('featured');
    showToast('Filters reset to default.');
  };

  // Filter Algorithm optimized with useMemo
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      // 1. Keyword search
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesCat) return false;
      }

      // 2. Department category
      if (selectedCategory && selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // 3. Price upper ceiling
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Brands checklist
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // 5. Star rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 6. In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    // Dynamic Sorting
    switch (sortBy) {
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return result.sort((a, b) => b.reviewsCount - a.reviewsCount);
      default:
        return result;
    }
  }, [searchQuery, selectedCategory, maxPrice, selectedBrands, minRating, inStockOnly, sortBy]);

  return (
    <div className="container" style={{ paddingTop: '16px', paddingBottom: '48px' }}>
      {/* Amazon Breadcrumb */}
      <nav style={{ fontSize: '0.8rem', color: '#565959', marginBottom: '16px' }} aria-label="Breadcrumb">
        <span style={{ color: 'var(--color-link)', cursor: 'pointer' }} onClick={handleResetFilters}>All Electronics</span>
        <span style={{ margin: '0 6px' }}>&rsaquo;</span>
        <span style={{ color: '#0f1111' }}>
          {selectedCategory !== 'all' ? selectedCategory.toUpperCase() : 'All Products'}
        </span>
        {searchQuery && (
          <>
            <span style={{ margin: '0 6px' }}>&rsaquo;</span>
            <span style={{ color: '#0f1111' }}>"{searchQuery}"</span>
          </>
        )}
      </nav>

      {/* Catalog Layout: Left Filter Sidebar + Right Results Grid */}
      <div className="catalog-layout">
        {/* Amazon Left Filter Sidebar */}
        <aside className="filter-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#0f1111' }}>
              Filters
            </h3>
            <button
              type="button"
              onClick={handleResetFilters}
              style={{ background: 'none', border: 'none', color: 'var(--color-link)', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Clear all
            </button>
          </div>

          {/* Department Filter */}
          <div className="filter-group">
            <div className="filter-title">Department</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="radio"
                  name="catFilter"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory && setSelectedCategory('all')}
                />
                <span>All Departments</span>
              </label>
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <label key={c.id} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="radio"
                    name="catFilter"
                    checked={selectedCategory === c.id}
                    onChange={() => setSelectedCategory && setSelectedCategory(c.id)}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Reviews Rating Filter */}
          <div className="filter-group">
            <div className="filter-title">Customer Reviews</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="radio"
                  name="ratingFilter"
                  checked={minRating === 4.8}
                  onChange={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
                />
                <span style={{ color: 'var(--color-star-gold)' }}>★★★★★</span>
                <span style={{ fontSize: '0.8rem', color: '#565959' }}>& Up (4.8+)</span>
              </label>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="radio"
                  name="ratingFilter"
                  checked={minRating === 4.0}
                  onChange={() => setMinRating(minRating === 4.0 ? 0 : 4.0)}
                />
                <span style={{ color: 'var(--color-star-gold)' }}>★★★★☆</span>
                <span style={{ fontSize: '0.8rem', color: '#565959' }}>& Up (4.0+)</span>
              </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="filter-title">Price Range</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#565959' }}>
              <span>₹2,000</span>
              <strong style={{ color: '#0f1111' }}>Up to ₹{maxPrice.toLocaleString('en-IN')}</strong>
            </div>
            <input
              type="range"
              min="2000"
              max="100000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-cta-orange)', cursor: 'pointer' }}
            />
          </div>

          {/* Brand Checklist */}
          <div className="filter-group">
            <div className="filter-title">Brand</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
              {BRANDS.map((brand) => (
                <label key={brand} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="filter-group">
            <div className="filter-title">Availability</div>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Right Product Results */}
        <div>
          {/* Results Header with Count & Sort Selector */}
          <div className="catalog-results-header">
            <div className="catalog-count">
              Showing <strong>{filteredProducts.length}</strong> of <strong>{PRODUCTS.length}</strong> results
              {selectedCategory !== 'all' && <span> in <strong>{selectedCategory}</strong></span>}
            </div>

            <div className="catalog-sort-box">
              <label htmlFor="catalog-sort-select">Sort by:</label>
              <select
                id="catalog-sort-select"
                className="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Deals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid" style={{ marginBottom: 0 }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f1111' }}>
                No matching electronics found
              </h3>
              <p style={{ color: '#565959', fontSize: '0.85rem', marginBottom: '16px' }}>
                Try relaxing your price slider, unchecking brands, or clearing the search keyword.
              </p>
              <button
                type="button"
                className="btn btn-cart-yellow"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
