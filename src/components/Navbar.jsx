import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ activePage, setActivePage, onSearch, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const { totalItemsCount } = useCart();
  const [pincode, setPincode] = useState('600001');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [categorySelect, setCategorySelect] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    if (setSelectedCategory && categorySelect !== 'all') {
      setSelectedCategory(categorySelect);
    }
    setActivePage('products');
  };

  const handleCategoryNav = (cat) => {
    if (setSelectedCategory) setSelectedCategory(cat);
    setActivePage('products');
  };

  return (
    <>
      <header className="site-header">
        {/* Tier 1: Main Amazon / Flipkart Navigation Bar */}
        <div className="nav-top-bar">
          {/* Logo */}
          <a
            href="#home"
            className="brand-logo"
            onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
            aria-label="NovaTech Homepage"
          >
            <span>⚡ Nova<span className="logo-accent">Tech</span></span>
          </a>

          {/* Delivery Location Widget */}
          <div
            className="nav-location"
            onClick={() => setShowPincodeModal(!showPincodeModal)}
            title="Change Delivery Location"
          >
            <span className="nav-location-icon">📍</span>
            <div className="nav-location-text">
              <span>Deliver to Chennai</span>
              <strong>{pincode}</strong>
            </div>
          </div>

          {/* Wide Central Search Bar with Category Select & Amber Search Button */}
          <form className="nav-search-bar" onSubmit={handleSearchSubmit} role="search">
            <select
              className="nav-search-category"
              value={categorySelect}
              onChange={(e) => setCategorySelect(e.target.value)}
              aria-label="Select Category"
            >
              <option value="all">All Departments</option>
              <option value="audio">Audio & Headphones</option>
              <option value="wearables">Smartwatches</option>
              <option value="computing">Laptops & PCs</option>
              <option value="gaming">Gaming & Keyboards</option>
              <option value="cameras">Cameras & Drones</option>
            </select>
            <input
              type="search"
              className="nav-search-input"
              placeholder="Search NovaTech for laptops, headphones, smartwatches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="nav-search-btn" aria-label="Search">
              🔍
            </button>
          </form>

          {/* Language / Region */}
          <div className="nav-user-item" style={{ minWidth: '45px' }}>
            <span className="nav-line-1">Language</span>
            <span className="nav-line-2">🇮🇳 EN</span>
          </div>

          {/* Account & Sign In */}
          <div
            className="nav-user-item"
            onClick={() => setActivePage('contact')}
          >
            <span className="nav-line-1">Hello, Aathekesavan</span>
            <span className="nav-line-2">Account & Lists ▾</span>
          </div>

          {/* Returns & Orders */}
          <div
            className="nav-user-item"
            onClick={() => setActivePage('cart')}
          >
            <span className="nav-line-1">Returns</span>
            <span className="nav-line-2">& Orders</span>
          </div>

          {/* Shopping Cart with Badge */}
          <a
            href="#cart"
            className="nav-cart-btn"
            onClick={(e) => { e.preventDefault(); setActivePage('cart'); }}
            aria-label={`Shopping Cart with ${totalItemsCount} items`}
          >
            <div className="nav-cart-icon-wrap">
              <span className="nav-cart-icon">🛒</span>
              <span className="nav-cart-badge">{totalItemsCount}</span>
            </div>
            <span className="nav-cart-label">Cart</span>
          </a>
        </div>

        {/* Tier 2: Sub-Navigation Ribbon (All, Deals, Best Sellers...) */}
        <nav className="sub-nav-ribbon" aria-label="Department Ribbon">
          <div className="sub-nav-container">
            <span
              className="sub-nav-link"
              onClick={() => handleCategoryNav('all')}
              style={{ fontWeight: 700 }}
            >
              ☰ All
            </span>
            <span
              className={`sub-nav-link highlight ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              ⚡ Today's Deals
            </span>
            <span
              className={`sub-nav-link ${activePage === 'products' ? 'active' : ''}`}
              onClick={() => handleCategoryNav('all')}
            >
              Shop All Products
            </span>
            <span
              className="sub-nav-link"
              onClick={() => handleCategoryNav('audio')}
            >
              Audio & Sound
            </span>
            <span
              className="sub-nav-link"
              onClick={() => handleCategoryNav('computing')}
            >
              Laptops & Computing
            </span>
            <span
              className="sub-nav-link"
              onClick={() => handleCategoryNav('wearables')}
            >
              Smartwatches
            </span>
            <span
              className="sub-nav-link"
              onClick={() => handleCategoryNav('gaming')}
            >
              Gaming Tech
            </span>
            <span
              className={`sub-nav-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => setActivePage('contact')}
            >
              Customer Service
            </span>
          </div>
        </nav>
      </header>

      {/* Pincode Selector Modal */}
      {showPincodeModal && (
        <div className="modal-backdrop" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '380px',
            width: '90%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Choose your location</h3>
            <p style={{ fontSize: '0.85rem', color: '#565959', marginBottom: '16px' }}>
              Delivery options and speeds may vary based on your postal code.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d5d9d9',
                  borderRadius: '4px',
                  fontSize: '0.95rem'
                }}
              />
              <button
                type="button"
                className="btn btn-cart-yellow"
                onClick={() => setShowPincodeModal(false)}
              >
                Apply
              </button>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.85rem' }}
              onClick={() => setShowPincodeModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
