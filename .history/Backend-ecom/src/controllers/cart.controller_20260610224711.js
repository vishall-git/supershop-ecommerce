const CartModel=require('../models/cart.model')

async function createCart(req,res){
    
    const displayItems = await cartModel.create({
        user:user,
        items:items,
        totalPrice:totalPrice
    })

}