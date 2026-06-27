import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import { useCart } from "../context/CartContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchNoteDetail();
  }, [id]);

  const fetchNoteDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/notes/${id}`);
      const data = await res.json();
      setNote(data);
    } catch (error) {
      console.log("Note detail fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!note) return;
    addToCart(note, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!note) return;
    addToCart(note, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <p className="loading-text">Loading product details...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <Link to="/notes" className="back-to-notes-btn">
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice =
    note.discountPrice && note.discountPrice < note.price ? note.discountPrice : note.price;

  const discountPercent =
    note.discountPrice && note.discountPrice < note.price
      ? Math.round(((note.price - note.discountPrice) / note.price) * 100)
      : 0;

  return (
    <div className="product-detail-page">
      <div className="product-detail-breadcrumb">
        <Link to="/notes">Notes</Link> / <span>{note.title}</span>
      </div>

      <div className="product-detail-container">
        <div className="product-detail-image-wrapper">
          <img
            src={note.coverImage || "https://via.placeholder.com/500x600?text=Notes"}
            alt={note.title}
          />
          {discountPercent > 0 && (
            <span className="product-discount-badge">{discountPercent}% Off</span>
          )}
        </div>

        <div className="product-detail-info">
          <span className="product-detail-tags">
            {note.className} | {note.subject}
          </span>
          <h1 className="product-detail-title">{note.title}</h1>

          <div className="product-detail-price-row">
            <span className="product-price-sale">₹{finalPrice}</span>
            {discountPercent > 0 && (
              <span className="product-price-original">₹{note.price}</span>
            )}
          </div>

          <p className="product-detail-description">
            {note.description ||
              "Detailed and exam-focused notes prepared by Climax Academy's expert faculty."}
          </p>

          <div className="product-detail-meta">
            <p><strong>Class:</strong> {note.className}</p>
            <p><strong>Subject:</strong> {note.subject}</p>
            <p><strong>Availability:</strong> {note.inStock ? "✅ In Stock" : "❌ Sold Out"}</p>
          </div>

          <div className="product-quantity-row">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="product-detail-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={!note.inStock}>
              {added ? "✅ Added!" : "Add to Cart"}
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow} disabled={!note.inStock}>
              Buy Now
            </button>
          </div>

          <div className="product-delivery-info">
            <p>🚚 Free Home Delivery on all orders</p>
            <p>📞 Need help? Call us at +91 8319661649</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;