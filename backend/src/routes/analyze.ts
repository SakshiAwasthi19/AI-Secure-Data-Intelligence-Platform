import { Hono } from 'hono';
import { scanText } from '../scanner/engine';
import { generateRiskReport } from '../scanner/scoring';
import { SourceType } from '../scanner/types';

const analyze = new Hono();

analyze.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { text, sourceType = 'text' } = body;

    if (!text) {
      return c.json({ error: 'No text provided for analysis' }, 400);
    }

    const findings = scanText(text, sourceType as SourceType);
    const report = generateRiskReport(findings, sourceType as SourceType);

    return c.json(report);
  } catch (err) {
    // Fallback for non-JSON bodies (plain text)
    const text = await c.req.text();
    if (!text) return c.json({ error: 'Invalid request body' }, 400);

    const findings = scanText(text, 'text');
    const report = generateRiskReport(findings, 'text');
    return c.json(report);
  }
});

export default analyze;
