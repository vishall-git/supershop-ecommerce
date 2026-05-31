const express = require('express')
const app = express();
const productModel=require('./models/product.model');

app.use(express.json())

app.post('products',async (req,res)=>{
    
    await productModel.create(req.body)
})


module.exports=app