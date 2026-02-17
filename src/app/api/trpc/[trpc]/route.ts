import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const handler = async (req: Request) => {
  const { appRouter } = await import('@/trpc/routers/_app');
  const { createTRPCContext } = await import('@/trpc/init');
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
};
export { handler as GET, handler as POST };