const express = require('express')

const router = express.Router();
const uploadFile = require('../services/storage.service');
const multer = require('multer')





const upload = multer({ storage: multer.memoryStorage() });

router.post('/product', upload.single("image"), async (req, res) => {
    const result = await uploadFile(req.file.buffer)
    console.log(result)
    await productModel.create({
        image: result.url,
        thumbnail: result.thumbnailUrl,
        title: req.body.title,
        description: req.body.description
    })
    res.status(201).json({
        message: "product added"
    })
})

router.get('/product', async (req, res) => {
    const data = await productModel.find();
    console.log(data)
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