const express = require('express');
const {addNewProduct , getAllProduct , getProduct , updateProduct , deleteProduct} = require('../controller/product.controller');
const productRoutes = express.Router()
const {verifyToken} = require('../helpers/tokenVerify')

productRoutes.post("/addNewProduct" , verifyToken , addNewProduct);

// Get All Product
productRoutes.get("/getAllProduct" , getAllProduct);

//Get Only One Product
productRoutes.get("/product" , getProduct);

// Update Product
productRoutes.put("/updateProduct" , updateProduct);

// Delete Product
productRoutes.delete("/deleteProduct" , deleteProduct);

module.exports = productRoutes;