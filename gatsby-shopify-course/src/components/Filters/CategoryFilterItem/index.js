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
  const searchTerm = qs.s;

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
    // categoryが選択されている & 検索ワードなし、つまりcollection idが0でない & searchTerm falseの時、?cのqueryをつけないようにする
    if (newIds.length && !searchTerm) {
      navigate(`${navigateTo}?c=${newIds.join(',')}`);
      // categoryが選択されている & 検索ワードあり
    } else if (newIds.length && !!searchTerm) {
      navigate(
        `${navigateTo}?c=${newIds.join(',')}&s=${encodeURIComponent(
          searchTerm
        )}`
      );
      // categoryが選択されていない & 検索ワードあり
    } else if (!newIds.length && !!searchTerm) {
      navigate(`${navigateTo}?s=${encodeURIComponent(searchTerm)}`);
      // categoryが選択されていない & 検索ワードなし
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
