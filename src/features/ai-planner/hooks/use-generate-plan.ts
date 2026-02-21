import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook to generate an AI workflow plan via tRPC mutation.
 */
export const useGenerateWorkflowPlan = () => {
  const trpc = useTRPC();

  return useMutation(
    trpc.aiPlanner.generateWorkflowPlan.mutationOptions({
      onError: (error) => {
        toast.error(`Failed to generate workflow: ${error.message}`);
      },
    })
  );
};
