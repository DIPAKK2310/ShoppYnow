const express = require('express')
const Product = require('../models/Product-model')
const authenticateAdmin = require('../middleware/Admin-middleware')
const { Addproduct} = require('../controller/Product-controller')


const router = express.Router()



// Get all products
router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: 'Error fetching products' });
    }
});


// delete product by id
router.delete('/products/:productId', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error("Error during product deletion:", err);
      res.status(500).json({ message: 'Error deleting product' });
    }
  });
 
    // Edit product by id
    router.put('/products/:productId', async (req, res) => {
      try {
        const { name, description, price,category,imageUrl } = req.body; // Extract updated fields from request body
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.productId,
          { name, description, price,category,imageUrl },
          { new: true } // Return the updated product
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json({ message: 'Product updated', updatedProduct });
      } catch (err) {
        res.status(500).json({ message: 'Error updating product' });
      }
    });

      // Add a new product/ create a product
  router.post('/addproducts', async (req, res) => {
    try {
      const { name, description, price,imageUrl,category, } = req.body;
      const newProduct = new Product({
        name,
        description,
        price,
        imageUrl,
        category,
        
      });
  
      await newProduct.save();
      res.status(201).json({ message: 'Product added', product: newProduct });
    } catch (err) {
      res.status(500).json({ message: 'Error adding product' });
    }
  });



  module.exports=router
