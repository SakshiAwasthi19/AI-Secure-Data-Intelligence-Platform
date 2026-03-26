export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'None';

export type PatternCategory = 'Secret' | 'PII' | 'Credential' | 'LogPattern';

export type SourceType = 'log' | 'text' | 'env' | 'code' | 'config' | 'sql' | 'chat';

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
  summary: string; // Changed from object to string for Phase 3
  risk_score: number;
  risk_level: Severity;
  action: 'blocked' | 'masked' | 'allowed';
  insights: string[];
  content_type: string;
  stats: { // Moved counts here to keep summary as a string
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
  };
}
