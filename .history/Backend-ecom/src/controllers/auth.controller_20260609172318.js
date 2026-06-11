const express = require('express');
const jwt=require('jsonwebtoken')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');


async function registerUser(req,res){
    const {username, email,password}=req.body;
    const user=await userModel.create({
        username,email,password
    })

    const userAlreadyExists= await userModel.findOne({email})
    if(userAlreadyExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }
    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,);


    res.cookie('token',token);

    res.status(201).json({
        message:"user registered successfully",
        user
    })
}
    async function loginUser(req,res){
        const {email,password}=req.body;
        const userExist= await userModel.findOne({email})

        if(!userExist){
           return res.status(400).json({
                message:"enter correct email and password"
            })
        }

        const isMatch= await bcrypt.compare(password,userExist.password)

        
    }

module.exports={registerUser};