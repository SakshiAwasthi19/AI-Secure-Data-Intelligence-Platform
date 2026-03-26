async function testMockAI() {
  const response = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: 'Sample text with AWS key: AKIA1234567890ABCDEF',
      sourceType: 'text',
      mask: false
    })
  });

  const data = await response.json();
  console.log('--- TEST: MOCK AI RESPONSE ---');
  console.log('Summary:', data.summary);
  console.log('Insights:', data.insights);
  console.log('Overall Risk:', data.risk_level);
  console.log('--- END TEST ---');
}

testMockAI();
