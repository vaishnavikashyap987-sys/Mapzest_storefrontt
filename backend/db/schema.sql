-- Mapzest Central Database Schema Design
-- Target: PostgreSQL + PostGIS (AWS RDS / Supabase)

-- 1. Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. ENUMS for Consistency (Safe creation)
DO $$ BEGIN
    CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'enterprise');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE file_type AS ENUM ('vector', 'raster', 'point_cloud', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PLAN LIMITS TABLE (Configuration)
CREATE TABLE IF NOT EXISTS plan_limits (
    tier subscription_tier PRIMARY KEY,
    storage_limit_mb INTEGER NOT NULL,
    max_file_size_mb INTEGER NOT NULL,
    features_allowed BOOLEAN DEFAULT true
);

-- Seed defaults (Upsert to avoid errors on re-run)
INSERT INTO plan_limits (tier, storage_limit_mb, max_file_size_mb) VALUES
('free', 500, 50),
('pro', 5120, 500),
('enterprise', 1024000, 5000)
ON CONFLICT (tier) DO UPDATE 
SET storage_limit_mb = EXCLUDED.storage_limit_mb, 
    max_file_size_mb = EXCLUDED.max_file_size_mb;

-- 4. USER USAGE TRACKER
CREATE TABLE IF NOT EXISTS user_usage (
    user_id VARCHAR(128) PRIMARY KEY,
    current_tier subscription_tier DEFAULT 'free',
    total_storage_used_mb NUMERIC(10,2) DEFAULT 0.00,
    file_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. DATASETS TABLE
CREATE TABLE IF NOT EXISTS datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(128) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    s3_key VARCHAR(512),
    file_size_mb NUMERIC(10,2) NOT NULL,
    type file_type NOT NULL,
    crs_epsg INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tags TEXT[],
    CONSTRAINT fk_usage_tracker FOREIGN KEY (user_id) REFERENCES user_usage(user_id)
);

CREATE INDEX IF NOT EXISTS idx_datasets_user ON datasets(user_id);

-- 6. GEOSPATIAL DATA
CREATE TABLE IF NOT EXISTS map_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    properties JSONB,
    geom GEOMETRY(Geometry, 4326)
);

CREATE INDEX IF NOT EXISTS idx_map_features_geom ON map_features USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_map_features_dataset ON map_features(dataset_id);

-- 7. FUNCTION: ENFORCE QUOTA
CREATE OR REPLACE FUNCTION check_quota() RETURNS TRIGGER AS $$
DECLARE
    limit_mb INTEGER;
    current_mb NUMERIC;
    user_tier subscription_tier;
BEGIN
    SELECT total_storage_used_mb, current_tier INTO current_mb, user_tier
    FROM user_usage WHERE user_id = NEW.user_id;
    
    IF NOT FOUND THEN
        INSERT INTO user_usage (user_id) VALUES (NEW.user_id)
        RETURNING total_storage_used_mb, current_tier INTO current_mb, user_tier;
    END IF;

    SELECT storage_limit_mb INTO limit_mb FROM plan_limits WHERE tier = user_tier;

    IF (current_mb + NEW.file_size_mb) > limit_mb THEN
        RAISE EXCEPTION 'Storage Quota Exceeded. Current: % MB, Limit: % MB, Attempted: % MB', 
            current_mb, limit_mb, NEW.file_size_mb;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_quota ON datasets;
CREATE TRIGGER trigger_check_quota
BEFORE INSERT ON datasets
FOR EACH ROW EXECUTE FUNCTION check_quota();

-- 8. FUNCTION: UPDATE USAGE
CREATE OR REPLACE FUNCTION update_usage_stats() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE user_usage 
        SET total_storage_used_mb = total_storage_used_mb + NEW.file_size_mb,
            file_count = file_count + 1
        WHERE user_id = NEW.user_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE user_usage 
        SET total_storage_used_mb = total_storage_used_mb - OLD.file_size_mb,
            file_count = file_count - 1
        WHERE user_id = OLD.user_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_usage ON datasets;
CREATE TRIGGER trigger_update_usage
AFTER INSERT OR DELETE ON datasets
FOR EACH ROW EXECUTE FUNCTION update_usage_stats();
