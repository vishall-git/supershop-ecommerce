const express = require('express')
const app = express();
const productModel=require('./models/product.model');

app.use(express.json())

app.post('products',async (req,res)=>{
    const data=req.body
    await productModel.create({
        image:data.image,
        description:data.description
    })
})


module.exports=app