---
phase: 2
plan: 3
wave: 2
---

# Plan 2.3: Frontend UI & Results Display

## Objective
Implement the Next.js frontend with text input, single-file upload tabs, and a clean results dashboard.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md

## Tasks

<task type="auto">
  <name>Initialize Next.js Frontend</name>
  <files>
    - frontend/ [NEW]
  </files>
  <action>
    - Initialize a new Next.js project with Tailwind CSS and Shadcn UI.
    - Setup basic layout with navigation.
  </action>
  <verify>Confirm site runs on http://localhost:3000.</verify>
  <done>Frontend skeleton is operational.</done>
</task>

<task type="auto">
  <name>Build Scan UI (Tabs & Upload)</name>
  <files>
    - frontend/src/components/ScanForm.tsx [NEW]
  </files>
  <action>
    - Use Shadcn Tabs: 'Manual Text' and 'File Upload'.
    - Implement file selection for PDF, DOCX, DOC, TXT, LOG (single-file limit).
    - Add a "Scan Now" button with loading state.
  </action>
  <verify>Manually verify tab switching and file selection in browser.</verify>
  <done>Functional input form for text and files.</done>
</task>

<task type="auto">
  <name>Implement Results Dashboard</name>
  <files>
    - frontend/src/components/ResultsDisplay.tsx [NEW]
  </files>
  <action>
    - Fetch scan results from backend.
    - Display overall risk level (Critical/High/Med/Low/None) with colored badges.
    - List all findings with line numbers and matched snippets.
  </action>
  <verify>Perform a scan and see results displayed on the UI.</verify>
  <done>Results accurately reflect backend scan reports.</done>
</task>

## Success Criteria
- [ ] Next.js app running and communicating with Hono backend.
- [ ] Functional file upload and text input tabs.
- [ ] Risk report dashboard displays scan results correctly.
