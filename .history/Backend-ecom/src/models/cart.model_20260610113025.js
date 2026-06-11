const mongoose = require('mongoose');


const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    items:[]
})

const cartModel=mongoose.use('cart',cartSchema);

exports.module=cartModel;