import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { workflowPlanSchema, EMPTY_PLAN, type WorkflowPlan } from "./schema";
import { WORKFLOW_PLANNER_SYSTEM_PROMPT } from "./prompt";

export type GeneratePlanResult = {
  plan: WorkflowPlan;
  message?: string;
};

/**
 * Generates a workflow plan from a natural-language intent using Gemini.
 * Returns EMPTY_PLAN (with an optional message) on any failure.
 */
export async function generateWorkflowPlan(
  intent: string
): Promise<GeneratePlanResult> {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: WORKFLOW_PLANNER_SYSTEM_PROMPT,
      prompt: intent,
    });

    // Strip markdown code fences if the model wraps the JSON
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // If the LLM returned an empty plan with a message, surface it
    if (
      parsed.nodes?.length === 0 &&
      typeof parsed.message === "string" &&
      parsed.message.length > 0
    ) {
      return { plan: EMPTY_PLAN, message: parsed.message };
    }

    const result = workflowPlanSchema.safeParse(parsed);

    if (!result.success) {
      console.error(
        "[AI Planner] Validation failed:",
        result.error.issues
      );
      return {
        plan: EMPTY_PLAN,
        message: `Generated plan was invalid: ${result.error.issues.map((i) => i.message).join(". ")}`,
      };
    }

    return { plan: result.data };
  } catch (error) {
    console.error("[AI Planner] Generation failed:", error);

    // Detect rate limit errors
    const errorMessage =
      error instanceof Error && error.message?.includes("quota")
        ? "AI rate limit reached. Please wait for limit to reset or add more credits to your AI account."
        : "Something went wrong while generating the workflow. Please try again.";

    return {
      plan: EMPTY_PLAN,
      message: errorMessage,
    };
  }
}

