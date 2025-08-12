// Check OAuth configuration from environment
const fs = require('fs');

// Read .env.local to see what we have there
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  console.log('=== .env.local content ===');
  console.log(envContent.split('\n').map(line => 
    line.startsWith('GOOGLE_CLIENT') ? 
    line.split('=')[0] + '=' + (line.split('=')[1] ? line.split('=')[1].substring(0, 20) + '...' : 'MISSING') :
    line
  ).join('\n'));
} catch (error) {
  console.log('Could not read .env.local:', error.message);
}

console.log('\n=== Environment Variables ===');
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET);

if (process.env.GOOGLE_CLIENT_ID) {
  console.log('CLIENT_ID prefix:', process.env.GOOGLE_CLIENT_ID.substring(0, 12) + '...');
}