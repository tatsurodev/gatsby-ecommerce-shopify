import React from 'react';
import CartContext from 'context/CartContext';
import { CartItem, CartHeader, CartFooter } from './styles';

export function CartContents() {
  const { checkout } = React.useContext(CartContext);

  return (
    <section>
      <h1>Your cart</h1>
      <CartHeader>
        <div>Product</div>
        <div>Unit price</div>
        <div>Quantity</div>
        <div>Amount</div>
      </CartHeader>
      {checkout?.lineItems?.map(item => (
        <CartItem key={item.variant.id}>
          <div>
            <div>{item.title}</div>
            <div>
              {item.variant.title === 'Default Title' ? '' : item.variant.title}
            </div>
          </div>
          <div>£{item.variant.price}</div>
          <div>{item.quantity}</div>
          <div>£{(item.quantity * item.variant.price).toFixed(2)}</div>
        </CartItem>
      ))}
      <CartFooter>
        <div>
          <strong>total:</strong>
        </div>
        <div>
          <span>£{checkout?.totalPrice}</span>
        </div>
      </CartFooter>
    </section>
  );
}
