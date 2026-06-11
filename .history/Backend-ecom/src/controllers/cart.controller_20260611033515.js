const cartModel = require("../models/cart.model");

 

async function deleteCartItems(req,res){
    const user=req.user.id;
    const {productId}=req.params;
    const cart=await cartModel.findOne({user})

    if(!cart){return res.status(404).json({message:"no items available"})}

    const itemExists=cart.items.some(
        (item)=> item.product.toString
    )
}

module.exports = { createCart };
