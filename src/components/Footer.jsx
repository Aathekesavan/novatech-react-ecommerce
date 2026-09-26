import React from 'react';

export default function Footer({ setActivePage }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      {/* Back to Top Ribbon */}
      <div className="footer-back-to-top" onClick={scrollToTop}>
        Back to top ▲
      </div>

      {/* 4-Column Amazon Links */}
      <div className="footer-main-links">
        <div>
          <h4 className="footer-col-title">Get to Know Us</h4>
          <ul className="footer-col-links">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>About NovaTech</a></li>
            <li><a href="#careers" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Careers & Culture</a></li>
            <li><a href="#press" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Press Releases</a></li>
            <li><a href="#science" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>NovaTech Engineering</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Connect with Us</h4>
          <ul className="footer-col-links">
            <li><a href="https://github.com/Aathekesavan" target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
            <li><a href="#social" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Twitter / X</a></li>
            <li><a href="#social" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Instagram</a></li>
            <li><a href="#social" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Make Money with Us</h4>
          <ul className="footer-col-links">
            <li><a href="#sell" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Sell on NovaTech</a></li>
            <li><a href="#affiliate" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Become an Affiliate</a></li>
            <li><a href="#fulfilment" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Fulfilment by NovaTech</a></li>
            <li><a href="#advertise" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Advertise Your Products</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Let Us Help You</h4>
          <ul className="footer-col-links">
            <li><a href="#account" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Your Account</a></li>
            <li><a href="#returns" onClick={(e) => { e.preventDefault(); setActivePage('cart'); }}>Returns & Replacements</a></li>
            <li><a href="#protection" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>100% Purchase Protection</a></li>
            <li><a href="#help" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Help Desk & FAQs</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Trademark Strip */}
      <div className="footer-bottom-strip">
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setActivePage('home')}>Conditions of Use & Sale</span>
          <span>•</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setActivePage('home')}>Privacy Notice</span>
          <span>•</span>
          <span style={{ cursor: 'pointer' }} onClick={() => setActivePage('home')}>Interest-Based Ads</span>
        </div>
        <div>
          © 2026 NovaTech E-Commerce Inc. or its affiliates. Built for Full Stack Web Development (Task 2 ReactJS Single Page Application).
        </div>
      </div>
    </footer>
  );
}
