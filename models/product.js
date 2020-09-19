const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  title: String,
  price: Number,
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
      favs:  Number
  }
});


const Product = mongoose.model('Product', prodSchema);

module.exports = Product;
