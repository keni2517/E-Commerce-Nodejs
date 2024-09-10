const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  material: {
    type: String
  },
  stock: {
    type: Number
  },
  images: {
    type: [String]
  },
  thumbnail: {
    type: String
  },
  gender: {
    type: String
  },
  occasion: {
    type: String
  },
  season: {
    type: String
  },
  availabilityStatus: {
    type: String,
    default: 'In Stock'
  },
  isDelete: {
    type: Boolean,
    default: false
  }
},
  {
    versionKey: false,
    timestamps: true
  });

module.exports = mongoose.model('Product', productSchema);