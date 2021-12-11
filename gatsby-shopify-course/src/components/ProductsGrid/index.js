import React from 'react';

export function ProductsGrid({ products }) {
  return (
    <section>
      {products.map(product => (
        <div>{product.title}</div>
      ))}
    </section>
  );
}
