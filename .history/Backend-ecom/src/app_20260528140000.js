const express = require('express')
const app = express();
const productModel=require('./models/product.model');

app.use(express.json())

app.post('products',async (req,res)=>{
    const data=req.body
    await productModel.create({
        image:data.image,
        title:data.title,
        description:data.description
    })
    res.status(201).json({
        message:"product added",
        
    })
})


module.exports=app