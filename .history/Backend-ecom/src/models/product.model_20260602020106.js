const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    tu
  }
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
