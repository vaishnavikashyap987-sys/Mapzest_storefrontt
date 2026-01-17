# Secure SSO Implementation Prompt for Receiver Agent

**Objective**: Update the Receiver App to support Secure SSO using the new Token Exchange Service.

## Architecture
1.  **Storefront (Sender)**: Redirects user to Receiver with `?token=ID_TOKEN`.
2.  **Token Service (Backend)**: A standalone Node.js server running at `http://localhost:3000/exchange-token` (or production URL).
3.  **Receiver (You)**: Calls the Token Service to exchange the `ID Token` for a `Custom Token` and signs in.

## Your Task

Update your `AuthContext.jsx` (or wherever your `initAuth` logic lives) to replace any "mock decoding" or "Cloud Function" logic with this standard HTTP call.

### Code Snippet

```javascript
// src/context/AuthContext.jsx
import { useEffect } from 'react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Ensure this points to your initialized auth instance

// CONFIGURATION
// Local Development: 'http://localhost:3000/exchange-token'
// Production: Replace with the actual URL where the SSO Backend is deployed
const SSO_BACKEND_URL = import.meta.env.VITE_SSO_BACKEND_URL || 'http://localhost:3000/exchange-token';

```javascript
// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase'; // Ensure db is exported

// CONFIGURATION
const SSO_BACKEND_URL = import.meta.env.VITE_SSO_BACKEND_URL || 'http://localhost:3000/exchange-token';
// Set your Storefront URL here (Local: http://localhost:5173, Prod: https://mapzest.com)
const STOREFRONT_URL = import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:5173';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isExchangingToken, setIsExchangingToken] = useState(false);

    useEffect(() => {
        // ... (SSO Exchange Logic same as before) ...
    }, []);

    // ... (handleSSOExchange same as before) ...

    // Logout Function (Callable by UI)
    const logout = async () => {
        await signOut(auth);
        window.location.href = STOREFRONT_URL; // Redirect to Storefront
    };

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) setLoading(false);
            
            // If user is logged in, listen for Global Logout signal
            if (currentUser && currentUser.email) {
                const docRef = doc(db, 'user_permissions', currentUser.email);
                const unsubscribeDb = onSnapshot(docRef, (docSnap) => {
                    const data = docSnap.data();
                    // If forceLogoutAt is recent (e.g., in the last 10 seconds), sign out
                    if (data?.forceLogoutAt && Date.now() - data.forceLogoutAt < 10000) {
                        console.log("Global Logout Triggered");
                        logout(); // Uses the same redirect logic
                    }
                });
                return () => unsubscribeDb();
            }
        });
        return unsubscribeAuth;
    }, []);

    const value = { user, logout, loading: loading || isExchangingToken };


    return (
        <AuthContext.Provider value={value}>
            {!loading && !isExchangingToken && children}
            {(loading || isExchangingToken) && <div className="loading-screen">Loading Application...</div>}
        </AuthContext.Provider>
    );
};
```

## Checklist for Agent
- [ ] **Fix Login Redirect**: Ensure your router or `AuthContext` waits for `isExchangingToken` to be false before redirecting to `/login`.
- [ ] **Global Logout**: Add the `onSnapshot` listener to detect when `forceLogoutAt` changes in Firestore.
- [ ] **Service Account**: Ensure `backend/` has the `serviceAccountKey.json` and is running (`npm start`) if testing locally.
