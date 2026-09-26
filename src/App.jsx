import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

// Import all CSS stylesheets modularly
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/responsive.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('prod-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Smooth scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProductId]);

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setActivePage('detail');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActivePage('products');
  };

  return (
    <CartProvider>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main style={{ flex: '1 0 auto' }}>
          {activePage === 'home' && (
            <Home
              setActivePage={setActivePage}
              onSelectProduct={handleSelectProduct}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          {activePage === 'products' && (
            <Products
              onSelectProduct={handleSelectProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          {activePage === 'detail' && (
            <ProductDetail
              productId={selectedProductId}
              setActivePage={setActivePage}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activePage === 'cart' && (
            <Cart setActivePage={setActivePage} />
          )}

          {activePage === 'contact' && (
            <Contact />
          )}
        </main>

        <Footer setActivePage={setActivePage} />

        <Toast />
      </div>
    </CartProvider>
  );
}
