const express = require('express');
const productRoutes = express.Router();
const {
    addNewProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controller/product.controller");
const { updateUser } = require('../controller/user.controller');

//  add new product - create
productRoutes.post("/",addNewProduct);
productRoutes.get("/",getAllProduct);
productRoutes.get("/get-product",getProduct);
productRoutes.put("/",updateProduct);
productRoutes.delete("/",deleteProduct)

module.exports = productRoutes;