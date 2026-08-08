const uploadFile = require('../services/storage.service');
const productModel = require('../models/product.model');


async function addProducts(req, res) {
    try {
        const result = await uploadFile(req.file.buffer)
        const productData = JSON.parse(req.body.productData)
        await productModel.create({
            image: result.url,
            thumbnailUrl: result.thumbnailUrl,
            ...productData
        })
        res.status(201).send("product created")
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function allProducts(req, res) {
    const product = await productModel.find();
    res.status(200).json({
        message: "success",
        product: product
    })
}

async function searchProductByTags(req, res) {
    try {
        const { tags } = req.query;
        const search = tags.toLowerCase();
        const products = await productModel.find({
            $or:[
            {tags: { $in: [search] }},
            {title:{$regex:search,$options:'i'}}]
        });

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


function updateProduct(req, res) {
    res.status(403).json({
        message: "user can't update product"
    })
}

function deleteProduct(req, res) {
    res.status(403).json({
        message: "user can't delete product"
    })
}

module.exports = { addProducts, allProducts, searchProductByTags, deleteProduct, updateProduct }

