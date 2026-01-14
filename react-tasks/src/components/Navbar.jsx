import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { user, cart, wishlist, logout } = useContext(ShopContext);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "rgba(26, 26, 46, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease"
  };

  const logoStyle = {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  };

  const navLinksContainer = {
    display: "flex",
    gap: "35px",
    alignItems: "center"
  };

  const linkStyle = (isHovered) => ({
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    position: "relative",
    padding: "8px 0",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)"
  });

  const linkUnderlineStyle = (isActive) => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: isActive ? "100%" : "0%",
    height: "2px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    transition: "width 0.3s ease",
    borderRadius: "2px"
  });

  const cartButtonStyle = (isHovered) => ({
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    background: isHovered
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "10px 20px",
    borderRadius: "25px",
    transition: "all 0.3s ease",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: isHovered
      ? "0 8px 20px rgba(245, 87, 108, 0.4)"
      : "0 4px 15px rgba(102, 126, 234, 0.4)",
    transform: isHovered ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)"
  });

  const cartBadgeStyle = {
    background: "#ffffff",
    color: "#667eea",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    animation: cart.length > 0 ? "pulse 2s infinite" : "none"
  };

  const wishlistButtonStyle = (isHovered) => ({
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    background: isHovered
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      : "rgba(255, 255, 255, 0.05)",
    padding: "10px 20px",
    borderRadius: "25px",
    transition: "all 0.3s ease",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: isHovered
      ? "0 8px 20px rgba(245, 87, 108, 0.4)"
      : "0 4px 15px rgba(0, 0, 0, 0.2)",
    transform: isHovered ? "translateY(-2px) scale(1.05)" : "translateY(0) scale(1)"
  });

  const wishlistBadgeStyle = {
    background: "#f5576c",
    color: "#ffffff",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    animation: wishlist.length > 0 ? "pulse 2s infinite" : "none"
  };

  const userBadgeStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(102, 126, 234, 0.15)",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px"
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div
          style={logoStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          ✨ ShopHub
        </div>
      </Link>

      <div style={navLinksContainer} className="nav-links">
        <Link
          to="/"
          style={linkStyle(hoveredLink === 'home')}
          onMouseEnter={() => setHoveredLink('home')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Home
          <div style={linkUnderlineStyle(hoveredLink === 'home')} />
        </Link>

        <Link
          to="/cart"
          style={cartButtonStyle(hoveredLink === 'cart')}
          onMouseEnter={() => setHoveredLink('cart')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          🛒 Cart
          <span style={cartBadgeStyle}>{cart.length}</span>
        </Link>

        <Link
          to="/wishlist"
          style={wishlistButtonStyle(hoveredLink === 'wishlist')}
          onMouseEnter={() => setHoveredLink('wishlist')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          ❤️ Wishlist
          {wishlist.length > 0 && <span style={wishlistBadgeStyle}>{wishlist.length}</span>}
        </Link>


        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div style={userBadgeStyle} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(102, 126, 234, 0.25)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(102, 126, 234, 0.15)"}>
                <span style={{ fontSize: "18px" }}>👤</span>
                <span>{user.name}</span>
              </div>
            </Link>
            <button
              onClick={logout}
              style={{
                background: "rgba(255, 107, 107, 0.15)",
                color: "#ff6b6b",
                border: "1px solid rgba(255, 107, 107, 0.3)",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#ff6b6b";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 107, 107, 0.15)";
                e.target.style.color = "#ff6b6b";
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={linkStyle(hoveredLink === 'login')}
            onMouseEnter={() => setHoveredLink('login')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Login
            <div style={linkUnderlineStyle(hoveredLink === 'login')} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
