const authMiddlewares=require('../middleware/auth.middleware')
const express = require('express')


const router = express.Router();
router.use(express.json());

router.get('/cart',authMiddlewares,)
router.get('/cart',authMiddlewares,cartController.getCart)
router.delete('/cart/;id',authMiddlewares,cartController.deleteAllItems)
router.delete('/cart/:id',authMiddlewares,cartController.deleteItemById)


module.exports=router;