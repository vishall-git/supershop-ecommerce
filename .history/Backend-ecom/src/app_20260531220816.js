const express = require('express')
const app = express();
const productModel = require('./models/product.model');
const uploadFile = require('./services/storage.service');
const multer = require('multer');

app.use(express.json());


module.exports = app