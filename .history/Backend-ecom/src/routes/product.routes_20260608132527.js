const express = require('express')
const productController=require('../controllers/product.controller')

const router = express.Router();
router.use(express.json());

router.post("/product", upload.single("image"),productController.addProducts)


router.get('/product', async (req, res) => {
    const data = await productModel.find();
    res.status(200).json({
        message: "product data is here",
        product: data
    })
})


router.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    await productModel.findOneAndDelete({
        _id: id
    })
      await imagekit.deleteFile(req.image.fileId)
    res.status(200).json({
        message: "deletion success"
    })
})


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