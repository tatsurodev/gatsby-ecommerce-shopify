import React from 'react';
import { graphql } from 'gatsby';

// page queryでは、graphql内でpageContextの変数にaccessできる
export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      title
    }
  }
`;

export default function ProductTemplate(props) {
  console.log(props);
  return <h1>{props.data.shopifyProduct.title}</h1>;
}
