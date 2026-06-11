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

    return res.status(201).json({message: "Cart created successfully",cart});
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
}

module.exports = { createCart };
