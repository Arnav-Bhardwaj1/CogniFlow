import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";
/**
  * Hook to fetch all workflows using suspense
  */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params)); // queryOptions generates the query key and fetch function for the workflows.getMany endpoint with the given params
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient(); // to invalidate queries after mutation, controls cached API data

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({})); // Invalidate the workflows list (Marks workflow list as stale) query to refetch updated data
        return data;
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    })
  );
};