import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { sizeLimitMiddleware } from './middleware/sizeLimit';
import analyze from './routes/analyze';

// Polyfill DOMMatrix for node environment (required by pdfjs-dist)
if (typeof global.DOMMatrix === 'undefined') {
  (global as any).DOMMatrix = class DOMMatrix {
    constructor() {}
    static fromFloat32Array() { return new DOMMatrix(); }
    static fromFloat64Array() { return new DOMMatrix(); }
  };
}

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('/api/analyze', sizeLimitMiddleware);

// Routes
app.route('/api/analyze', analyze);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', version: '1.0.0' }));

// Global Error Handler
app.onError((err, c) => {
  console.error('[SERVER ERROR]', err);
  return c.json({
    error: 'Internal Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  }, 500);
});

const port = 3001;
console.log(`Scanner API is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
