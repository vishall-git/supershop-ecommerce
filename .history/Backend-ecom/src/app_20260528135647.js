const express = require('express')
const app = express();
app.use(express.json())
const productModel=require('./models/product.model');


module.exports=app