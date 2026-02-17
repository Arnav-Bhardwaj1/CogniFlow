import { createLoader } from "nuqs/server";
import { executionsParams } from "../params";

export const executionsParamsLoader = createLoader(executionsParams); // what does this loader load? It loads the parameters defined in the executionsParams module. Loading means fetching or retrieving these parameters so they can be used in the application. 
/* Why It's Needed: For Server-Side Parameter Access:-
-- nuqs (Next.js URL Query State) has separate APIs for client and server
-- The createLoader() function wraps the params schema to make it usable in Server Components and Server Actions
-- Without this, you can't read URL search params in server-side code */