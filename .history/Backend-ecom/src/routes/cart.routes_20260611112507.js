const authMiddlewares=require('../middleware/auth.middleware')
const express = require('express')


const router = express.Router();
router.use(express.json());

router.post('/add',authMiddlewares,cartController.createCart)
router.get('/cart',authMiddlewares,cartController.getCart)
router.delete('/cart',authMiddlewares,cartController.deleteAllItems)
router.delete('/cart/:id',authMiddlewares,cartController.deleteCartItemsById)


module.exports=router;