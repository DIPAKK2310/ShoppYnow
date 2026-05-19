import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function AddProduct({ onProductAdded }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Name, price and category are required!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API}/api/products`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success('Product added successfully!');
        onProductAdded(response.data.product);
        setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '', quantity: 1 });
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error adding product.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  };

  const labelStyle = {
    color: '#aaa',
    fontSize: '13px',
    display: 'block',
    marginBottom: '6px',
    fontWeight: 500,
  };

  return (
    <div>
      <h3 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '1.5rem' }}>
        ➕ Add New Product
      </h3>
      <form onSubmit={handleAddProduct}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

          <div>
            <label style={labelStyle}>Product Name *</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="e.g. Running Shoes"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="e.g. 999"
              min="0"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Category *</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              style={{ ...inputStyle, background: '#1e1e1e' }}
              required
            >
              <option value="">Select category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              min="1"
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Short product description"
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Preview */}
        {newProduct.imageUrl && (
          <div style={{ marginTop: '1rem' }}>
            <label style={labelStyle}>Image Preview</label>
            <img
              src={newProduct.imageUrl}
              alt="preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '1.5rem',
            background: loading ? 'rgba(245,158,11,0.4)' : 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: '#111',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 32px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Adding...' : '✓ Add Product'}
        </button>
      </form>
    </div>
  );
}
