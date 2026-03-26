import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;
console.log('Testing key:', apiKey?.substring(0, 10) + '...');

// Test 1: Direct fetch (bypasses SDK entirely)
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
const body = {
  contents: [{ parts: [{ text: 'Say hello in one word' }] }]
};

console.log('\n--- Test 1: Direct fetch to Gemini API ---');
try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.error) {
    console.log('ERROR:', data.error.code, data.error.message);
  } else {
    console.log('SUCCESS:', data.candidates?.[0]?.content?.parts?.[0]?.text);
  }
} catch (e: any) {
  console.log('FETCH ERROR:', e.message);
}

// Test 2: SDK call
console.log('\n--- Test 2: SDK call ---');
try {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey!);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent('Say hello in one word');
  console.log('SUCCESS:', result.response.text());
} catch (e: any) {
  console.log('SDK ERROR:', e.status, e.message?.substring(0, 100));
}
