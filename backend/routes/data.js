import express from 'express';
import multer from 'multer';
import { query, getClient } from '../db/index.js';
import { getAuth } from 'firebase-admin/auth';
import shp from 'shpjs';
import tj from '@mapbox/togeojson';
import { DOMParser } from 'xmldom';
import csv from 'csv-parser';
import { Readable } from 'stream';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB Limit
});

// Middleware to verify Firebase Auth Token
const verifyAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

router.use(verifyAuth);

// Helper: Parse different formats to GeoJSON
const parseFileToGeoJSON = async (buffer, originalName, mimeType) => {
    const ext = originalName.split('.').pop().toLowerCase();

    // 1. GeoJSON / JSON
    if (ext === 'json' || ext === 'geojson') {
        return JSON.parse(buffer.toString());
    }

    // 2. KML
    if (ext === 'kml') {
        const kmlString = buffer.toString();
        const kmlDom = new DOMParser().parseFromString(kmlString);
        return tj.kml(kmlDom);
    }

    // 3. Zipped Shapefile
    if (ext === 'zip') {
        return await shp(buffer);
    }

    // 4. CSV
    if (ext === 'csv') {
        const results = [];
        const stream = Readable.from(buffer.toString());
        return new Promise((resolve, reject) => {
            stream
                .pipe(csv())
                .on('data', (data) => {
                    // Try to find lat/lon columns
                    const lat = parseFloat(data.lat || data.latitude || data.LAT || data.LATITUDE);
                    const lng = parseFloat(data.lon || data.lng || data.longitude || data.LON || data.LONGITUDE);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        results.push({
                            type: 'Feature',
                            properties: data, // Store all columns as props
                            geometry: {
                                type: 'Point',
                                coordinates: [lng, lat]
                            }
                        });
                    }
                })
                .on('end', () => {
                    resolve({ type: 'FeatureCollection', features: results });
                })
                .on('error', reject);
        });
    }

    throw new Error('Unsupported file format');
};

/**
 * POST /upload
 * Uploads a file, processes it, and stores in DB
 */
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    let client;
    try {
        const userId = req.user.uid;
        const fileSizeMb = (req.file.size / (1024 * 1024));

        // 1. Parse Logic
        console.log(`Processing ${req.file.originalname}...`);
        let geoJSON = await parseFileToGeoJSON(req.file.buffer, req.file.originalname, req.file.mimetype);

        // Handle shpjs returning an array of FeatureCollections
        if (Array.isArray(geoJSON)) {
            // Merge them or just take the first one? For simplicity, flatten features.
            const allFeatures = geoJSON.flatMap(fc => fc.features);
            geoJSON = { type: 'FeatureCollection', features: allFeatures };
        }

        const features = geoJSON.features || (geoJSON.type === 'Feature' ? [geoJSON] : []);

        if (features.length === 0) {
            return res.status(400).json({ error: 'No valid features found in file.' });
        }

        // 2. DB Transaction
        client = await getClient();
        await client.query('BEGIN');

        // Insert Dataset (Triggers Quota Check)
        const datasetRes = await client.query(
            `INSERT INTO datasets (user_id, name, type, file_size_mb, s3_key)
             VALUES ($1, $2, 'vector', $3, 'pg_stored')
             RETURNING id`,
            [userId, req.file.originalname, fileSizeMb]
        );
        const datasetId = datasetRes.rows[0].id;

        // Batch Insert Features (Chunk size 500)
        const CHUNK_SIZE = 500;
        for (let i = 0; i < features.length; i += CHUNK_SIZE) {
            const chunk = features.slice(i, i + CHUNK_SIZE);

            // Construct Batch Query
            const values = [];
            const placeholders = [];
            let paramIdx = 1;

            chunk.forEach(f => {
                placeholders.push(`($${paramIdx}, $${paramIdx + 1}, ST_SetSRID(ST_GeomFromGeoJSON($${paramIdx + 2}), 4326))`);
                values.push(datasetId, JSON.stringify(f.properties || {}), JSON.stringify(f.geometry));
                paramIdx += 3;
            });

            const queryText = `
                INSERT INTO map_features (dataset_id, properties, geom)
                VALUES ${placeholders.join(', ')}
            `;

            await client.query(queryText, values);
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Upload successful', datasetId });

    } catch (error) {
        if (client) await client.query('ROLLBACK');
        console.error('Upload error:', error);

        // Handle custom Trigger errors (Quota)
        if (error.message.includes('Storage Quota Exceeded')) {
            return res.status(403).json({ error: error.message });
        }

        res.status(500).json({ error: error.message || 'Internal Server Error' });
    } finally {
        if (client) client.release();
    }
});

/**
 * DELETE /:id
 */
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.user.uid;
        const datasetId = req.params.id;

        const result = await query(
            'DELETE FROM datasets WHERE id = $1 AND user_id = $2 RETURNING id',
            [datasetId, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'File not found or access denied' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ... existing GET routes ...
router.get('/usage', verifyAuth, async (req, res) => {
    try {
        const userId = req.user.uid;
        const usageRes = await query('SELECT * FROM user_usage WHERE user_id = $1', [userId]);
        let usage = usageRes.rows[0];
        if (!usage) {
            usage = { user_id: userId, current_tier: 'free', total_storage_used_mb: 0, file_count: 0 };
        }
        const limitRes = await query('SELECT * FROM plan_limits WHERE tier = $1', [usage.current_tier]);
        const limits = limitRes.rows[0];
        res.json({
            usage: {
                used_mb: parseFloat(usage.total_storage_used_mb),
                file_count: usage.file_count,
                tier: usage.current_tier
            },
            limits: {
                total_mb: limits.storage_limit_mb,
                max_file_mb: limits.max_file_size_mb,
                features_allowed: limits.features_allowed
            }
        });
    } catch (error) {
        console.error('Error fetching usage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Download Dataset as GeoJSON
router.get('/:id/download', verifyAuth, async (req, res) => {
    try {
        const userId = req.user.uid;
        const datasetId = req.params.id;

        // 1. Verify Ownership & Get Metadata
        const datasetRes = await query(
            'SELECT * FROM datasets WHERE id = $1 AND user_id = $2',
            [datasetId, userId]
        );

        if (datasetRes.rows.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }
        const dataset = datasetRes.rows[0];

        // 2. Fetch Features
        const featuresRes = await query(
            `SELECT 
                json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(geom)::json,
                    'properties', properties
                ) as feature
             FROM map_features 
             WHERE dataset_id = $1`,
            [datasetId]
        );

        // 3. Construct GeoJSON
        const featureCollection = {
            type: 'FeatureCollection',
            features: featuresRes.rows.map(row => row.feature)
        };

        // 4. Send File
        const filename = dataset.name.endsWith('.geojson') ? dataset.name : `${dataset.name}.geojson`;
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/geo+json');
        res.send(JSON.stringify(featureCollection));

    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/files', verifyAuth, async (req, res) => {
    try {
        const userId = req.user.uid;
        const result = await query('SELECT * FROM datasets WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
