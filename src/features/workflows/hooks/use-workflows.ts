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

/**
  * Hook to fetch a single workflow using suspense
  */
export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({
  id }));
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

export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation( // useMutation for delete, update, create operations
    trpc.workflows.remove.mutationOptions({ // mutationOptions generates the mutation function and key for the workflows.remove endpoint. mutationOptions accepts onSuccess and onError callbacks
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" removed`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({ id: data.id })); // Invalidate the specific workflow query to remove it from cache. this prevents stale data if user navigates back to deleted workflow. (i.e. If the user is on the workflow’s detail page, that cache must also be cleared.)
      },
      onError: (error) => {
        toast.error(`Failed to remove workflow: ${error.message}`);
      },
    })
  );
};

export const useUpdateWorkflowName = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} updated`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id })
        )
      },
      onError: (error) => {
        toast.error(`Failed to update workflow: ${error.message}`);
      },
    })
  );
};

// Hook to update a workflow
export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: (data) => {
        toast.success( `Workflow "${data.name}" saved`);
        queryClient. invalidateQueries (
          trpc.workflows.getMany.queryOptions({}),
        );
        queryClient.invalidateQueries (
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.error(`Failed to save workflow: ${error.message}`);
      },
    }),
  );
}

/**
  * Hook to execute a workflow
  */
export const useExecuteWorkflow = () => {
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.execute.mutationOptions({
        onSuccess: (data) => {
          toast.success( `Workflow "${data.name}" executed`);
        },
        onError: (error) =>{
          toast.error(`Failed to execute workflow: ${error.
          message}`);
        },
    }),
  );
};