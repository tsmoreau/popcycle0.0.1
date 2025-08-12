// Comprehensive OAuth debugging
const https = require('https');
const url = require('url');

console.log('=== OAUTH DEBUG ANALYSIS ===');
console.log('Current environment:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'EXISTS' : 'MISSING');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'EXISTS' : 'MISSING');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

if (process.env.GOOGLE_CLIENT_ID) {
  console.log('Client ID format check:');
  const clientId = process.env.GOOGLE_CLIENT_ID;
  console.log('- Length:', clientId.length);
  console.log('- Starts with:', clientId.substring(0, 15) + '...');
  console.log('- Ends with:', '...' + clientId.slice(-25));
  console.log('- Contains .googleusercontent.com:', clientId.includes('.googleusercontent.com'));
  console.log('- Contains dashes:', (clientId.match(/-/g) || []).length, 'dashes');
}

// Test the NextAuth providers endpoint
console.log('\n=== TESTING NEXTAUTH PROVIDERS ===');
const testUrl = 'https://37ee3298-feeb-466d-b740-9cb9625b8c09-00-226i2ijuc5mhx.worf.replit.dev/api/auth/providers';

https.get(testUrl, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const providers = JSON.parse(data);
      console.log('Providers response:', JSON.stringify(providers, null, 2));
      
      if (providers.google) {
        console.log('\n=== GOOGLE PROVIDER ANALYSIS ===');
        console.log('- Google provider configured:', 'YES');
        console.log('- Signin URL:', providers.google.signinUrl);
        console.log('- Callback URL:', providers.google.callbackUrl);
      } else {
        console.log('- Google provider configured:', 'NO');
      }
    } catch (error) {
      console.log('Error parsing providers response:', error.message);
      console.log('Raw response:', data);
    }
  });
}).on('error', (error) => {
  console.log('Error fetching providers:', error.message);
});

// Test Google's OAuth2 endpoint directly
console.log('\n=== TESTING GOOGLE OAUTH2 DISCOVERY ===');
https.get('https://accounts.google.com/.well-known/openid_configuration', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const config = JSON.parse(data);
      console.log('Google OAuth2 endpoints:');
      console.log('- Authorization:', config.authorization_endpoint);
      console.log('- Token:', config.token_endpoint);
      console.log('- UserInfo:', config.userinfo_endpoint);
    } catch (error) {
      console.log('Error parsing Google config:', error.message);
    }
  });
});