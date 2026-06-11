const express = require('express');
const userModel=require('../models/user.model')
const control = express();

control.use(express.json());

async function authControl(){
    control.post()
}