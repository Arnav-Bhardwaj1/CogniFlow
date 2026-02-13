import { channel, topic } from "@inngest/realtime";

// It defines a real-time communication channel where your backend can broadcast execution status updates (loading / success / error) for an HTTP request node.
export const HTTP_REQUEST_CHANNEL_NAME = "http-request-execution";
export const httpRequestChannel = channel(HTTP_REQUEST_CHANNEL_NAME).addTopic(
    topic ("status").type<{
      nodeId: string;
      status: "loading" | "success" | "error";
    }>(),
  );