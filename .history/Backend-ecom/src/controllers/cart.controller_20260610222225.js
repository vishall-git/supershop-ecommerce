const CartModel=require('../models/cart.model')

async function createCart(req,res){
    const {user,items,totalPrice}=req.body;

    const displayItems = await cartModel.create({
        user:user,
        items:items,
        totalPrice:totalPrice
    })

}