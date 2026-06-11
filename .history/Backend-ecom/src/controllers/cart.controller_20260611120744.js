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

async function getCart(req,res){
  const user = req.user.id;
  try{
    const cart = await cartModel.findOne({user}).populate('items.product','title image estDelivery');

    if(!cart){return res.status(404).json({message:"not found "})}

    if(!data){return res.status(404).json({message:"empty cart"})}

    return res.status(200).json({message:"all items are here"})

  }catch(err){
    return res.status(500).json({message:err.message})
  }
}

async function deleteCartItemsById(req, res) {
  const user = req.user.id;
  const { productId } = req.params;
  try {
    const cart = await cartModel.findOne({ user })

    if (!cart) { return res.status(404).json({ message: "no items available" }) }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId
    )

    if (!itemExists) { return res.status(404).json({ message: "not found" }) }

    cart.items = cart.items.filter(
      (items) => items.product.toString() !== productId
    )

    await cart.save();

    await cart.populate("items.product", "title image estDelivery");

    return res.status(200).json({ message: "deletion success" ,cart})
  } catch (err) { return res.status(500).json({ message: "internal server error" }) }
}
  
async function deleteAllItems(req,res){
  const user=req.user.id;
  try{

  const cart=await cartModel.findOne({user})

  if(!cart){return res.status(400).json({messages:"cart not found"})}

  cart.items=[];//or cart.items.length=0
  await cart.save();

  return res.status(200).json({message:"deletion successful"})
}catch(err){return res.status(500).json({message:err.message})}
}


module.exports = { createCart,deleteCartItemsById,deleteAllItems }
