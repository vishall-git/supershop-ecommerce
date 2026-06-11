const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        url:
    }
    thumbnail:{
        type:String,
    required:true
},
    title: String,
    description: String
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;