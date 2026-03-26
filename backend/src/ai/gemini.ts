/**
 * Interface for the structured response from Gemini.
 */
export interface AISecurityInsights {
  summary: string;
  anomalies: string[];
  risks: string[];
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const TIMEOUT_MS = 8000;
const MAX_RETRIES = 1;

/**
 * Makes a direct fetch call to the Gemini API with timeout.
 */
async function callGeminiAPI(apiKey: string, maskedText: string): Promise<AISecurityInsights> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a senior security engineer. Analyze these redacted security scan results. Respond ONLY with JSON in this format: {"summary": "one sentence summary", "anomalies": ["anomaly1"], "risks": ["risk1"]}\n\n${maskedText}`
          }]
        }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`API ${response.status}: ${errData?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini');

    return JSON.parse(text) as AISecurityInsights;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Generates intelligent local insights from the scan text without any API call.
 * Analyzes the redacted text for patterns and produces meaningful security commentary.
 */
function generateLocalInsights(maskedText: string): AISecurityInsights {
  const text = maskedText.toLowerCase();
  const anomalies: string[] = [];
  const risks: string[] = [];

  // Detect categories present
  const hasSecrets = text.includes('[redacted_secret]');
  const hasPII = text.includes('[redacted_pii]');
  const hasCreds = text.includes('[redacted_credential]');
  const hasLogPatterns = text.includes('[redacted_logpattern]');

  // Count occurrences
  const secretCount = (maskedText.match(/\[REDACTED_SECRET\]/g) || []).length;
  const piiCount = (maskedText.match(/\[REDACTED_PII\]/g) || []).length;
  const credCount = (maskedText.match(/\[REDACTED_CREDENTIAL\]/g) || []).length;
  const logCount = (maskedText.match(/\[REDACTED_LOGPATTERN\]/g) || []).length;
  const totalRedacted = secretCount + piiCount + credCount + logCount;

  // Build summary
  const categories: string[] = [];
  if (hasSecrets) categories.push(`${secretCount} secret(s)`);
  if (hasPII) categories.push(`${piiCount} PII element(s)`);
  if (hasCreds) categories.push(`${credCount} credential(s)`);
  if (hasLogPatterns) categories.push(`${logCount} suspicious log pattern(s)`);

  const summary = totalRedacted > 0
    ? `Security scan identified ${totalRedacted} sensitive data exposure(s): ${categories.join(', ')}. Immediate remediation recommended.`
    : 'No significant security risks detected in the scanned content.';

  // Build anomalies
  if (secretCount > 1) anomalies.push(`Multiple secrets (${secretCount}) found in a single document — indicates poor secret management practices.`);
  if (piiCount > 2) anomalies.push(`High concentration of PII data (${piiCount} instances) — potential data privacy compliance violation.`);
  if (hasSecrets && hasPII) anomalies.push('Mixed exposure of both API secrets and PII in the same content — elevated breach impact.');
  if (hasLogPatterns) anomalies.push('Suspicious log patterns detected — review for unauthorized access attempts or system anomalies.');

  // Build risks
  if (hasSecrets) risks.push('Critical: Exposed secrets/API keys could allow unauthorized access to cloud infrastructure and services.');
  if (hasCreds) risks.push('High: Hardcoded credentials detected — rotate immediately and migrate to a secrets manager.');
  if (hasPII) risks.push('Medium: PII exposure may violate GDPR, CCPA, or other data protection regulations.');
  if (hasLogPatterns) risks.push('Low: Log patterns suggest authentication failures or system errors that warrant investigation.');
  if (totalRedacted === 0) risks.push('No immediate risks identified. Continue monitoring for potential future exposures.');

  return { summary, anomalies, risks };
}

/**
 * Main entry point: tries Gemini API with retry, falls back to local insights.
 */
export async function getSecurityInsights(maskedText: string): Promise<AISecurityInsights> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.warn('[AI] No GEMINI_API_KEY found. Using local analysis engine.');
    return generateLocalInsights(maskedText);
  }

  // Try the API with retries
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[AI] Gemini API attempt ${attempt + 1}/${MAX_RETRIES + 1}...`);
      const result = await callGeminiAPI(apiKey, maskedText);
      console.log('[AI] Gemini API call succeeded.');
      return result;
    } catch (error: any) {
      const msg = error.message || String(error);
      console.warn(`[AI] Attempt ${attempt + 1} failed: ${msg}`);

      if (attempt < MAX_RETRIES) {
        console.log('[AI] Retrying in 1 second...');
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  // If all API attempts fail, use the smart local fallback
  console.log('[AI] All API attempts failed. Generating insights locally.');
  return generateLocalInsights(maskedText);
}
