import { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";
import  Handlebars  from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";
import { tr } from "date-fns/locale";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars. SafeString(jsonString);
  return safeString;
});

type HttpRequestData = {
  variableName: string;
  endpoint: string;  
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
}

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async( {
  data,
  nodeId,
  context,
  step,
  publish,  
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    }),
  );
  
  if (!data.endpoint) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );
  throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }
  if(!data.variableName) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("HTTP Request node: No variable name configured");
  }
  if(!data.method){
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError("HTTP Request node: No HTTP method configured");
  }
try {
  const result = await step.run("http-request",
    async () => {
      const endpoint = Handlebars.compile(data.endpoint)(context); // Process endpoint with Handlebars to allow dynamic URLs based on context variables. This enables users to include placeholders in the endpoint that will be replaced with actual values from the execution context at runtime.
      const method = data.method;
      const options: KyOptions = { method }; // KyOptions = typed request configuration for ky. configuration means the options that can be passed to ky when making a request. method is the HTTP method to use for the request (e.g., GET, POST, etc.). By default, it will use "GET" if no method is specified in the data.

      if (["POST", "PUT", "PATCH"]. includes (method)) {
        const resolved = Handlebars.compile(data.body || "{}") (context);
        JSON.parse(resolved); // Validate that the body is valid JSON after processing with Handlebars. This ensures that any dynamic content in the body is correctly formatted as JSON before sending the request. If the body is not valid JSON, this will throw an error, preventing the request from being sent with an invalid payload.
        options.body = resolved; // Attach request payload if present. Prevent sending body for methods that typically don't have it (e.g., GET, DELETE).
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

      return {
        ...context,
        [data.variableName]: responsePayload,
      }

    });
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "success",
    }),
  );
  return result;
} catch (error) {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "error",
    }),
  );
  throw error;
  }
};