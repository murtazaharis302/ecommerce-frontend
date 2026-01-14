import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, setToken, user, logout } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && !formData.name) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    const url = isSignup ? "http://127.0.0.1:8000/api/register" : "http://127.0.0.1:8000/api/login";

    axios.post(url, formData)
      .then(res => {
        if (!isSignup) {
          setToken(res.data.token);
          setUser(res.data.user); // Use the user object from backend
          toast.success("Login successful!");
          navigate("/"); // Redirect to home page
        } else {
          toast.success("Registration successful! Please login.");
          setIsSignup(false);
        }
        setFormData({ email: "", password: "", name: "" });
      })
      .catch(err => {
        toast.error(`${isSignup ? "Signup" : "Login"} failed: ` + (err.response?.data?.message || "Unknown error"));
      });
  };

  if (user) {
    return (
      <div style={{ padding: "40px 20px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-card animate-scale" style={{ padding: "60px 40px", textAlign: "center", maxWidth: "450px", width: "100%" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>👤</div>
          <h2 style={{ marginBottom: "20px" }} className="gradient-text">Welcome Back!</h2>
          <p style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>{user.name}</p>
          <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>{user.email}</p>
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "16px",
              background: "rgba(255, 107, 107, 0.15)",
              color: "#ff6b6b",
              border: "1px solid rgba(255, 107, 107, 0.3)",
              borderRadius: "15px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
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
            Logout session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-card animate-scale" style={{ padding: "50px 40px", maxWidth: "450px", width: "100%" }}>
        <h2 style={{ marginBottom: "40px", textAlign: "center" }} className="gradient-text">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "25px" }}>
          {isSignup && (
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "10px", fontWeight: "500" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="glass-input" style={{ width: "100%", paddingLeft: "15px" }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "10px", fontWeight: "500" }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="glass-input" style={{ width: "100%" }} />
          </div>

          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "10px", fontWeight: "500" }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="glass-input" style={{ width: "100%" }} />
          </div>

          <button type="submit" className="gradient-bg" style={{ width: "100%", padding: "16px", color: "white", borderRadius: "15px", fontSize: "16px", fontWeight: "700", marginTop: "10px", boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)" }}>
            {isSignup ? "Create Free Account" : "Login to Hub"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setFormData({ email: "", password: "", name: "" });
              }}
              style={{
                marginLeft: "8px",
                background: "transparent",
                color: "var(--primary)",
                cursor: "pointer",
                fontWeight: "700",
                textDecoration: "none",
                fontSize: "14px"
              }}
            >
              {isSignup ? "Sign In" : "Sign up now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
