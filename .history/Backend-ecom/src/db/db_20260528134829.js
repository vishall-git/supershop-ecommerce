const mongoose = require("mongoose");


async function connectDB(){
    await mongoose.connect(process.env.m);
    console.log("connected to DB")
}

module.exports=connectDB;