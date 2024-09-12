require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ports = process.env.PORTS;
const server = express();
const path = require('path');



// in-built middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public/images",express.static(path.join(__dirname,"public/images")))

server.get('/',(req,res)=>{
    res.send({msg:"welcome to Express Page"});
})


//User Routes
const userRoutes = require('./routes/user.routes');
server.use("/api/user",userRoutes);


//OTP Routes
const otpRoutes = require('./routes/otp.routes');
server.use("/api/otp",otpRoutes);

//Product Routes
const productRoutes = require('./routes/product.routes');
server.use("/api/product",productRoutes);

//Cart Routes
const cartRoutes = require('./routes/cart.routes');
server.use("/api/cart",cartRoutes);


//order Routes
const orderRoutes= require('./routes/order.routes');
server.use("/api/order",orderRoutes);

//Review Routes
const reviewRoutes=require('./routes/review.routes');
server.use("/api/review",reviewRoutes)

//wishlist Routes
const wishlistRoutes=require('./routes/wishlist.routes')
server.use("/api/wishlist",wishlistRoutes)

server.listen(ports, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log(`Database connected..👍`))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${ports}`);
})