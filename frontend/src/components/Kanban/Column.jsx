import React from 'react';

export default function Column({ title, children }) {
  return (
    <section style={{ padding: 12, background: '#e5e7eb', borderRadius: 8 }}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
