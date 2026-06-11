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
    totalPrice:{
        type:Number,
        required:true
    }
})
cartSchema.pre('save',function(next){
    this.items.reduce(sum,totalPrice)=>{
        return this.totalPrice
    }
})

const cartModel=mongoose.model('Cart',cartSchema);

exports.module=cartModel;