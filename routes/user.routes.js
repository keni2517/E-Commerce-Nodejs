const express=require("express");
const userRoutes =express.Router();
const{
    registerUser,loginUser,userProfile,updateProfile,deleteUser,getAllUser,
    changePassword
} = require("../controller/user.controller");
const {upload} = require('../helpers/imageUpload');
const {verifyToken} = require('../helpers/tokenVerify')

userRoutes.post("/register",upload.single("profileImage"),registerUser);
userRoutes.post("/login",loginUser);
userRoutes.get("/getall",getAllUser);
// userRoutes.get("/me",verifyToken,userProfile);
userRoutes.put("/update",verifyToken,updateProfile);    
userRoutes.put("/change-password", verifyToken, changePassword);
userRoutes.delete("/delete",verifyToken,deleteUser);


module.exports = userRoutes;