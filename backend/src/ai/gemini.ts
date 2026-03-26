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
  summary: 'AI insights unavailable',
  anomalies: [],
  risks: []
};

/**
 * Uses Gemini 1.5 Flash to generate security insights from redacted scan text.
 * Strictly adheres to silent fallback requirements.
 * 
 * @param maskedText The redacted text (no real secrets)
 * @returns Structured security insights or fallback
 */
export async function getSecurityInsights(maskedText: string): Promise<AISecurityInsights> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === '') {
    console.warn('[AI] GEMINI_API_KEY is REDACTED or MISSING from process.env. Current keys:', Object.keys(process.env).filter(k => k.includes('GEMINI')));
    return DEFAULT_FALLBACK;
  }

  console.log('[AI] GEMINI_API_KEY found (length: ' + apiKey.length + '). Calling Gemini...');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Configure JSON response schema
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
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
      `Please analyze the following redacted scan results and provide insights in JSON format:\n\n${maskedText}`
    );

    const responseText = result.response.text();
    return JSON.parse(responseText) as AISecurityInsights;

  } catch (error) {
    console.error('[AI] Gemini analysis failed:', error);
    // Silent fallback on any error/timeout
    return DEFAULT_FALLBACK;
  }
}
