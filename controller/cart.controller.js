const Cart = require('../model/cart.model');

exports.addtoCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id, productId: req.body.productId, isDeleted: false });
        if (cart) {
            let IncreaseQuantity = cart.quantity + 1
            await Cart.findByIdAndUpdate(cart._id, { $set: { quantity: IncreaseQuantity } }, { new: true })
            res.status(200).json({ message: 'product Added To Cart susses', IncreaseBy: IncreaseQuantity });
        } else {
            cart = await Cart.create({ ...req.body, userId: req.user._id });;
            res.status(201).json({ message: 'Product Added To cart SussesFully....', cart });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
