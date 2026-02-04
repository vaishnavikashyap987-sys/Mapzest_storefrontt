import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// SECURITY: In production, limit this to your allowed domains
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3005',
    'https://www.mapzest.com',
    'https://go.mapzest.com',
    'https://tools.mapzest.com'
];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
import dataRoutes from './routes/data.js';

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use('/api/data', dataRoutes);

// Initialize Firebase Admin
// OPTION 1: Using Environment Variable (Best for App Runner)
// process.env.FIREBASE_SERVICE_ACCOUNT must contain the JSON string of the key
let serviceAccount;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else if (fs.existsSync('./serviceAccountKey.json')) {
        // OPTION 2: Local File (Best for Local Dev)
        serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
    }
} catch (error) {
    console.error("Failed to load Service Account credentials:", error);
    process.exit(1);
}

if (!serviceAccount) {
    console.error("No Service Account found. Set FIREBASE_SERVICE_ACCOUNT env var or place serviceAccountKey.json in root.");
    process.exit(1);
}

initializeApp({
    credential: cert(serviceAccount)
});

const auth = getAuth();

/**
 * Endpoint: /exchange-token
 * Method: POST
 * Body: { idToken: string }
 * Returns: { customToken: string }
 */
app.post('/exchange-token', async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ error: 'Missing ID Token' });
    }

    try {
        // 1. Verify the ID Token from the Storefront
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        console.log(`[SSO] Verified token for user: ${uid}`);

        // 2. Mint a Custom Token for this specific app
        const customToken = await auth.createCustomToken(uid);

        console.log(`[SSO] Minted custom token for: ${uid}`);

        // 3. Return the Custom Token
        return res.json({ customToken });
    } catch (error) {
        console.error("[SSO] Token Exchange Error:", error);
        return res.status(401).json({ error: 'Invalid or Expired Token', details: error.message });
    }
});

app.get('/health', (req, res) => {
    res.send('SSO Service is Healthy');
});

app.listen(PORT, () => {
    console.log(`SSO Server running on port ${PORT}`);
});
