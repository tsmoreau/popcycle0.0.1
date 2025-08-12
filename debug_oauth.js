// Debug Google OAuth Configuration
console.log('=== Google OAuth Debug ===')
console.log('CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID)
console.log('CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET)
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET)

if (process.env.GOOGLE_CLIENT_ID) {
  console.log('CLIENT_ID starts with:', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...')
}