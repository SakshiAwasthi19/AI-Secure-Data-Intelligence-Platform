---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Core Detection Engine & Patterns

## Objective
Initialize the backend structure and implement the base regex scanning logic with a curated set of security patterns.

## Context
- .gsd/SPEC.md
- .gsd/phases/1/RESEARCH.md

## Tasks

<task type="auto">
  <name>Initialize Backend & Pattern Registry</name>
  <files>backend/src/scanner/patterns.ts, backend/src/scanner/types.ts</files>
  <action>
    Define the core types for `DetectionResult` and `ScannerPattern`.
    Implement a comprehensive registry of regex patterns for:
    - AWS API Keys, SSH Private Keys, GitHub Tokens.
    - Emails, Phone Numbers, Passwords, Credit Card numbers.
    - Suspicious log patterns (Auth failures, stack traces).
  </action>
  <verify>Check if file exists and contains at least 10 core regex patterns.</verify>
  <done>Registry is populated and exported with typed patterns.</done>
</task>

<task type="auto">
  <name>Implement Core Scanning Utility</name>
  <files>backend/src/scanner/engine.ts</files>
  <action>
    Create a `scanText` function that:
    1. Takes a string (or stream) as input.
    2. Runs all registered patterns against the input.
    3. Returns a structured list of matches including line number, match index, and severity.
    Ensure it handles large inputs efficiently (e.g., via line-by-line processing where possible).
  </action>
  <verify>Run a test script against a sample file containing dummy secrets and verify detection.</verify>
  <done>Engine correctly identifies and categorizes patterns in a test string.</done>
</task>

## Success Criteria
- [ ] Backend contains a structured, typed registry of security patterns.
- [ ] Core scanning engine can correctly identify secrets/PII in raw text with line-number accuracy.
