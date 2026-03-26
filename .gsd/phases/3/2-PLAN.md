---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Gemini Flash Integration with Fallback

## Objective
Integrate `gemini-1.5-flash` to provide security insights and handle API failures gracefully.

## Context
- .gsd/SPEC.md
- backend/package.json
- backend/src/routes/analyze.ts

## Tasks

<task type="auto">
  <name>Install AI dependencies and setup service</name>
  <files>backend/package.json, backend/src/ai/gemini.ts</files>
  <action>
    - Install `@google/generative-ai`.
    - Create `getSecurityInsights(maskedText: string)` using `gemini-1.5-flash`.
    - Implement a try/catch block to return: `summary: "AI insights unavailable", anomalies: [], risks: []` on failure.
  </action>
  <verify>Verify generated insights via API call (with a mock key first if needed).</verify>
  <done>AI module returns valid insights or graceful fallback.</done>
</task>

<task type="auto">
  <name>Integrate AI into analysis route</name>
  <files>backend/src/routes/analyze.ts</files>
  <action>
    - Call the AI module in `POST /api/analyze` if a `GEMINI_API_KEY` is present.
    - Merge AI `summary` and `risks` (mapped to `insights`) into the final response.
  </action>
  <verify>Check API response for non-empty `summary` and `insights` fields.</verify>
  <done>The backend combines regex findings with AI-generated insights.</done>
</task>

## Success Criteria
- [ ] Backend generates security summaries via Gemini.
- [ ] API does not crash if `GEMINI_API_KEY` is missing or invalid.
