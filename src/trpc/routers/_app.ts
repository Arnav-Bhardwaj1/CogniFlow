import { workflowsRouter } from '@/features/workflows/server/routers';
import { createTRPCRouter } from '../init';
import { credentialsRouter } from '@/features/credentials/server/routers';

export const appRouter = createTRPCRouter({ //tRPC router is just group of backend functions (procedures) that belong together
  workflows: workflowsRouter,
  credentials: credentialsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;