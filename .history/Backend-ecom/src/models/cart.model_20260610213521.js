const mongoose = require('mongoose');


const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        quantity:{
            type:Number,
            default:1,
            min:1
        },
        price:{
            type:Number,
            required:true,
        }
    }],
    totalprice:{
        require
    }
})

const cartModel=mongoose.model('cart',cartSchema);

exports.module=cartModel;