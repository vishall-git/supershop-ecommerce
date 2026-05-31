mongoose');


async function connectDB(){
    await mongoose.connect("mongodb+srv://ecomadmin:ecom_password@ecom.p9vawuy.mongodb.net/product");
}

module.exports=connectDB;