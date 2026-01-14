import { useParams } from "react-router-dom";
import { useContext } from "react";
import products from "../../data/Products";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useContext(ShopContext);
  const product = products.find(p => p.id === Number(id));
  const isWishlisted = wishlist?.some(item => item.id === product?.id);

  if (!product) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h2 className="gradient-text">Product Not Found</h2>
    </div>
  );

  return (
    <div style={{ padding: "60px 20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }} className="detail-grid">
        <div className="glass-card animate-slide-left" style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "450px" }}>
          <img src={product.image} style={{ width: "90%", maxHeight: "400px", objectFit: "contain", borderRadius: "12px", transition: "transform 0.5s" }} alt={product.name} onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
        </div>

        <div className="animate-slide-right">
          <p style={{ color: "var(--primary)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", fontSize: "14px", marginBottom: "15px" }}>Premium Collection</p>
          <h1 style={{ marginBottom: "20px", fontSize: "3rem" }} className="gradient-text">{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
            <span style={{ fontSize: "28px", color: "var(--success)", fontWeight: "800" }}>Rs {product.price}</span>
            <div style={{ width: "2px", height: "20px", background: "rgba(255,255,255,0.1)" }}></div>
            <span style={{ color: "#ffd93d", fontSize: "18px", fontWeight: "600" }}>⭐ {product.rating}</span>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "18px", marginBottom: "40px", lineHeight: "1.8" }}>
            {product.description}
          </p>

          <div style={{ display: "flex", gap: "20px", marginBottom: "50px" }}>
            <button onClick={() => {
              try {
                addToCart(product);
                toast.success(`${product.name} added to cart!`);
              } catch (err) {
                console.error("Error adding to cart:", err);
              }
            }} className="gradient-bg" style={{
              flex: 1,
              padding: "18px",
              color: "#fff",
              borderRadius: "15px",
              fontSize: "18px",
              fontWeight: "700",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
              cursor: "pointer",
            }}>Add to Shopping Hub</button>

            <button onClick={() => {
              if (isWishlisted) {
                removeFromWishlist(product.id);
                toast.success('Removed from wishlist');
              } else {
                addToWishlist(product);
                toast.success('Added to wishlist!');
              }
            }} style={{
              width: "60px",
              background: isWishlisted ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" : "rgba(255, 255, 255, 0.05)",
              color: isWishlisted ? "white" : "#f5576c",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "15px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            }}>
              {isWishlisted ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="glass-card" style={{ padding: "30px" }}>
            <h3 style={{ color: "white", marginBottom: "20px", fontSize: "20px" }}>Real Customer Reviews</h3>
            <div style={{ display: "grid", gap: "20px" }}>
              {product.reviews && product.reviews.map((review, index) => (
                <div key={index} style={{
                  padding: "20px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "15px",
                  borderLeft: "4px solid var(--primary)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontWeight: "700", color: "#fff" }}>{review.user}</p>
                    <span style={{ color: "#ffd93d", fontWeight: "700" }}>⭐ {review.rating}.0</span>
                  </div>
                  <p style={{ margin: 0, color: "var(--text-secondary)", fontStyle: "italic", lineHeight: "1.5" }}>"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;

