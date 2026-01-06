import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(ShopContext);

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const containerStyle = {
    padding: "40px 20px",
    minHeight: "100vh",
    color: "var(--text-primary)"
  };

  const innerContainerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    animation: "fadeIn 0.6s ease"
  };

  const cartItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    marginBottom: "16px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease"
  };

  const totalSectionStyle = {
    padding: "30px",
    background: "rgba(102, 126, 234, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(102, 126, 234, 0.2)",
    marginTop: "30px",
    textAlign: "right",
    animation: "slideInRight 0.6s ease"
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }} className="gradient-text">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="glass-card" style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "60px", marginBottom: "20px", opacity: 0.5 }}>🛒</div>
            <h2 style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>Your cart is empty</h2>
            <Link to="/">
              <button style={{
                padding: "12px 30px",
                background: "var(--primary-gradient)",
                color: "white",
                borderRadius: "25px"
              }}>
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gap: "15px" }}>
              {cart.map((item, index) => (
                <div key={index} style={cartItemStyle} className="cart-item" onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}>
                  <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "white",
                      padding: "5px"
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div>
                      <h3 style={{ margin: "0 0 5px 0", color: "#ffffff", fontSize: "1.2rem" }}>{item.name}</h3>
                      <p style={{ margin: 0, fontSize: "18px", color: "var(--success)", fontWeight: "700" }}>Rs {item.price}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }} className="cart-item-actions">
                    <div style={{ display: "flex", alignItems: "center", background: "rgba(255, 255, 255, 0.1)", borderRadius: "12px", padding: "4px" }}>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        style={{ padding: "8px 12px", background: "transparent", color: "white", fontSize: "18px" }}
                      >−</button>
                      <span style={{ padding: "0 15px", minWidth: "40px", textAlign: "center", fontWeight: "700", fontSize: "16px" }}>
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        style={{ padding: "8px 12px", background: "transparent", color: "white", fontSize: "18px" }}
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: "12px",
                        background: "rgba(255, 107, 107, 0.2)",
                        color: "#ff6b6b",
                        border: "1px solid rgba(255, 107, 107, 0.3)",
                        borderRadius: "12px",
                        fontWeight: "600",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#ff6b6b";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "rgba(255, 107, 107, 0.2)";
                        e.target.style.color = "#ff6b6b";
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={totalSectionStyle}>
              <h2 style={{ color: "white", marginBottom: "20px", fontSize: "2rem" }}>
                Total: <span style={{ color: "var(--success)" }}>Rs {total}</span>
              </h2>
              <Link to="/checkout">
                <button style={{
                  padding: "16px 40px",
                  background: "var(--primary-gradient)",
                  color: "#fff",
                  borderRadius: "30px",
                  fontSize: "18px",
                  fontWeight: "700",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                  transform: "translateY(0)",
                  transition: "all 0.3s"
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 12px 30px rgba(102, 126, 234, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
                  }}
                >
                  Proceed to Checkout →
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

