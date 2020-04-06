const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const shopifyAPI = require('shopify-node-api');

const Shopify = new shopifyAPI({
    shop: 'pao-pao-demo-dev', // MYSHOP.myshopify.com
    shopify_api_key: '44465feba69df86128df57686b18d3e3', // Your API key
    access_token: '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' // Your API password
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});

app.get('/updatePrroductAttribute', (req, res) => {
    Shopify.get('/admin/products.json', {}, function(err, data, headers){
        console.log(data); // Data contains product json information
        console.log(headers); // Headers returned from request
        res.send(data)
    });
})
app.put('/updatePrroductAttribute/:id', (req, res) => {
    const productId = req.params.id
    const put_data = req.body

    console.log("productId:",productId);
    console.log("put_data:",put_data);
    
    Shopify.put('/admin/products/' + productId + '.json', put_data, function(err, data, headers){
        res.json(data)
    });
})

app.get('/getProductsByCollection/:id', (req, res) => {
    const collectionId = req.params.id
    console.log("collectionId:",collectionId);

    Shopify.get('/admin/products.json?collection_id='+ collectionId, {}, function(err, data, headers){
        res.send(data)
    });
})

// /admin/api/2020-04/products.json?collection_id=181340897418

app.listen(8080, () => {
  console.log('Start server at port 8080.')
})