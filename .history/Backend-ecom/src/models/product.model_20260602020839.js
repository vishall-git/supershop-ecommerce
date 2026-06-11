const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  description:{
    type:String,
    required:true,
    trim:true,
  },
      about: {
      type: String,
      required: true,
    },
        tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  image: {
    url: String,
    alt: String,
  },
  thumbnail: {
    url: String,
    alt: String,
  },
  


});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
