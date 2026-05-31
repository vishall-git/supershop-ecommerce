const mongoose = require("mongoose");


async function connectDB(){
    await mongoose.connect();
    console.log("connected to DB")
}

module.exports=connectDB;