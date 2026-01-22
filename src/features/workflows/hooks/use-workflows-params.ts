import { useQueryStates } from "nuqs";
import { workflowsParams } from "../params";

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams); // useQueryStates is a hook from nuqs that manages query parameters in the URL, it returns the current state and a function to update it
};