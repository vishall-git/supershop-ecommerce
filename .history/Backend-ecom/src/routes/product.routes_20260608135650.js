const express = require('express')
const productController=require('../controllers/product.controller')

const router = express.Router();
router.use(express.json());


router.post("/product", upload.single("image"),productController.addProducts);
router.get('/product', productController.allProducts);


router.delete('/product/:id',productController.deleteProduct);


router.patch("/product/:id",productController.updateProduct)

module.exports = router;