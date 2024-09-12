const Order = require('../model/order.model');
const Cart = require('../model/cart.model');

exports.addNewOrder = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "User not authenticated or missing ID." });
        }

        console.log("user==>", req.user);

        // Fetch carts for the user
        let carts = await Cart.find({
            userId: req.user._id,
            isDelete: false,
        }).populate("productId");

        console.log("cart====>", carts);

        // If cart is empty
        if (carts.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Create order items from cart
        let orderItems = carts.map((item) => {
            if (!item.productId || !item.productId._id) {
                throw new Error('Cart item missing productId or productId._id');
            }
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
                totalAmount: item.quantity * item.productId.price
            };
        });

        // Calculate total price for all items
        let amount = orderItems.reduce(
            (total, item) => (total += item.totalAmount), 0
        );

        // Create a new order
        let order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            totalPrice: amount
        });
        console.log("order", order);

        // Mark cart items as deleted
        await Cart.updateMany(
            {
                userId: req.user._id,
                isDelete: false,
            },
            {
                isDelete: true
            }
        );

        res.json({ message: "Order Placed", order });
    } catch (error) {
        console.log("Error placing order:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};


