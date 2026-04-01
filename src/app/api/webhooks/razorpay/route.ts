import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    const timestamp = new Date().toISOString();

    try {
        const url = new URL(request.url);
        const workflowId = url.searchParams.get('workflowId');

        const body = await request.text();

        console.log(`[Razorpay Webhook] ${timestamp} | Incoming request | workflowId: ${workflowId ?? 'none (billing)'}`);

        // Verify RazorPay webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (webhookSecret) {
            const signature = request.headers.get('x-razorpay-signature');

            if (!signature) {
                console.log(`[Razorpay Webhook] ${timestamp} | ❌ Rejected: Missing signature header`);
                return NextResponse.json(
                    { success: false, error: 'Missing webhook signature' },
                    { status: 401 },
                );
            }

            const expectedSignature = crypto
                .createHmac('sha256', webhookSecret)
                .update(body)
                .digest('hex');

            if (signature !== expectedSignature) {
                console.log(`[Razorpay Webhook] ${timestamp} | ❌ Rejected: Signature mismatch`);
                return NextResponse.json(
                    { success: false, error: 'Invalid webhook signature' },
                    { status: 401 },
                );
            }

            console.log(`[Razorpay Webhook] ${timestamp} | ✅ Signature verified`);
        } else {
            console.log(`[Razorpay Webhook] ${timestamp} | ⚠️ RAZORPAY_WEBHOOK_SECRET not set, skipping signature verification`);
        }

        const webhookData = JSON.parse(body);

        console.log(`[Razorpay Webhook] ${timestamp} | Event: ${webhookData.event} | Account: ${webhookData.account_id ?? 'N/A'}`);

        // Check if this is a platform billing system upgrade event 
        if (!workflowId) {
            if (webhookData.event === "payment.captured" || webhookData.event === "order.paid") {
                const userId = webhookData.payload?.payment?.entity?.notes?.userId;
                const paymentId = webhookData.payload?.payment?.entity?.id;
                const amount = webhookData.payload?.payment?.entity?.amount;

                console.log(`[Razorpay Webhook] ${timestamp} | Billing event | userId: ${userId ?? 'missing'} | paymentId: ${paymentId} | amount: ${amount}`);

                if (userId) {
                    await prisma.user.update({
                        where: { id: userId },
                        data: {
                            subscriptionStatus: "active",
                            razorpayCustomerId: webhookData.payload?.payment?.entity?.customer_id || null,
                        },
                    });
                    console.log(`[Razorpay Webhook] ${timestamp} | ✅ User ${userId} upgraded to Premium`);
                    return NextResponse.json({ success: true }, { status: 200 });
                } else {
                    console.log(`[Razorpay Webhook] ${timestamp} | ⚠️ Billing event received but no userId in notes`);
                }
            }
            // Not a billing event and no workflowId provided
            console.log(`[Razorpay Webhook] ${timestamp} | ❌ Rejected: No workflowId and not a billing event (event: ${webhookData.event})`);
            return NextResponse.json(
                { success: false, error: 'Missing required query parameter: workflowId' },
                { status: 400 },
            );
        }

        // Parse RazorPay webhook payload structure
        const razorpayData = {
            // Event metadata
            eventId: webhookData.payload?.payment?.entity?.id || webhookData.event,
            eventType: webhookData.event,
            eventTime: webhookData.created_at,

            // Payment details
            paymentId: webhookData.payload?.payment?.entity?.id,
            orderId: webhookData.payload?.payment?.entity?.order_id,
            amount: webhookData.payload?.payment?.entity?.amount,
            currency: webhookData.payload?.payment?.entity?.currency,
            status: webhookData.payload?.payment?.entity?.status,
            method: webhookData.payload?.payment?.entity?.method,

            // Raw payload
            raw: webhookData.payload?.payment?.entity || webhookData.payload,
        };

        console.log(`[Razorpay Webhook] ${timestamp} | Triggering Inngest workflow: ${workflowId} | event: ${razorpayData.eventType} | paymentId: ${razorpayData.paymentId}`);

        // Trigger an Inngest job
        const { sendWorkflowExecution } = await import("@/inngest/utils");
        await sendWorkflowExecution({
            workflowId,
            initialData: {
                razorpay: razorpayData,
            },
        });

        console.log(`[Razorpay Webhook] ${timestamp} | ✅ Inngest workflow ${workflowId} triggered successfully`);

        return NextResponse.json(
            { success: true },
            { status: 200 },
        );
    } catch (error) {
        console.error(`[Razorpay Webhook] ${timestamp} | 🔥 ERROR:`, error instanceof Error ? { message: error.message, stack: error.stack } : error);
        return NextResponse.json(
            { success: false, error: 'Failed to process RazorPay webhook' },
            { status: 500 },
        );
    }
}
