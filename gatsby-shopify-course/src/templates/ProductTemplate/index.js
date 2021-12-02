import React from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery } from 'components';
import { Grid, SelectWrapper } from './styles';
import CartContext from 'context/CartContext';

// page queryでは、graphql内でpageContextの変数にaccessできる
export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      shopifyId
      title
      description
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default function ProductTemplate(props) {
  const { getProductById } = React.useContext(CartContext);
  const [product, setProduct] = React.useState(null);
  React.useEffect(() => {
    getProductById(props.data.shopifyProduct.shopifyId).then(result => {
      setProduct(result);
    });
  }, [getProductById, setProduct]);

  return (
    <Layout>
      <Grid>
        <div>
          <h1>{props.data.shopifyProduct.title}</h1>
          <p>{props.data.shopifyProduct.description}</p>
          {/* productの全variantsのquantityが0の時、availableForSaleがfalseとなるので、availableForSaleがtrueの時、つまり在庫がある時のみvariantsを表示する */}
          {product?.availableForSale && (
            <>
              <SelectWrapper>
                <strong>Variant</strong>
                <select>
                  {product?.variants.map(v => (
                    <option key={v.id}>{v.title}</option>
                  ))}
                </select>
              </SelectWrapper>
            </>
          )}
        </div>
        <div>
          <ImageGallery images={props.data.shopifyProduct.images} />
        </div>
      </Grid>
    </Layout>
  );
}
