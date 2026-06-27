import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const { fullName, phone, email, address, city, state, pinCode } = shippingInfo;
    if (!fullName || !phone || !email || !address || !city || !state || !pinCode) {
      alert("Please fill all shipping details");
      return;
    }

    // ===========================================================
    // PAYMENT GATEWAY INTEGRATION POINT
    // Real payment (Razorpay/Stripe) will be added here later.
    // For now this is UI-only checkout.
    // ===========================================================
    if (paymentMethod === "online") {
      console.log("Redirecting to payment gateway... (To be integrated)");
    }

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success-box">
          <div className="order-success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you for your order. Our team will contact you shortly to confirm delivery
            details.
          </p>
          <p className="order-note">
            Payment Method:{" "}
            <strong>{paymentMethod === "online" ? "Online Payment" : "Cash on Delivery"}</strong>
          </p>
          <Link to="/notes" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="cart-empty-state">
          <h2>Your Cart is Empty</h2>
          <Link to="/notes" className="continue-shopping-btn">
            Shop Notes Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-page-title">Checkout</h2>

      <form className="checkout-container" onSubmit={handlePlaceOrder}>
        <div className="checkout-shipping-box">
          <h3>Shipping Details</h3>
          <div className="checkout-form-grid">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={shippingInfo.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={shippingInfo.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={shippingInfo.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City *"
              value={shippingInfo.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={shippingInfo.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pinCode"
              placeholder="PIN Code *"
              value={shippingInfo.pinCode}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Full Address *"
              value={shippingInfo.address}
              onChange={handleChange}
              rows={3}
              className="checkout-full-width"
              required
            />
          </div>

          <h3 style={{ marginTop: "24px" }}>Payment Method</h3>
          <div className="payment-method-options">
            <label className={`payment-option ${paymentMethod === "online" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💳 Online Payment
            </label>
            <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💵 Cash on Delivery
            </label>
          </div>
          <p className="payment-note">
            * Online payment gateway will be enabled soon. Cash on Delivery is currently
            available.
          </p>
        </div>

        <div className="checkout-summary-box">
          <h3>Order Summary</h3>
          {cartItems.map((item) => {
            const price =
              item.discountPrice && item.discountPrice < item.price
                ? item.discountPrice
                : item.price;
            return (
              <div className="checkout-summary-item" key={item._id}>
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>₹{price * item.quantity}</span>
              </div>
            );
          })}
          <hr />
          <div className="checkout-summary-row checkout-total-row">
            <span>Total</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;