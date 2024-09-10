const Product = require("../model/product.model");

// Add New User
exports.addNewProduct = async (req, res) => {
    try {
        // console.log(req.body);
        const { title, description, category, price, discountPercentage, brand, size,color,material,stock,
              images,thumbnail, gender,occasion,season,availabilityStatus } = req.body;
        let product = await Product.findOne({brand,isDelete:false});
        if(product)
            return res.status(400).json({message:"Product already exists"});
        product = await Product.create({
            title, description, category, price, discountPercentage, brand, size,color,material,stock,
              images,thumbnail, gender,occasion,season,availabilityStatus
        });
        product.save();
        res.status(201).json({product,message:"Product Added"});
    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

// Get All Users
exports.getAllProduct = async(req,res) =>{
    try {
        let products = await Product.find();
        res.status(200).json(products);
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

// Get User by ID
exports.getProduct = async(req,res)=>{
    try{
        // let user = await User.findOne({_id:req.query.userId});
        let product = await Product.findById(req.query.productId);
        if(!product)
            return res.status(404).json({message:"Product not found"});
        res.status(200).json(product);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
};

// Update product
exports.updateProduct = async(req,res)=>{
    try {
        let product = await Product.findById(req.query.productId);
        // console.log(user);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        // user = await User.updateOne({_id:req.query.userId},{$set:req.body},{new:true}); 
        product = await Product.findByIdAndUpdate(req.query.productId,{$set:req.body},{new:true}); 
        product.save();
        res.status(200).json({product,message:"Product update success"});
} 
catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal Server Error"})
    }
}

// Delete product
exports.deleteProduct = async(req,res)=>{
    try{
        let product = await Product.findById(req.query.productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        // product = await Product.deleteOne({_id:product._id});
        product = await Product.findByIdAndDelete(product._id);
        // product = await Product.findOneAndDelete(product._id);
        res.status(200).json({product,message:"Product deleted successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}