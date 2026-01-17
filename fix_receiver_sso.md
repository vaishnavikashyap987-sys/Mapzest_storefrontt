# Fix for SSO "Invalid Custom Token" Error

**Copy and paste this prompt into the Antigravity session for your OTHER platform (Receiver):**

---

I am getting this error: `Firebase: Error (auth/invalid-custom-token)`.
**The Logic Gap:**
The Storefront is sending a standard **Firebase ID Token** (OIDC), but your code is trying to use `signInWithCustomToken`.
*   `signInWithCustomToken` ONLY works with special tokens minted by a backend Service Account.
*   It does **NOT** work with standard ID tokens passed from client to client.

**The Fix (MVP Approach):**
Since we don't have a backend server to exchange these tokens right now, we need to **Simulate the Login** by just trusting and decoding the token.

**Please update `AuthContext.jsx` to:**
1.  **Remove** the call to `signInWithCustomToken`.
2.  **Add** a helper to parse the JWT (you can use `jwt-decode` or a simple base64 decoder function).
3.  **Logic**:
    *   On mount, if `?token=` is found:
    *   Decode the token to get `{ email, uid, name, picture }`.
    *   **Manually set the `currentUser` state** to this decoded object.
    *   (Do not call Firebase Auth methods, just update the React State so the UI *thinks* we are logged in).

**Decoder Helper Snippet (if needed):**
```javascript
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
```

Please refactor the SSO listener to use this "Mock Login" approach so the UI works immediately or I can create a shared localstorage logic which is easier 
