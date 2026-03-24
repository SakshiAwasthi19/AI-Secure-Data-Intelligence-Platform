import { ScannerPattern } from './types';

export const SCANNER_PATTERNS: ScannerPattern[] = [
  // SECRETS
  {
    id: 'aws-access-key',
    name: 'AWS Access Key ID',
    regex: /(?<=^|[^A-Z0-9])(AKIA[0-9A-Z]{16})(?=$|[^A-Z0-9])/g,
    category: 'Secret',
    description: 'Amazon Web Services Access Key ID',
    baselineSeverity: 'Critical'
  },
  {
    id: 'ssh-private-key',
    name: 'SSH Private Key',
    regex: /-----BEGIN (?:RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY-----/g,
    category: 'Secret',
    description: 'Unencrypted SSH or PGP Private Key',
    baselineSeverity: 'Critical'
  },
  {
    id: 'github-token',
    name: 'GitHub Personal Access Token',
    regex: /ghp_[a-zA-Z0-9]{36}/g,
    category: 'Secret',
    description: 'GitHub Personal Access Token',
    baselineSeverity: 'Critical'
  },
  {
    id: 'slack-token',
    name: 'Slack Token',
    regex: /xox[baprs]-[0-9a-zA-Z]{10,48}/g,
    category: 'Secret',
    description: 'Slack API or Bot Token',
    baselineSeverity: 'Critical'
  },

  // PII
  {
    id: 'email-address',
    name: 'Email Address',
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    category: 'PII',
    description: 'Generic email metadata',
    baselineSeverity: 'Medium'
  },
  {
    id: 'phone-number',
    name: 'Phone Number',
    regex: /\b(?:\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}\b/g,
    category: 'PII',
    description: 'Phone number pattern',
    baselineSeverity: 'Medium'
  },

  // CREDENTIALS
  {
    id: 'generic-password',
    name: 'Hardcoded Password',
    regex: /(?:password|passwd|pwd|secret|auth_token)\s*[:=]\s*["']([^"']+)["']/gi,
    category: 'Credential',
    description: 'Potential hardcoded password or credential',
    baselineSeverity: 'High'
  },

  // LOG PATTERNS
  {
    id: 'db-connection-string',
    name: 'DB Connection String',
    regex: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis):\/\/[^"'\s]+/g,
    category: 'Credential',
    description: 'Database connection string with potential credentials',
    baselineSeverity: 'High'
  },
  {
    id: 'auth-failure-log',
    name: 'Authentication Failure Log',
    regex: /(?:login failed|authentication failed|unauthorized access|invalid credentials|permission denied)/gi,
    category: 'LogPattern',
    description: 'Evidence of failed authentication attempts in logs',
    baselineSeverity: 'Low'
  },
  {
    id: 'stack-trace',
    name: 'Stack Trace',
    regex: /\bat\s+[a-zA-Z0-9._$]+\s*\([^)]+\)|\b[a-zA-Z0-9._$]+\.[a-zA-Z0-9._$]+Exception:\s+/g,
    category: 'LogPattern',
    description: 'Exposed stack trace which may reveal internal path structures',
    baselineSeverity: 'Low'
  }
];
