const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  title: String,
  price: String,
  city: String,
  description: String,
  quantity: Number,
  pictures : Array,
  author: { 
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  created: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
      votes: Number,
      favs:  Number,
      reviews: Number,
      orders: Number
  }
});


const Product = mongoose.model('Product', prodSchema);

module.exports = Product;
