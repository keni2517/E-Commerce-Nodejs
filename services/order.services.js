const Order = require('../model/order.model');

class OrderServices {
    async getOneOrder (body) {
        return await Cart.findOne(body);
    }
    async getAllOrder (body) {
        return await Cart.find(body);
    }
    async createOrder (body) {
        return await Cart.create(body);
    };

    async updateOrder (id,updateBody) {
        return await Cart.findByIdAndUpdate(id,{$set : updateBody } , {new : true})
    };
};


module.exports = OrderServices;