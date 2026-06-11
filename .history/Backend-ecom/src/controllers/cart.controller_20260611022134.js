const cartModel = require("../models/cart.model");

async function createCart(req, res) {
    const user=req.user.id;
  const { items } = req.body;

  

    if(!items||!Array.isArray(items)||items.length===0){
        return res.status(400).json({message:"empty or missing items"})
    }
try{
  const cart = new cartModel({
    user: user,
    items: items,
  });
   
  await cart.save()
}catch(err){
    res.status(500).json()
}

  res.status(201).json({
    message: "Cart created successfully",
    cart,
  });
}

module.exports={createCart};