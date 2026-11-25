import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartWidget() {
  const { 
    cart, 
    updateQty, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    shipping, 
    grandTotal, 
    totalCount,
    setIsCartOpen,
    setIsCheckoutOpen
  } = useCart();

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-widget-container">
      <div className="cart-widget-header">
        <div className="cart-title-row">
          <ShoppingBag size={20} />
          <h2>Shopping Cart</h2>
        </div>
        {cart.length > 0 && (
          <button className="clear-cart-link" onClick={clearCart} title="Clear all items">
            Clear All
          </button>
        )}
      </div>

      <h4 className="order-summary-title">ORDER SUMMARY ({totalCount} {totalCount === 1 ? 'item' : 'items'})</h4>

      {cart.length === 0 ? (
        <div className="empty-cart-state">
          <div className="empty-icon-circle">
            <ShoppingBag size={38} className="empty-cart-icon" />
          </div>
          <p className="empty-title">Your Cart is Empty</p>
          <p className="empty-desc">Explore our apparel catalog and pick your favorite items!</p>
        </div>
      ) : (
        <div className="cart-content-scroll">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-entry-card">
                <div className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-name">
                      <b>{item.name}</b>
                    </p>
                    <div className="cart-item-meta">
                      <span className="cart-item-size">Size: {item.size}</span>
                      <span className="cart-item-price">${item.price} each</span>
                    </div>

                    {/* Quantity Stepper & Price Calculation */}
                    <div className="cart-controls-row">
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.size, -1)}
                          title="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.size, 1)}
                          title="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="item-line-total">
                        ${(item.qty * item.price).toFixed(2)}
                      </span>

                      <button
                        type="button"
                        className="delete-item-btn"
                        onClick={() => removeFromCart(item.id, item.size)}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calculations & Order Total */}
          <div className="cart-calculation-card">
            <div className="calc-row">
              <span className="calc-label">Subtotal</span>
              <span className="calc-val">${subtotal.toFixed(2)}</span>
            </div>

            <div className="calc-row">
              <span className="shipping-label">
                <Truck size={14} /> Shipping
              </span>
              <span className="calc-val">
                {shipping === 0 ? <strong className="free-text">FREE</strong> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {subtotal < 35 && subtotal > 0 && (
              <div className="free-shipping-tip">
                Add <strong>${(35 - subtotal).toFixed(2)}</strong> more for <strong>FREE SHIPPING!</strong>
              </div>
            )}

            <div className="calc-divider" />

            <div className="total-row">
              <span className="total-title">Total</span>
              <span className="total-amount">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="checkout-btn"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="cart-trust-badge">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>100% Secure Checkout & Free Returns</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
