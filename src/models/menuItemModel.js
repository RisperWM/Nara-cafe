const mongoose = require("mongoose");

const menuItemSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    offer: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;