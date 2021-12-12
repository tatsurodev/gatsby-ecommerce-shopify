import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

// app全体でconsumeするような変数はcontextで取得すると便利
const query = graphql`
  fragment ProductTileFields on ShopifyProduct {
    handle
    # variantsの中から最小のpriceを取得
    priceRange {
      minVariantPrice {
        amount
      }
    }
  }
  {
    allShopifyProduct {
      edges {
        node {
          ...ShopifyProductFields
          ...ProductTileFields
        }
      }
    }
    allShopifyCollection(sort: { fields: title, order: ASC }) {
      edges {
        node {
          products {
            # src/fragments.jsで定義したfragmentsは全gatsby上で自動的に使用可
            ...ShopifyProductFields
            ...ProductTileFields
          }
          title
          description
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

const defaultState = {
  products: [],
};

const ProductContext = React.createContext(defaultState);
export default ProductContext;

export function ProductContextProvider({ children }) {
  const { allShopifyCollection, allShopifyProduct } = useStaticQuery(query);

  return (
    <ProductContext.Provider
      value={{
        products: allShopifyProduct.edges.map(({ node }) => node),
        collections: allShopifyCollection.edges.map(({ node }) => node),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
