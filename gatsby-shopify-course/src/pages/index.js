import React from 'react';
import { Layout, SEO } from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  const { collections } = React.useContext(ProductContext);
  console.log('collection', collections);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to the Gatsby &amp; Shopify starter.</p>
    </Layout>
  );
};

export default IndexPage;
