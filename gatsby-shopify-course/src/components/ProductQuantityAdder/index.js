import React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { ProductQuantityAdderWrapper } from './styles';
import CartContext from 'context/CartContext';

export function ProductQuantityAdder({ variantId, available }) {
  const [quantity, setQuantity] = React.useState(1);
  const { updateLineItem } = React.useContext(CartContext);

  // e.target はイベントを発生させる原因となった要素
  // e.currentTarget はイベントハンドラが実際に付与された要素
  const handleQuantityChange = e => {
    setQuantity(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateLineItem({ variantId, quantity: parseInt(quantity, 10) });
  };

  return (
    <ProductQuantityAdderWrapper>
      <strong>Quantity</strong>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={!available}
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Button type="submit" disabled={!available} fullWidth>
          Add to card
        </Button>
      </form>
    </ProductQuantityAdderWrapper>
  );
}
