const express = require('express')
const productController=require('../controllers/product.controller')

const router = express.Router();
router.use(express.json());

router.post("/product", upload.single("image"),productController.addProducts);
router.get('/product', productController.allProducts);


router.delete('/product/:id',productController.deleteProdcu)


router.patch("/product/:id", async (req, res) => {
    const id = req.params.id;
    const description = req.body.description
    await productModel.findOneAndUpdate({
        _id: id
    }, {
        description: description
    })
    res.status(200).json({
        message: "updated"
    })
})

module.exports = router;