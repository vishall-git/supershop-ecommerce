const express = require('express')
const app = express();
const productModel = require('./models/product.model');
const uploadFile = require('./services/storage.service');
const multer = require('multer');

app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

app.post('/product', upload.single("image"), async (req, res) => {
    const result = await uploadFile(req.file.buffer)
    console.log(result)
    await productModel.create()
    res.status(201).json({
        message: "product added"
    })
})



app.get('/product', async (req, res) => {
    const data = await productModel.find();
    console.log(data)
    res.status(200).json({
        message: "product data is here",
        product: data
    })
})

app.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    await productModel.findOneAndDelete({
        _id: id
    })
    res.status(200).json({
        message: "deletion success"
    })
})

app.patch("/product/:id", async (req, res) => {
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

module.exports = app