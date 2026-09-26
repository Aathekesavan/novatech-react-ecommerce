import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart({ setActivePage }) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    tax,
    shipping,
    total,
    couponCode,
    couponApplied,
    applyCoupon,
    showToast
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(couponCode || 'TECH20');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Simulated Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: 'David Miller',
    email: 'david.miller@example.com',
    address: '1040 Innovation Way, Suite 400',
    city: 'San Jose',
    zip: '95110',
    paymentMethod: 'card'
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCoupon);
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  return (
    <div className="container section" style={{ paddingTop: 'var(--space-6)' }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <span className="breadcrumb-item">
          <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active" aria-current="page">Shopping Cart</span>
      </nav>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1>Your Shopping Cart</h1>
        <p>
          Managed through <strong>React Context API</strong> and synchronized with <strong>LocalStorage</strong>.
        </p>
      </div>

      {cart.length > 0 ? (
        <>
          {/* Free Shipping Banner */}
          <div style={{
            backgroundColor: 'var(--color-primary-light)',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎉</span>
            <div>
              <p style={{ marginBottom: 0, fontWeight: 600, color: 'var(--color-secondary)' }}>
                {subtotal >= 50
                  ? 'Congratulations! Your order qualifies for Free Express Shipping.'
                  : `Add $${(50 - subtotal).toFixed(2)} more to unlock Free Express Shipping.`}
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Estimated delivery in 2–3 business days with tracking.
              </span>
            </div>
          </div>

          <div className="cart-layout">
            {/* Left Column: Cart Table */}
            <div className="cart-items-card">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={`${item.id}-${item.color}`}>
                      <td className="cart-product-td" data-label="Product">
                        <div className="cart-product-cell">
                          <img src={item.image} alt={item.name} className="cart-thumb" />
                          <div>
                            <h2 className="cart-product-name">{item.name}</h2>
                            <div className="cart-product-sku">
                              Finish: {item.color} | SKU: {item.sku}
                            </div>
                            <span className="badge badge-success" style={{ marginTop: '4px' }}>In Stock</span>
                          </div>
                        </div>
                      </td>

                      <td data-label="Price">
                        <strong style={{ color: 'var(--color-secondary)' }}>${item.price.toFixed(2)}</strong>
                      </td>

                      <td data-label="Quantity">
                        <div className="quantity-stepper">
                          <button
                            className="stepper-btn stepper-dec"
                            onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="stepper-input"
                            value={item.quantity}
                            readOnly
                            aria-label="Quantity"
                          />
                          <button
                            className="stepper-btn stepper-inc"
                            onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td data-label="Total">
                        <strong style={{ fontSize: '1.1rem', color: 'var(--color-secondary)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </td>

                      <td data-label="Action">
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id, item.color)}
                          aria-label={`Remove ${item.name}`}
                        >
                          🗑️ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  className="btn btn-outline"
                  onClick={() => setActivePage('products')}
                >
                  &larr; Continue Shopping
                </button>
                <button
                  className="btn btn-outline"
                  style={{ color: 'var(--color-danger)', borderColor: '#fca5a5' }}
                  onClick={clearCart}
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <aside className="order-summary-card" aria-label="Order summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-line-item">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <strong style={{ color: 'var(--color-secondary)' }}>${subtotal.toFixed(2)}</strong>
              </div>

              {couponApplied && discountAmount > 0 && (
                <div className="summary-line-item" style={{ color: 'var(--color-success)' }}>
                  <span>Promo Discount ({couponCode})</span>
                  <strong>-${discountAmount.toFixed(2)}</strong>
                </div>
              )}

              <div className="summary-line-item">
                <span>Estimated Shipping</span>
                <strong style={{ color: shipping === 0 ? 'var(--color-success)' : undefined }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </strong>
              </div>

              <div className="summary-line-item">
                <span>Estimated Sales Tax (8%)</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>

              {/* Promo Form */}
              <form onSubmit={handleApplyCoupon} className="promo-input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code (TECH20)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  style={{ textTransform: 'uppercase' }}
                />
                <button type="submit" className="btn btn-secondary">Apply</button>
              </form>

              <div className="summary-line-item total">
                <span>Total Payable</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-primary btn-block btn-lg"
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  setOrderPlaced(false);
                  setIsCheckoutModalOpen(true);
                }}
              >
                🔒 Proceed to Checkout (${total.toFixed(2)})
              </button>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                  256-Bit SSL Bank Grade Encrypted Checkout
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                  <span>💳</span>
                  <span>🔒</span>
                  <span>🛡️</span>
                  <span>📱</span>
                </div>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h2>Your Cart is Currently Empty</h2>
          <p style={{ maxWidth: '400px', margin: '0 auto 2rem auto', color: 'var(--color-text-muted)' }}>
            Looks like you haven't added anything to your cart yet. Explore our curated gadgets and sound equipment!
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => setActivePage('products')}>
            Start Shopping &rarr;
          </button>
        </div>
      )}

      {/* Interactive Checkout Modal */}
      {isCheckoutModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '540px',
            width: '100%',
            padding: '2rem',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {!orderPlaced ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Simulated Express Checkout</h2>
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCompleteOrder}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Shipping Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutForm.zip}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, zip: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ background: 'var(--color-bg-subtle)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px' }}>
                      <span>Total to Charge:</span>
                      <strong style={{ color: 'var(--color-secondary)' }}>${total.toFixed(2)}</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Test environment: No real payment will be processed.
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                      onClick={() => setIsCheckoutModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 2 }}
                    >
                      Confirm & Pay ${total.toFixed(2)}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h2>Order Successfully Placed!</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{checkoutForm.name}</strong>! Your order confirmation has been sent to <em>{checkoutForm.email}</em>.
                </p>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.85rem' }}>
                  Order Reference: <strong>#NOV-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setActivePage('products');
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
