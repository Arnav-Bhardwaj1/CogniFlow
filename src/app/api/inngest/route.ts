import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({ // this line means It means: When Inngest sends a GET, POST, or PUT request to this endpoint (api/inngest), these functions will handle those requests.
  client: inngest,
  functions: [
    helloWorld,
  ],
});