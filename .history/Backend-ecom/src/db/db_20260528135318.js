const mongoose = require("mongoose");


async function connectDB(){
    await mongoose.connect(mongodb+srv://ecomadmin:ecom_password@ecom.p9vawuy.mongodb.net/product);
    console.log("connected to DB")
}

module.exports=connectDB;