import { useQueryStates } from "nuqs";
import { executionsParams } from "../params";

export const useExecutionsParams = () => {
  return useQueryStates(executionsParams); // useQueryStates is a hook from nuqs that manages query parameters in the URL, it returns the current state and a function to update it
};