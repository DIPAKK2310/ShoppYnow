//requireing product-model from models & storing it in Product
const Product = require('../models/Product-model');

const Addproduct= async (req, res)=>{
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            imageUrl,
            sku,
            stock,
            category,
            tags,
            variants,
            weight,
            dimensions,
            ratings,
            reviews,
            } = req.body;


        const newProduct= new Product({
            name,
            description,
            price,
            discountPrice,
            imageUrl,
            sku,
            stock,
            category,
            tags,
            variants,
            weight,
            dimensions,
            ratings,
            reviews,
        });
        //Saveing the product using .save method
        await newProduct.save();
        res.status(201).json({
            message:'Product created succesfully!', product: newProduct});

        //error console.log and show the message error     
        } catch (error) {
            console.error(err)
            res.status(500).json({
                message:'Error creating product'
            })
        }
};



module.exports={Addproduct}