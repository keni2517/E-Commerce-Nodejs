const express = require('express');
const { addNewProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const productRoutes = express.Router();

productRoutes.post("/",addNewProduct);
productRoutes.get("/getall",getAllProduct);
productRoutes.put("/update",updateProduct);
productRoutes.delete("/delete",deleteProduct);

module.exports = productRoutes;