# Google OAuth Debug Checklist

## Current Status: "invalid_client" error for all users

## Required Google Cloud Console Configuration:

### 1. OAuth consent screen
- Must be configured (can be in test mode)
- App name set
- User support email set
- Developer contact information set

### 2. Credentials - OAuth 2.0 Client ID
- Application type: Web application
- Authorized JavaScript origins: 
  - https://37ee3298-feeb-466d-b740-9cb9625b8c09-00-226i2ijuc5mhx.worf.replit.dev
- Authorized redirect URIs:
  - https://37ee3298-feeb-466d-b740-9cb9625b8c09-00-226i2ijuc5mhx.worf.replit.dev/api/auth/callback/google

### 3. APIs & Services - Enabled APIs
- Google+ API (legacy) OR People API
- Google Identity Services

### 4. Test Users (if in test mode)
- Add terrencestasse@gmail.com
- Add other test users

## Common Issues:
- Client ID/Secret copied incorrectly
- Extra spaces or newlines in secrets
- Wrong redirect URI format
- Missing API enablement
- OAuth consent screen not properly configured