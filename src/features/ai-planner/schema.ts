import { z } from "zod";

/**
 * Supported node types for AI-generated workflow plans.
 * These map directly to the Prisma NodeType enum values.
 */
const TRIGGER_TYPES = ["MANUAL_TRIGGER", "GOOGLE_FORM_TRIGGER", "RAZORPAY_TRIGGER"] as const;
const ACTION_TYPES = ["HTTP_REQUEST", "OPENAI", "ANTHROPIC", "GEMINI", "DISCORD", "SLACK"] as const;
const ALL_SUPPORTED_TYPES = [...TRIGGER_TYPES, ...ACTION_TYPES] as const;

export const workflowPlanNodeSchema = z.object({
  id: z.string().min(1),
  type: z.enum(ALL_SUPPORTED_TYPES),
  name: z.string().min(1),
  config: z.record(z.string(), z.any()).default({}),
});

export const workflowPlanEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
});

export const workflowPlanSchema = z
  .object({
    nodes: z.array(workflowPlanNodeSchema),
    edges: z.array(workflowPlanEdgeSchema),
  })
  .refine(
    (plan) => plan.nodes.length === 0 || plan.nodes.length <= 6,
    { message: "Workflow plan must have at most 6 nodes" }
  )
  .refine(
    (plan) => {
      if (plan.nodes.length === 0) return true; // empty plan is valid (no results)
      const triggerCount = plan.nodes.filter((n) =>
        (TRIGGER_TYPES as readonly string[]).includes(n.type)
      ).length;
      return triggerCount === 1;
    },
    { message: "Workflow plan must have exactly one trigger node" }
  )
  .refine(
    (plan) => {
      if (plan.nodes.length === 0) return true;
      const ids = plan.nodes.map((n) => n.id);
      return new Set(ids).size === ids.length;
    },
    { message: "All node IDs must be unique" }
  )
  .refine(
    (plan) => {
      if (plan.nodes.length === 0) return true;
      const nodeIds = new Set(plan.nodes.map((n) => n.id));
      return plan.edges.every(
        (e) => nodeIds.has(e.from) && nodeIds.has(e.to)
      );
    },
    { message: "All edges must reference existing node IDs" }
  );

export type WorkflowPlan = z.infer<typeof workflowPlanSchema>;
export type WorkflowPlanNode = z.infer<typeof workflowPlanNodeSchema>;
export type WorkflowPlanEdge = z.infer<typeof workflowPlanEdgeSchema>;

export const EMPTY_PLAN: WorkflowPlan = { nodes: [], edges: [] };

export { TRIGGER_TYPES, ACTION_TYPES, ALL_SUPPORTED_TYPES };
