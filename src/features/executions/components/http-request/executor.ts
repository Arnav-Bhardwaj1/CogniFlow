import { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

type HttpRequestData = {
  variableName?: string;
  endpoint?: string;  
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
}

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async( {
  data,
  nodeId,
  context,
  step,
}) => {
  // TODO: Publish "loading" state for HTTP request
  
  if (!data.endpoint) {
  // TODO: Publish "error" state for http request
  throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }
  if(!data.variableName) {
    throw new NonRetriableError("HTTP Request node: No variable name configured");
  }

  const result = await step.run("http-request",
    async () => {
      const endpoint = data.endpoint!;
      const method = data.method || "GET";
      const options: KyOptions = { method }; // KyOptions = typed request configuration for ky. configuration means the options that can be passed to ky when making a request. method is the HTTP method to use for the request (e.g., GET, POST, etc.). By default, it will use "GET" if no method is specified in the data.
      if (["POST", "PUT", "PATCH"]. includes (method)) {
        options.body = data.body; // Attach request payload if present. Prevent sending body for methods that typically don't have it (e.g., GET, DELETE).
        options.headers = { "Content-Type": "application/json" }; // Set content type for JSON payloads. This is important for the server to correctly parse the request body.
      }
      const response = await ky(endpoint, options);
      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
      
      const responsePayload = {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        }
      };

      if (data.variableName) {
        return {
          ...context,
          [data.variableName]: responsePayload,
        }
      }

      // Fallback to direct httpResponse for backward compatibility, meaning if variableName is not provided, the response will be stored under httpResponse key in the context.
      return {
        ...context,
        ...responsePayload,
      };
    });
  // TODO: Publish "success" state for HTTP request
  return result;
};