// app/api/send-confirmation/route.ts
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import OrderConfirmationEmail from "../../../../emails/OrderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

// app/api/send-confirmation/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderData, customerEmail, customerName } = body;

    console.log("Attempting to send email to:", customerEmail); // ✅ Add logging

    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      react: OrderConfirmationEmail({
        customerName,
        orderData,
      }),
    });

    if (error) {
      console.error("Email error:", error); // ✅ Log the error
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log("Email sent successfully:", data); // ✅ Log success
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("API error:", error); // ✅ Log catch errors
    return NextResponse.json({ error }, { status: 500 });
  }
}
