import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json(null);
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionStatus: true, razorpaySubscriptionId: true }
    });

    return NextResponse.json({
      status: user?.subscriptionStatus || "inactive",
      id: user?.razorpaySubscriptionId || null
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "inactive" }, { status: 500 });
  }
}
