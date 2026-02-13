import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import {  fetchRazorPayTriggerRealtimeToken } from "./actions";
import { RazorPayTriggerDialog } from "./dialog";
import { RAZORPAY_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/razorpay-trigger"; 

export const RazorPayTriggerNode =memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const nodeStatus = useNodeStatus({
            nodeId: props.id,
            channel: RAZORPAY_TRIGGER_CHANNEL_NAME,
            topic: 'status',
            refreshToken: fetchRazorPayTriggerRealtimeToken,
        });

    const handleOpenSettings = () => setDialogOpen(true);
    
    return (
        <>
            <RazorPayTriggerDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
             />
            <BaseTriggerNode
                {...props}
                icon={'/logos/razorpay.svg'}
                name="RazorPay"
                description="When event captured"
                status={nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    )
});

RazorPayTriggerNode.displayName = 'RazorPayTriggerNode';
