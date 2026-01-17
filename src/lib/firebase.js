import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Connect to Emulators if functioning locally
// NOTE: Enable this if the Receiver App is also running on Emulators to avoid "401 Unauthorized"
/*
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

if (window.location.hostname === 'localhost') {
    // Check if we should use emulators (You can control this via .env if preferred)
    console.log("[Firebase] Connecting to Emulators...");
    // Standard Ports: Auth (9099), Firestore (8080)
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, 'localhost', 8080);
}
*/

// Auth Helpers
export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
};

export const logout = () => {
    return signOut(auth);
};

// --- DATABASE HELPERS (Integrated from User Code) ---

// Helper to get full profile (workspace, theme, subscriptions)
export const getUserProfile = async (email) => {
    try {
        if (!email) return null;
        const docRef = doc(db, "user_permissions", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null; // or empty object if preferred
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};

// Save or Update User Profile (e.g. adding subscriptions)
export const saveUserProfile = async (email, data) => {
    try {
        if (!email) return;

        const dataToSave = { ...data };

        // Handle workspace normalization if workspace provided
        if (dataToSave.workspace) {
            dataToSave.workspace = dataToSave.workspace.trim();
            dataToSave.workspace_lowercase = dataToSave.workspace.toLowerCase();
        }

        // Write to user_permissions/{email}
        await setDoc(doc(db, "user_permissions", email), dataToSave, { merge: true });
        console.log(`[Firebase] Profile updated for ${email}`);
    } catch (error) {
        console.error("Error saving user profile:", error);
        throw error;
    }
};

// Helper: Add a Subscription Plan to User
export const addSubscription = async (email, planId) => {
    try {
        if (!email) throw new Error("No email provided");

        const currentProfile = await getUserProfile(email);
        const currentPlans = currentProfile?.active_plans || [];

        if (!currentPlans.includes(planId)) {
            const updatedPlans = [...currentPlans, planId];
            await saveUserProfile(email, { active_plans: updatedPlans });
            return updatedPlans;
        }
        return currentPlans;
    } catch (error) {
        console.error("Error adding subscription:", error);
        throw error;
    }
};
