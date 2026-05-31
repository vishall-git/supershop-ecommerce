const mongoose = require("mongoose");


async function connectDB(){
    await mongoose.connect(process.env.mod);
    console.log("connected to DB")
}

module.exports=connectDB;