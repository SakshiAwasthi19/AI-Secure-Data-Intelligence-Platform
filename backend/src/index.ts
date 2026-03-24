import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import analyze from './routes/analyze';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Routes
app.route('/api/analyze', analyze);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', version: '1.0.0' }));

const port = 3001;
console.log(`Scanner API is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
