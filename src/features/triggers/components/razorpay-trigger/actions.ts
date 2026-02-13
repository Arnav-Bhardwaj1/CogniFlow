'use server';

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";

import { inngest } from "@/inngest/client";
import { razorpayTriggerChannel } from "@/inngest/channels/razorpay-trigger";

export type RazorPayTriggerToken = Realtime.Token<
    typeof razorpayTriggerChannel,
    ['status']
>;

export async function fetchRazorPayTriggerRealtimeToken(): Promise<RazorPayTriggerToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: razorpayTriggerChannel(),
        topics: ['status'],
    });

    return token;
};
