const express = require('express')
const productController=require('../controllers/product.controller')
const authMiddlewares=require('../middleware/auth.middleware')
const cartController=require('../controllers/cart.controller')
const multer=require('multer')

const router = express.Router();
router.use(express.json());
const upload=multer({storage:multer.memoryStorage()})

router.post("/product", upload.single("image"),productController.addProducts);
router.get('/', productController.allProducts);
router.delete('/:id',productController.deleteProduct);
router.patch("/:id",productController.updateProduct);



module.exports = router;