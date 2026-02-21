const ProductModel = require("../models/product.model")

const addProduct=async(req, res)=>{
    const {productName, productPrice, productQuantity}= req.body
    try {


        const product = await ProductModel.create({productName, productPrice, productQuantity, createdBy:req.user.id})

        

        res.status(201).send({
            message:"product created successfully",
            data:product
        })
    } catch (error) {
        res.status(400).send({
            message:"product creation failed"
        })
    }
}


const fetchProducts=async(req, res)=>{
    try {
        const products = await ProductModel.find().populate("createdBy", "email firstname")

        res.status(200).send({
            message:"products fetched successfully",
            data:products
        })
    } catch (error) {
        console.log(error);
        
        res.status(404).send({
            message:"products not found"
        })
    }
}


module.exports={
    addProduct,
    fetchProducts
}