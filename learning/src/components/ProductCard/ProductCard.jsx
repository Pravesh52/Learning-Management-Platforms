import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ note }) => {
  const { addToCart } = useCart();

  const discountPercent =
    note.discountPrice && note.discountPrice < note.price
      ? Math.round(((note.price - note.discountPrice) / note.price) * 100)
      : 0;

  const finalPrice =
    note.discountPrice && note.discountPrice < note.price
      ? note.discountPrice
      : note.price;

  const handleAddToCart = () => {
    addToCart(note);
  };

  return (
    <div className="product-card-component">
      <Link to={`/notes/${note._id}`} className="product-card-image-link">
        <img
          src={note.coverImage || "https://via.placeholder.com/300x380?text=Notes"}
          alt={note.title}
          className="product-card-image"
        />
        {discountPercent > 0 && (
          <span className="product-discount-badge">{discountPercent}% Off</span>
        )}
      </Link>

      <div className="product-card-body">
        <span className="product-card-tags">
          {note.className} | {note.subject}
        </span>
        <Link to={`/notes/${note._id}`}>
          <h3 className="product-card-title">{note.title}</h3>
        </Link>

        <div className="product-card-price-row">
          <span className="product-price-sale">₹{finalPrice}</span>
          {discountPercent > 0 && (
            <span className="product-price-original">₹{note.price}</span>
          )}
        </div>

        <button
          className="product-add-cart-btn"
          onClick={handleAddToCart}
          disabled={!note.inStock}
        >
          {note.inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;