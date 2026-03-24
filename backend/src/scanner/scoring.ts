import { DetectionResult, RiskReport, Severity, SourceType } from './types';

/**
 * Evaluates a collection of DetectionResults and generates a structured RiskReport.
 */
export function generateRiskReport(findings: DetectionResult[], sourceType: SourceType): RiskReport {
  const counts = {
    critical: findings.filter(f => f.severity === 'Critical').length,
    high: findings.filter(f => f.severity === 'High').length,
    medium: findings.filter(f => f.severity === 'Medium').length,
    low: findings.filter(f => f.severity === 'Low').length
  };

  const overallSeverity = calculateOverallSeverity(counts);

  return {
    timestamp: new Date().toISOString(),
    sourceType,
    totalFindings: findings.length,
    findings,
    summary: {
      criticalCount: counts.critical,
      highCount: counts.high,
      mediumCount: counts.medium,
      lowCount: counts.low
    },
    overallSeverity
  };
}

/**
 * Determines the overall severity of a report based on the maximum severity found.
 */
function calculateOverallSeverity(counts: { critical: number; high: number; medium: number; low: number }): Severity {
  if (counts.critical > 0) return 'Critical';
  if (counts.high > 0) return 'High';
  if (counts.medium > 0) return 'Medium';
  return 'Low';
}
