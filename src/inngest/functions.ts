
import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { NodeType } from "@/app/generated/prisma";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { httpRequestChannel } from "./channels/http-request";
import { manualTriggerChannel } from "./channels/manual-trigger";
import { googleFormTriggerChannel } from "./channels/google-form-trigger";
import { razorpayTriggerChannel } from "./channels/razorpay-trigger";
import { geminiChannel } from "./channels/gemini";
import { openaiChannel } from "./channels/openai";
import { anthropicChannel } from "./channels/anthropic";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow",
    retries:0,
  },
  {
    event: "workflows/execute.workflow", // Triggered when a workflow execution is requested.
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      razorpayTriggerChannel(),
      geminiChannel(),
      openaiChannel(),
      anthropicChannel(),
    ], // This allows the workflow execution function to publish real-time updates to the "http-request-execution" channel, which can be listened to by the frontend to update the UI with the status of HTTP request nodes as they are executed.
  }, 
  async ({ event, step, publish }) => {
    const workflowId = event.data.workflowId;

    if (!workflowId) {
      throw new NonRetriableError("Workflow ID is missing");
    }
  const sortedNodes = await step.run("prepare-workflow", async () => { // for getting the nodes of the workflow and sorting them topologically
    const workflow = await prisma.workflow.findUniqueOrThrow({
      where: { id: workflowId },
      include: {
        nodes: true,
        connections: true,
      },
    });
    return topologicalSort( workflow.nodes, workflow.connections );
  });

  // Initialize context with any initial data from the trigger
  
  let context = event.data.initialData || {}; // It initializes a shared state object (context) using any data that came from the trigger (Google Form submission). If nothing came in, it starts with an empty object. Example: { email: "user@example.com" }, which can be used by subsequent nodes in the workflow.

  // Execute each node
  for (const node of sortedNodes) {
    const executor = getExecutor(node.type as NodeType);
    context = await executor({
      data: node.data as Record<string, unknown>,
      nodeId: node.id,
      context,
      step,
      publish, // publish function allows executors to send real-time updates to the frontend via channels, enabling features like live status updates for HTTP request nodes.
    });
  }

  return {
    workflowId,
    result: context,
  }; // returns the full workflow with nodes and connections
  },
);