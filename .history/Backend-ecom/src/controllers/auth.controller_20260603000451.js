const express = require('express');
const userModel=require('../models/user.model')


async function registerUser(req,res){
    const {username, email,password}=req.body;
    const user=await userModel.create({
        username,email,password
    })
}
module.exports={registerUser};