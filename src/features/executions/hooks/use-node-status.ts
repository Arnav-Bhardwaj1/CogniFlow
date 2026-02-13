import type { Realtime } from "@inngest/realtime";
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { useEffect, useState } from "react";
import type { NodeStatus } from "@/components/react-flow/node-status-indicator";

interface UseNodeStatusOptions {
nodeId: string;
channel: string;
topic: string;
refreshToken: () => Promise<Realtime.Subscribe.Token>; // Function to get a new subscription token when needed
} // what is data and topic in this context? data is the payload of the message received from the subscription, and topic is a string that categorizes the type of messages being subscribed to. In this context, data would contain information about the node's status, and topic would help filter messages relevant to that node. subscription is a way to listen for real-time updates from a server or service. In this case, the useInngestSubscription hook is used to subscribe to a specific channel and topic, allowing the component to receive updates about the node's status as they occur.

export function useNodeStatus({
nodeId, 
channel, 
topic, 
refreshToken, 
}: UseNodeStatusOptions) {
    const [status, setStatus] = useState<NodeStatus>("initial");

    const { data } = useInngestSubscription({ // Subscribe to the specified channel and topic
        refreshToken,
        enabled: true,
    });

    useEffect(() => {
        if (!data?.length) {
            return;
        }

        const latestMessage = data.filter(
            (msg) =>
                msg.kind === "data" &&
                msg.channel === channel &&
                msg.topic === topic &&
                msg.data.nodeId === nodeId
        )
        .sort((a, b) => {
           if (a.kind === "data" && b.kind === "data") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
           }
           return 0;
        })[0];

        if (latestMessage?.kind === "data") {
            setStatus(latestMessage.data.status as NodeStatus);
        }
    }, [data, nodeId, channel, topic]);

    return status;
};