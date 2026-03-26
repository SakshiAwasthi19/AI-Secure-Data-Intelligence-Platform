// Test exactly like the frontend does - with FormData
async function testFormData() {
  const formData = new FormData();
  formData.append('text', 'Email: test@example.com\nAWS Key: AKIA1234567890ABCDEF\npassword="hunter2"');
  formData.append('sourceType', 'text');
  formData.append('mask', 'false');
  formData.append('block_high_risk', 'false');

  try {
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const rawText = await response.text();
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('Raw response (first 500 chars):', rawText.substring(0, 500));
    
    // Try parsing
    try {
      const json = JSON.parse(rawText);
      console.log('\n--- PARSED JSON ---');
      console.log('summary:', json.summary);
      console.log('insights:', json.insights);
      console.log('risk_level:', json.risk_level);
      console.log('totalFindings:', json.totalFindings);
    } catch (e) {
      console.error('\n--- JSON PARSE FAILED ---');
      console.error('Parse error:', e.message);
    }
  } catch (e) {
    console.error('Fetch error:', e.message);
  }
}

testFormData();
