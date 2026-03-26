# ROADMAP.md

> **Current Phase**: 2
> **Milestone**: v1.0 (MVP)

## Must-Haves (from SPEC)
- [ ] Multi-format file text extraction (PDF/DOC/TXT/LOG)
- [ ] Core Regex Detection Engine (Secrets/PII)
- [ ] Gemini Flash Integration for Insights
- [ ] Clean Risk Report Dashboard

## Phases

### Phase 1: Foundation & Detection Engine
**Status**: ✅ Complete
**Objective**: Build the core backend scanner and pattern matching logic.
**Requirements**: REQ-03, REQ-04, REQ-06

### Phase 2: Frontend Dashboard & Uploads
**Status**: ✅ Complete
**Objective**: Implement the Next.js UI, file upload handlers, and text input.
**Requirements**:
- [x] Multipart file uploads handled in `POST /api/analyze` (5MB limit)
- [x] Text extraction from PDF (`pdf-parse`), DOC/DOCX (`mammoth`), TXT, LOG files
- [x] Next.js frontend with text input box and file upload UI
- [x] Dedicated Log Analyzer module (`backend/src/logAnalyzer/index.ts`) with line-by-line parsing
- [x] Integrate Log Analyzer into `POST /api/analyze` for log file inputs
- [x] Display basic scan results (findings list, risk level, risk badges)

### Phase 3: AI Insights & Reporting
**Status**: 📝 Planning
**Objective**: Integrate Gemini Flash for analysis and build the Policy Engine.
**Requirements**:
- [ ] `.env` setup with `GEMINI_API_KEY` and `@google/generative-ai` installation
- [ ] Privacy-First Masking (`backend/src/utils/masking.ts`): Mask regex findings before sending to AI
- [ ] AI Module (`backend/src/ai/gemini.ts`): overall summary, anomalies, and risk callouts using `gemini-1.5-flash`
- [ ] Policy Engine: Support `options` field for Masking and Non-Blocking (`action: "blocked"` in JSON)
- [ ] Full API response shape: summary, findings, risk_score, risk_level, action, insights, content_type
- [ ] UI: AI Insights Summary Card prominently displayed at the top of results

### Phase 4: Polish & Security hardening
**Status**: ⬜ Not Started
**Objective**: Refine the UI, add loading states, and ensure secure file handling.
