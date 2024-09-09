const Product = require("../model/product.model");


// Add New Product
exports.addNewProduct = async (req, res) => {
    try {
        // console.log(req.body);
        const { title, description, category, price, discountPercentage, brand, 
            sku, weight, rating, stock, tags, dimensions, reviews, returnPolicy, 
            minimumOrderQuantity, meta, images, thumbnail, warrantyInformation, 
            shippingInformation, availabilityStatus } = req.body;
        let product = await Product.findOne({sku,isDeleted:false});
        if(product)
            return res.status(400).json({message:"Product already exists"});
        product = await Product.create({
            title,
            description,
            category,
            price,
            discountPercentage,
            brand,
            sku,
            weight,
            rating,
            stock,
            tags,
            dimensions, // Make sure this is an object with width, height, and depth
            reviews, 
            images,
            thumbnail,
            warrantyInformation,
            shippingInformation,
            availabilityStatus,
            meta: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                barcode: "your-barcode-here",
                qrCode: "your-qrCode-here"
            }

        });
        product.save();
        res.status(201).json({product,message:"Product Added"});
    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

//Get All Product
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

//Update Product
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