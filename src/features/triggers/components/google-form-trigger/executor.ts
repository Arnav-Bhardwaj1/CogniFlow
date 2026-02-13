import { NodeExecutor } from "@/features/executions/types";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

type GoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: NodeExecutor<GoogleFormTriggerData> = async( {
  nodeId,
  context,
  step,
  publish
}) => {
  await publish(
    googleFormTriggerChannel().status({
    nodeId,
    status: "loading",
    }),
);

  const result = await step.run("google-form-trigger", async () => context); // For google form trigger, we just pass through the existing context, to go to the next node as there is nothing else to do in the trigger node. We want to pass the existing context because it may contain useful information that the user wants to use in subsequent nodes, such as form responses or metadata. By passing the existing context, we allow users to access and utilize that information in their workflow without losing it at the trigger step.
  
  await publish(
    googleFormTriggerChannel().status({
    nodeId,
    status: "success",
    }),
);
  return result;
};