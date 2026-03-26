import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

/**
 * Interface for the structured response from Gemini.
 */
export interface AISecurityInsights {
  summary: string;
  anomalies: string[];
  risks: string[];
}

/**
 * Fallback values used when Gemini is unavailable or errors out.
 */
const DEFAULT_FALLBACK: AISecurityInsights = {
  summary: 'AI insights unavailable — check your GEMINI_API_KEY in backend/.env',
  anomalies: [],
  risks: []
};

/**
 * Uses Gemini 2.0 Flash to generate security insights from redacted scan text.
 * Falls back gracefully on any error (missing key, rate limit, network issue).
 */
export async function getSecurityInsights(maskedText: string): Promise<AISecurityInsights> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.warn('[AI] GEMINI_API_KEY is missing. AI insights will be unavailable.');
    return DEFAULT_FALLBACK;
  }

  console.log('[AI] Calling Gemini 2.0 Flash (Key: ' + apiKey.substring(0, 7) + '...)');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            summary: { type: SchemaType.STRING },
            anomalies: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            risks: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
          },
          required: ['summary', 'anomalies', 'risks']
        }
      },
      systemInstruction: 'You are a senior security engineer. Analyze the provided security scan results (which are redacted for privacy). Provide a concise one-sentence summary, any detected anomalies, and specific risk callouts. Keep it purely professional and technical.'
    });

    const result = await model.generateContent(
      `Analyze these redacted scan results and provide insights in JSON:\n\n${maskedText}`
    );

    const responseText = result.response.text();
    return JSON.parse(responseText) as AISecurityInsights;

  } catch (error: any) {
    const msg = error.message || String(error);
    console.error('[AI] Gemini request failed:', msg);

    // Provide specific hints based on error type
    if (msg.includes('429') || msg.includes('rate limit') || msg.includes('quota')) {
      console.warn('[AI] Rate limit hit. Please wait a moment and try again.');
      return { summary: 'AI temporarily unavailable — rate limit reached. Please retry in a few seconds.', anomalies: [], risks: [] };
    }
    if (msg.includes('404')) {
      console.error('[AI] Model not found. The Gemini model may not be available for your API key.');
    }
    if (msg.includes('API key not valid') || msg.includes('400')) {
      console.error('[AI] Invalid API key. Please check your GEMINI_API_KEY in backend/.env');
    }

    return DEFAULT_FALLBACK;
  }
}
