---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Privacy-First Masking & API Standardization

## Objective
Implement the privacy-first masking utility and standardize the `POST /api/analyze` response shape according to the Phase 3 specification.

## Context
- .gsd/SPEC.md
- backend/src/routes/analyze.ts
- backend/src/scanner/types.ts

## Tasks

<task type="auto">
  <name>Implement masking utility</name>
  <files>backend/src/utils/masking.ts</files>
  <action>
    Create `maskSensitiveData(text: string, findings: DetectionResult[])` to redact original secrets into `[REDACTED_{TYPE}]`. Ensure this is ONLY used for AI input.
  </action>
  <verify>Check file exists and contains masking logic.</verify>
  <done>Utility correctly replaces matched text with placeholders.</done>
</task>

### 2. Gemini Flash Integration with Fallback
- **Model**: `gemini-1.5-flash`.
- **Fallback**: If the API fails, times out, **OR if the `GEMINI_API_KEY` is missing**, return:
    - `summary`: "AI insights unavailable"
    - `anomalies`: []
    - `risks`: []
- **Silent Behavior**: Missing API key = same behaviour as Gemini timeout or failure. Silent fallback, request still completes successfully.

<task type="auto">
  <name>Standardize API Response Shape</name>
  <files>backend/src/routes/analyze.ts, backend/src/scanner/scoring.ts</files>
  <action>
    Update the `RiskReport` type and the `analyze.ts` route to return:
    - `summary`, `content_type`, `findings`, `risk_score`, `risk_level`, `action`, `insights`.
    - Ensure `action` is lowercase: "blocked" | "masked" | "allowed".
  </action>
  <verify>Run `curl` and verify JSON keys.</verify>
  <done>API returns the exact JSON keys as specified in Phase 3.</done>
</task>

## Success Criteria
- [ ] `POST /api/analyze` returns standardized JSON shape.
- [ ] Masking utility can redact multiple findings in a single string.
