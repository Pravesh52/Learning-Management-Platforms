import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty-state">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any notes yet.</p>
          <Link to="/notes" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-page-title">Your Cart ({cartItems.length})</h2>

      <div className="cart-container">
        <div className="cart-items-list">
          {cartItems.map((item) => {
            const price =
              item.discountPrice && item.discountPrice < item.price
                ? item.discountPrice
                : item.price;
            return (
              <div className="cart-item-card" key={item._id}>
                <img
                  src={item.coverImage || "https://via.placeholder.com/100x120?text=Notes"}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p className="cart-item-tags">
                    {item.className} | {item.subject}
                  </p>
                  <p className="cart-item-price">₹{price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-subtotal">₹{price * item.quantity}</div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item._id)}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary-box">
          <h3>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="cart-summary-row cart-total-row">
            <span>Total</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <Link to="/notes" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;