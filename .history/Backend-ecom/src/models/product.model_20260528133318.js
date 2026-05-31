const mongoose=require('mongoose');

const productSchema = new mongooseSchema({
    image:String,
    title:String,
    description:String
})

const productModel= mongoose.