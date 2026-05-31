const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    thumbnail:
    title: String,
    description: String
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;