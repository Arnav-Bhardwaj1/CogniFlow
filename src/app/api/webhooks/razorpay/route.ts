import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const workflowId = url.searchParams.get('workflowId');

        if (!workflowId) {
            return NextResponse.json(
                { success: false, error: 'Missing required query parameter: workflowId'},
                { status: 400 },
            );
        };

        const body = await request.text();
        
        // Verify RazorPay webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (webhookSecret) {
            const signature = request.headers.get('x-razorpay-signature');
            
            if (!signature) {
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
                return NextResponse.json(
                    { success: false, error: 'Invalid webhook signature' },
                    { status: 401 },
                );
            }
        }

        const webhookData = JSON.parse(body);

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

        // Trigger an Inngest job
        const { sendWorkflowExecution } = await import("@/inngest/utils");
        await sendWorkflowExecution({
            workflowId,
            initialData: {
                razorpay: razorpayData,
            },
        });

        return NextResponse.json(
            { success: true },
            { status: 200 },
        );
    } catch (error) {
        console.log('RazorPay webhook error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process RazorPay webhook'},
            { status: 500 },
        );
    }
}
