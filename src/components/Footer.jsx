import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand">
            <a
              href="#home"
              className="brand-logo"
              style={{ color: '#ffffff' }}
              onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
            >
              <span className="logo-icon">⚡</span>
              <span>Nova<span className="logo-accent">Tech</span></span>
            </a>
            <p>
              NovaTech is an industry leader in cutting-edge electronics, consumer audio, computing hardware, and smart lifestyle accessories.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>All Products</a>
              </li>
              <li>
                <a href="#detail" onClick={(e) => { e.preventDefault(); setActivePage('detail'); }}>Featured Flagship</a>
              </li>
              <li>
                <a href="#cart" onClick={(e) => { e.preventDefault(); setActivePage('cart'); }}>Shopping Cart</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Support & FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>Audio & Headphones</a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>Smartwatches</a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>Ultrabooks & PCs</a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>Mechanical Keyboards</a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }}>Drones & Cameras</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Customer Care</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Have questions or need technical advice?</p>
            <p style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 600 }}>📞 1-800-NOVATECH</p>
            <p style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 600 }}>✉ support@novatech.io</p>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Open Mon – Fri: 9:00 AM – 8:00 PM EST</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 NovaTech Electronics Inc. Task 2 ReactJS Single Page Application.</div>
          <div>
            <span>Privacy Policy</span> • <span>Terms of Service</span> • <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
