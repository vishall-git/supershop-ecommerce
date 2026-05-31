const express = require('express')
const app = express();
const productModel = require('./models/product.model');
const productRoutes=require('./routes/')

app.use(express.json());

app.use('/product',productRoutes)
module.exports = app