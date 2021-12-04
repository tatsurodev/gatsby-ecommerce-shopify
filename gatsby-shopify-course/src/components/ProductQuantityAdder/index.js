import React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { ProductQuantityAdderWrapper } from './styles';

export function ProductQuantityAdder({ variantId, available }) {
  return (
    <ProductQuantityAdderWrapper>
      <strong>Quantity</strong>
      <form>
        <Input />
        <Button fullWidth>Add to card</Button>
      </form>
    </ProductQuantityAdderWrapper>
  );
}
