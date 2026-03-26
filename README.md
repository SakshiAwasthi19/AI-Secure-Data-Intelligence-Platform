<p align="center">
  <img src="docs/screenshots/homepage.png" alt="SecureScan Homepage" width="100%">
</p>

<h1 align="center">🛡️ AI Secure Data Intelligence Platform</h1>

<p align="center">
  <strong>SecureScan</strong> — An AI-powered security scanner that automatically detects PII, secrets, credentials, and suspicious patterns in your text, logs, and documents.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15">
  <img src="https://img.shields.io/badge/Hono-backend-orange?logo=hono" alt="Hono">
  <img src="https://img.shields.io/badge/Gemini_2.0_Flash-AI-blue?logo=google" alt="Gemini 2.0 Flash">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

---

## 📸 Screenshots

### Homepage — Clean Input Interface
![SecureScan Homepage](docs/screenshots/homepage.png)

### Scan Results — Full Analysis Dashboard
![Scan Results](docs/screenshots/scan-results.png)

---

## ✨ Features

### 🔍 Detection Engine
- **PII Detection** — Emails, phone numbers, SSNs, credit card numbers
- **Secret Scanning** — AWS keys, GitHub tokens, Stripe keys, generic API keys
- **Credential Detection** — Hardcoded passwords, connection strings, auth tokens
- **Log Pattern Analysis** — Failed login attempts, SQL injection signatures, brute force indicators

### 🤖 AI-Powered Insights
- **Executive Summary** — Concise, actionable security narrative for each scan
- **Risk Callouts** — Categorized threat assessments (Critical/High/Medium/Low)
- **Anomaly Detection** — Identifies unusual patterns in the scanned content
- **Smart Fallback** — Local analysis engine provides insights even without API connectivity

### 🛡️ Privacy & Policy Engine
- **Data Masking** — Toggle to redact sensitive data before AI processing
- **Block High Risk** — Policy engine automatically blocks critical-risk content
- **Privacy-First Architecture** — Secrets are never sent to external APIs in raw form

### 📊 Risk Scoring
- **0–100 Risk Score** — Weighted scoring based on finding severity
- **Severity Classification** — Critical, High, Medium, Low, None
- **Line-Level Context** — Each finding shows exact line number and surrounding context

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS | Modern UI with glassmorphism design |
| **Backend** | Hono, Node.js, TypeScript | Lightweight, fast API server |
| **AI** | Gemini 2.0 Flash | Real-time security analysis |
| **File Parsing** | pdf-parse, Mammoth | PDF, DOC/DOCX text extraction |
| **Styling** | Tailwind CSS, Lucide Icons | Premium dark/light theme |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- **npm** v9+
- **Gemini API Key** (optional — local analysis works without it)

### Installation

```bash
# Clone the repository
git clone https://github.com/SakshiAwasthi19/AI-Secure-Data-Intelligence-Platform.git
cd AI-Secure-Data-Intelligence-Platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> 💡 Get a free API key from [Google AI Studio](https://aistudio.google.com/)
> 
> The app works without an API key too — it uses a smart local analysis engine as fallback.

### Running the App

```bash
# Terminal 1 — Start Backend (port 3001)
cd backend
npm run dev

# Terminal 2 — Start Frontend (port 3000)
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage

### Manual Text Scan
1. Click the **Manual Text** tab
2. Paste any text — code, logs, config files, etc.
3. Toggle **Mask Sensitive Data** or **Block High Risk** as needed
4. Click **Execute Scan**
5. View results: risk score, AI summary, detailed findings

### File Upload
1. Click the **File Upload** tab
2. Upload a `.pdf`, `.doc`, `.docx`, `.txt`, or `.log` file (max 5MB)
3. Click **Execute Scan**
4. The scanner extracts text and analyzes it automatically

---

## 🧪 Sample Test Data

### Critical — Cloud Credentials
```
AWS_ACCESS_KEY_ID=AKIA_MOCKED_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=MOCKED_SECRET_KEY_FOR_TESTING
STRIPE_SECRET_KEY=sk_test_1234567890abcdef
DATABASE_URL=postgresql://admin:SuperSecret123@db.internal:5432/production
```

### Medium — PII in Logs
```
[2024-03-15 14:32:01] User registration completed
  Name: John Doe
  Email: john.doe@company.com
  Phone: (555) 867-5309
  SSN: 123-45-6789
```

### Mixed — Secrets + PII + Credentials
```
GITHUB_TOKEN=ghp_dummy_token_for_testing
Customer: Jane Smith, jane.smith@gmail.com, +1-555-234-5678
Password: P@ssw0rd!2024
```

---

## 📁 Project Structure

```
AI-Secure-Data-Intelligence-Platform/
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   │   └── gemini.ts          # AI insights (Gemini + local fallback)
│   │   ├── middleware/
│   │   │   └── sizeLimit.ts       # File size enforcement
│   │   ├── routes/
│   │   │   └── analyze.ts         # POST /api/analyze endpoint
│   │   ├── scanner/
│   │   │   ├── patterns.ts        # Regex pattern registry
│   │   │   ├── scoring.ts         # Risk scoring engine
│   │   │   ├── index.ts           # Core scanner
│   │   │   └── types.ts           # TypeScript interfaces
│   │   ├── logAnalyzer/
│   │   │   └── index.ts           # Line-by-line log analysis
│   │   ├── utils/
│   │   │   ├── extractor.ts       # PDF/DOC/TXT text extraction
│   │   │   └── masking.ts         # Privacy-first data redaction
│   │   └── index.ts               # Hono server entry point
│   └── .env                       # API key configuration
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Main dashboard page
│   │   │   └── layout.tsx         # Root layout with metadata
│   │   ├── components/
│   │   │   ├── ScanForm.tsx       # Input form (text + file upload)
│   │   │   ├── ResultsPanel.tsx   # Findings display panel
│   │   │   └── AIInsightsCard.tsx # AI executive summary card
│   │   └── lib/
│   │       └── utils.ts           # Utility functions
│   └── tailwind.config.ts
├── docs/
│   └── screenshots/               # App screenshots
└── README.md
```

---

## 🔌 API Reference

### `POST /api/analyze`

Analyze text or files for security risks.

**Request (Text):**
```bash
curl -X POST http://localhost:3001/api/analyze \
  -F "text=AWS_KEY=AKIA1234567890ABCDEF" \
  -F "sourceType=text" \
  -F "mask=false" \
  -F "block_high_risk=false"
```

**Response:**
```json
{
  "timestamp": "2024-03-26T22:00:00.000Z",
  "sourceType": "text",
  "totalFindings": 1,
  "risk_score": 25,
  "risk_level": "Critical",
  "action": "allowed",
  "summary": "Security scan identified 1 sensitive data exposure(s)...",
  "insights": ["Critical: Exposed secrets/API keys..."],
  "findings": [
    {
      "patternName": "AWS Access Key ID",
      "category": "Secret",
      "severity": "Critical",
      "matchedText": "AKIA1234567890ABCDEF",
      "lineNumber": 1
    }
  ]
}
```

### `GET /health`

Health check endpoint.

```json
{ "status": "ok", "version": "1.0.0" }
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ using <strong>Next.js</strong>, <strong>Hono</strong>, and <strong>Gemini 2.0 Flash</strong>
</p>
