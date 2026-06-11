const express = require('express')
const app = express();

const productRoutes=require('./routes/product.routes')
const auth

app.use(express.json());

app.use('/',productRoutes)

module.exports = app