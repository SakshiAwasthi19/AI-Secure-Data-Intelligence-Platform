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
**Status**: ⬜ Not Started
**Objective**: Integrate Gemini Flash for analysis and build the final report UI.
**Requirements**:
- [ ] `.env` setup with `GEMINI_API_KEY` and `@google/generative-ai` installation
- [ ] AI Module (`backend/src/ai/gemini.ts`) for summary, anomalies, and risk callouts
- [ ] Gemini-powered analysis for Log Analyzer findings (anomalies, risks, and specific callouts)
- [ ] Policy Engine: Masking (High), Blocking (Critical), and Response Actions
- [ ] Full API response shape: summary, findings, risk_score, risk_level, action, insights, content_type
- [ ] Insights Panel on frontend with AI-generated summary and security warnings

### Phase 4: Polish & Security hardening
**Status**: ⬜ Not Started
**Objective**: Refine the UI, add loading states, and ensure secure file handling.
