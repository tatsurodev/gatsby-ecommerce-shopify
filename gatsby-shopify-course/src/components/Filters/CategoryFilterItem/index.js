import React from 'react';
import { Checkbox } from 'components';
import { navigate, useLocation } from '@reach/router';
import { CategoryFilterItemWrapper } from './styles';
import queryString from 'query-string';

export function CategoryFilterItem({ title, id }) {
  const { search } = useLocation();
  // queryをparseして、keyとvalueで分けてobjectに
  const qs = queryString.parse(search);
  const collectionId = qs.c;

  const onClick = () => {
    let navigateTo = '/all-products';
    navigate(`${navigateTo}?c=${encodeURIComponent(id)}`);
  };

  return (
    <CategoryFilterItemWrapper onClick={onClick}>
      <Checkbox checked={collectionId === id} />
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
}
