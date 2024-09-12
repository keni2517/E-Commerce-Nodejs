const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName : {
        type : String,
    },    
    price : {
        type : Number
    },
    discription : {
        type : String
    },
    rating : {
        type: Number,
    }  ,  
    othersProducts : [String],
    image : [String],
    isDelete : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model("products" , productSchema)