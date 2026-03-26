import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('API Key:', apiKey ? 'FOUND' : 'MISSING');
  if (!apiKey) return;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent('Say hello');
    console.log('Response:', result.response.text());
  } catch (error) {
    console.error('Error:', error);
  }
}

testGemini();
