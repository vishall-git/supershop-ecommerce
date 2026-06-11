const CartModel=require('../models/cart.model')

async function createCart(req,res){
    const {items,totalPrice}=req.body;
    const displayItems = await cartModel.create({
        user:req.user.id,
        items:items,
        totalPrice:totalPrice
    })

}