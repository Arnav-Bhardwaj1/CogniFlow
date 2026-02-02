import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async( {
  nodeId,
  context,
  step,
}) => {
  // TODO: Publish "loading" state for manual trigger
  const result = await step.run("manual-trigger", async () => context); // For manual trigger, we just pass through the existing context, to go to the next node as there is nothing else to do in manual trigger.
  // TODO: Publish "success" state for manual trigger
  return result;
};