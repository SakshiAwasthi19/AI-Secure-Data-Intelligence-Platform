import process from 'node:process';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('API Key: MISSING');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Note: The SDK might not have a direct listModels, but we can try a fetch to the raw endpoint
    // OR we can try a very basic model like 'gemini-pro'
    console.log('Testing gemini-pro...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('test');
    console.log('gemini-pro success:', result.response.text());
  } catch (error) {
    console.error('gemini-pro error:', error);
  }
}

listModels();
