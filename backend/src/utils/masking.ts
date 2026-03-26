import { DetectionResult } from '../scanner/types';

/**
 * Redacts sensitive data from text based on detected findings.
 * Used for privacy-first AI analysis to ensure secrets never leave the environment.
 * 
 * @param text The original text to mask
 * @param findings Array of detection results found in the text
 * @returns Masked text with sensitive parts replaced by placeholders
 */
export function maskSensitiveData(text: string, findings: DetectionResult[]): string {
  if (!findings || findings.length === 0) return text;

  // Sort findings by startIndex in descending order to avoid index shifting during replacement
  const sortedFindings = [...findings].sort((a, b) => b.startIndex - a.startIndex);

  let maskedText = text;

  for (const finding of sortedFindings) {
    const prefix = maskedText.substring(0, finding.startIndex);
    const suffix = maskedText.substring(finding.endIndex);
    const placeholder = `[REDACTED_${finding.category.toUpperCase()}]`;
    
    maskedText = prefix + placeholder + suffix;
  }

  return maskedText;
}
