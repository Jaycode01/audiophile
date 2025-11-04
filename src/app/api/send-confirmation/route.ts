// app/api/send-confirmation/route.ts
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import OrderConfirmationEmail from "../../../../emails/OrderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderData, customerEmail, customerName } = body;

    const { data, error } = await resend.emails.send({
      from: "Audiophile <josephlamidijoslam@gmail.com>", // Replace with your domain
      to: [customerEmail],
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      react: OrderConfirmationEmail({
        customerName,
        orderData,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
