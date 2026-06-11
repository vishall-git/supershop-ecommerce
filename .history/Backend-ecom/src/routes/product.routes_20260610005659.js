const express = require('express')
const productController=require('../controllers/product.controller')
const authMiddlewares=require('')
const multer=require('multer')

const router = express.Router();
router.use(express.json());
const upload=multer({storage:multer.memoryStorage()})

router.post("/product", upload.single("image"),productController.addProducts);
router.get('/', productController.allProducts);
router.delete('/product/:id',productController.deleteProduct);
router.patch("/product/:id",productController.updateProduct);

router.get('/cart',authMiddleware,cartController.getCart)

module.exports = router;