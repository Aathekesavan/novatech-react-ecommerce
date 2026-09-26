import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ activePage, setActivePage, onSearch, searchQuery, setSearchQuery }) {
  const { totalItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    setActivePage('products');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Shop Products' },
    { id: 'detail', label: 'Featured Item' },
    { id: 'cart', label: 'My Cart' },
    { id: 'contact', label: 'Contact & FAQ' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          <p className="announcement-text">
            ⚡ Flash Sale: Use code <strong>TECH20</strong> for 20% off all audio & wearable devices!
          </p>
          <div className="announcement-links">
            <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Track Order</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Help & Support</a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header">
        <div className="container nav-container">
          {/* Brand Logo */}
          <a
            href="#home"
            className="brand-logo"
            onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
            aria-label="NovaTech Homepage"
          >
            <span className="logo-icon">⚡</span>
            <span>Nova<span className="logo-accent">Tech</span></span>
          </a>

          {/* Search Bar */}
          <form className="nav-search" onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="nav-site-search" className="sr-only">Search products</label>
            <input
              type="search"
              id="nav-site-search"
              className="nav-search-input"
              placeholder="Search gadgets, audio, laptops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="nav-search-btn" aria-label="Submit search">
              🔍
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="nav-menu" role="navigation" aria-label="Main Navigation">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button
              className="btn-icon cart-btn-wrap"
              onClick={() => setActivePage('cart')}
              aria-label="View shopping cart"
            >
              🛒
              {totalItemsCount > 0 && (
                <span className="cart-count-badge">{totalItemsCount}</span>
              )}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay active"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: '64px',
          left: mobileMenuOpen ? '0' : '-100%',
          width: '80%',
          maxWidth: '320px',
          height: 'calc(100vh - 64px)',
          backgroundColor: 'var(--color-bg-surface)',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 'var(--space-6)',
          gap: 'var(--space-4)',
          boxShadow: 'var(--shadow-xl)',
          transition: 'left 0.25s ease',
          zIndex: 999,
          display: 'flex'
        }}
      >
        <form onSubmit={handleSearchSubmit} style={{ width: '100%', marginBottom: '1rem' }}>
          <input
            type="search"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {navLinks.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`nav-link ${activePage === link.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(link.id);
              setMobileMenuOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
