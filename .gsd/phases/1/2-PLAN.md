---
phase: 1
plan: 2
wave: 2
---

# Plan 1.2: Risk Scoring & Hono Service

## Objective
Implement the severity scoring engine and expose the scanning functionality via a Hono API endpoint.

## Context
- .gsd/SPEC.md
- backend/src/scanner/engine.ts

## Tasks

<task type="auto">
  <name>Implement Risk Scoring Engine</name>
  <files>backend/src/scanner/scoring.ts</files>
  <action>
    Implement a scoring utility that:
    1. Evaluates a collection of `DetectionResults`.
    2. Calculates an overall `RiskScore` (Critical/High/High/Medium/Low).
    3. Provides a summary breakdown (e.g., "Found 2 Critical secrets, 5 High PII items").
    Status: Use fixed mapping for MVP as decided in Phase discussion.
  </action>
  <verify>Run unit tests with various finding counts and verify correct score output.</verify>
  <done>Scoring logic correctly prioritizes Critical/High findings in the final report.</done>
</task>

<task type="auto">
  <name>Expose Scanner via Hono API</name>
  <files>backend/src/index.ts, backend/src/routes/scan.ts</files>
  <action>
    Setup a Hono app with a POST `/api/scan` endpoint.
    The endpoint should:
    1. Accept raw text or a JSON payload.
    2. Invoke the `ScannerService`.
    3. Return a structured JSON response compatible with the planned frontend.
  </action>
  <verify>Use curl to POST a text body to the endpoint and receive a structured JSON risk report.</verify>
  <done>API successfully processes text and returns the risk analysis.</done>
</task>

## Success Criteria
- [ ] Scoring engine provides clear prioritization of risks.
- [ ] Functional Hono API endpoint exists for scanning raw text.
