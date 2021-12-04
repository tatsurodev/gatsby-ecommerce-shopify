import React from 'react';
import { CartWrapper } from './styles';
import { FaShoppingCart } from 'react-icons/fa';
import CartContext from 'context/CartContext';

export function Cart() {
  const { checkout } = React.useContext(CartContext);
  console.log('checkout', checkout);

  return (
    <CartWrapper>
      <FaShoppingCart size="1.5em" />
    </CartWrapper>
  );
}
