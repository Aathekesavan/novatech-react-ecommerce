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

  // Form Validation State
  const [form, setForm] = useState({
    name: 'Aathekesavan',
    email: 'aathekesavan@gmail.com',
    phone: '9876543210',
    pincode: '600001',
    address: '124 Innovation Way, Tech Park',
    city: 'Chennai',
    state: 'Tamil Nadu',
    paymentMethod: 'upi'
  });

  const [errors, setErrors] = useState({});

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCoupon);
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name || form.name.trim().length < 3) {
      errs.name = 'Full name is required (minimum 3 characters)';
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Valid email address is required';
    }
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Valid 10-digit mobile number is required';
    }
    if (!form.pincode || form.pincode.trim().length < 6) {
      errs.pincode = 'Valid 6-digit postal code required';
    }
    if (!form.address || form.address.trim().length < 8) {
      errs.address = 'Detailed street address is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setOrderPlaced(true);
    showToast('🎉 Order Placed Successfully! Tracking ID: NVT-' + Math.floor(100000 + Math.random() * 900000));
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  return (
    <div className="container" style={{ paddingTop: '16px', paddingBottom: '48px' }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: '0.8rem', color: '#565959', marginBottom: '16px' }}>
        <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} style={{ color: 'var(--color-link)' }}>Home</a>
        <span style={{ margin: '0 6px' }}>&rsaquo;</span>
        <span style={{ color: '#0f1111' }}>Shopping Cart</span>
      </nav>

      {cart.length === 0 && !orderPlaced ? (
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛒</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#0f1111' }}>Your NovaTech Cart is empty</h2>
          <p style={{ color: '#565959', marginBottom: '24px', fontSize: '0.9rem' }}>
            Check your Saved items or browse our featured electronics deals.
          </p>
          <button
            className="btn btn-cart-yellow btn-lg"
            onClick={() => setActivePage('products')}
          >
            Continue Shopping &rarr;
          </button>
        </div>
      ) : (
        <div className="cart-layout-amazon">
          {/* Left Column: Cart Items List */}
          <div className="cart-main-box">
            {/* Free Delivery Banner */}
            <div className="free-shipping-meter">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✅</span>
                <strong>You are eligible for FREE Delivery by NovaTech!</strong>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #d5d9d9', paddingBottom: '10px', marginBottom: '16px' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#0f1111', margin: 0 }}>
                Shopping Cart
              </h1>
              <span style={{ fontSize: '0.85rem', color: '#565959' }}>Price</span>
            </div>

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr auto',
                    gap: '16px',
                    borderBottom: '1px solid #e7e7e7',
                    paddingBottom: '16px'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f1111', marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-stock-green)', fontWeight: 600, marginBottom: '4px' }}>
                      In Stock
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '8px' }}>
                      Eligible for FREE Shipping • Sold by: <strong>NovaTech Official</strong>
                    </div>
                    {item.color && (
                      <div style={{ fontSize: '0.8rem', color: '#0f1111', marginBottom: '8px' }}>
                        Color: <strong>{item.color}</strong>
                      </div>
                    )}

                    {/* Actions: Stepper, Delete, Save for Later */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #d5d9d9', borderRadius: '4px', backgroundColor: '#f0f2f2' }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                          style={{ padding: '4px 10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 600, background: '#ffffff' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                          style={{ padding: '4px 10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span style={{ color: '#d5d9d9' }}>|</span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.color)}
                        style={{ background: 'none', border: 'none', color: '#007185', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Delete
                      </button>

                      <span style={{ color: '#d5d9d9' }}>|</span>

                      <button
                        type="button"
                        onClick={() => showToast('Saved for later!')}
                        style={{ background: 'none', border: 'none', color: '#007185', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Save for later
                      </button>
                    </div>
                  </div>

                  {/* Line Price */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f1111' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                        (${item.price.toFixed(2)} each)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Subtotal */}
            <div style={{ textAlign: 'right', marginTop: '16px', fontSize: '1.15rem' }}>
              Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):{' '}
              <strong style={{ fontWeight: 700, color: '#0f1111' }}>${subtotal.toFixed(2)}</strong>
            </div>
          </div>

          {/* Right Column: Sticky Amazon Order Summary */}
          <div className="cart-summary-box">
            {/* Free Delivery Qualified Check */}
            <div style={{ fontSize: '0.85rem', color: 'var(--color-stock-green)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span>✓</span>
              <span>Your order qualifies for <strong>FREE Delivery</strong>.</span>
            </div>

            {/* Subtotal */}
            <div style={{ fontSize: '1.2rem', marginBottom: '12px' }}>
              Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):{' '}
              <strong style={{ fontWeight: 700, color: '#0f1111' }}>${subtotal.toFixed(2)}</strong>
            </div>

            {/* Promo Code Box */}
            <div style={{ borderTop: '1px solid #e7e7e7', borderBottom: '1px solid #e7e7e7', padding: '12px 0', margin: '12px 0' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                Promotional Voucher / Coupon:
              </div>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="Code (e.g. TECH20)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    border: '1px solid #d5d9d9',
                    borderRadius: '4px',
                    fontSize: '0.85rem'
                  }}
                />
                <button type="submit" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  Apply
                </button>
              </form>
              {couponApplied && (
                <div style={{ color: 'var(--color-stock-green)', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>
                  ✓ Promo code <strong>{couponCode}</strong> applied!
                </div>
              )}
            </div>

            {/* Financial Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#565959' }}>
                <span>Items Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-deal-red)', fontWeight: 600 }}>
                  <span>Discount Savings:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#565959' }}>
                <span>Estimated Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#565959' }}>
                <span>Shipping & Handling:</span>
                <span style={{ color: 'var(--color-stock-green)', fontWeight: 600 }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ borderTop: '1px solid #d5d9d9', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-deal-red)' }}>
                <span>Order Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Yellow Proceed to Buy Button */}
            <button
              type="button"
              className="btn btn-cart-yellow btn-block"
              style={{ padding: '10px', fontSize: '0.95rem' }}
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              Proceed to Buy
            </button>

            {/* Guarantee Details */}
            <div style={{ marginTop: '16px', fontSize: '0.75rem', color: '#565959', lineHeight: 1.5, textAlign: 'center' }}>
              🔒 100% Purchase Protection • Genuine Products • Easy Returns
            </div>
          </div>
        </div>
      )}

      {/* Amazon 3-Step Checkout Modal */}
      {isCheckoutModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 20px 30px rgba(0,0,0,0.3)'
          }}>
            {!orderPlaced ? (
              <form onSubmit={handleCompleteOrder}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e7e7e7', paddingBottom: '12px', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f1111', margin: 0 }}>
                    Select Delivery Address & Payment
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#565959' }}
                  >
                    ×
                  </button>
                </div>

                {/* Delivery Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        border: errors.name ? '1.5px solid #cc0c39' : '1px solid #d5d9d9',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                      }}
                    />
                    {errors.name && <span style={{ color: '#cc0c39', fontSize: '0.75rem' }}>{errors.name}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: errors.email ? '1.5px solid #cc0c39' : '1px solid #d5d9d9',
                          borderRadius: '4px',
                          fontSize: '0.9rem'
                        }}
                      />
                      {errors.email && <span style={{ color: '#cc0c39', fontSize: '0.75rem' }}>{errors.email}</span>}
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Mobile Phone (10 digits) *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: errors.phone ? '1.5px solid #cc0c39' : '1px solid #d5d9d9',
                          borderRadius: '4px',
                          fontSize: '0.9rem'
                        }}
                      />
                      {errors.phone && <span style={{ color: '#cc0c39', fontSize: '0.75rem' }}>{errors.phone}</span>}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Street Address & Building *
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        border: errors.address ? '1.5px solid #cc0c39' : '1px solid #d5d9d9',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                      }}
                    />
                    {errors.address && <span style={{ color: '#cc0c39', fontSize: '0.75rem' }}>{errors.address}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #d5d9d9', borderRadius: '4px', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        State *
                      </label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #d5d9d9', borderRadius: '4px', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Pincode (6 digits) *
                      </label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: errors.pincode ? '1.5px solid #cc0c39' : '1px solid #d5d9d9',
                          borderRadius: '4px',
                          fontSize: '0.9rem'
                        }}
                      />
                      {errors.pincode && <span style={{ color: '#cc0c39', fontSize: '0.75rem' }}>{errors.pincode}</span>}
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Payment Method:
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={form.paymentMethod === 'upi'}
                          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        />
                        <span>⚡ UPI / QR (Google Pay, PhonePe, Paytm)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={form.paymentMethod === 'card'}
                          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        />
                        <span>💳 Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={form.paymentMethod === 'cod'}
                          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        />
                        <span>💵 Cash on Delivery (COD)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Total and Place Order */}
                <div style={{ borderTop: '1px solid #e7e7e7', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#565959' }}>Order Total: </span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--color-deal-red)' }}>${total.toFixed(2)}</strong>
                  </div>
                  <button type="submit" className="btn btn-orange btn-lg">
                    Place Your Order
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '3rem', color: 'var(--color-stock-green)', marginBottom: '8px' }}>✅</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f1111', marginBottom: '8px' }}>
                  Thank you! Your order is confirmed.
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#565959', marginBottom: '16px' }}>
                  We've sent an order confirmation and tracking details to <strong>{form.email}</strong>.
                </p>
                <div style={{ background: '#f7fafa', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '12px', margin: '0 auto 20px', maxWidth: '360px', textAlign: 'left', fontSize: '0.85rem' }}>
                  <div>Order #: <strong>NVT-{Math.floor(100000 + Math.random() * 900000)}</strong></div>
                  <div>Estimated Delivery: <strong>Tomorrow, 27 Sept</strong></div>
                  <div>Shipping to: <strong>{form.name}, {form.city}</strong></div>
                </div>
                <button
                  type="button"
                  className="btn btn-cart-yellow"
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setOrderPlaced(false);
                    setActivePage('home');
                  }}
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
