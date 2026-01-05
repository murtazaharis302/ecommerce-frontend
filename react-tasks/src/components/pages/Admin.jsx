import { useState, useEffect } from "react";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../../utils/productStorage";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "fashion",
    rating: 4.5,
    image: "",
    description: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "rating" ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Please fill required fields (Name, Price)");
      return;
    }

    if (editingId) {
      updateProduct(editingId, formData);
      alert("✅ Product updated!");
    } else {
      addProduct(formData);
      alert("✅ Product added!");
    }

    setFormData({
      name: "",
      price: "",
      category: "fashion",
      rating: 4.5,
      image: "",
      description: ""
    });
    setShowForm(false);
    setEditingId(null);
    loadProducts();
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      rating: product.rating,
      image: product.image,
      description: product.description
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      alert("❌ Product deleted!");
      loadProducts();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      category: "fashion",
      rating: 4.5,
      image: "",
      description: ""
    });
  };

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#2c3e50" }}>Admin Panel - Product Management</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "12px 24px",
                backgroundColor: "#27ae60",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              + Add Product
            </button>
          )}
        </div>

        {showForm && (
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "30px"
          }}>
            <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", color: "#2c3e50", fontWeight: "600", marginBottom: "8px" }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Shoes"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #bdc3c7",
                      borderRadius: "4px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", color: "#2c3e50", fontWeight: "600", marginBottom: "8px" }}>
                    Price (Rs) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="3000"
                    step="100"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #bdc3c7",
                      borderRadius: "4px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", color: "#2c3e50", fontWeight: "600", marginBottom: "8px" }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #bdc3c7",
                      borderRadius: "4px",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="fashion">Fashion</option>
                    <option value="electronics">Electronics</option>
                    <option value="books">Books</option>
                    <option value="home">Home</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", color: "#2c3e50", fontWeight: "600", marginBottom: "8px" }}>
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="0.1"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #bdc3c7",
                      borderRadius: "4px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "#2c3e50", fontWeight: "600", marginBottom: "8px" }}>
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #bdc3c7",
                    borderRadius: "4px",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "#2c3e50", fontWeight: "600", marginBottom: "8px" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product description..."
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #bdc3c7",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#95a5a6",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>All Products ({products.length})</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {products.map(product => (
              <div key={product.id} style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                borderLeft: "4px solid #3498db"
              }}>
                <div style={{ marginBottom: "15px" }}>
                  {product.image && (
                    <img src={product.image} alt={product.name} style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "10px"
                    }} />
                  )}
                </div>
                <h3 style={{ color: "#2c3e50", margin: "0 0 8px 0" }}>{product.name}</h3>
                <p style={{ color: "#27ae60", fontWeight: "bold", margin: "8px 0" }}>Rs {product.price}</p>
                <p style={{ color: "#7f8c8d", fontSize: "14px", margin: "8px 0" }}>
                  Category: <strong>{product.category}</strong>
                </p>
                <p style={{ color: "#f39c12", margin: "8px 0" }}>⭐ {product.rating}</p>
                <p style={{ color: "#7f8c8d", fontSize: "13px", margin: "8px 0", height: "40px", overflow: "hidden" }}>
                  {product.description}
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#f39c12",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
