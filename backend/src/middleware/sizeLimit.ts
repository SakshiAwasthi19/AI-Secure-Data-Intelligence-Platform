import { Context, Next } from 'hono';

/**
 * Middleware to enforce a maximum payload size of 5MB.
 * Rejects requests with 413 Payload Too Large if Content-Length exceeds the limit.
 */
export const sizeLimitMiddleware = async (c: Context, next: Next) => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const contentLength = c.req.header('Content-Length');

  if (contentLength && parseInt(contentLength, 10) > MAX_SIZE) {
    return c.json(
      {
        error: 'Payload Too Large',
        message: 'File size exceeds the 5MB limit.',
      },
      413
    );
  }

  await next();
};
