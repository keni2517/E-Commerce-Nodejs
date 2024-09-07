const express=require("express");
const userRoutes =express.Router();
const{
    registerUser
} = require("../controller/user.controller");

userRoutes.post("/register",registerUser);

module.exports = userRoutes;