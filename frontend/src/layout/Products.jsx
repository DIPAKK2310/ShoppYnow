import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import { toast } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/products`);
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API}/api/products/${productId}`, {
        headers: getAuthHeaders(),
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Product deleted!");
    } catch (error) {
      toast.error("Error deleting product.");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editedProduct.name || !editedProduct.price || !editedProduct.category) {
      toast.error("Please fill in all required fields!");
      return;
    }
    try {
      const response = await axios.put(
        `${API}/api/products/${editingProduct}`,
        editedProduct,
        { headers: getAuthHeaders() }
      );
      if (response.status === 200) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct ? { ...p, ...editedProduct } : p))
        );
        setEditingProduct(null);
        setEditedProduct({ name: "", description: "", price: "", category: "", imageUrl: "", quantity: 1 });
        toast.success("Product updated!");
      }
    } catch (error) {
      toast.error("Error updating product.");
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowAddForm(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111111",
        color: "#f1f1f1",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h2 style={{ color: "#f59e0b", fontWeight: 700, margin: 0 }}>
            🛍️ Product Management
          </h2>
          <p style={{ color: "#888", margin: "4px 0 0" }}>
            {products.length} products in store
          </p>
        </div>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          style={{
            background: showAddForm
              ? "rgba(239,68,68,0.15)"
              : "linear-gradient(135deg, #f59e0b, #f97316)",
            color: showAddForm ? "#ef4444" : "#111",
            border: showAddForm ? "1px solid #ef4444" : "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {showAddForm ? "✕ Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <AddProduct onProductAdded={handleProductAdded} />
        </div>
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(249,115,22,0.4)",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h3 style={{ color: "#f97316", marginBottom: "1.5rem" }}>✏️ Edit Product</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "Name *", name: "name", type: "text" },
              { label: "Price *", name: "price", type: "number" },
              { label: "Description", name: "description", type: "text" },
              { label: "Image URL", name: "imageUrl", type: "url" },
              { label: "Quantity", name: "quantity", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <label style={{ color: "#aaa", fontSize: "13px", display: "block", marginBottom: "4px" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={editedProduct[field.name]}
                  onChange={handleInputChange}
                  min={field.type === "number" ? "1" : undefined}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
            ))}
            <div>
              <label style={{ color: "#aaa", fontSize: "13px", display: "block", marginBottom: "4px" }}>
                Category *
              </label>
              <select
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  background: "#1e1e1e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#fff",
                  outline: "none",
                }}
              >
                <option value="">Select category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Electronics">Electronics</option>
                <option value="Beauty">Beauty</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              onClick={handleSaveEdit}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                color: "#111",
                border: "none",
                borderRadius: "8px",
                padding: "10px 28px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              💾 Save Changes
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "#aaa",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#888" }}>
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "#888",
            border: "2px dashed rgba(255,255,255,0.1)",
            borderRadius: "16px",
          }}
        >
          No products yet. Click "+ Add Product" to get started.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "rgba(245,158,11,0.1)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}>
                {["#", "Image", "Name", "Category", "Price", "Qty", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      color: "#f59e0b",
                      fontWeight: 600,
                      fontSize: "13px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 16px", color: "#666", fontSize: "13px" }}>{index + 1}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px" }}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#555",
                          fontSize: "20px",
                        }}
                      >
                        📦
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, color: "#f1f1f1" }}>{product.name}</div>
                    <div style={{ color: "#666", fontSize: "12px", marginTop: "2px" }}>
                      {product.description?.slice(0, 40)}{product.description?.length > 40 ? "…" : ""}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: "rgba(245,158,11,0.15)",
                        color: "#f59e0b",
                        border: "1px solid rgba(245,158,11,0.3)",
                        borderRadius: "20px",
                        padding: "3px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#4ade80", fontWeight: 700 }}>
                    ₹{product.price}
                  </td>
                  <td style={{ padding: "14px 16px", color: "#aaa" }}>{product.quantity ?? "—"}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEdit(product)}
                        style={{
                          background: "rgba(245,158,11,0.15)",
                          color: "#f59e0b",
                          border: "1px solid rgba(245,158,11,0.3)",
                          borderRadius: "6px",
                          padding: "6px 14px",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        style={{
                          background: "rgba(239,68,68,0.15)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.3)",
                          borderRadius: "6px",
                          padding: "6px 14px",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
