---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Log Analyzer Module & Integration

## Objective
Implement a dedicated Log Analyzer utility for line-by-line parsing and integrate it into the `POST /api/analyze` endpoint.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- .gsd/phases/2/RESEARCH.md
- backend/src/scanner/types.ts

## Tasks

<task type="auto">
  <name>Implement Log Analyzer Utility</name>
  <files>
    - backend/src/logAnalyzer/index.ts [NEW]
  </files>
  <action>
    - Create `analyzeLog(text: string, patterns: ScannerPattern[]): DetectionResult[]`.
    - Split input text by `\n`.
    - Iterate through lines, run ALL pattern categories (Secrets, PII, Credentials, LogPattern) against each line.
    - Accurately report `lineNumber` (1-indexed) and `lineContent` for each match.
  </action>
  <verify>Run a script scanning a multi-line log with known patterns.</verify>
  <done>Log findings are correctly extracted with accurate line numbers.</done>
</task>

<task type="auto">
  <name>Integrate Log Analyzer into API</name>
  <files>
    - backend/src/routes/analyze.ts
  </files>
  <action>
    - Modify `analyze.ts` to check `sourceType`.
    - If `sourceType === 'log'`, call `analyzeLog`.
    - Otherwise, use the general `scanText`.
  </action>
  <verify>Verify `curl` call with `sourceType: log` returns line-based results.</verify>
  <done>Log analysis is used for 'log' input type.</done>
</task>

## Success Criteria
- [ ] Log analyzer correctly handles multi-line inputs with correct line numbering.
- [ ] API routes 'log' input types to the dedicated analyzer.
