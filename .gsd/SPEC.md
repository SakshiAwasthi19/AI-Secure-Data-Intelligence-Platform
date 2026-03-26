# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A high-performance web dashboard that provides instant security risk analysis for uploaded files and raw text, leveraging regex for pattern matching and Gemini Flash for plain-English insights.

## Goals
1. **Instant Input Processing**: Allow users to upload local files (PDF, DOC, TXT, LOG) or paste raw text/logs for immediate analysis.
2. **Robust Sensitive Data Detection**: Detect emails, passwords, API keys, hardcoded secrets, and suspicious log patterns using a dual Regex + AI approach.
3. **AI-Powered Insights**: Generate human-readable summaries of detected risks and anomalies using Gemini Flash.
4. **Structured Risk Reporting**: Display results in a clean, professional dashboard with severity scoring from a custom Risk Engine.

## Non-Goals (Out of Scope)
- No SQL injection or dependency vulnerability scanning in the MVP.
- No integration with cloud storage (S3/Azure) or log aggregators (Splunk/ELK).
- No Python-based services; the entire stack is TypeScript-centric.

## Users
- **Developers**: Checking logs or configuration files for leaked secrets before committing.
- **Security Auditors**: Quickly scanning individual documents or exports for PII/secrets.

## Constraints
- **Backend**: Hono + TypeScript.
- **Frontend**: Next.js 15, Tailwind CSS, shadcn/ui.
- **AI**: Gemini Flash (Google AI SDK).
- **Deployment**: Must handle local file uploads securely (no persistent storage of sensitive data unless opted-in).

## Success Criteria
- [ ] Functional web UI with multi-file upload support and text area.
- [ ] Scanning engine identifying at least 10+ common sensitive data patterns.
- [ ] AI integration providing coherent summaries of scan results.
- [ ] Professional, responsive dashboard for viewing risk reports.
