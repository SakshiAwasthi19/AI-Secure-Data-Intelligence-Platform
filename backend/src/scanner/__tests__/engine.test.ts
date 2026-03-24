import { describe, it } from 'node:test';
import assert from 'node:assert';
import { scanText } from '../engine';

describe('Scanner Engine', () => {
  it('should detect AWS Access Keys', () => {
    const text = 'Here is my key: AKIA1234567890ABCDEF in the log';
    const results = scanText(text, 'log');
    
    const ids = results.map(r => r.patternId);
    assert.strictEqual(results.length, 1, `Expected 1 match, found ${results.length}: ${ids.join(', ')}`);
    assert.strictEqual(results[0].patternId, 'aws-access-key');
    assert.strictEqual(results[0].patternId, 'aws-access-key');
    assert.strictEqual(results[0].matchedText, 'AKIA1234567890ABCDEF');
    assert.strictEqual(results[0].severity, 'Critical');
  });

  it('should detect Email Addresses with context-aware severity', () => {
    const text = 'Contact me at test@example.com';
    
    // In logs -> Medium
    const logResults = scanText(text, 'log');
    assert.strictEqual(logResults[0].severity, 'Medium');
    
    // In plain text -> Low
    const textResults = scanText(text, 'text');
    assert.strictEqual(textResults[0].severity, 'Low');
  });

  it('should correctly report line numbers', () => {
    const text = `Line 1
Line 2 with AKIA1234567890ABCDEF
Line 3`;
    const results = scanText(text, 'log');
    
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].lineNumber, 2);
    assert.strictEqual(results[0].lineContent, 'Line 2 with AKIA1234567890ABCDEF');
  });

  it('should detect multiple different patterns', () => {
    const text = 'AWS: AKIA1234567890ABCDEF and Email: dev@gsd.ai';
    const results = scanText(text, 'log');
    
    assert.strictEqual(results.length, 2, `Expected 2 matches, found ${results.length}: ${results.map(r => r.patternId).join(', ')}`);
    const ids = results.map(r => r.patternId);
    assert.ok(ids.includes('aws-access-key'));
    assert.ok(ids.includes('email-address'));
  });
});
