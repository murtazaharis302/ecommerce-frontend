import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useContext(ShopContext);
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: isHovered
      ? "0 20px 40px rgba(0, 0, 0, 0.3)"
      : "0 8px 32px rgba(0, 0, 0, 0.2)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    transform: isHovered ? "translateY(-10px)" : "translateY(0)",
    animation: "scaleIn 0.4s ease"
  };

  const imageContainerStyle = {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "16px",
    height: "240px"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
    transform: isHovered ? "scale(1.1)" : "scale(1)"
  };

  const imageOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isHovered
      ? "linear-gradient(180deg, transparent 0%, rgba(102, 126, 234, 0.3) 100%)"
      : "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
    transition: "background 0.3s ease"
  };

  const wishlistButtonStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: isWishlisted
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      : "rgba(255, 255, 255, 0.9)",
    color: isWishlisted ? "#ffffff" : "#f5576c",
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    zIndex: 2,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)"
  };

  const titleStyle = {
    marginTop: "12px",
    marginBottom: "8px",
    fontSize: "20px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff 0%, #b8b8d1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: "1.3"
  };

  const priceStyle = {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: "24px",
    fontWeight: "800",
    margin: "12px 0"
  };

  const ratingContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "16px"
  };

  const ratingStyle = {
    color: "#ffd93d",
    fontSize: "16px",
    fontWeight: "600"
  };

  const addToCartButtonStyle = {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "all 0.3s ease",
    marginBottom: "12px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    position: "relative",
    overflow: "hidden"
  };

  const viewDetailsLinkStyle = {
    display: "block",
    textAlign: "center",
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    padding: "8px"
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={imageContainerStyle}>
        <img src={product.image} alt={product.name} style={imageStyle} />
        <div style={imageOverlayStyle} />

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product);
            alert(isWishlisted ? '💔 Removed from wishlist' : '❤️ Added to wishlist!');
          }}
          className="icon-btn"
          style={wishlistButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15) rotate(10deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          }}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <h3 style={titleStyle}>{product.name}</h3>

      <div style={ratingContainerStyle}>
        <span style={ratingStyle}>⭐ {product.rating}</span>
        <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "14px" }}>
          ({(product.id * 157) % 450 + 50}+ reviews)
        </span>
      </div>

      <p style={priceStyle}>Rs {product.price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log('Adding to cart:', product);
          addToCart(product);
          alert(`✅ ${product.name} added to cart!`);
        }}
        style={addToCartButtonStyle}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 25px rgba(245, 87, 108, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
        }}
      >
        🛒 Add to Cart
      </button>

      <Link
        to={`/product/${product.id}`}
        style={viewDetailsLinkStyle}
        onMouseEnter={(e) => {
          e.target.style.color = "#764ba2";
          e.target.style.transform = "translateX(5px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#667eea";
          e.target.style.transform = "translateX(0)";
        }}
      >
        View Details →
      </Link>
    </div>
  );
};

export default ProductCard;




