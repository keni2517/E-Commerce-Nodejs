const express = require('express');
const {verifyToken} = require("../helpers/tokenVerify")
const { addToCart , deleteToCart , updateToCart , getAllCart } = require('../controller/cart.controller');

const CartRoutes = express.Router();

CartRoutes.get('/',verifyToken,getAllCart); 

CartRoutes.post('/',verifyToken,addToCart); // - [Done]

CartRoutes.post('/updateCart',verifyToken,updateToCart);  // - [Done]

CartRoutes.post('/deleteCart',verifyToken,deleteToCart); //  - [Done]

module.exports = CartRoutes;