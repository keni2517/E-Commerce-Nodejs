const express = require("express");

const orderRoutes = express.Router();

const {addNewOrder , deleteOrder} = require("../controller/order.controller");

const {verifyToken} = require("../helpers/tokenVerify");

orderRoutes.post("/addOrder" , verifyToken , addNewOrder);
orderRoutes.delete("/" , verifyToken , deleteOrder);


module.exports = orderRoutes;