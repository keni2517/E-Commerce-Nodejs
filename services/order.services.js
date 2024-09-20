const Order = require('../model/order.model');

class OrderServices {
    async getAllOrders(query) {
        return await Order.find(query);
    }

    async createOrder(userId, items, totalPrice) {
        return await Order.create({
            userId: userId,
            items: items,
            totalPrice: totalPrice,
        });
    }

    async updateOrder(orderId, updateData) {
        return await Order.updateOne({ _id: orderId }, { $set: updateData }, { new: true });
    }

    async deleteOrder(orderId) {
        return await Order.updateOne({ _id: orderId }, { $set: { isDelete: true } }, { new: true });
    }
}

module.exports = OrderServices;