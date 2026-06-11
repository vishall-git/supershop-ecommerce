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
            ref:
            
        }
    }]
})

const cartModel=mongoose.use('cart',cartSchema);

exports.module=cartModel;