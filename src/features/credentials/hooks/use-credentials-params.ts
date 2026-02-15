import { useQueryStates } from "nuqs";
import { credentialsParams } from "../params";

export const useCredentialsParams = () => {
  return useQueryStates(credentialsParams); // useQueryStates is a hook from nuqs that manages query parameters in the URL, it returns the current state and a function to update it
};