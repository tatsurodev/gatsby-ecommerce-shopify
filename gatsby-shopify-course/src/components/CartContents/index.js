import React from 'react';
import CartContext from 'context/CartContext';
import { CartItem } from './styles';

export function CartContents() {
  const { checkout } = React.useContext(CartContext);

  return (
    <section>
      <h1>Your cart</h1>
      {checkout?.lineItems?.map(item => (
        <CartItem key={item.variant.id}>
          <div>
            <div>{item.title}</div>
            <div>{item.variant.title}</div>
          </div>
          <div>£{item.variant.price}</div>
          <div>{item.quantity}</div>
          <div>{(item.quantity * item.variant.price).toFixed(2)}</div>
        </CartItem>
      ))}
    </section>
  );
}
