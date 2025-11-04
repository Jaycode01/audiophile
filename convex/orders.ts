// convex/orders.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    shippingCity: v.string(),
    shippingZipCode: v.string(),
    shippingCountry: v.string(),
    paymentMethod: v.string(),
    eMoneyNumber: v.optional(v.string()),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate items array is not empty
    if (args.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    // Validate totals
    if (args.grandTotal <= 0) {
      throw new Error("Invalid order total");
    }

    const orderNumber = generateOrderNumber();

    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      orderStatus: "pending",
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      shippingAddress: args.shippingAddress,
      shippingCity: args.shippingCity,
      shippingZipCode: args.shippingZipCode,
      shippingCountry: args.shippingCountry,
      paymentMethod: args.paymentMethod,
      eMoneyNumber: args.eMoneyNumber,
      items: args.items,
      subtotal: args.subtotal,
      shipping: args.shipping,
      vat: args.vat,
      grandTotal: args.grandTotal,
      createdAt: Date.now(),
    });

    return { orderId, orderNumber };
  },
});

export const getOrderById = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});

export const getOrderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) =>
        q.eq("orderNumber", args.orderNumber)
      )
      .first();
    return order;
  },
});
