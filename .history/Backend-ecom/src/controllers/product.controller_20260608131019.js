const express=require('express')
const uploadFile = require('../services/storage.service');
const productModel = require('../models/product.model');
const multer = require('multer')

const uploadFile=multer({storage:multer.memoryStorage})

async function addProduct(req,res){
    const result=await uploadFile(req.file.buffer)
    const product=JSON.parse(req.body.productData)
    await productModel.create({
        image:result.url,
        thumbnailUrl:result.
    })
}