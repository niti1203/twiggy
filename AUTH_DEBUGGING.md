# Authentication Debugging Guide - Twiggy E-Commerce

## Current Issues

### Issue 1: Google OAuth Client ID is Placeholder
**File:** `src/app/google-auth.service.ts` (Line 21)
**Current Value:** `'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'`

**Why it's not working:**
- Google Sign-In button won't render with invalid client ID
- OAuth flow will fail silently
- Google library needs a valid credential

**Solution: Add Your Google Client ID**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing one)
3. Enable Google Identity Services API
4. Create OAuth 2.0 Credentials:
   - Application Type: Web application
   - Authorized Redirect URIs: 
     - `http://localhost:4200`
     - `http://localhost:4200/login`
   - Authorized JavaScript origins:
     - `http://localhost:4200`
5. Copy the Client ID
6. Replace in `src/app/google-auth.service.ts` line 21:

```typescript
private clientId = 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com';
```

---

### Issue 2: Google Script Loading Timing
**File:** `src/index.html`
**Status:** ✅ Fixed - Script is loaded before initialization

The Google Identity Services script loads asynchronously. The service checks if `window.google` exists before initializing.

**Current Implementation:**
```typescript
if ((window as any).google) {
  (window as any).google.accounts.id.initialize({
    client_id: this.clientId,
    callback: (response: any) => this.handleGoogleSignIn(response),
    auto_select: true,
    itp_support: true
  });
}
```

---

### Issue 3: Fallback Email Authentication Works
**Status:** ✅ Working

Users can still login with test credentials:

```
Email: test@example.com
Password: 123456
```

This is the **primary working authentication method** currently.

---

## Authentication Flow

### Option A: Email/Password (Currently Working ✅)

1. User enters email and password on login page
2. Email: `test@example.com`
3. Password: `123456`
4. Authentication service checks localStorage
5. User is redirected to products page
6. Auth guard protects /products and /cart routes

**Status:** Fully functional

---

### Option B: Google OAuth (Requires Setup)

1. User clicks "Sign-In with Google"
2. Google Sign-In button appears (requires valid Client ID)
3. User selects account
4. Google returns JWT token
5. Token is decoded and user data is stored
6. User is redirected to products page

**Status:** Ready but needs Client ID configuration

---

## Testing Authentication

### Method 1: Email Login (Recommended for Testing)

```bash
Email: test@example.com
Password: 123456
```

Steps:
1. Go to http://localhost:4200/login
2. Enter test email and password
3. Click "Login"
4. Should redirect to /products

---

### Method 2: Google OAuth (Requires Client ID)

Steps:
1. Add valid Google Client ID to `google-auth.service.ts`
2. Go to http://localhost:4200/login
3. Click "Sign in with Google"
4. Select your Google account
5. Should redirect to /products

---

## Common Auth Issues & Solutions

### Problem: "Invalid Client ID"
**Cause:** Placeholder client ID in service
**Solution:** Add valid Google Client ID from Google Cloud Console

### Problem: Google button doesn't appear
**Cause 1:** Client ID is invalid
**Cause 2:** Google script didn't load
**Solution:** 
- Check browser console for errors
- Verify script tag in index.html
- Wait 2-3 seconds for script to load

### Problem: Auth guard blocks /products
**Cause:** Auth service isAuthenticated() returns false
**Solution:**
- Make sure you logged in with valid credentials
- Check localStorage for 'twiggy_user' key
- Clear localStorage and login again

### Problem: Can't login with email
**Cause:** Email/password doesn't match test credentials
**Solution:** Use exactly:
- Email: `test@example.com`
- Password: `123456`

---

## Fix Checklist for Google OAuth

- [ ] Create Google Cloud Project
- [ ] Enable Google Identity Services API
- [ ] Create OAuth 2.0 Web Application Credentials
- [ ] Add Client ID to `google-auth.service.ts`
- [ ] Add `http://localhost:4200` to authorized origins
- [ ] Add `http://localhost:4200/login` to redirect URIs
- [ ] Test login flow

---

## Auth Service Architecture

### File: `src/app/auth.ts`
**Contains:** Email/password authentication logic

**Methods:**
- `login(email, password)` - Validates credentials
- `logout()` - Clears user from localStorage
- `isAuthenticated()` - Checks if user is logged in
- `loginWithGoogle(user)` - Processes Google login

**Storage:** localStorage key `twiggy_user`

---

### File: `src/app/google-auth.service.ts`
**Contains:** Google OAuth 2.0 implementation

**Methods:**
- `initializeGoogleSignIn()` - Sets up Google OAuth
- `renderSignInButton(elementId)` - Renders button to DOM
- `handleGoogleSignIn(response)` - Processes JWT token
- `signOut()` - Clears user data

**Storage:** localStorage key `twiggy_google_user`

---

### File: `src/app/auth.guard.ts`
**Contains:** Route protection logic

**Protects:** `/products`, `/product/:id`, `/cart`

**Redirects:** Unauthenticated users to `/login`

---

## Cart System Integration

### Auth + Cart Integration
```
User Login → Get Authenticated → Access /products
    ↓
Add Items to Cart (CartService)
    ↓
Navigate to /cart (Protected by AuthGuard)
    ↓
View Cart Items (Persisted in localStorage)
    ↓
Checkout
```

---

## LocalStorage Keys for Debugging

Open browser DevTools → Application → Local Storage

```
twiggy_user: { email, name }              // Email auth
twiggy_google_user: { id, name, email }   // Google auth
twiggy_cart: [ { id, name, price, ... } ] // Cart items
twiggy_cart_count: number                  // Item count
```

---

## Next Steps

1. **For Email Auth (Immediate):** ✅ Already works
   - Use: Email: test@example.com, Password: 123456

2. **For Google OAuth (Optional):**
   - Follow setup steps above to add Client ID
   - Test Google Sign-In button
   - Both auth methods can coexist

3. **For Production:**
   - Add more test users to auth.ts
   - Create proper user registration
   - Implement real Google OAuth backend
   - Add password reset functionality
   - Implement 2FA/MFA

---

## Debugging Steps

### Step 1: Check Console
Open browser DevTools (F12) → Console tab
Look for Google-related errors:
```
- "Invalid Client ID" → Fix Client ID
- "Load script error" → Check network tab
- No errors → Google lib issue
```

### Step 2: Check Network
DevTools → Network tab
Look for:
```
- accounts.google.com/gsi/client (Google script)
Should show status 200 ✓
```

### Step 3: Check Storage
DevTools → Application → Local Storage
Verify after login:
```
twiggy_user or twiggy_google_user should exist
```

### Step 4: Check Auth Service
Open browser console and run:
```javascript
// Check if authenticated
localStorage.getItem('twiggy_user')

// Check cart
JSON.parse(localStorage.getItem('twiggy_cart'))
```

---

## Timeline

- ✅ Phase 1-3: Email auth + Cart service completed
- ✅ Phase 4: Google OAuth setup completed (needs Client ID)
- ⏳ Production: Real OAuth backend needed

---

**Last Updated:** 2024
**Auth Status:** ✅ Email Auth Working | ⏳ Google OAuth Ready (Needs Config)
