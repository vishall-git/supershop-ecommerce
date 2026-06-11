const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:{
        type:String,
        
    },
    thumbnail:String,
    title: String,
    description: String
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;