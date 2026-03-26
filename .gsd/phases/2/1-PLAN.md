---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Materialize File Uploads & Extraction

## Objective
Implement multipart file upload handling in Hono with a 5MB size limit and text extraction for PDF, DOCX, and TXT files.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- backend/package.json
- backend/src/routes/analyze.ts

## Tasks

<task type="auto">
  <name>Implement Size Limit Middleware</name>
  <files>
    - backend/src/middleware/sizeLimit.ts [NEW]
    - backend/src/index.ts
  </files>
  <action>
    - Create a middleware that checks `Content-Length` header.
    - If > 5MB, return 413 Payload Too Large.
    - Mount it globally in index.ts.
  </action>
  <verify>curl -X POST http://localhost:3001/api/analyze -d @large_file.txt</verify>
  <done>Oversized requests are rejected with 413.</done>
</task>

<task type="auto">
  <name>Implement File Extraction Utility</name>
  <files>
    - backend/src/utils/extractor.ts [NEW]
  </files>
  <action>
    - Create `extractTextFromFile(file: File): Promise<string>`.
    - Use `pdf-parse` for .pdf.
    - Use `mammoth` for .docx AND .doc (legacy).
    - Use `.text()` for .txt and .log.
  </action>
  <verify>Test with sample PDF and DOCX files manually or via internal script.</verify>
  <done>Correct text is extracted from all supported formats.</done>
</task>

<task type="auto">
  <name>Update analyze.ts to handle Multipart</name>
  <files>
    - backend/src/routes/analyze.ts
  </files>
  <action>
    - Update route to handle `c.req.parseBody()`.
    - Detect 'file' field and pass to extractor.
    - Maintain support for 'text' field (raw paste).
  </action>
  <verify>API returns scan results for an uploaded file.</verify>
  <done>End-to-end file scan working for basic text files.</done>
</task>

## Success Criteria
- [ ] Backend rejects files > 5MB.
- [ ] Text extracted from PDF/DOCX accurately.
- [ ] API handles multipart/form-data for uploads.
