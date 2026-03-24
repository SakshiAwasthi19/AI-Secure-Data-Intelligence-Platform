import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateRiskReport } from '../scoring';
import { DetectionResult } from '../types';

describe('Scoring Engine', () => {
  it('should generate a report with Critical overall severity if a critical finding exists', () => {
    const findings: DetectionResult[] = [
      { patternId: 'p1', patternName: 'P1', category: 'Secret', matchedText: 'match', lineNumber: 1, lineContent: 'line', contextSnippet: 'snippet', severity: 'Critical', startIndex: 0, endIndex: 5 },
      { patternId: 'p2', patternName: 'P2', category: 'PII', matchedText: 'match', lineNumber: 2, lineContent: 'line', contextSnippet: 'snippet', severity: 'Low', startIndex: 10, endIndex: 15 }
    ];
    
    const report = generateRiskReport(findings, 'log');
    
    assert.strictEqual(report.overallSeverity, 'Critical');
    assert.strictEqual(report.summary.criticalCount, 1);
    assert.strictEqual(report.summary.lowCount, 1);
    assert.strictEqual(report.totalFindings, 2);
  });

  it('should generate a report with High overall severity if high findings exist and no critical findings', () => {
    const findings: DetectionResult[] = [
      { patternId: 'p1', patternName: 'P1', category: 'Credential', matchedText: 'match', lineNumber: 1, lineContent: 'line', contextSnippet: 'snippet', severity: 'High', startIndex: 0, endIndex: 5 },
      { patternId: 'p2', patternName: 'P2', category: 'PII', matchedText: 'match', lineNumber: 2, lineContent: 'line', contextSnippet: 'snippet', severity: 'Medium', startIndex: 10, endIndex: 15 }
    ];
    
    const report = generateRiskReport(findings, 'log');
    
    assert.strictEqual(report.overallSeverity, 'High');
    assert.strictEqual(report.summary.highCount, 1);
    assert.strictEqual(report.summary.mediumCount, 1);
  });

  it('should generate a report with Low overall severity if no findings are present', () => {
    const report = generateRiskReport([], 'text');
    
    assert.strictEqual(report.overallSeverity, 'Low');
    assert.strictEqual(report.totalFindings, 0);
  });
});
