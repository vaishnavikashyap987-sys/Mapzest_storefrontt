# Prompt for "Receiver" Platform Integration

**Copy and paste this into your Antigravity session for the other platform:**

---

I need to integrate this application with my main "Storefront" app.
**Context:**
1.  Both apps share the **SAME** Firebase Project (`mapzest-express`).
2.  The Storefront redirects users to this app with a URL parameter: `?token=FIREBASE_ID_TOKEN`.
3.  My goal is **Single Sign-On (SSO)**: If a user arrives with a valid token, they should be logged in automatically without clicking anything.

**Task:**
Please update my `AuthContext.jsx` (or main entry point) to:
1.  Check for the `token` query parameter on mount.
2.  If found, use it to authenticate the user.
    *   *Note*: Since we are sharing the same project, try to see if `signInWithCustomToken` works (if I generate a custom token) OR suggest the best way to "hydrate" the session using this ID token.
    *   *Alternative*: If passing the ID token directly isn't enough for client-side auth, help me set up a simple "Verify & Sign In" flow.
3.  Once signed in, clear the `token` from the URL so it doesn't look messy.

Here is my current `firebase.js` config (ensure it matches the Storefront's config):
*   Project ID: `mapzest-express`
*   Auth Domain: `mapzest-express.firebaseapp.com`

Please implement the listener and sign-in logic now.
