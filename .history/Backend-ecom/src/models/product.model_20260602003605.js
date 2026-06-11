const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        url:String,
        alt:String,
    }
    thumbnail:{
        url:String,
        alt:
        

    required:true
},
    title: String,
    description: String
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;