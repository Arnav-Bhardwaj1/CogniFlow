
import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { ExecutionStatus, NodeType } from "@/app/generated/prisma";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { httpRequestChannel } from "./channels/http-request";
import { manualTriggerChannel } from "./channels/manual-trigger";
import { googleFormTriggerChannel } from "./channels/google-form-trigger";
import { razorpayTriggerChannel } from "./channels/razorpay-trigger";
import { geminiChannel } from "./channels/gemini";
import { openaiChannel } from "./channels/openai";
import { anthropicChannel } from "./channels/anthropic";
import { discordChannel } from "./channels/discord";
import { slackChannel } from "./channels/slack";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow",
    retries:0,
    onFailure: async ({ event, step }) => {
      return prisma.execution.update({
        where: { inngestEventId: event.data.event.id},
        data: {
          status: ExecutionStatus.FAILED,
          error: event.data.error.message,
          errorStack: event.data.error.stack,
        }
      })
    },
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
      discordChannel(),
      slackChannel(),
    ], // This allows the workflow execution function to publish real-time updates to the "http-request-execution" channel, which can be listened to by the frontend to update the UI with the status of HTTP request nodes as they are executed.
  }, 
  async ({ event, step, publish }) => {
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId;

    if (!workflowId || !inngestEventId) {
      throw new NonRetriableError("Workflow ID or Inngest Event ID is missing");
    }

  await step.run("create-execution", async () => {
    return prisma.execution.create({
      data: {
        inngestEventId, // Use the Inngest event ID as the execution ID for easy correlation.
        workflowId,
      },
    });
  });
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

  const userId = await step.run("find-user-id", async () => {
    const workflow = await prisma.workflow. findUniqueOrThrow({
      where: { id: workflowId },
      select: {
        userId: true,
      },
    });
    return workflow.userId;
  })

  // Initialize context with any initial data from the trigger
  
  let context = event.data.initialData || {}; // It initializes a shared state object (context) using any data that came from the trigger (Google Form submission). If nothing came in, it starts with an empty object. Example: { email: "user@example.com" }, which can be used by subsequent nodes in the workflow.

  // Execute each node
  for (const node of sortedNodes) {
    const executor = getExecutor(node.type as NodeType);
    context = await executor({
      data: node.data as Record<string, unknown>,
      nodeId: node.id,
      context,
      userId,
      step,
      publish, // publish function allows executors to send real-time updates to the frontend via channels, enabling features like live status updates for HTTP request nodes.
    });
  }
  await step.run("update-execution", async () => {
    return prisma.execution.update({
      where: { inngestEventId, workflowId },
      data: {
        status: ExecutionStatus.SUCCESS,
        completedAt: new Date(),
        output: context,
      }
    })
  })
  return {
    workflowId,
    result: context,
  }; // returns the full workflow with nodes and connections
  },
);