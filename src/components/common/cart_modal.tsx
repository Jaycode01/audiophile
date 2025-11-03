"use client";

import { useCart } from "@/context/cartContext";
import Link from "next/link";
import "./cart_modal.css";

export default function CartModal() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart_overlay" onClick={closeCart}></div>

      <div className="cart_modal">
        <div className="cart_header">
          <h2>CART ({getTotalItems()})</h2>
          <button onClick={clearCart} className="remove_all">
            Remove all
          </button>
        </div>

        <div className="cart_items">
          {cart.length === 0 ? (
            <p className="empty_cart">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart_item">
                <img src={item.image} alt={item.name} />
                <div className="item_details">
                  <p className="item_name">{item.name}</p>
                  <p className="item_price">$ {item.price.toLocaleString()}</p>
                </div>
                <div className="quantity_controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart_footer">
          <div className="total">
            <span>TOTAL</span>
            <span className="total_price">
              $ {getTotalPrice().toLocaleString()}
            </span>
          </div>
          <Link href="/checkout" onClick={closeCart}>
            <button className="checkout_btn">CHECKOUT</button>
          </Link>
        </div>
      </div>
    </>
  );
}
