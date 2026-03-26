import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import analyze from './src/routes/analyze';

const app = new Hono();
app.get('/', (c) => c.text('Hello Hono!'));

console.log('Server starting on port 3001...');
serve({
  fetch: app.fetch,
  port: 3001
});
