import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Define Razorpay order details. 
  // Note: We use an Order (one-time) here for structural simplicity since Razorpay Subscriptions require a pre-created 'plan_id' on your Razorpay dashboard.
  const options = {
    amount: 199900, // INR 1999.00. Razorpay expects amount in paise (multiply by 100).
    currency: "INR",
    receipt: `rcptid_${session.user.id}`,
    notes: {
      userId: session.user.id, // We embed the user ID here so the webhook knows who paid
    }
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
