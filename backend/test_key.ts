import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;
console.log('Key:', apiKey?.substring(0, 10) + '...');

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: 'Say hello in one word' }] }]
  })
});

const data = await response.json();
if (data.error) {
  console.log('ERROR:', data.error.code, data.error.message);
} else {
  console.log('SUCCESS:', data.candidates?.[0]?.content?.parts?.[0]?.text);
}
