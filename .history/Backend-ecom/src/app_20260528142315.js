const express = require('express')
const app = express();
const productModel=require('./models/product.model');

app.use(express.json())

app.post('/product',async (req,res)=>{
    const data=req.body
    await productModel.create({
        image:data.image,
        title:data.title,
        description:data.description
    })
    res.status(201).json({
        message:"product added"
    })
})

app.get('/product',async (req,res)=>{
    const data=await productModel.find();
    res.status(200).json({
        message:"product data is here",
        product:data
    })
})

app.delete('/product/:id' async(req,res)=>{
    const id=req.params.id;
    
})

module.exports=app