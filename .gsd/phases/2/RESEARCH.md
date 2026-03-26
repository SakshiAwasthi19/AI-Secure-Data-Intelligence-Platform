# Phase 2 Research: Text Extraction & Uploads

## Hono Multipart Uploads
- Use `c.req.parseBody()` for `multipart/form-data`.
- Enforce size limit via custom middleware.
- Only process one file for MVP as per decisions.

## PDF/Doc Extraction
- **PDF**: `pdf-parse` (Node.js) is a solid choice. It returns simple text.
- **DOC/DOCX**: `mammoth` is effective for extracting plain text from both modern `.docx` and legacy `.doc` files (mammoth-node supports both).
- Fallback to generic `txt`/`log` handling for other extensions.

## Log Analyzer Architecture
- **Location**: `backend/src/logAnalyzer/index.ts`.
- **Interface**: `analyzeLog(text: string, patterns: ScannerPattern[]): DetectionResult[]`.
- **Strategy**: Split by `\n`, iterate through lines, run ALL pattern categories (Secrets, PII, Credentials, LogPattern) against each line to ensure comprehensive detection.
- **Integration**: `POST /api/analyze` will switch to `analyzeLog` if `sourceType === 'log'`.

## Frontend Details
- **Tech**: Next.js 15, Shadcn UI tabs, file input component.
- **State**: Single file/text state, show loading spinner while scanning.
- **Display**: Categorized results (Secrets vs PII vs Logs).
