import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'novatech_cart_v1';

export function CartProvider({ children }) {
  // Initialize from LocalStorage or default initial 2 items (from Task 1)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    // Default initial cart state (matching Task 1 for continuity)
    return [
      {
        id: 'prod-1',
        name: 'NovaPro Wireless Studio ANC Headphones',
        sku: 'NVP-920-BLK',
        price: 249.00,
        image: PRODUCTS[0].image,
        color: 'Matte Obsidian',
        quantity: 1
      },
      {
        id: 'prod-2',
        name: 'Aether Pulse Smart AMOLED Watch',
        sku: 'AET-510-SLT',
        price: 189.99,
        image: PRODUCTS[1].image,
        color: 'Slate Black',
        quantity: 1
      }
    ];
  });

  const [couponCode, setCouponCode] = useState('TECH20');
  const [discountPercent, setDiscountPercent] = useState(0.20); // 20% discount default
  const [couponApplied, setCouponApplied] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Toast Helper
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, color = null) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id && item.color === (color || product.colors?.[0]));
      if (existing) {
        return prevCart.map(item => 
          (item.id === product.id && item.color === existing.color)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          image: product.image,
          color: color || product.colors?.[0] || 'Standard',
          quantity: quantity
        }
      ];
    });
    showToast(`✓ "${product.name}" added to cart!`);
  };

  const removeFromCart = (itemId, itemColor) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.color === itemColor)));
    showToast('Item removed from cart.');
  };

  const updateQuantity = (itemId, itemColor, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, itemColor);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        (item.id === itemId && item.color === itemColor)
          ? { ...item, quantity: Math.min(99, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Shopping cart cleared.');
  };

  // Coupon application
  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'TECH20') {
      setCouponCode('TECH20');
      setDiscountPercent(0.20);
      setCouponApplied(true);
      showToast('✓ Promo code TECH20 applied: 20% discount!');
      return true;
    } else if (formatted === 'SAVE10') {
      setCouponCode('SAVE10');
      setDiscountPercent(0.10);
      setCouponApplied(true);
      showToast('✓ Promo code SAVE10 applied: 10% discount!');
      return true;
    } else {
      showToast('⚠️ Invalid promo code. Try TECH20');
      return false;
    }
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = couponApplied ? subtotal * discountPercent : 0;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = taxableSubtotal * 0.08; // 8% sales tax
  const shipping = subtotal > 50 || subtotal === 0 ? 0.00 : 9.99;
  const total = taxableSubtotal + tax + shipping;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItemsCount,
      subtotal,
      discountAmount,
      tax,
      shipping,
      total,
      couponCode,
      couponApplied,
      applyCoupon,
      toast,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
