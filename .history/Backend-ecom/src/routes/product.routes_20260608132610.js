const express = require('express')
const productController=require('../controllers/product.controller')

const router = express.Router();
router.use(express.json());

router.post("/product", upload.single("image"),productController.addProducts);
router.get('/product', productController.allProducts);

module.exports = router;