const express = require('express')
const imagekit=require('@imagekit/nodejs')
const uploadFile = require('../services/storage.service');
const productModel = require('../models/product.model');
const multer = require('multer')

const router = express.Router();
router.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });


router.post("/product", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadFile(req.file.buffer);
    const productData = JSON.parse(req.body.productData);
    console.log(productData,result)

    await productModel.create({
      image: result.url,
      thumbnail: result.thumbnailUrl,
      imageFileId:result.fileId,
      ...productData
    });

    res.status(201).json({
      message: "Product added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.get('/product', async (req, res) => {
    const data = await productModel.find();
    res.status(200).json({
        message: "product data is here",
        product: data
    })
})


router.delete('/product/:id', async (req, res) => {
  
    const id = req.params.id;
    const product= await productModel.findById(id)
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