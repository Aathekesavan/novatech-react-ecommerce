import React, { useState } from 'react';
import Accordion from '../components/Accordion';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    orderId: '',
    message: '',
    agree: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqItems = [
    {
      question: 'What does the 2-Year NovaTech Warranty cover?',
      answer: 'Every NovaTech product includes a 24-month comprehensive manufacturer warranty. It covers internal component defects, battery retention failures below 80% capacity, acoustic driver anomalies, and firmware defects with zero repair fees and expedited express replacement shipping.'
    },
    {
      question: 'What are the shipping delivery speeds and thresholds?',
      answer: 'We offer complimentary 2–3 business day Express Delivery on all orders exceeding $50 within the contiguous United States. International shipments typically take 4–7 business days with customs clearance prepaid.'
    },
    {
      question: 'How do I process a return or exchange within 30 days?',
      answer: 'If you are not 100% delighted with your purchase, you may initiate a return within 30 days of delivery. We provide a prepaid shipping return label, and once scanned by the carrier, a full refund is processed back to your original payment method within 48 hours.'
    },
    {
      question: 'Are NovaTech audio devices compatible with iOS, Android, and Windows?',
      answer: 'Yes. All NovaTech headphones and speakers feature standard Bluetooth 5.4 multi-point pairing along with low-latency codecs (LDAC, aptX Adaptive, AAC) that work natively with Apple, Windows, Android, and Linux platforms.'
    },
    {
      question: 'How can I track my package once dispatched?',
      answer: 'As soon as your parcel is scanned at our logistics center, an automated confirmation email containing your direct tracking URL and carrier details (FedEx/UPS/DHL) will be dispatched to your inbox.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast(`✓ Ticket created for ${formData.name}. Our support team will reply within 2 hours!`);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        orderId: '',
        message: '',
        agree: false
      });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="container section" style={{ paddingTop: 'var(--space-6)' }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <span className="breadcrumb-item"><a href="#home">Home</a></span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active" aria-current="page">Contact & Support</span>
      </nav>

      <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h1>Customer Support & FAQs</h1>
        <p>
          Need assistance or technical advice? Submit a ticket using the controlled React form below or browse our interactive FAQs.
        </p>
      </div>

      <div className="contact-layout">
        {/* Support Info Sidebar */}
        <aside className="contact-info-card" aria-label="Support Information">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Get in Touch</h2>
          <p style={{ fontSize: '0.95rem' }}>
            Our customer success team is available Monday through Friday from 9:00 AM to 8:00 PM EST.
          </p>

          <div className="contact-info-item">
            <div className="contact-item-icon">📍</div>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>Corporate Headquarters</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                1040 Innovation Way, Suite 400<br />Silicon Valley, CA 94025, USA
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-item-icon">📞</div>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>Direct Phone Lines</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Toll-Free: <strong>1-800-NOVATECH</strong><br />International: +1 (650) 555-0199
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-item-icon">✉️</div>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>Electronic Mail</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Support: <strong>support@novatech.io</strong><br />Sales: sales@novatech.io
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-primary-light)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #bfdbfe',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }}></span>
              <strong style={{ color: 'var(--color-secondary)', fontSize: '0.9rem' }}>Live React Chat Active</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              Average response time is currently under 3 minutes.
            </p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => showToast('Connecting to a live NovaTech support engineer...')}
            >
              Start Live Session
            </button>
          </div>
        </aside>

        {/* Controlled Support Form */}
        <section className="contact-form-card" aria-label="Support Message Form">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Direct Message</h2>

          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--color-bg-subtle)', borderRadius: '12px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
              <h3>Ticket Registered Successfully!</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Thank you, <strong>{formData.name}</strong>. A support engineer will review your inquiry shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="formName" className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="formName"
                    className="form-control"
                    placeholder="e.g. David Miller"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formEmail" className="form-label">Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    id="formEmail"
                    className="form-control"
                    placeholder="david@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="formPhone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="formPhone"
                    className="form-control"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formDept" className="form-label">Department <span className="required">*</span></label>
                  <select
                    id="formDept"
                    className="form-control"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="" disabled>Select department</option>
                    <option value="hardware">Hardware & Tech Support</option>
                    <option value="shipping">Order Tracking & Delivery</option>
                    <option value="returns">Warranty & RMA Returns</option>
                    <option value="business">Wholesale & Business</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formOrderId" className="form-label">Order Number (Optional)</label>
                <input
                  type="text"
                  id="formOrderId"
                  className="form-control"
                  placeholder="e.g. NOV-89412"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="formMsg" className="form-label">Detailed Message <span className="required">*</span></label>
                <textarea
                  id="formMsg"
                  className="form-control"
                  rows="5"
                  placeholder="Please describe your question or issue in detail..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-check">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.85rem' }}>
                    I agree to the storage and processing of my contact information in accordance with NovaTech Privacy Policy.
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
                📨 Submit Support Ticket
              </button>
            </form>
          )}
        </section>
      </div>

      {/* Interactive FAQ Accordion */}
      <section className="section" style={{ paddingTop: 'var(--space-8)' }} aria-label="Frequently Asked Questions">
        <div className="section-title-wrap">
          <span className="section-subtitle">Common Inquiries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Quick answers to common questions regarding shipping, warranty coverage, and return procedures.
          </p>
        </div>

        <Accordion items={faqItems} />
      </section>
    </div>
  );
}
