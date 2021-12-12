import React from 'react';
import { Checkbox } from 'components';
import { CategoryFilterItemWrapper } from './styles';

export function CategoryFilterItem({ title }) {
  return (
    <CategoryFilterItemWrapper>
      <Checkbox />
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
}
