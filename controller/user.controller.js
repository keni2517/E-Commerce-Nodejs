const User = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//Register

exports.registerUser = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email,isDelete:false});
        if(user){
            return res.status(400).json({message:"User Alrady Exists..."});
        }

        let hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashPassword);

        user = await User.create({...req.body,password:hashPassword});
        user.save();
        res.status(201).json({user,message:"User Registration Successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error.."})
    }
}