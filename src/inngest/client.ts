import { Inngest } from "inngest";
import { realtimeMiddleware } from "@inngest/realtime/middleware";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "CogniFlow",
  middleware: [realtimeMiddleware()], // This enables real-time updates from your Inngest workflows. So we can show green checkmarks and red X's in the nodes as steps succeed or fail, while the workflow is running in the Inngest dashboard.
});
