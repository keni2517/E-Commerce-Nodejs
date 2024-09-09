const express=require("express");
const userRoutes =express.Router();
const{
    registerUser,loginUser,userProfile,updateProfile,deleteUser
} = require("../controller/user.controller");
const {upload} = require('../helpers/imageUpload');
const {verifyToken} = require('../helpers/tokenVerify')

userRoutes.post("/register",upload.single("profileImage"),registerUser);
userRoutes.post("/login",loginUser);
userRoutes.get("/me",verifyToken,userProfile);
userRoutes.put("/update",verifyToken,updateProfile);
userRoutes.delete("/delete",verifyToken,deleteUser);

module.exports = userRoutes;