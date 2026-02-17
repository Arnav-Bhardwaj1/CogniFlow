import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

let handler: ReturnType<typeof toNextJsHandler> | null = null;

const getHandler = async () => {
  if (!handler) {
    const { auth } = await import("@/lib/auth");
    handler = toNextJsHandler(auth);
  }
  return handler;
};

export const GET = async (...args: Parameters<ReturnType<typeof toNextJsHandler>["GET"]>) => (await getHandler()).GET(...args);
export const POST = async (...args: Parameters<ReturnType<typeof toNextJsHandler>["POST"]>) => (await getHandler()).POST(...args);
export const PUT = async (...args: Parameters<ReturnType<typeof toNextJsHandler>["PUT"]>) => (await getHandler()).PUT(...args);
export const PATCH = async (...args: Parameters<ReturnType<typeof toNextJsHandler>["PATCH"]>) => (await getHandler()).PATCH(...args);
export const DELETE = async (...args: Parameters<ReturnType<typeof toNextJsHandler>["DELETE"]>) => (await getHandler()).DELETE(...args);