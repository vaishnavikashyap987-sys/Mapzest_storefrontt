import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function initDB() {
    console.log("🔌 Connecting to Database...");

    if (!process.env.DATABASE_URL) {
        console.error("❌ Error: DATABASE_URL is not set in .env");
        process.exit(1);
    }

    try {
        const client = await pool.connect();
        console.log("✅ Connected successfully.");

        const schemaPath = path.join(__dirname, '../db/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log("📜 Running Schema Migration...");
        await client.query(schema);

        console.log("✨ Database initialized successfully!");
        client.release();
    } catch (error) {
        console.error("❌ Database Initialization Failed:", error);
    } finally {
        await pool.end();
    }
}

initDB();
