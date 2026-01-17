import React from 'react';
import { ShieldAlert, Leaf, Sprout, Layers, Database, ClipboardList, Compass } from 'lucide-react';

export const platformsData = {
    fram: {
        id: 'fram',
        title: "FRAM",
        subtitle: "Flood Risk Assessment & Management",
        icon: <ShieldAlert className="w-12 h-12 text-red-500" />,
        color: "red",
        accent: "from-red-500 to-orange-500",
        description: "An advanced disaster management platform designed for real-time flood risk assessment, emergency response coordination, and post-disaster analysis.",
        headerImage: "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&q=80&w=1952",
        cardImage: "https://images.unsplash.com/photo-1485617359743-4dc5d2e53c89?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Simulation/Red Map
        features: [
            "Real-time flood inundation mapping",
            "Population at risk calculation",
            "Emergency route planning",
            "Damage assessment analytics"
        ],
        useCases: [
            {
                title: "Monsoon 2024 Response",
                description: "Deployed during the 2024 monsoon season to coordinate rescue operations across 3 districts, reducing response time by 40%."
            },
            {
                title: "Urban Drainage Planning",
                description: "Used by municipal corporations to identify waterlogging hotspots and plan drainage infrastructure upgrades."
            }
        ]
    },
    nrmm: {
        id: 'nrmm',
        title: "NRMM",
        subtitle: "Natural Resource Management & Monitoring",
        icon: <Leaf className="w-12 h-12 text-green-500" />,
        color: "green",
        accent: "from-green-500 to-emerald-500",
        description: "A comprehensive ecosystem for monitoring environmental health, tracking deforestation, and managing water resources sustainably.",
        headerImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2664",
        cardImage: "https://plus.unsplash.com/premium_photo-1661868856803-7cd1bdbbbb88?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Green Forest/Map
        features: [
            "Deforestation alerts",
            "Water body detection and monitoring",
            "Land use/Land cover change detection",
            "Biodiversity hotspot mapping"
        ],
        useCases: [
            {
                title: "Forest Conservation",
                description: "Enabled forest departments to track illegal logging activities in real-time using satellite imagery."
            },
            {
                title: "Wetland Restoration",
                description: "Monitored the recovery of 500+ hectares of wetland ecosystems over a 5-year period."
            }
        ]
    },
    adss: {
        id: 'adss',
        title: "ADSS",
        subtitle: "Agriculture Decision Support System",
        icon: <Sprout className="w-12 h-12 text-yellow-500" />,
        color: "yellow",
        accent: "from-yellow-400 to-orange-500",
        description: "Precision agriculture solutions empowering farmers and agribusinesses with actionable insights for crop health and yield optimization.",
        headerImage: "https://images.unsplash.com/photo-1625246333195-098e475c5393?auto=format&fit=crop&q=80&w=2574",
        cardImage: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Wheat/Field analysis
        features: [
            "Crop health monitoring (NDVI)",
            "Soil moisture estimation",
            "Yield prediction models",
            "Pest and disease detection"
        ],
        useCases: [
            {
                title: "Yield Optimization",
                description: "Helped a cooperative of 2000 farmers increase wheat yield by 15% through precision irrigation scheduling."
            },
            {
                title: "Crop Insurance",
                description: "Provided accurate crop loss data to insurance companies for faster and fairer claims processing."
            }
        ]
    },
    basic: {
        id: 'basic',
        title: "Mapzest GO",
        subtitle: "Geospatial Data Visualization & Analytics",
        icon: <Layers className="w-12 h-12 text-blue-500" />,
        color: "blue",
        accent: "from-blue-500 to-cyan-500",
        description: "The core platform for hosting, visualizing, and performing basic analytics on high-resolution UAV and satellite data.",
        headerImage: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=2670",
        cardImage: "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2020/08/GIS-Story-1-1024x576-864x486-1.jpg", // Data/Satellite view
        features: [
            "DEM & DSM generation",
            "Green Index calculation",
            "Automated tree counting",
            "Volumetric analysis"
        ],
        useCases: [
            {
                title: "Urban Auditing",
                description: "Mapped 50 sq km of urban area to create a digital twin for smart city planning."
            },
            {
                title: "Construction Monitoring",
                description: "Tracked progress of highway construction with monthly drone surveys and volumetric calculations."
            }
        ]
    },
    catalog: {
        id: 'catalog',
        title: "Geo Catalog",
        subtitle: "Enterprise Data Hosting & Discovery",
        icon: <Database className="w-12 h-12 text-purple-500" />,
        color: "purple",
        accent: "from-purple-500 to-pink-500",
        description: "A scalable repository for organizations to host, manage, and share massive geospatial datasets securely.",
        headerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672",
        cardImage: "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Server/Network
        features: [
            "Petabyte-scale data storage",
            "OGC compliant web services (WMS/WFS)",
            "Metadata management",
            "Granular access control"
        ],
        useCases: [
            {
                title: "National Data Repository",
                description: "Hosting the national spatial data infrastructure for a government agency."
            },
            {
                title: "Research Collaboration",
                description: "Enabling cross-border sharing of climate data between university research groups."
            }
        ]
    },
    survey: {
        id: 'survey',
        title: "Survey App",
        subtitle: "Mobile Field Data Collection",
        icon: <ClipboardList className="w-12 h-12 text-orange-500" />,
        color: "orange",
        accent: "from-orange-500 to-red-500",
        description: "A robust mobile application for ground truthing, asset mapping, and field data validation, fully integrated with Mapzest platforms.",
        headerImage: "https://images.unsplash.com/photo-1581092921461-eab6245b0a62?auto=format&fit=crop&q=80&w=2670",
        cardImage: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Tablet/Survey
        features: [
            "Offline data collection",
            "GPS track recording",
            "Photo geotagging",
            "Custom form builder"
        ],
        useCases: [
            {
                title: "Utility Mapping",
                description: "Used by field crews to map over 10,000 electric poles and assets in a rural electrification project."
            },
            {
                title: "Census Survey",
                description: "Digitized the household survey process for a municipal demographic study."
            }
        ]
    },
    utm: {
        id: 'utm',
        title: "UTM Zone Finder",
        subtitle: "Universal Transverse Mercator Utilities",
        icon: <Compass className="w-12 h-12 text-cyan-500" />,
        color: "cyan",
        accent: "from-cyan-500 to-blue-500",
        description: "A simplified tool for quick and accurate identification of UTM zones and coordinate conversions globally.",
        headerImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2674",
        cardImage: "https://images.unsplash.com/photo-1519709042477-8de6eaf1fdc5?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Compass/Map
        features: [
            "Interactive global zone map",
            "Coordinate conversion (Lat/Long to UTM)",
            "Batch processing",
            "Export to KML/Shapefile"
        ],
        url: 'https://d1alo182wsgudi.cloudfront.net/',
        useCases: [
            {
                title: "Survey Preparation",
                description: "Used daily by surveyors to verify projection parameters before commencing field operations."
            },
            {
                title: "Educational Tool",
                description: "Adopted by universities for teaching geomatics and map projections."
            }
        ]
    }
};
