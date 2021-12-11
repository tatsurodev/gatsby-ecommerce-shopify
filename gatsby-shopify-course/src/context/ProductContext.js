import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

// app全体でconsumeするような変数はcontextで取得すると便利
const query = graphql`
  {
    allShopifyCollection {
      edges {
        node {
          products {
            # src/fragments.jsで定義したfragmentsは全gatsby上で自動的に使用可
            ...ShopifyProductFields
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
  const { allShopifyCollection } = useStaticQuery(query);

  return (
    <ProductContext.Provider
      value={{
        products: [],
        collections: allShopifyCollection.edges.map(({ node }) => node),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
