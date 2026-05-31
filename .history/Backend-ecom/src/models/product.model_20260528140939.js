const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
    image:String,
    title:String,
    description:String
})

const productModel= mongoose.Model("product",productSchema);

module.exports=productModel;