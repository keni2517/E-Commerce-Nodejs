const express = require("express");

const cartRoutes = express.Router();

const {addToCart, getAllCarts, updateToCart , deleteCart} = require("../controller/cart.controller");

const {verifyToken} = require("../helpers/tokenVerify");

cartRoutes.post("/addcart" , verifyToken , addToCart);
cartRoutes.get("/getcart" ,verifyToken, getAllCarts);
cartRoutes.put("/updateCart" ,verifyToken, updateToCart);
cartRoutes.delete("/delete" ,verifyToken, deleteCart);

module.exports = cartRoutes;