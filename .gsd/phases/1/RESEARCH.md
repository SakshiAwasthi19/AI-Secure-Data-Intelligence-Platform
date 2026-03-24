# RESEARCH.md — Phase 1: Foundation & Detection Engine

## Objective
Identify the most efficient and Hono-compatible methods for text extraction and sensitive data detection in TypeScript.

## Findings

### 1. Text Extraction (No Python)
- **PDF**: `pdf-parse` is the most reliable pure-JS option. It works by parsing the PDF stream and extracting text content.
- **DOCX**: `mammoth.js` is highly recommended as it focuses on semantic extraction rather than visual layout, which is perfect for security scanning.
- **Text/Logs**: Standard `fs` or `stream` reading in Node.js/Hono.

### 2. Regex Strategy
- **Secrets**: Patterns for AWS Keys (`AKIA...`), Slack Tokens, SSH Private Keys, and generic high-entropy strings.
- **PII**: Emails, Phone Numbers (global patterns), and common credential keywords (password, secret, token).

### 3. Risk Scoring (Context-Aware)
- **High/Critical**: Sensitive data (Passwords, API Keys) found in sensitive contexts like `.log`, `.env`, or configuration files.
- **Medium**: PII (Emails, Phone Numbers) found in structured logs or data exports.
- **Low**: PII found in plain text docs or isolated suspicious patterns with low impact.
- **Dynamic**: The `RiskEngine` will weigh the `PatternType` against the `SourceType`.

## Recommendations
- Implement a `ScannerService` that uses a registry of `Pattern` objects.
- Each `Pattern` should have a Regex, a Category, and a Default Severity.
- Use `pdf-parse` and `mammoth` as optional adapters.
