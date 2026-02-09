# Google OAuth Setup Guide

## Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add these URLs:
     - **Authorized JavaScript origins**: `http://localhost:5173`
     - **Authorized redirect URIs**: `http://localhost:5000/api/auth/google/callback`
   - Click "Create"
   - Copy your **Client ID** and **Client Secret**

## Step 2: Update Backend Environment Variables

Add these to your `backend/.env` file:

```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

## Step 3: Reinitialize Database

The database schema has been updated to support OAuth. Run:

```bash
cd backend
npm start
```

This will automatically recreate the users table with the new fields:
- `auth_provider` - tracks if user signed up via 'local' or 'google'
- `google_id` - stores Google user ID
- `profile_picture` - stores Google profile picture URL
- `password` - now nullable (not required for Google users)

## Step 4: Test the Integration

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd Frontend
   npm run dev
   ```

3. Navigate to the Register or Sign In page
4. Click the Google icon
5. You'll be redirected to Google's login page
6. After authentication, you'll be redirected back to your dashboard

## How It Works

1. **User clicks Google icon** → Redirects to `/api/auth/google`
2. **Backend redirects to Google** → User logs in with Google
3. **Google redirects back** → To `/api/auth/google/callback`
4. **Backend processes user data**:
   - If user exists (by Google ID): Update last login
   - If user exists (by email): Link Google account
   - If new user: Create account with Google data
5. **Backend redirects to frontend** → With JWT token and user data
6. **Frontend stores token** → Redirects to dashboard

## Database Storage

All Google logins are saved in your PostgreSQL database with:
- User's Google ID
- Email from Google account
- First and last name
- Profile picture URL
- Auth provider set to 'google'
- Automatic username generation

## Security Notes

- JWT tokens are still used for session management
- Google users don't have passwords in the database
- Existing email users can link their Google account
- All user data is stored in your PostgreSQL database, not Firebase
