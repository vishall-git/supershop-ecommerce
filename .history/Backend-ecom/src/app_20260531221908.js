const express = require('express')
const app = express();
const productModel = require('./models/product.model');
const productRoutes=require('./routes/product.routes')

app.use(express.json());

app.use('/',productRoutes)
module.exports = app