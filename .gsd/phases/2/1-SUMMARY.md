# Plan 2.1 Summary: File Uploads & Extraction

## Accomplishments
- Implemented `sizeLimitMiddleware` in `backend/src/middleware/sizeLimit.ts` to enforce a 5MB payload limit.
- Created `extractTextFromFile` utility in `backend/src/utils/extractor.ts` with support for PDF (`pdf-parse`), DOC/DOCX (`mammoth`), TXT, and LOG formats.
- Updated `backend/src/routes/analyze.ts` to handle `multipart/form-data` uploads, integrating the extraction logic seamlessly.
- Maintained backward compatibility for raw text JSON payloads.

## Technical Details
- Size limit is applied globally to the `/api/analyze` route.
- Text extraction uses asynchronous processing for binary formats (PDF/DOCX).
- Correctly handles `File` objects from Hono's `parseBody()`.
