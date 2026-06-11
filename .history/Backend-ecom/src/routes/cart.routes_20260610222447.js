const authMiddlewares=require('../middleware/auth.middleware')
const express = require('express')



router.get('/cart',authMiddlewares,cartController.getCart)
router.delete('/cart',authMiddlewares,cartController.deleteAllItems)
router.delete('/cart/:id',authMiddlewares,cartController.deleteItemById)