import { DetectionResult, RiskReport, Severity, SourceType } from './types';

/**
 * Aggregates individual detection results into a structured RiskReport.
 */
export function generateRiskReport(findings: DetectionResult[], sourceType: SourceType): RiskReport {
  const summary = {
    criticalCount: findings.filter(f => f.severity === 'Critical').length,
    highCount: findings.filter(f => f.severity === 'High').length,
    mediumCount: findings.filter(f => f.severity === 'Medium').length,
    lowCount: findings.filter(f => f.severity === 'Low').length
  };

  const totalFindings = findings.length;
  const overallSeverity = calculateOverallSeverity(summary);

  return {
    timestamp: new Date().toISOString(),
    sourceType,
    totalFindings,
    findings,
    summary,
    overallSeverity
  };
}

/**
 * Determines the highest severity level present in the findings.
 */
function calculateOverallSeverity(summary: { 
  criticalCount: number; 
  highCount: number; 
  mediumCount: number; 
  lowCount: number; 
}): Severity {
  if (summary.criticalCount > 0) return 'Critical';
  if (summary.highCount > 0) return 'High';
  if (summary.mediumCount > 0) return 'Medium';
  if (summary.lowCount > 0) return 'Low';
  return 'Low'; // Default for no findings
}
