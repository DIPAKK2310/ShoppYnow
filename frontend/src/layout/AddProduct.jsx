import React, { useState } from 'react';
import axios from 'axios';

export default function AddProduct({ onProductAdded }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category:'',
   imageUrl:'',
   quantity:1,
  });

  // Handle input change for new product
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/products', newProduct);
      if (response.data.message === 'Product added') {
        onProductAdded(response.data.product); // Call the parent function to update the list
        setNewProduct({ name: '', description: '', price: '',category:'',imageUrl:'',quantity:1 }); // Clear the form
        console.log('Product added successfully');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add New Product</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name || ""}
            onChange={handleNewProductChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newProduct.description || ""}
            onChange={handleNewProductChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price || ""}
            onChange={handleNewProductChange}
            className="form-control"
          />
        </div>
         <div className="mb-3">
          <label htmlFor="url" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={newProduct.category || ""}
            onChange={handleNewProductChange}
            className="form-control"
          />
        </div>
         <div className="mb-3">
          <label htmlFor="url" className="form-label">
         Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newProduct.quantity || ""}
            onChange={handleNewProductChange}
            className="form-control"
          />
        </div>
         <div className="mb-3">
          <label htmlFor="url" className="form-label">
          Image Url
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={newProduct.imageUrl || ""}
            onChange={handleNewProductChange}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
}
