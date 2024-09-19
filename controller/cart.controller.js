const Cart = require("../model/cart.model");
const cartServices= require('../services/cart.services');
const CartServices = new cartServices();

exports.addToCart = async (req ,res) =>{
    try {
        let userId = req.user._id;
        let cart = await CartServices.getOneCart({user : userId, productId : req.body.productId,isDelete : false});
        if(cart){
            return res.json({message : "Already Exists..."})
        }
        cart = await CartServices.createCart({user : userId , ...req.body});
        res.status(201).json({message : "Cart Added Success", cart})
        // console.log(cart);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
};

exports.updateToCart = async (req, res) => {
    try {
        let cart = await CartServices.updateCart({ _id: req.query.cartId }, { $inc: { quantity: +req.query.quantity } }, { new: true });
        console.log(cart);
        if (!cart) return res.status(404).json({ message: 'cart not found...' });
        res.status(200).json({ message: 'cart updated...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await CartServices.updateCart({ _id: req.body.cartId }, { $set: { isDelete: true } }, { new: true });
        console.log(cart ,"cart");
        if (!cart) return res.status(404).json({ message: 'cart not found...' });
        res.status(200).json({ message: 'cart deleted...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }
};




exports.getAllCarts = async (req, res) => {
    try {
        // console.log(req.body.product);
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const carts = await CartServices.getAllCart({ user: req.user.id, isDelete: false });
        console.log(carts);
        
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};



