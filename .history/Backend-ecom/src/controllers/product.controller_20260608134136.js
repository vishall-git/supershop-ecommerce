const express=require('express')
const uploadFile = require('../services/storage.service');
const productModel = require('../models/product.model');
const multer = require('multer')

const uploadFile=multer({storage:multer.memoryStorage()})

async function addProducts(req,res){
    try{
    const result=await uploadFile(req.file.buffer)
    const productData=JSON.parse(req.body.productData)
    await productModel.create({
        image:result.url,
        thumbnailUrl:result.thumbnailUrl,
        ...productData
    })
    res.status(201).send("product created")
}
catch(err){
    res.status(500).json({
        message:err.message
    })
}
}

async function allProducts(req,res){
    const product = await productModel.find();

    res.status(200).json({
        message:"success",
        product:product
    })
}




function updateProduct(req,res){
       res.status(403).json({
        message:"user can't update product"
    })
}
function  deleteProduct(req,res){
    res.status(403).json({
        message:"user can't delete product"
    })
}

module.exports={addProducts,allProducts,}

