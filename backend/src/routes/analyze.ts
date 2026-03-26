import { Hono } from 'hono';
import { scanText } from '../scanner/engine';
import { generateRiskReport } from '../scanner/scoring';
import { SourceType } from '../scanner/types';
import { extractTextFromFile } from '../utils/extractor';
import { analyzeLog } from '../logAnalyzer';

const analyze = new Hono();

analyze.post('/', async (c) => {
  let text = '';
  let sourceType: SourceType = 'text';

  const contentType = c.req.header('Content-Type');

  if (contentType?.includes('multipart/form-data')) {
    const body = await c.req.parseBody();
    const file = body['file'];
    
    if (file instanceof File) {
      text = await extractTextFromFile(file);
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'log') sourceType = 'log';
    } else if (typeof body['text'] === 'string') {
      text = body['text'];
    }
    
    if (typeof body['sourceType'] === 'string') {
      sourceType = body['sourceType'] as SourceType;
    }
  } else {
    try {
      const body = await c.req.json();
      text = body.text;
      sourceType = (body.sourceType as SourceType) || 'text';
    } catch (err) {
      text = await c.req.text();
    }
  }

  if (!text) {
    return c.json({ error: 'No text or file provided for analysis' }, 400);
  }

  const findings = sourceType === 'log' 
    ? analyzeLog(text, sourceType) 
    : scanText(text, sourceType);

  const report = generateRiskReport(findings, sourceType);

  return c.json(report);
});

export default analyze;
