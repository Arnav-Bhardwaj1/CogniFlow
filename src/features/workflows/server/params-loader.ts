import { createLoader } from "nuqs/server";
import { workflowsParams } from "../params";

export const workflowsParamsLoader = createLoader(workflowsParams); // what does this loader load? It loads the parameters defined in the workflowsParams module. Loading means fetching or retrieving these parameters so they can be used in the application.