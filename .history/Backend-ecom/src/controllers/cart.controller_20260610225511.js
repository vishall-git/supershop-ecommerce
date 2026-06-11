const cartModel = require("../models/cart.model");

async function createCart(req, res) {
  const { items, totalPrice } = req.body;

    if(!items||!Array.isArray(items)||items.length===0){
        return res.st(400).
    }

  const cart = await cartModel.create({
    user: req.user.id,
    items: items,
    totalPrice: totalPrice,
  });

  res.status(201).json({
    message: "Cart created successfully",
    cart,
  });
}
