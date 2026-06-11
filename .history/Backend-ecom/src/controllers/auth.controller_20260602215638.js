const express = require('express');
const userModel=require('../models/')
const control = express();

control.use(express.json());

async function authControl(){
    control.post()
}