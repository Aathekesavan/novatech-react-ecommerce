import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Products({
  onSelectProduct,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const { showToast } = useCart();
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Handle Brand selection toggle
  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(2000);
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    showToast('Filters reset to default.');
  };

  // Dynamic Filtering Logic using useMemo (Bloom's Level K4: Analyze)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // 1. Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesBrand && !matchesCat) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // 3. Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Brands filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // 5. Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 6. In Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting Logic
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0);
        default:
          return 0; // default order
      }
    });
  }, [searchQuery, selectedCategory, maxPrice, selectedBrands, minRating, inStockOnly, sortBy]);

  return (
    <div className="container section" style={{ paddingTop: 'var(--space-6)' }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <span className="breadcrumb-item">
          <a href="#home" onClick={(e) => { e.preventDefault(); }}>Home</a>
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active" aria-current="page">Shop Products</span>
      </nav>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1>Interactive Product Catalog</h1>
        <p>
          Real-time filtering with React state and hooks. Adjust filters below to dynamically filter results with zero page reload.
        </p>
      </div>

      <div className="catalog-layout">
        {/* Interactive Aside Filters */}
        <aside className="catalog-filter-aside" aria-label="Product Filters">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 0 }}>Filters</h2>
            <button
              onClick={handleResetFilters}
              style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reset All
            </button>
          </div>

          {/* Filter 1: Categories */}
          <div className="filter-group">
            <h3 className="filter-title">Department</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="form-check">
                  <input
                    type="radio"
                    name="categoryRadio"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(cat.id)}
                  />
                  <span>{cat.name} ({cat.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Max Price Range */}
          <div className="filter-group">
            <h3 className="filter-title">Price Range</h3>
            <div className="form-range-wrap">
              <input
                type="range"
                className="form-range"
                min="50"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="range-values">
                <span>Min: $50</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                  Max: ${maxPrice.toLocaleString()}
                </span>
                <span>$2,000</span>
              </div>
            </div>
          </div>

          {/* Filter 3: Brands */}
          <div className="filter-group">
            <h3 className="filter-title">Brands</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {BRANDS.map(brand => (
                <label key={brand} className="form-check">
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

          {/* Filter 4: Customer Rating */}
          <div className="filter-group">
            <h3 className="filter-title">Minimum Rating</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label className="form-check">
                <input
                  type="radio"
                  name="ratingRadio"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                />
                <span>All Ratings</span>
              </label>
              <label className="form-check">
                <input
                  type="radio"
                  name="ratingRadio"
                  checked={minRating === 4}
                  onChange={() => setMinRating(4)}
                />
                <span style={{ color: 'var(--color-accent)' }}>★★★★☆</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>4.0 & Up</span>
              </label>
              <label className="form-check">
                <input
                  type="radio"
                  name="ratingRadio"
                  checked={minRating === 4.8}
                  onChange={() => setMinRating(4.8)}
                />
                <span style={{ color: 'var(--color-accent)' }}>★★★★★</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>4.8 & Up</span>
              </label>
            </div>
          </div>

          {/* Filter 5: Availability */}
          <div className="filter-group">
            <h3 className="filter-title">Availability</h3>
            <label className="form-check">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>In Stock Only</span>
            </label>
          </div>

          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: '1rem' }}
            onClick={() => showToast(`Showing ${filteredProducts.length} matching products.`)}
          >
            Apply Active Filters ({filteredProducts.length})
          </button>
        </aside>

        {/* Product Catalog Grid */}
        <section className="product-catalog-content" aria-label="Available Products">
          {/* Toolbar */}
          <div className="catalog-toolbar">
            <div className="catalog-count-text">
              Showing <span className="catalog-count-bold">{filteredProducts.length}</span> of{' '}
              <span className="catalog-count-bold">{PRODUCTS.length}</span> products
              {searchQuery && <span> matching "<em>{searchQuery}</em>"</span>}
            </div>

            <div className="catalog-sort-wrap">
              <label htmlFor="sort-select" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Sort By:
              </label>
              <select
                id="sort-select"
                className="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3>No matching products found</h3>
              <p>Try adjusting your search query, increasing the price range, or clearing category filters.</p>
              <button className="btn btn-primary" onClick={handleResetFilters} style={{ marginTop: '1rem' }}>
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
