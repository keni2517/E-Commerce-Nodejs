const express = require('express');
const cartRoutes = express.Router();
const {
    addtoCart,
    getAllCarts,
    updateCart,
    deleteToCart
} = require("../controller/cart.controller");
const {verifyToken} = require("../helpers/tokenVerify")
// const { updateUser } = require('../controller/user.controller');

//  add new product - create
cartRoutes.post("/",verifyToken,addtoCart);
// cartRoutes.get("/",verifyToken,getAllCarts);
// cartRoutes.put("/", verifyToken, updateCart);
// cartRoutes.put("/delete-cart", verifyToken, deleteToCart);
// cartRoutes.delete("/",deleteProduct)

module.exports = cartRoutes;