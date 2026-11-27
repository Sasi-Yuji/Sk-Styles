import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'M');
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = wishlist.some((item) => item.id === product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* Badges */}
        <div className="badge-group">
          {product.isHot && <span className="product-badge badge-hot">HOT</span>}
          {product.isNew && <span className="product-badge badge-new">NEW</span>}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          title={isFavorited ? "In Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isFavorited ? "#e63946" : "none"} color={isFavorited ? "#e63946" : "#444"} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>

      <div className="product-details">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          {product.rating && (
            <div className="product-rating">
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="size-selector">
            <span className="size-label">Size:</span>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-bottom">
          <div className="price-container">
            <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>

          <button
            className={`pick-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Pick
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
