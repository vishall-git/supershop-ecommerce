const authMiddlewares = require('../middleware/auth.middleware')
const cartController = require('../controllers/cart.controller')
const express = require('express')


const router = express.Router();


router.post('/add', authMiddlewares, cartController.createCart)
router.get('/', authMiddlewares, cartController.getCart)
router.delete('/delete', authMiddlewares, cartController.deleteAllItems)
router.delete('/:productId', authMiddlewares, cartController.deleteCartItemsById)


module.exports = router;