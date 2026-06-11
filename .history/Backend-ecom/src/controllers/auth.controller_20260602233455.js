const express = require('express');
const userModel=require('../models/user.model')

control.use(express.json());

async function registerUser(req,res){
    const {username, email,password}=req.body;

}
module.exports=registerUser;