import pdf from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extracts text from a File object based on its extension.
 * Supports PDF, DOC, DOCX, TXT, and LOG.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf': {
      const data = await pdf(buffer);
      return data.text;
    }

    case 'doc':
    case 'docx': {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }

    case 'txt':
    case 'log': {
      return buffer.toString('utf-8');
    }

    default:
      // Default to text if extension is unknown but file is uploaded
      return buffer.toString('utf-8');
  }
}
