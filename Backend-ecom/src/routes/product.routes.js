const express = require('express')
const productController = require('../controllers/product.controller')
const cartController = require('../controllers/cart.controller')
const multer = require('multer')

const router = express.Router();
router.use(express.json());
const upload = multer({ storage: multer.memoryStorage() })

router.post("/product/add", upload.single("image"), productController.addProducts);
router.get('/', productController.allProducts);
router.get('/search',productController.searchProductByTags)
router.delete('/delete/:id', productController.deleteProduct);
router.patch("/:id", productController.updateProduct);



module.exports = router;