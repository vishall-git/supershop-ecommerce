const express = require('express')
const app = express();
const productModel=require('./models/product.model');

app.use(express.json())

app.post('products',async (re))


module.exports=app