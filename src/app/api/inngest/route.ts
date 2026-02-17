import { serve } from "inngest/next";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

// Lazy-load to avoid build-time evaluation
let handler: ReturnType<typeof serve> | null = null;

const getHandler = async () => {
  if (!handler) {
    const { inngest } = await import("@/inngest/client");
    const { executeWorkflow } = await import("@/inngest/functions");
    
    handler = serve({
      client: inngest,
      functions: [
        executeWorkflow,
      ],
    });
  }
  return handler;
};

export const GET = async (req: NextRequest, ctx: unknown) => (await getHandler()).GET(req, ctx);
export const POST = async (req: NextRequest, ctx: unknown) => (await getHandler()).POST(req, ctx);
export const PUT = async (req: NextRequest, ctx: unknown) => (await getHandler()).PUT(req, ctx);