// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import "./checkout.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type FormErrors = {
  [key: string]: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const createOrder = useMutation(api.orders.createOrder);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-money",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [issubmitting, setissubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-+()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "name is too short" : "";
      case "email":
        return !validateEmail(value) ? "wrong format" : "";
      case "phone":
        return !validatePhone(value) ? "wrong format" : "";
      case "address":
        return value.trim().length < 5 ? "address is too short" : "";
      case "zipCode":
        return value.trim().length < 3 ? "invalid ZIP code" : "";
      case "city":
        return value.trim().length < 2 ? "city is required" : "";
      case "country":
        return value.trim().length < 2 ? "country is required" : "";
      case "eMoneyNumber":
        return formData.paymentMethod === "e-money" && value.trim().length < 6
          ? "invalid number"
          : "";
      case "eMoneyPin":
        return formData.paymentMethod === "e-money" && value.trim().length < 4
          ? "invalid PIN"
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  const getShortName = (name: string) => {
    return name
      .replace(/headphones?/gi, "")
      .replace(/speakers?/gi, "")
      .replace(/earphones?/gi, "")
      .trim();
  };

  const shippingCost = 50;
  const vatRate = 0.2;
  const total = getTotalPrice();
  const vat = Math.round(total * vatRate);
  const grandTotal = total + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (issubmitting) return;

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setissubmitting(true);

    try {
      const shippingCost = 50;
      const vatRate = 0.2;
      const subtotal = getTotalPrice();
      const vat = Math.round(subtotal * vatRate);
      const grandTotal = subtotal + shippingCost;

      // Create order in Convex
      const { orderId, orderNumber } = await createOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingZipCode: formData.zipCode,
        shippingCountry: formData.country,
        paymentMethod: formData.paymentMethod,
        eMoneyNumber:
          formData.paymentMethod === "e-money"
            ? formData.eMoneyNumber
            : undefined,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping: shippingCost,
        vat,
        grandTotal,
      });

      // Send confirmation email
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail: formData.email,
          customerName: formData.name,
          orderData: {
            orderNumber,
            items: cart,
            shippingAddress: formData.address,
            shippingCity: formData.city,
            shippingZipCode: formData.zipCode,
            shippingCountry: formData.country,
            subtotal,
            shipping: shippingCost,
            vat,
            grandTotal,
          },
        }),
      });

      // Clear cart
      clearCart();

      // Redirect to order confirmation page
      router.push(
        `/order-confirmation?orderId=${orderId}&orderNumber=${orderNumber}`
      );
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setissubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="checkout_page">
        <div className="container">
          <Link href="/" className="go_back">
            Go Back
          </Link>

          <div className="checkout_content">
            {/* Left Side - Form */}
            <form className="checkout_form" onSubmit={handleSubmit}>
              <h1>CHECKOUT</h1>

              {/* Billing Details */}
              <section className="form_section">
                <h2 className="section_title">BILLING DETAILS</h2>

                <div className="form_grid">
                  <div className={`form_group ${errors.name ? "error" : ""}`}>
                    <div className="label_row">
                      <label htmlFor="name">Name</label>
                      {errors.name && (
                        <span className="error_message">{errors.name}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Alexei Ward"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.name ? "error_input" : ""}
                    />
                  </div>

                  <div className={`form_group ${errors.email ? "error" : ""}`}>
                    <div className="label_row">
                      <label htmlFor="email">Email Address</label>
                      {errors.email && (
                        <span className="error_message">{errors.email}</span>
                      )}
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="alexei@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.email ? "error_input" : ""}
                    />
                  </div>

                  <div className={`form_group ${errors.phone ? "error" : ""}`}>
                    <div className="label_row">
                      <label htmlFor="phone">Phone Number</label>
                      {errors.phone && (
                        <span className="error_message">{errors.phone}</span>
                      )}
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 202-555-0136"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.phone ? "error_input" : ""}
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Info */}
              <section className="form_section">
                <h2 className="section_title">SHIPPING INFO</h2>

                <div className="form_grid">
                  <div
                    className={`form_group full_width ${errors.address ? "error" : ""}`}
                  >
                    <div className="label_row">
                      <label htmlFor="address">Address</label>
                      {errors.address && (
                        <span className="error_message">{errors.address}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="1137 Williams Avenue"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.address ? "error_input" : ""}
                    />
                  </div>

                  <div
                    className={`form_group ${errors.zipCode ? "error" : ""}`}
                  >
                    <div className="label_row">
                      <label htmlFor="zipCode">ZIP Code</label>
                      {errors.zipCode && (
                        <span className="error_message">{errors.zipCode}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.zipCode ? "error_input" : ""}
                    />
                  </div>

                  <div className={`form_group ${errors.city ? "error" : ""}`}>
                    <div className="label_row">
                      <label htmlFor="city">City</label>
                      {errors.city && (
                        <span className="error_message">{errors.city}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.city ? "error_input" : ""}
                    />
                  </div>

                  <div
                    className={`form_group ${errors.country ? "error" : ""}`}
                  >
                    <div className="label_row">
                      <label htmlFor="country">Country</label>
                      {errors.country && (
                        <span className="error_message">{errors.country}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="United States"
                      value={formData.country}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.country ? "error_input" : ""}
                    />
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section className="form_section">
                <h2 className="section_title">PAYMENT DETAILS</h2>

                <div className="form_grid">
                  <div className="form_group">
                    <label>Payment Method</label>
                  </div>

                  <div className="payment_methods">
                    <label className="radio_option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="e-money"
                        checked={formData.paymentMethod === "e-money"}
                        onChange={() => handlePaymentMethodChange("e-money")}
                      />
                      <span className="radio_custom"></span>
                      <span>e-Money</span>
                    </label>

                    <label className="radio_option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={() => handlePaymentMethodChange("cash")}
                      />
                      <span className="radio_custom"></span>
                      <span>Cash on Delivery</span>
                    </label>
                  </div>

                  {formData.paymentMethod === "e-money" && (
                    <>
                      <div
                        className={`form_group ${errors.eMoneyNumber ? "error" : ""}`}
                      >
                        <div className="label_row">
                          <label htmlFor="eMoneyNumber">e-Money Number</label>
                          {errors.eMoneyNumber && (
                            <span className="error_message">
                              {errors.eMoneyNumber}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          id="eMoneyNumber"
                          name="eMoneyNumber"
                          placeholder="238521993"
                          value={formData.eMoneyNumber}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={errors.eMoneyNumber ? "error_input" : ""}
                        />
                      </div>

                      <div
                        className={`form_group ${errors.eMoneyPin ? "error" : ""}`}
                      >
                        <div className="label_row">
                          <label htmlFor="eMoneyPin">e-Money PIN</label>
                          {errors.eMoneyPin && (
                            <span className="error_message">
                              {errors.eMoneyPin}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          id="eMoneyPin"
                          name="eMoneyPin"
                          placeholder="6891"
                          value={formData.eMoneyPin}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={errors.eMoneyPin ? "error_input" : ""}
                        />
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === "cash" && (
                    <div className="cash_message">
                      <img src="/assets/icon-cash.svg" alt="cash" />
                      <p>
                        The 'Cash on Delivery' option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              <button type="submit" className="pay_button_mobile">
                CONTINUE & PAY
              </button>
            </form>

            {/* Right Side - Summary */}
            <div className="order_summary">
              <h2>SUMMARY</h2>

              <div className="summary_items">
                {cart.map((item) => (
                  <div key={item.id} className="summary_item">
                    <img src={item.image} alt={item.name} />
                    <div className="item_info">
                      <p className="item_name">{getShortName(item.name)}</p>
                      <p className="item_price">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="item_quantity">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="summary_totals">
                <div className="total_row">
                  <span>TOTAL</span>
                  <span className="amount">$ {total.toLocaleString()}</span>
                </div>
                <div className="total_row">
                  <span>SHIPPING</span>
                  <span className="amount">$ {shippingCost}</span>
                </div>
                <div className="total_row">
                  <span>VAT (INCLUDED)</span>
                  <span className="amount">$ {vat.toLocaleString()}</span>
                </div>
                <div className="total_row grand">
                  <span>GRAND TOTAL</span>
                  <span className="amount highlight">
                    $ {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="pay_button"
                onClick={handleSubmit}
                disabled={issubmitting || cart.length === 0}
              >
                {issubmitting ? "PROCESSING..." : "CONTINUE & PAY"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
