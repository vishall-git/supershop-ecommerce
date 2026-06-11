const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
        trim:true
    },
    thumbnail:{
        type:String,
    title: String,
    description: String
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;