const express = require('express');
const Product = require('../models/Product-model');
const authenticateAdmin = require('../middleware/Admin-middleware');
const{validateProduct} = require('../validators/validateProduct');
// const { Addproduct } = require('../controller/Product-controller'); // Not used here

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// @route   POST /api/products
// @desc    Add new product
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;

    const errors = validateProduct(name, description, price);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newProduct = new Product({ name, description, price, imageUrl, category });
    await newProduct.save();
    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// @route   DELETE /api/products/:productId
// @desc    Delete product by ID
router.delete('/:productId',  authenticateAdmin,async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// @route   PUT /api/products/:productId
// @desc    Update product by ID
router.put('/:productId', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const errors = validateProduct(name, description, price);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { name, description, price, category, imageUrl },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated', updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

module.exports = router;
