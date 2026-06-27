import React from "react";
import { Link } from "react-router-dom";
import "./CartDrawer.css";
import { useCart } from "../../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h3>Your Cart ({cartItems.length})</h3>
          <button onClick={onClose} className="cart-drawer-close">
            ✖
          </button>
        </div>

        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="cart-drawer-empty">
              <p>Your cart is empty</p>
              <Link to="/notes" onClick={onClose} className="cart-drawer-shop-btn">
                Shop Notes
              </Link>
            </div>
          ) : (
            cartItems.map((item) => {
              const price =
                item.discountPrice && item.discountPrice < item.price
                  ? item.discountPrice
                  : item.price;
              return (
                <div className="cart-drawer-item" key={item._id}>
                  <img
                    src={item.coverImage || "https://via.placeholder.com/70x90?text=Notes"}
                    alt={item.title}
                  />
                  <div className="cart-drawer-item-info">
                    <h4>{item.title}</h4>
                    <p>₹{price}</p>
                    <div className="cart-drawer-qty">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, Math.max(1, item.quantity - 1))
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-drawer-remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    🗑️
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-drawer-total">
              <span>Total</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <Link to="/cart" onClick={onClose} className="cart-drawer-view-btn">
              View Cart
            </Link>
            <Link to="/checkout" onClick={onClose} className="cart-drawer-checkout-btn">
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;