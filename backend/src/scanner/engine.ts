import { DetectionResult, ScannerPattern, Severity, SourceType } from './types';
import { SCANNER_PATTERNS } from './patterns';

/**
 * Core scanning engine that runs all registered patterns against the input text.
 */
export function scanText(text: string, sourceType: SourceType): DetectionResult[] {
  const lines = text.split(/\r?\n/);
  const results: DetectionResult[] = [];

  for (const pattern of SCANNER_PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      const matchedText = match[1] || match[0];
      const startIndex = match.index + (match[0].indexOf(matchedText));
      const endIndex = startIndex + matchedText.length;

      // Find line number and content
      const { lineNumber, lineContent } = findLineInfo(lines, startIndex);

      // Extract context snippet (surrounding text)
      const contextSnippet = extractContext(text, startIndex, endIndex);

      // Calculate context-aware severity
      const severity = calculateSeverity(pattern, sourceType);

      results.push({
        patternId: pattern.id,
        patternName: pattern.name,
        category: pattern.category,
        matchedText,
        lineNumber,
        lineContent,
        contextSnippet,
        severity,
        startIndex,
        endIndex
      });
    }
  }

  return results;
}

/**
 * Finds the line number and the full line content for a given character index.
 */
function findLineInfo(lines: string[], charIndex: number): { lineNumber: number; lineContent: string } {
  let currentPos = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 for the newline
    if (charIndex >= currentPos && charIndex < currentPos + lineLength) {
      return {
        lineNumber: i + 1,
        lineContent: lines[i].trim()
      };
    }
    currentPos += lineLength;
  }
  return { lineNumber: 1, lineContent: lines[0] || '' };
}

/**
 * Extracts a snippet of text around the match for reporting.
 */
function extractContext(text: string, start: number, end: number, padding: number = 40): string {
  const snippetStart = Math.max(0, start - padding);
  const snippetEnd = Math.min(text.length, end + padding);
  let snippet = text.substring(snippetStart, snippetEnd);
  
  if (snippetStart > 0) snippet = '...' + snippet;
  if (snippetEnd < text.length) snippet = snippet + '...';
  
  return snippet.replace(/\r?\n/g, ' ');
}

/**
 * Logic for context-aware severity (Option B as requested by user).
 */
function calculateSeverity(pattern: ScannerPattern, sourceType: SourceType): Severity {
  const baseline = pattern.baselineSeverity;

  // High-risk patterns in sensitive environments
  if ((sourceType === 'log' || sourceType === 'env' || sourceType === 'config') && 
      (pattern.category === 'Secret' || pattern.category === 'Credential')) {
    if (baseline === 'High') return 'Critical';
    return baseline;
  }

  // PII in plain text documents is lower risk
  if (sourceType === 'text' && pattern.category === 'PII') {
    return 'Low';
  }

  return baseline;
}
