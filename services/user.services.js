const User = require('../model/user.model')

class UserServices{
    async User(body){
        return await User.findOne(body);
    }
    async Update(userId,body){
        return await User.findByIdAndUpdate(userId,{$set:body},{new:true});
    }
    async delete(userId,body){
        return await User.findByIdAndUpdate(userId,body,{new:true});
    }
}

module.exports = UserServices;