import { getProducts } from "../../utils/productStorage";
import ProductCard from "../ProductCard";
import { useState, useEffect } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
    // Listen for changes
    const interval = setInterval(loadProducts, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerStyle = {
    padding: "20px 20px 40px",
    minHeight: "100vh",
    position: "relative"
  };

  const innerContainerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    animation: "fadeIn 0.6s ease"
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "800",
    marginBottom: "12px",
    background: "linear-gradient(135deg, #ffffff 0%, #667eea 50%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-1px",
    textShadow: "0 0 40px rgba(102, 126, 234, 0.3)"
  };

  const subtitleStyle = {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "16px",
    marginBottom: "30px",
    fontWeight: "400"
  };

  const searchContainerStyle = {
    position: "relative",
    marginBottom: "25px",
    maxWidth: "700px",
    margin: "0 auto 25px"
  };

  const searchIconStyle = {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.6)",
    pointerEvents: "none",
    zIndex: 1
  };

  const searchInputStyle = {
    width: "100%",
    padding: "14px 20px 14px 50px",
    fontSize: "15px",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "2px solid rgba(102, 126, 234, 0.3)",
    borderRadius: "30px",
    color: "#ffffff",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
  };

  const categoriesContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
    animation: "slideInLeft 0.6s ease"
  };

  const categoryButtonStyle = (isSelected) => ({
    padding: "10px 24px",
    background: isSelected
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    border: isSelected
      ? "2px solid transparent"
      : "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    textTransform: "capitalize",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: isSelected
      ? "0 8px 20px rgba(102, 126, 234, 0.4)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: isSelected ? "translateY(-2px)" : "translateY(0)"
  });

  const productsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    animation: "scaleIn 0.6s ease"
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "60px 20px",
    animation: "fadeIn 0.6s ease"
  };

  const emptyIconStyle = {
    fontSize: "60px",
    marginBottom: "16px",
    opacity: 0.3
  };

  const emptyTextStyle = {
    fontSize: "20px",
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600"
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h1 style={titleStyle}>Discover Amazing Products</h1>
        <p style={subtitleStyle}>Explore our curated collection of premium items</p>

        <div style={searchContainerStyle}>
          <div style={searchIconStyle}>🔍</div>
          <input
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={searchInputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(102, 126, 234, 0.6)";
              e.target.style.background = "rgba(255, 255, 255, 0.12)";
              e.target.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(102, 126, 234, 0.3)";
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }}
          />
        </div>

        <div style={categoriesContainerStyle}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={categoryButtonStyle(selectedCategory === cat)}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {cat === "all" ? "🌟 All Products" : cat}
            </button>
          ))}
        </div>

        <div style={productsGridStyle}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>🔍</div>
            <p style={emptyTextStyle}>No products found</p>
            <p style={{ color: "rgba(255, 255, 255, 0.4)", marginTop: "10px" }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;



