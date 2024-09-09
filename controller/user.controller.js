const User = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserServices = require("../services/user.services");
const userservices = new UserServices();

//Register

exports.registerUser = async (req, res) => {
    try {
        let imagePath = ''
        let user = await userservices.User({ email: req.body.email, isDelete: false });
        // let user = await User.findOne({email:req.body.email,isDelete:false});
        if (user) {
            return res.status(400).json({ message: "User Alrady Exists..." });
        }

        if (req.file) {
            imagePath = req.file.path.replace(/\/g/, "/");
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashPassword);

        user = await User.create({ ...req.body, password: hashPassword, profileImage: imagePath });
        user.save();
        res.status(201).json({ user, message: "User Registration Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}

exports.getAllUser = async(req,res) =>{
    try {
        let users = await User.find({isDelete: false});
        res.status(200).json(users);
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

//Login
exports.loginUser = async (req,res) => {
    try {
        let user = await userservices.User({ email: req.body.email, isDelete: false });
        // let user= await User.findOne({email:req.body.email,isDelete:false});
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }

        let matchPassword = await bcrypt.compare(req.body.password,user.password);

        if(!matchPassword){
            return res.status(404).json({message:"Email or Password not match"});
        }

        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(201).json({user,message:"Login Sucessful",token});
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}


//User profile
exports.userProfile = async (req,res) => {
    try{
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}


//Upadate Profile

exports.updateProfile = async (req,res) => {
    try {
       let user = req.user;
       user = await userservices.Update(user._id,req.body)
       res.status(202).json({user,message:"user update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user._id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password is not match" });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete user
exports.deleteUser = async(req,res) => {
    try {
        let user = req.user;
        user = await userservices.delete(
            user._id,
            {isDelete:true},
            {new:true}
        );
        res.status(202).json({user,message:"User Delete Success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}