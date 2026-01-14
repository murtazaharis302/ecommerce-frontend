import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const { wishlist } = useContext(ShopContext);

    return (
        <div style={{ padding: "40px 20px", minHeight: "100vh", color: "white" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "50px" }}>
                    <h1 className="gradient-text" style={{ fontSize: "3rem", marginBottom: "10px" }}>My Wishlist</h1>
                    <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "1.1rem" }}>
                        Items you've saved for later. u know better than me! 😉
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="glass-card animate-scale" style={{
                        padding: "60px 20px",
                        textAlign: "center",
                        maxWidth: "600px",
                        margin: "0 auto",
                        borderRadius: "30px"
                    }}>
                        <div style={{ fontSize: "5rem", marginBottom: "20px" }}>Empty! 💨</div>
                        <h2 style={{ marginBottom: "15px" }}>Your wishlist is lonely</h2>
                        <p style={{ color: "rgba(255, 255, 255, 0.6)", marginBottom: "30px" }}>
                            Explore our latest collection and add your favorite items here.
                        </p>
                        <Link to="/">
                            <button className="gradient-bg" style={{
                                padding: "15px 40px",
                                color: "white",
                                borderRadius: "30px",
                                fontWeight: "700",
                                fontSize: "1rem"
                            }}>
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "30px",
                        animation: "fadeIn 0.8s ease"
                    }}>
                        {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
