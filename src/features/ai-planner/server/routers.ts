import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { generateWorkflowPlan } from "../generate";

export const aiPlannerRouter = createTRPCRouter({
  generateWorkflowPlan: protectedProcedure
    .input(
      z.object({
        intent: z.string().min(1, "Intent is required").max(500),
      })
    )
    .mutation(async ({ input }) => {
      return generateWorkflowPlan(input.intent);
    }),
});
