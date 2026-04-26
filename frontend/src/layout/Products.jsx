import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);  
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    quantity: 1,
  });
  const [error, setError] = useState(null);  // Store error messages

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product/products');
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products, please try again later.");
      }
    };
    fetchApi();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/product/products/${productId}`);
      if (response.status === 200) {
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
      } else {
        setError("Failed to delete the product.");
      }
    } catch (error) {
      setError("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      quantity: product.quantity || 1,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editedProduct.name || !editedProduct.price || !editedProduct.category) {
      setError("Please fill in all required fields!");
      return;
    }
    
    try {
      const response = await axios.put(`http://localhost:4000/api/product/products/${editingProduct}`, editedProduct);
      if (response.status === 200) {
        const updatedProducts = products.map((product) =>
          product._id === editingProduct ? { ...product, ...editedProduct } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        setEditedProduct({ name: "", description: "", price: "", category: "", imageUrl: "", quantity: 1 });
      } else {
        setError('Failed to update the product');
      }
    } catch (error) {
      setError('Error updating product. Please try again.');
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="container mt-5">
      <h2>Product Data</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <AddProduct onProductAdded={handleProductAdded} />

      {editingProduct && (
        <div className="mt-4">
          <h3>Edit Product</h3>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Electronics">Electronics</option>
                <option value="Beauty">Beauty</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image Url</label>
              <input
                type="url"
                className="form-control"
                name="imageUrl"
                value={editedProduct.imageUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={editedProduct.quantity}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
              Save
            </button>
          </form>
        </div>
      )}

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              {product.imageUrl && (
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '10rem', height: '8rem', objectFit: 'cover' }}
                  />
                </td>
              )}
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
