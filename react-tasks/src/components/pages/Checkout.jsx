import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

// Initialize Stripe with the public key provided
const stripePromise = loadStripe("pk_test_51SojNoI9MFBlAa94XVt5ZTdCERTjoEsQKDjo4qT3sgxMwxFsJH9ipFna4jgvfDeOopdepsXxxGY3T0DG8ZDBm1bm00hIcSzG7I");

const CheckoutForm = ({ cart, setCart, user, token, total, setOrderPlaced, formData, setFormData, handleChange, setFinalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill all required delivery fields");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create Payment Intent on Backend
      const response = await axios.post("http://127.0.0.1:8000/api/checkout", {
        items: cart,
        delivery: formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { clientSecret } = response.data;

      // 2. Confirm Payment with Stripe
      const cardNumberElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
            }
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // 3. Notify Backend of Success
          await axios.post("http://127.0.0.1:8000/api/payment-success", {
            items: cart,
            total: total
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          setOrderPlaced(true);
          setFinalAmount(total); // Save total before clearing cart
          setCart([]); // Clear cart after successful checkout
        }
      }
    } catch (err) {
      setError("Checkout failed: " + (err.response?.data?.message || err.message || "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card animate-slide-left" style={{ padding: "40px" }}>
      <h3 style={{ color: "white", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span>📍</span> Delivery Information
      </h3>

      <div style={{ display: "grid", gap: "20px" }}>
        <div>
          <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Full Name *</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="glass-input" style={{ width: "100%" }} required />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="glass-input" style={{ width: "100%" }} required />
          </div>
          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Phone *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="glass-input" style={{ width: "100%" }} required />
          </div>
        </div>

        <div>
          <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Address *</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="glass-input" style={{ width: "100%" }} required />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="glass-input" style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="glass-input" style={{ width: "100%" }} />
          </div>
        </div>

        <h3 style={{ color: "white", marginBottom: "10px", marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span>💳</span> Secure Payment
        </h3>

        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Card Number</label>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <CardNumberElement options={elementOptions} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>Expiry Date</label>
              <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <CardExpiryElement options={elementOptions} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "8px", fontSize: "14px" }}>CVC (MVC)</label>
              <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <CardCvcElement options={elementOptions} />
              </div>
            </div>
          </div>
        </div>

        {error && <div style={{ color: "#fa755a", fontSize: "14px", marginTop: "5px" }}>{error}</div>}

        <button
          type="submit"
          className="gradient-bg"
          disabled={loading || !stripe}
          style={{
            width: "100%",
            padding: "16px",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "700",
            marginTop: "20px",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Processing..." : `Complete Purchase (Rs ${total})`}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { cart, setCart, user, token } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!token) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2 className="gradient-text">Please login to checkout</h2>
        <button onClick={() => window.location.href = "/login"} className="gradient-bg" style={{ padding: "12px 30px", borderRadius: "25px", color: "white", marginTop: "20px" }}>Go to Login</button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ padding: "40px 20px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-card animate-scale" style={{ padding: "60px 40px", textAlign: "center", maxWidth: "500px" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "40px" }} className="gradient-text">🎉 Order Placed!</h2>
          <p style={{ color: "var(--text-primary)", fontSize: "18px", marginBottom: "15px" }}>
            Thank you for your purchase, <strong>{formData.fullName}</strong>!
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "25px" }}>
            Order confirmation sent to {formData.email}
          </p>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
            <p style={{ fontSize: "20px", fontWeight: "800", color: "var(--success)" }}>Total Amount: Rs {finalAmount}</p>
          </div>
          <button
            onClick={() => window.location.href = "/"}
            className="gradient-bg"
            style={{ padding: "14px 40px", color: "#fff", borderRadius: "30px", fontSize: "16px", fontWeight: "600" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "40px" }} className="gradient-text">Checkout</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px" }} className="checkout-grid">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              cart={cart}
              setCart={setCart}
              user={user}
              token={token}
              total={total}
              setOrderPlaced={setOrderPlaced}
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              setFinalAmount={setFinalAmount}
            />
          </Elements>

          <div className="animate-slide-right">
            <div className="glass-card" style={{ padding: "30px", position: "sticky", top: "100px" }}>
              <h3 style={{ color: "white", marginBottom: "25px" }}>Order Summary</h3>

              <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "20px", paddingRight: "10px" }}>
                {cart.map((item, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <p style={{ margin: "0 0 5px 0", fontWeight: "600", color: "white" }}>{item.name} <span style={{ color: "var(--text-muted)" }}>× {item.quantity || 1}</span></p>
                      <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "13px" }}>Rs {item.price}</p>
                    </div>
                    <p style={{ margin: 0, fontWeight: "600", color: "var(--success)" }}>Rs {item.price * (item.quantity || 1)}</p>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: "20px", borderTop: "2px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>Subtotal</p>
                  <p style={{ margin: 0, color: "white" }}>Rs {total}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>Shipping</p>
                  <p style={{ margin: 0, color: "var(--success)" }}>FREE</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "15px", marginTop: "15px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "white" }}>Total</p>
                  <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "var(--success)" }}>Rs {total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
