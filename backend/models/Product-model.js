const mongoose = require('mongoose')

//Product Data

const productSchema= new mongoose.Schema({
   name:{ type: String, required: true},
   description:{ type: String, required: false},
   price:{ type: String, required: true},
   discountprice:{ type: Number},
   imageUrl:{type: String},
   sku:{ type: String, required: false},
   stock:{ type: Number, required: false},
   category:{ type: String, required: true},
   tags:{ String},
   variants: [
    {
      size: { type: String },
      color: { type: String },
      stock: { type: Number },
      price: { type: Number },
      sku: { type: String },
    },
  ],
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  ratings: {
    average: { type: Number },
    totalReviews: { type: Number },
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number },
      reviewText: { type: String },
      createdAt: { type: Date },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});


module.exports = mongoose.model('Product', productSchema);