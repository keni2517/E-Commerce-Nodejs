const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
  "isDeleted" : {
        type : Boolean,
        default : false
    },
    "title": {
        type : String,
        required : true
    },
    "description": {
        type : String,
        required : true
    },
    "category": {
        type : String ,
        required : true
    } ,
    "price" : {
        type : Number,
        required : true
    },
    "discountPercentage": Number,
    "brand": String,
    "sku": {
        type : String,
        required : true
    },
    "weight":{
        type : Number,
        required : true
    },
    "rating":{
        type : Number,
        required : true
    },
    "stock": {
        type : Number,
        required : true
    },
    "tags": [{type : String}], // array of string types 
    "dimensions": {
      "width":  {
        type : Number,
        required : true
      },
      "height": {
        type : Number,
        required : true
      },
      "depth":  {
        type : Number,
        required : true
      }
    },
    "reviews": [{
        "rating": Number ,
        "comment": String , 
        "date": String ,
        "reviewerName": String ,
        "reviewerEmail": String
      }],
    "returnPolicy": String,
    "minimumOrderQuantity": Number,
    "meta": {
      "createdAt": {
        type : String,
        required : true
      },
      "updatedAt":  {
        type : String,
        required : true
      },
      "barcode": {
        type : String,
        required : true
      } ,
      "qrCode":  {
        type : String,
        required : true
      } 
    },
    "images": [{type : String , required : true}],
    "thumbnail":{type : String , required : true},
    "warrantyInformation": {type : String , required : true},
    "shippingInformation": {type : String , required : true},
    "availabilityStatus": String
  })




  module.exports = mongoose.model('products',productSchema);