---
phase: 3
plan: 3
wave: 2
---

# Plan 3.3: Frontend AI Insights & Policy UI

## Objective
Display the AI-generated security summary and policy enforcement status on the dashboard.

## Context
- frontend/src/app/page.tsx
- frontend/src/components/ResultsDisplay.tsx

## Tasks

<task type="auto">
  <name>Create AIInsightsCard component</name>
  <files>frontend/src/components/AIInsightsCard.tsx</files>
  <action>
    Build a premium "Summary Card" that displays the top-level AI summary and risk callouts. Use Lucide icons for visual emphasis.
  </action>
  <verify>Check UI rendering in browser.</verify>
  <done>AI insights are displayed at the top of the results page.</done>
</task>

<task type="auto">
  <name>Enhance UI with policy status</name>
  <files>frontend/src/components/ResultsDisplay.tsx</files>
  <action>
    Display a prominent "BLOCKED" badge if the API response contains `action: "blocked"`. Ensure the findings are still visible but marked as restricted.
  </action>
  <verify>Check "Blocked" UI with manual test log.</verify>
  <done>Policy enforcement is clearly communicated to the user.</done>
</task>

## Success Criteria
- [ ] AI Summary Card is the first element in the results section.
- [ ] "Blocked" status is visually distinct.
