// Storage Tiers matching Backend Schema
export const STORAGE_TIERS = [
    { id: 'free', label: 'Free', price: 0, storage: '500 MB', type: 'Free Tier', limitMb: 500 },
    { id: 'pro', label: 'Pro', price: 29.99, storage: '5 GB', type: 'Subscription', limitMb: 5120 },
    { id: 'enterprise', label: 'Enterprise', price: 99.99, storage: '1 TB', type: 'Enterprise', limitMb: 1048576 }
];

// 1. Generic Platforms (Auto-generate tiers)
const GENERIC_APPS = [
    { id: 'fram', name: 'FRAM', desc: 'Flood Risk Assessment & Management platform.', url: '#', image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop" },
    { id: 'nrmm', name: 'NRMM', desc: 'Natural Resource Management & Monitoring ecosystem.', url: '#', image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop" },
    { id: 'adss', name: 'ADSS', desc: 'Agriculture Decision Support System for precision farming.', url: import.meta.env.VITE_ADSS_URL || 'http://localhost:3005/sso-callback', image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop" },
    { id: 'catalog', name: 'Geo Catalog', desc: 'Enterprise Data Hosting & Discovery repository.', url: '#', image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" },
    { id: 'survey', name: 'Survey App', desc: 'Mobile Field Data Collection & Validation.', url: '#', image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop" },
    { id: 'p_disaster_mgmt', name: 'Disaster Management', desc: 'Real-time crisis mapping and resource allocation.', url: 'https://example-disaster-platform.cloudfront.net', image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" }
].map(app => ({
    ...app,
    plans: STORAGE_TIERS.map(tier => ({
        id: `${app.id}_${tier.id}`,
        parentId: app.id,
        name: `${tier.label}`, // Just label for the config view
        fullName: `${app.name} ${tier.label}`,
        description: `${app.desc}`,
        features: [`${tier.storage} Storage`, `${tier.type}`],
        price: tier.price,
        type: tier.type,
        renewal: tier.price === 0 ? 'Forever' : 'Monthly',
        url: app.url,
        image: app.image
    }))
}));

// 2. Mapzest Go (Custom Tiers)
const MAPZEST_GO = {
    id: 'p_urban_analytics',
    name: 'Mapzest Go',
    desc: 'Advanced zoning and city planning tools.',
    url: import.meta.env.VITE_MAPZEST_GO_URL || 'http://localhost:5174/',
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
    plans: [
        {
            id: 'p_urban_analytics', // Using parent ID as the base subscription ID
            parentId: 'p_urban_analytics',
            name: 'Standard',
            fullName: 'Mapzest Go Standard',
            description: 'Core zoning tools.',
            features: ['Shared Storage', 'Basic Tools'],
            price: 0,
            type: 'Free Tier',
            renewal: 'Forever',
            url: import.meta.env.VITE_MAPZEST_GO_URL || 'http://localhost:5174/'
        },
        {
            id: 'mapzest-pro',
            parentId: 'p_urban_analytics',
            name: 'Pro Upgrade',
            fullName: 'Mapzest Pro',
            description: 'Unlock advanced analysis.',
            features: ['5 GB Shared Storage', 'Analysis Tools', 'Branding Removal'],
            price: 29.99,
            type: 'Add-on',
            renewal: 'Monthly',
            url: ''
        }
    ]
};

// 3. GeoTools (Single Tier)
const GEOTOOLS = {
    id: 'p_geo_tools',
    name: 'Mapzest GeoTools',
    desc: 'Essential geospatial utilities.',
    url: 'https://d1alo182wsgudi.cloudfront.net/',
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    plans: [
        {
            id: 'p_geo_tools',
            parentId: 'p_geo_tools',
            name: 'Free',
            fullName: 'Mapzest GeoTools',
            description: 'File conversion & UTM finder.',
            features: ['Unlimited Use', 'Free Forever'],
            price: 0,
            type: 'Free Tier',
            renewal: 'Forever',
            url: 'https://d1alo182wsgudi.cloudfront.net/'
        }
    ]
};

// Unified Applications Catalog
export const APPLICATIONS = [MAPZEST_GO, GEOTOOLS, ...GENERIC_APPS];

// Backward Compatibility: Flat list of all purchasable items
export const platforms = APPLICATIONS.flatMap(app => app.plans).map(p => ({
    ...p,
    name: p.fullName // Ensure old code sees the full name
}));

// Check Ownership (Checks against flattened IDs)
export const checkOwnership = (userSubscriptions, platformId) => {
    const platform = platforms.find(p => p.id === platformId);

    // Auto-own logic for Free tiers
    // Unlock GeoTools AND Mapzest Go (Standard) by default
    if (platform?.id === 'p_geo_tools' || platform?.id === 'p_urban_analytics') return true;

    return userSubscriptions?.includes(platformId);
};
