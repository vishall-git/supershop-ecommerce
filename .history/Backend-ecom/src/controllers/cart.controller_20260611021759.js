const cartModel = require("../models/cart.model");

async function createCart(req, res) {
    const user=req.user.id;
  const { items,totalPrice:0 } = req.body;

  

    if(!items||!Array.isArray(items)||items.length===0){
        return res.status(400).json({message:"empty or missing items"})
    }

  const cart = new cartModel({
    user: user,
    items: items,
    totalPrice: totalPrice,
  });
   
  await cart.save()

  res.status(201).json({
    message: "Cart created successfully",
    cart,
  });
}
