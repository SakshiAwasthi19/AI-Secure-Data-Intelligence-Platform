# PRD — AI Secure Data Intelligence Platform

## Project Name
AI Secure Data Intelligence Platform
*(AI Gateway + Data Scanner + Log Analyzer + Risk Engine)*

---

## Problem Statement
Applications and developers frequently expose sensitive data — passwords, API keys, tokens, emails — inside log files, documents, and plain text without realizing it. There is no simple, accessible tool that lets a user upload any file or paste any text and instantly get a structured security risk report with AI-generated insights. This platform solves that.

---

## Users
- Developers who want to scan their log files or code for accidentally exposed secrets
- Security-conscious teams doing quick audits before shipping
- Hackathon judges evaluating a full-stack AI security platform

---

## Core Goal
Build a web-based platform that accepts multiple input types, scans them for sensitive data and security risks using a regex detection engine, analyzes them using AI, and returns a structured risk report with AI-generated insights.

---

## Four Core Pillars (ALL mandatory)

| Pillar | Responsibility |
|---|---|
| **AI Gateway** | Central layer that routes all input through Gemini Flash for intelligent analysis and insight generation |
| **Data Scanner** | Detects sensitive data in any input type using a curated regex pattern registry |
| **Log Analyzer** | Dedicated module that parses log files line-by-line, detects security issues, and sends findings to AI |
| **Risk Engine** | Classifies every finding by risk level and calculates a final risk score |

---

## Main Features

### Multi-Source Data Ingestion
Accept input from all of the following:
- Plain text (typed by user)
- File upload — PDF, DOC/DOCX, TXT
- Log files — `.log`, `.txt`
- SQL / structured data
- Live chat input

### Data Scanner
- Regex-based detection of:
  - Emails
  - Phone numbers
  - API keys (generic, AWS, GitHub tokens)
  - Passwords
  - Tokens
  - SSH private keys
  - Credit card numbers
  - Hardcoded secrets
  - Credentials

### Log Analyzer Module (dedicated, separate module)
- Parses log files line-by-line
- Handles log content including:
  - System events
  - API responses
  - Errors
  - Debug traces
  - Sensitive data leaks
- Detects:
  - Hardcoded secrets
  - Credentials in logs
  - Suspicious patterns
  - Error leaks (stack traces)
- Sends parsed findings to AI for analysis
- Returns line-number-accurate findings

### AI Gateway + AI-Based Insights (via Gemini Flash)
- Routes all input through AI
- Generates:
  - Summary of log/input activity
  - Detected anomalies
  - Potential risks
  - Specific callouts e.g. "API key exposed on line 12", "Multiple failed login attempts detected"

### Risk Engine
Context-aware risk classification:

| Finding | Context | Risk Level |
|---|---|---|
| Password | In `.log` file | Critical |
| API key | In `.log` file | High |
| Stack trace | Any | Medium |
| Email | In `.txt` file | Low |
| Hardcoded secret | Any | Critical |
| SSH key | Any | Critical |

- Calculates a final numeric risk score
- Outputs overall risk level: Low / Medium / High / Critical

### Policy Engine
- Masks sensitive content in response if risk is High
- Blocks/flags content if risk is Critical
- Returns `action` field: `masked` / `blocked` / `allowed`

### API
Single endpoint: `POST /api/analyze`

Request:
```json
{
  "input_type": "text | file | sql | chat | log",
  "content": "...",
  "options": {
    "mask": true,
    "block_high_risk": true,
    "log_analysis": true
  }
}
```

Response:
```json
{
  "summary": "Log contains sensitive credentials and errors",
  "content_type": "log",
  "findings": [
    { "type": "api_key", "risk": "high", "line": 12 },
    { "type": "password", "risk": "critical", "line": 25 }
  ],
  "risk_score": 10,
  "risk_level": "high",
  "action": "masked",
  "insights": [
    "Sensitive credentials exposed in logs",
    "Debug information leaked"
  ]
}
```

### Frontend
- Text input box for plain text / SQL / chat
- File upload button (PDF, DOC, TXT, LOG)
- Insights Panel showing:
  - AI-generated summary
  - Security warnings
  - Risk breakdown
- Findings list with type, risk level, line number
- Color-coded risk badges (red = critical, orange = high, yellow = medium, green = low)

---

## Must-Haves (MVP)

- [ ] All four core pillars: AI Gateway, Data Scanner, Log Analyzer, Risk Engine
- [ ] `POST /api/analyze` endpoint
- [ ] Multi-source input: text, PDF, DOC, TXT, log files
- [ ] Regex pattern registry (`patterns.ts`) with 10+ patterns
- [ ] Line-by-line log parsing with line-number-accurate findings
- [ ] Detection of: emails, passwords, API keys, tokens, SSH keys, hardcoded secrets, stack traces, suspicious patterns
- [ ] Context-aware risk scoring
- [ ] AI integration via Gemini Flash — summary, anomalies, potential risks
- [ ] Policy engine — mask/block high risk content
- [ ] Frontend with file upload, results panel, insights panel, risk badges
- [ ] 5MB file size limit

---

## Constraints
- Backend: Hono + TypeScript, deployed on Render
- Frontend: Next.js 15 + Tailwind + shadcn/ui, deployed on Vercel
- AI: Gemini Flash only (`@google/generative-ai`)
- No database for MVP
- No cloud storage integration (local uploads only)
- No Python — TypeScript throughout
- File size limit: 5MB max
- No advanced features: no real-time streaming, no cross-log correlation, no brute-force detection for MVP

---

## Success Criteria
- User can upload a `.log` file and receive a structured risk report with AI insights
- All 4 core pillars are functional and connected
- Every finding includes type, risk level, and line number
- AI insights are specific and meaningful, not generic
- Frontend clearly displays summary, findings, and risk breakdown
- Covers all evaluation criteria from the hackathon document

---

## Later Scope (Post-MVP)
- Drag & drop file upload
- Log viewer UI with highlighted sensitive lines and line numbers
- Real-time log streaming analysis
- Cross-log anomaly detection
- Brute-force / repeated failure detection
- Suspicious IP activity detection
- Rate limiting for large log uploads
- Scan history with database storage
- SQL injection detection
- Dependency vulnerability scanning