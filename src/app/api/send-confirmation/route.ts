// app/api/send-confirmation/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Generate HTML email template
function generateEmailHTML(customerName: string, orderData: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background-color: #000000;
            padding: 30px;
            text-align: center;
          }
          .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            text-transform: lowercase;
          }
          .content {
            padding: 40px 30px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 20px;
            color: #000;
          }
          .text {
            font-size: 16px;
            color: #666;
            margin: 0 0 20px;
          }
          .order-box {
            background-color: #f1f1f1;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
          }
          .order-number {
            font-size: 16px;
            font-weight: bold;
            color: #000;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin: 30px 0 15px;
            color: #000;
          }
          .item {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
          }
          .item-image {
            width: 64px;
            height: 64px;
            border-radius: 8px;
            margin-right: 16px;
            object-fit: cover;
          }
          .item-details {
            flex: 1;
          }
          .item-name {
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 5px;
          }
          .item-price {
            font-size: 14px;
            color: #666;
            margin: 0;
          }
          .item-quantity {
            font-size: 14px;
            font-weight: bold;
            color: #666;
          }
          .totals {
            background-color: #f9f9f9;
            padding: 20px;
            margin: 30px 0;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .total-label {
            color: #666;
          }
          .total-value {
            font-weight: bold;
          }
          .grand-total {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #ddd;
            font-size: 16px;
          }
          .grand-total .total-value {
            color: #d87d4a;
            font-size: 18px;
          }
          .shipping {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .address {
            font-size: 14px;
            color: #666;
            line-height: 1.8;
          }
          .button {
            display: inline-block;
            background-color: #d87d4a;
            color: #ffffff !important;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 20px 0;
          }
          .support {
            text-align: center;
            padding: 20px 30px;
            border-top: 1px solid #eee;
          }
          .support-text {
            font-size: 14px;
            color: #666;
          }
          .link {
            color: #d87d4a;
            text-decoration: underline;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 20px 30px;
            text-align: center;
          }
          .footer-text {
            font-size: 12px;
            color: #999;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1 class="logo">audiophile</h1>
          </div>

          <!-- Content -->
          <div class="content">
            <h1 class="title">Thank you for your order!</h1>
            <p class="text">Hi ${customerName},</p>
            <p class="text">
              We're excited to let you know that your order has been received and is being processed.
            </p>

            <!-- Order Number -->
            <div class="order-box">
              <p class="order-number">Order Number: ${orderData.orderNumber}</p>
            </div>

            <!-- Order Items -->
            <h2 class="section-title">Order Summary</h2>
            ${orderData.items
              .map(
                (item: any) => `
              <div class="item">
                <img src="${item.image}" alt="${item.name}" class="item-image" />
                <div class="item-details">
                  <p class="item-name">${item.name}</p>
                  <p class="item-price">$ ${item.price.toLocaleString()}</p>
                </div>
                <span class="item-quantity">x${item.quantity}</span>
              </div>
            `
              )
              .join("")}

            <!-- Totals -->
            <div class="totals">
              <div class="total-row">
                <span class="total-label">Subtotal</span>
                <span class="total-value">$ ${orderData.subtotal.toLocaleString()}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Shipping</span>
                <span class="total-value">$ ${orderData.shipping}</span>
              </div>
              <div class="total-row">
                <span class="total-label">VAT (Included)</span>
                <span class="total-value">$ ${orderData.vat.toLocaleString()}</span>
              </div>
              <div class="total-row grand-total">
                <span class="total-label">Grand Total</span>
                <span class="total-value">$ ${orderData.grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <!-- Shipping Address -->
            <h2 class="section-title">Shipping Address</h2>
            <div class="shipping">
              <p class="address">
                ${orderData.shippingAddress}<br>
                ${orderData.shippingCity}, ${orderData.shippingZipCode}<br>
                ${orderData.shippingCountry}
              </p>
            </div>

            <!-- CTA Button -->
            <center>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation?orderNumber=${orderData.orderNumber}" class="button">
                View Your Order
              </a>
            </center>
          </div>

          <!-- Support -->
          <div class="support">
            <p class="support-text">
              Need help? Contact our support team at 
              <a href="mailto:support@audiophile.com" class="link">support@audiophile.com</a>
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">© 2025 Audiophile. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Check if credentials exist
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("❌ Gmail credentials missing!");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { orderData, customerEmail, customerName } = body;

    console.log("📧 Sending email to:", customerEmail);

    // Generate HTML email
    const htmlContent = generateEmailHTML(customerName, orderData);

    // Send email
    const info = await transporter.sendMail({
      from: `"Audiophile" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Email error:", error);
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
