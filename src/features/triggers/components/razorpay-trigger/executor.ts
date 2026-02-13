import type { NodeExecutor } from "@/features/executions/types";
import { razorpayTriggerChannel } from "@/inngest/channels/razorpay-trigger";


type RazorPayTriggerData = Record<string, unknown>;

export const razorpayTriggerExecutor: NodeExecutor<RazorPayTriggerData> = async ({
    nodeId,
    context, 
    step,
    publish,
}) => {
    await publish(
        razorpayTriggerChannel().status({
            nodeId,
            status: 'loading',
        })
    )

    const result = await step.run('razorpay-trigger', async () => context);

    await publish(
        razorpayTriggerChannel().status({
            nodeId,
            status: 'success',
        })
    )

    return result;
};
