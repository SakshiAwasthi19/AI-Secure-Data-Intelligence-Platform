import { DetectionResult, RiskReport, Severity, SourceType } from './types';

/**
 * Aggregates individual detection results into a structured RiskReport.
 */
export function generateRiskReport(
  findings: DetectionResult[], 
  sourceType: SourceType,
  options: { mask?: boolean; block_high_risk?: boolean } = {}
): RiskReport {
  const stats = {
    criticalCount: findings.filter(f => f.severity === 'Critical').length,
    highCount: findings.filter(f => f.severity === 'High').length,
    mediumCount: findings.filter(f => f.severity === 'Medium').length,
    lowCount: findings.filter(f => f.severity === 'Low').length
  };

  const totalFindings = findings.length;
  const risk_level = calculateOverallSeverity(stats);
  const risk_score = calculateRiskScore(stats);

  // Policy Engine Logic
  let action: 'blocked' | 'masked' | 'allowed' = 'allowed';
  
  if (options.block_high_risk && risk_level === 'Critical') {
    action = 'blocked';
  } else if (options.mask) {
    action = 'masked';
  }

  return {
    timestamp: new Date().toISOString(),
    sourceType,
    totalFindings,
    findings,
    summary: 'Analyzing results...', // Placeholder, updated by Gemini
    risk_score,
    risk_level,
    action,
    insights: [], // Placeholder, updated by Gemini
    content_type: sourceType,
    stats
  };
}

/**
 * Calculates a numerical risk score (0-100) based on findings.
 */
function calculateRiskScore(stats: { criticalCount: number; highCount: number; mediumCount: number; lowCount: number }): number {
  const score = (stats.criticalCount * 25) + (stats.highCount * 15) + (stats.mediumCount * 5) + (stats.lowCount * 1);
  return Math.min(score, 100);
}

/**
 * Determines the highest severity level present in the findings.
 */
function calculateOverallSeverity(stats: { criticalCount: number; highCount: number; mediumCount: number; lowCount: number }): Severity {
  if (stats.criticalCount > 0) return 'Critical';
  if (stats.highCount > 0) return 'High';
  if (stats.mediumCount > 0) return 'Medium';
  if (stats.lowCount > 0) return 'Low';
  return 'None';
}
