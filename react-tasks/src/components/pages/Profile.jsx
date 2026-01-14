import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, setUser, token, cart, wishlist, removeFromCart, updateQuantity, removeFromWishlist } = useContext(ShopContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
    });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (activeTab === "orders" && token) {
            fetchOrders();
        }
    }, [activeTab, token]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/user/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const res = await axios.put("http://127.0.0.1:8000/api/user/profile", profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
            setProfileData(prev => ({ ...prev, password: "" }));
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile: " + (err.response?.data?.message || "Unknown error"));
        } finally {
            setIsUpdating(false);
        }
    };

    if (!user) {
        return (
            <div style={{ padding: "80px 20px", textAlign: "center", minHeight: "80vh" }}>
                <div className="glass-card animate-scale" style={{ maxWidth: "500px", margin: "0 auto", padding: "40px" }}>
                    <h2 className="gradient-text">Access Denied</h2>
                    <p style={{ color: "var(--text-secondary)", margin: "20px 0" }}>Please login to view your profile.</p>
                    <Link to="/login">
                        <button className="gradient-bg" style={{ padding: "12px 30px", color: "white", borderRadius: "25px" }}>Login Now</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: "40px 20px", minHeight: "100vh", color: "white" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <h1 className="gradient-text" style={{ textAlign: "center", marginBottom: "40px" }}>User Dashboard</h1>

                {/* Tabs */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
                    {["profile", "cart", "orders", "wishlist"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "12px 25px",
                                background: activeTab === tab ? "var(--primary-gradient)" : "rgba(255, 255, 255, 0.05)",
                                color: "white",
                                border: "none",
                                borderRadius: "25px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                fontWeight: "600",
                                textTransform: "capitalize",
                                boxShadow: activeTab === tab ? "0 4px 15px rgba(102, 126, 234, 0.3)" : "none"
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="glass-card animate-fadeIn" style={{ padding: "40px" }}>
                    {activeTab === "profile" && (
                        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                            <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Edit Profile</h2>
                            <form onSubmit={handleUpdateProfile} style={{ display: "grid", gap: "20px" }}>
                                <div>
                                    <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px" }}>Full Name</label>
                                    <input
                                        type="text"
                                        className="glass-input"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        style={{ width: "100%" }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px" }}>Email Address</label>
                                    <input
                                        type="email"
                                        className="glass-input"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        style={{ width: "100%" }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px" }}>New Password (optional)</label>
                                    <input
                                        type="password"
                                        className="glass-input"
                                        value={profileData.password}
                                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                        placeholder="Leave blank to keep current"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="gradient-bg"
                                    disabled={isUpdating}
                                    style={{
                                        marginTop: "10px",
                                        padding: "14px",
                                        color: "white",
                                        borderRadius: "15px",
                                        fontWeight: "700",
                                        cursor: isUpdating ? "not-allowed" : "pointer",
                                        opacity: isUpdating ? 0.7 : 1
                                    }}
                                >
                                    {isUpdating ? "Updating..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === "cart" && (
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>Your Cart Items</h2>
                            {cart.length === 0 ? (
                                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Your cart is currently empty.</p>
                            ) : (
                                <div style={{ display: "grid", gap: "15px" }}>
                                    {cart.map((item) => (
                                        <div key={item.id} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "15px 20px",
                                            background: "rgba(255, 255, 255, 0.05)",
                                            borderRadius: "15px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}>
                                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                                <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "contain", background: "white", borderRadius: "8px", padding: "4px" }} />
                                                <div>
                                                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                                                    <p style={{ margin: 0, color: "var(--success)" }}>Rs {item.price}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                                <div style={{ display: "flex", alignItems: "center", background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: "5px 10px", background: "transparent", color: "white" }}>-</button>
                                                    <span style={{ padding: "0 10px" }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: "5px 10px", background: "transparent", color: "white" }}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} style={{ background: "transparent", color: "#ff6b6b", cursor: "pointer", border: "none", fontSize: "18px" }}>🗑️</button>
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                                        <Link to="/cart">
                                            <button className="gradient-bg" style={{ padding: "10px 25px", color: "white", borderRadius: "20px" }}>Go to Full Cart</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>Purchase History</h2>
                            {loading ? (
                                <p style={{ textAlign: "center" }}>Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>No orders found.</p>
                            ) : (
                                <div style={{ display: "grid", gap: "25px" }}>
                                    {orders.map((order) => (
                                        <div key={order.id} style={{
                                            padding: "20px",
                                            background: "rgba(255, 255, 255, 0.05)",
                                            borderRadius: "20px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px" }}>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>Order ID: #{order.id}</p>
                                                    <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "12px" }}>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <p style={{ margin: 0, fontWeight: "700", color: "var(--success)" }}>Total: Rs {order.total}</p>
                                                    <span style={{ fontSize: "12px", background: "rgba(76, 175, 80, 0.2)", color: "#4CAF50", padding: "2px 8px", borderRadius: "10px", textTransform: "uppercase" }}>{order.status}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: "grid", gap: "10px" }}>
                                                {order.items.map((item) => (
                                                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px" }}>
                                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                            {item.product?.image && <img src={item.product.image} style={{ width: "30px", height: "30px", objectFit: "contain", background: "white", borderRadius: "4px" }} />}
                                                            <span>{item.product?.name || "Product"} x {item.quantity}</span>
                                                        </div>
                                                        <span>Rs {item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "wishlist" && (
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>Your Wishlist</h2>
                            {wishlist.length === 0 ? (
                                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Your wishlist is empty.</p>
                            ) : (
                                <div style={{ display: "grid", gap: "15px" }}>
                                    {wishlist.map((item) => (
                                        <div key={item.id} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "15px 20px",
                                            background: "rgba(255, 255, 255, 0.05)",
                                            borderRadius: "15px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}>
                                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                                <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "contain", background: "white", borderRadius: "8px", padding: "4px" }} />
                                                <div>
                                                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                                                    <p style={{ margin: 0, color: "var(--success)" }}>Rs {item.price}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <Link to={`/product/${item.id}`}>
                                                    <button style={{ padding: "8px 15px", background: "rgba(255, 255, 255, 0.1)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>View</button>
                                                </Link>
                                                <button onClick={() => removeFromWishlist(item.id)} style={{ background: "transparent", color: "#ff6b6b", cursor: "pointer", border: "none", fontSize: "18px" }}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                                        <Link to="/wishlist">
                                            <button className="gradient-bg" style={{ padding: "10px 25px", color: "white", borderRadius: "20px" }}>Go to Wishlist Page</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Profile;
