import { DetectionResult, SourceType } from '../scanner/types';
import { SCANNER_PATTERNS } from '../scanner/patterns';
import { calculateSeverity } from '../scanner/engine';

/**
 * Analyzes log text line-by-line using ALL available patterns.
 * Ensures accurate line number reporting and context-aware severity.
 */
export function analyzeLog(text: string, sourceType: SourceType = 'log'): DetectionResult[] {
  const lines = text.split(/\r?\n/);
  const results: DetectionResult[] = [];

  lines.forEach((lineContent, index) => {
    const lineNumber = index + 1;
    
    for (const pattern of SCANNER_PATTERNS) {
      // Create a fresh regex instance since the one in PATTERNS might have a different lastIndex or flags
      // We use the pattern's regex but ensure it treats the line as the single input
      const regex = new RegExp(pattern.regex.source, 'gi');
      let match;

      while ((match = regex.exec(lineContent)) !== null) {
        // Handle captured groups or full match
        const matchedText = match[1] || match[0];
        const startIndex = match.index + (match[0].indexOf(matchedText));
        const endIndex = startIndex + matchedText.length;

        results.push({
          patternId: pattern.id,
          patternName: pattern.name,
          category: pattern.category,
          matchedText,
          lineNumber,
          lineContent,
          contextSnippet: lineContent, // The entire line is the context for logs
          severity: calculateSeverity(pattern, sourceType),
          startIndex,
          endIndex,
        });
      }
    }
  });

  return results;
}
