import { NodeExecutor } from "@/features/executions/types";

type HttpRequestData = Record<string, unknown>;

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async( {
  nodeId,
  context,
  step,
}) => {
  // TODO: Publish "loading" state for HTTP request
  const result = await step.run("http-request", async () => context); // For HTTP request, we just pass through the existing context, to go to the next node as there is nothing else to do in HTTP request.
  // TODO: Publish "success" state for HTTP request
  return result;
};