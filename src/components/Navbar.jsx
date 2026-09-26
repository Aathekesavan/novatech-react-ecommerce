import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ activePage, setActivePage, onSearch, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const { totalItemsCount, cartSubtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    setActivePage('products');
  };

  const handleCategoryNav = (cat) => {
    if (setSelectedCategory) setSelectedCategory(cat);
    setActivePage('products');
  };

  return (
    <header className="site-header">
      {/* Main Modern Tech Header Bar */}
      <div className="nav-top-bar">
        {/* Brand Logo */}
        <a
          href="#home"
          className="brand-logo"
          onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
          aria-label="NovaTech Homepage"
        >
          <div className="logo-icon">⚡</div>
          <span>Nova<span className="logo-accent">Tech</span></span>
        </a>

        {/* Central Search Bar */}
        <form className="nav-search-bar" onSubmit={handleSearchSubmit} role="search">
          <input
            type="search"
            className="nav-search-input"
            placeholder="Search audio, laptops, smartwatches, cameras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="nav-search-btn" aria-label="Search">
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <nav className="nav-links-wrap">
          <button
            className={`nav-link-btn ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            Home
          </button>
          <button
            className={`nav-link-btn ${activePage === 'products' ? 'active' : ''}`}
            onClick={() => {
              if (setSelectedCategory) setSelectedCategory('all');
              setActivePage('products');
            }}
          >
            Products
          </button>
          <button
            className={`nav-link-btn ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => setActivePage('contact')}
          >
            Support & FAQ
          </button>
        </nav>

        {/* Cart Pill */}
        <button
          className="nav-cart-pill"
          onClick={() => setActivePage('cart')}
          aria-label={`Shopping cart with ${totalItemsCount} items`}
        >
          <span>🛒 Cart</span>
          <span className="nav-cart-count-badge">{totalItemsCount}</span>
        </button>
      </div>

      {/* Category Pills Strip */}
      <div className="sub-nav-ribbon">
        <div className="sub-nav-container">
          <button
            className={`sub-nav-link ${selectedCategory === 'all' && activePage === 'products' ? 'active' : ''}`}
            onClick={() => handleCategoryNav('all')}
          >
            All Gear
          </button>
          <button
            className={`sub-nav-link ${selectedCategory === 'audio' ? 'active' : ''}`}
            onClick={() => handleCategoryNav('audio')}
          >
            🎧 Audio & Studio
          </button>
          <button
            className={`sub-nav-link ${selectedCategory === 'wearables' ? 'active' : ''}`}
            onClick={() => handleCategoryNav('wearables')}
          >
            ⌚ Smartwatches
          </button>
          <button
            className={`sub-nav-link ${selectedCategory === 'computing' ? 'active' : ''}`}
            onClick={() => handleCategoryNav('computing')}
          >
            💻 Ultrabooks & PCs
          </button>
          <button
            className={`sub-nav-link ${selectedCategory === 'gaming' ? 'active' : ''}`}
            onClick={() => handleCategoryNav('gaming')}
          >
            ⌨️ Gaming Gear
          </button>
          <button
            className={`sub-nav-link ${selectedCategory === 'cameras' ? 'active' : ''}`}
            onClick={() => handleCategoryNav('cameras')}
          >
            📷 Cameras & Drones
          </button>
        </div>
      </div>
    </header>
  );
}
