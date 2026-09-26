import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast.show) return null;

  return (
    <div
      id="nova-toast"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        zIndex: 10000,
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideUp 0.3s ease forwards'
      }}
      role="status"
      aria-live="polite"
    >
      <span>{toast.message}</span>
    </div>
  );
}
