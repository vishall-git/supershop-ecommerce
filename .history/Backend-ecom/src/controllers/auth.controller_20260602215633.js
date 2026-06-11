const express = require('express');
const userModel=require('..')
const control = express();

control.use(express.json());

async function authControl(){
    control.post()
}