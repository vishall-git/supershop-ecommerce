const express = require('express')
const app = express();

const productRoutes=require('./routes/product.routes')
const authRoutes = require('./routes/auth.routes')

app.use(express.json());

app.use('/',productRoutes)

module.exports = app