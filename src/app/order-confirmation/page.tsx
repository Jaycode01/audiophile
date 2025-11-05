// app/order-confirmation/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import "./orderConfirmation.css";

export default function OrderConfirmationPage() {
  // ✅ Make sure this is here
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderNumber = searchParams.get("orderNumber");

  const order = useQuery(
    api.orders.getOrderById,
    orderId ? { orderId: orderId as any } : "skip"
  );

  useEffect(() => {
    console.log("Order placed successfully!", orderNumber);
  }, [orderNumber]);

  if (!orderId || !orderNumber) {
    return (
      <main className="confirmation_page">
        <div className="container">
          <h1>Order Not Found</h1>
          <Link href="/" className="home_button">
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <main className="confirmation_page">
          <div className="container">
            <p>Loading order details...</p>
          </div>
        </main>
      </Suspense>
    );
  }

  const getShortName = (name: string) => {
    return name
      .replace(/headphones?/gi, "")
      .replace(/speakers?/gi, "")
      .replace(/earphones?/gi, "")
      .trim();
  };

  return (
    <main className="confirmation_page">
      <div className="container">
        <div className="confirmation_card">
          <div className="success_icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#D87D4A" />
              <path
                d="M20 32L28 40L44 24"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="title">
            Thank you <br /> for your order
          </h1>
          <p className="subtitle">
            You will receive an email confirmation shortly.
          </p>

          <div className="order_summary_box">
            <div className="summary_left">
              {order.items[0] && (
                <div className="first_item">
                  <img
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    className="item_image"
                  />
                  <div className="item_details">
                    <p className="item_name">
                      {getShortName(order.items[0].name)}
                    </p>
                    <p className="item_price">
                      $ {order.items[0].price.toLocaleString()}
                    </p>
                  </div>
                  <span className="item_quantity">
                    x{order.items[0].quantity}
                  </span>
                </div>
              )}

              {order.items.length > 1 && (
                <div className="other_items">
                  <p>and {order.items.length - 1} other item(s)</p>
                </div>
              )}
            </div>

            <div className="summary_right">
              <p className="total_label">GRAND TOTAL</p>
              <p className="total_amount">
                $ {order.grandTotal.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="order_number">
            <p>
              Order Number: <strong>{order.orderNumber}</strong>
            </p>
          </div>

          <Link href="/" className="home_button">
            BACK TO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
