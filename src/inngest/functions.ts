
import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { topologicalSort } from "./utils";
import { NodeType } from "@/app/generated/prisma";
import { getExecutor } from "@/features/executions/lib/executor-registry";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow" }, // Triggered when a workflow execution is requested
  async ({ event, step }) => {
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
    const executor = getExecutor (node.type as NodeType);
    context = await executor({
      data: node.data as Record<string, unknown>,
      nodeId: node.id,
      context,
      step,
    });
  }

  return {
    workflowId,
    result: context,
  }; // returns the full workflow with nodes and connections
  },
);