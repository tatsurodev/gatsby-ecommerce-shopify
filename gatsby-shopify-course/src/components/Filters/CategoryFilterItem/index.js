import React from 'react';
import { Checkbox } from 'components';
import { navigate, useLocation } from '@reach/router';
import { CategoryFilterItemWrapper } from './styles';
import queryString from 'query-string';

export function CategoryFilterItem({ title, id }) {
  const { search } = useLocation();
  // queryをparseして、keyとvalueで分けてobjectに
  const qs = queryString.parse(search);
  // ,の後にemptyな要素があるかもしれないのでそれを排除、query自体がなければcollection idを格納する配列を初期化
  const collectionIds = qs.c?.split(',').filter(c => !!c) || [];
  const checked = collectionIds?.find(cId => cId === id);

  const onClick = () => {
    let navigateTo = '/all-products';
    let newIds = [];
    // checkedがtrueの場合、urlからcolllection idを取り除く
    if (checked) {
      newIds = collectionIds
        .filter(cId => cId !== id)
        .map(cId => encodeURIComponent(cId));
      // checkedがfalseの場合、urlにcollection idを追加
    } else {
      collectionIds.push(id);
      newIds = collectionIds.map(cId => encodeURIComponent(cId));
    }
    // categoryが選択されていない、つまりcollection idが0の時、?cのqueryをつけないようにする
    if (newIds.length) {
      navigate(`${navigateTo}?c=${newIds.join(',')}`);
    } else {
      navigate(`${navigateTo}`);
    }
  };

  return (
    <CategoryFilterItemWrapper onClick={onClick}>
      <Checkbox checked={checked} />
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
}
