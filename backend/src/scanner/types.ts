export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export type PatternCategory = 'Secret' | 'PII' | 'Credential' | 'LogPattern';

export type SourceType = 'log' | 'text' | 'env' | 'code' | 'config';

export interface ScannerPattern {
  id: string;
  name: string;
  regex: RegExp;
  category: PatternCategory;
  description: string;
  baselineSeverity: Severity;
}

export interface DetectionResult {
  patternId: string;
  patternName: string;
  category: PatternCategory;
  matchedText: string;
  lineNumber: number;
  lineContent: string;
  contextSnippet: string;
  severity: Severity;
  startIndex: number;
  endIndex: number;
}

export interface RiskReport {
  timestamp: string;
  sourceType: SourceType;
  totalFindings: number;
  findings: DetectionResult[];
  summary: {
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
  };
  overallSeverity: Severity;
}
