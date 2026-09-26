import React, { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="accordion" style={{ maxWidth: '820px', margin: '0 auto' }}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`accordion-item ${isOpen ? 'active' : ''}`}>
            <button
              className="accordion-header"
              type="button"
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="accordion-icon">{isOpen ? '▲' : '▼'}</span>
            </button>
            <div
              className="accordion-body"
              style={{
                maxHeight: isOpen ? '300px' : '0',
                transition: 'max-height 0.35s ease',
                overflow: 'hidden'
              }}
            >
              <p style={{ margin: 0, paddingBottom: '1.25rem' }}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
