// product add   /// connect with database

const Product = require("../model/product.model");

exports.addNewProduct = async (req,res) =>{
  try{
    // console.log(req.body);
    const {productName , price , discription , rating , othersProducts ,image} = req.body;
    let product = await Product.findOne({productName :productName});
    if(product)
      return res.status(400).json({message : "Product Already Exist.."});
    product = await Product.create({
      productName ,  price , discription , rating , othersProducts ,image
    });
    res.status(201).json({product , message : "Product added"})
  }catch(error){
    console.log(error);
    res.status(500).json({message : "Internal Server Error"})
    
  }
};

// Get All Product
exports.getAllProduct = async (req ,res) =>{
  try{
    let product = await Product.find();
    res.status(200).json(product);
  }catch(error){
    console.log(error);
    res.status(500).json({message : "Internal Server Error"})
  }
};

// Get Single Product
exports.getProduct = async (req ,res) =>{
  try{
    // let product = await Product.findOne({_id :req.query.userId});
    let product = await Product.findById(req.query.userId); 
    if(!product)
      return res.status(404).json({message : "Product Not Found"});
    res.status(200).json(product)
  }catch (error){
    console.log(error);
    res.status(500).json({message : "Internal Server Error"})
  }
};

// Update Product
exports.updateProduct = async (req ,res) =>{
  try{
    let product = await Product.findById(req.query.productId);
    if(!product){
      return res.status(404).json({message : "Product Not Found...."})
    }
    // product = await Product.updateOne({_id:req.query.prodcutId} , {$set :req.body} , {new : true})
    product = await Product.findByIdAndUpdate(req.query.productId, {$set :req.body} , {new : true});
    product.save();
    res.status(202).json({product , message : "Product Update Success"});
  }catch(error){
    console.log(error);
    res.status(500).json({message : "Internal Server Error"})
    
  }
}

// Delete Product
exports.deleteProduct = async (req ,res) =>{
  try{
    let product = await Product.findById(req.query.productId);
    if(!product){
      return res.status(404).json({message : "Product Not Found...."})
    }
    // product = await Product.deleteOne({_id : product._id});
    product = await Product.findByIdAndDelete(product._id);
    res.status(200).json({product  , message : "Product Delete Success"})
  }catch(error){
    console.log(error);
    res.status(500).json({message : "Internal Server Error"});
  }
}


