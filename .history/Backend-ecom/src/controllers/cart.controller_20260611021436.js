const cartModel = require("../models/cart.model");

async function createCart(req, res) {
    const user=req.user.id;
  const { items } = req.body;

  

    if(!items||!Array.isArray(items)||items.length===0){
        return res.status(400).json()
    }

    cart.save()



  const cart = new cartModel.create({
    user: user,
    items: items,
    totalPrice: totalPrice,
  });

  res.status(201).json({
    message: "Cart created successfully",
    cart,
  });
}
