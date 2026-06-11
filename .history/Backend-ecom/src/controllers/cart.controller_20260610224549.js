const CartModel=require('../models/cart.model')

async function createCart(req,res){
    const userId=req.user.id;

    const displayItems = await cartModel.create({
        user:user,
        items:items,
        totalPrice:totalPrice
    })

}