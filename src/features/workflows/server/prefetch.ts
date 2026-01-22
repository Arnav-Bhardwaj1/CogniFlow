import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";
type Input = inferInput<typeof trpc.workflows.getMany>;
/**
  * Prefetch all workflows
*/
export const prefetchWorkflows = (params: Input) => {
    return prefetch(trpc.workflows.getMany.queryOptions (params));
};

// queryOptions builds a fully configured React Query query object for a tRPC procedure. It tells React Query how to fetch, cache, and identify this query.