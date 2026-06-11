const CartModel=require('../models/cart.model')

async function getCart(req,res){
    const {user,items,totalPrice}=req.body;

    const displayItems = await cartModel.create({
        user:user,
        items:items,
        
    })

}