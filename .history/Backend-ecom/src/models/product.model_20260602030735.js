const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
      required: true,
      trim: true,
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
        type: String,
      alt: String,
    },
    thumbnail: {
      url: String,
      alt: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    estDelivery: {
      type: String,
      default: "4-6 business days",
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
