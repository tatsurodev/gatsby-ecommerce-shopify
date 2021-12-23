const faunadb = require('faunadb');
const verifyWebhookIntegrity = require('shopify-verify-webhook');
const axios = require('axios');

// https://docs.fauna.com/fauna/current/integrations/shell/config
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
});

exports.handler = function (event, context, callback) {
  // shopify appからのaccessかどうかを判定
  const isValid = verifyWebhookIntegrity(
    process.env.SHOPIFY_WEBHOOK_KEY,
    event.headers['x-shopify-hmac-sha256'],
    event.body
  );

  // shopifyからのaccessの時
  if (isValid) {
    const body = JSON.parse(event.body);
    const { id } = body;
    delete body.updated_at;
    body.variants.forEach(variant => {
      delete variant.updated_at;
      delete variant.inventory_quantity;
      delete variant.old_inventory_quantity;
    });
    const bodyString = JSON.stringify(body);

    client
      .query(q.Get(q.Match(q.Index('product_by_id'), id)))
      // product_idがある時
      .then(result => {
        // faunaのdataとshopifyのdataが違う時は、dataの更新があった時なので、faunaのdataも更新し、shopifyをrebuild
        if (result.data.product !== bodyString) {
          client
            .query(
              q.Update(result.ref, {
                data: { product: bodyString },
              })
            )
            .then(() => {
              // call netlify rebuild
              axios.get(process.env.NETLIFY_BUILD_URL);
            })
            .catch(e => {
              console.log('error updating product: ', e);
            });
        }
      })
      // product_idが存在しなかった時
      .catch(() => {
        // faunadbにproductを追加し、shopifyをrebuild
        client
          .query(
            q.Create(q.Collection('products'), {
              data: { id, product: bodyString },
            })
          )
          .then(() => {
            // call netlify rebuild
            axios.get(process.env.NETLIFY_BUILD_URL);
          })
          .catch(e => {
            console.log('error adding to db: ', e);
          });
      });
    // shopify以外からのaccessはerror
  } else {
    callback(null, {
      statusCode: 403,
      body: 'Error',
    });
  }
};
