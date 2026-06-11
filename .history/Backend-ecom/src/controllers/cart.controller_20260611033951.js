const cartModel = require("../models/cart.model");

async function createCart(req, res) {
  const user = req.user.id;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "empty or missing items" });
  }
  try {
    const cart = new cartModel({ user: user, items: items });

    await cart.save();

    //add more data in cart items array
    await cart.populate('items.product', 'title image estDelivery');

    return res.status(201).json({ message: "Cart created successfully", cart });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
}

async function deleteCartItems(req,res){
    const user=req.user.id;
    const {productId}=req.params;
    const cart=await cartModel.findOne({user})

    if(!cart){return res.status(404).json({message:"no items available"})}

    const itemExists=cart.items.some(
        (item)=> item.product.toString()!==productId
    )

    if(!itemExist){return res.status(4004)}
}

module.exports = { createCart };
