import React from 'react';
import { ProductTileWrapper } from './styles';
import Img from 'gatsby-image';

export function ProductTile({ title, imageFluid }) {
  return (
    <ProductTileWrapper>
      <Img fluid={imageFluid} />
      <div>{title}</div>
    </ProductTileWrapper>
  );
}
