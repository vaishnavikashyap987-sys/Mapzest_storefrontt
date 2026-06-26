import React from 'react';
import { ShieldAlert, Leaf, Sprout, Layers, Database, ClipboardList, Compass } from 'lucide-react';

export const platformsData = {
    fram: {
        id: 'fram',
        title: "FRAM",
        subtitle: "Flood Risk Assessment Module",
        icon: <ShieldAlert className="w-12 h-12 text-red-500" />,
        color: "red",
        accent: "from-red-500 to-orange-500",
        description: "FRAM uses high-resolution drone imagery and elevation data to identify flood-prone areas. It generates flood risk zones along with detailed statistics to support planning, mitigation, and disaster preparedness.",
        headerImage: "/fram_dashboard.png",
        cardImage: "/fram_dashboard.png", // Kanpur Flood Risk map dashboard
        features: [
            "Real-time flood inundation mapping",
            "Population at risk calculation",
            "Emergency route planning",
            "Damage assessment analytics"
        ],
        useCases: [
            {
                title: "Urban Flood Planning",
                description: "City planners use FRAM to identify low-lying and flood-prone zones before approving new residential or infrastructure projects."
            },
            {
                title: "Disaster Preparedness & Response",
                description: "Disaster management authorities generate flood risk maps and statistics to plan evacuation routes, relief centers, and emergency resource allocation."
            },
            {
                title: "Infrastructure Risk Analysis",
                description: "Engineers assess flood exposure for roads, bridges, and public utilities to design better mitigation measures and drainage systems."
            }
        ]
    },
    nrmm: {
        id: 'nrmm',
        title: "NRMM",
        subtitle: "Natural Resource Monitoring Module",
        icon: <Leaf className="w-12 h-12 text-green-500" />,
        color: "green",
        accent: "from-green-500 to-emerald-500",
        description: "NRMM integrates satellite imagery with ground-based IoT sensors to monitor and conserve natural resources such as water bodies, forests, and wetlands. It enables continuous tracking and informed decision-making for sustainable resource management.",
        headerImage: "/nrmm_dashboard.png",
        cardImage: "/nrmm_dashboard.png", // Lake Analysis dashboard screenshot
        features: [
            "Deforestation alerts",
            "Water body detection and monitoring",
            "Land use/Land cover change detection",
            "Biodiversity hotspot mapping"
        ],
        useCases: [
            {
                title: "Water Body Monitoring",
                description: "Environmental agencies track seasonal changes in lakes, rivers, and reservoirs using satellite imagery and IoT water level sensors."
            },
            {
                title: "Forest Conservation",
                description: "Forestry departments monitor deforestation, forest degradation, and vegetation health over time."
            },
            {
                title: "Wetland Protection",
                description: "Conservation organizations observe wetland shrinkage, encroachment, and ecosystem changes for policy and restoration planning."
            }
        ]
    },
    adss: {
        id: 'adss',
        title: "KrishiZest",
        subtitle: "",
        icon: <Sprout className="w-12 h-12 text-yellow-500" />,
        color: "yellow",
        accent: "from-yellow-400 to-orange-500",
        description: "KrishiZest combines satellite and drone data to monitor crop health and field conditions. It helps farmers and stakeholders improve irrigation efficiency, detect crop stress early, and make better data-driven farming decisions.",
        headerImage: "/krishizest.jpg",
        cardImage: "/krishizest.jpg", // Precision farming map dashboard
        features: [
            "Crop health monitoring (NDVI)",
            "Soil moisture estimation",
            "Yield prediction models",
            "Pest and disease detection"
        ],
        useCases: [
            {
                title: "Crop Health Monitoring",
                description: "Farmers analyze vegetation indices to detect crop stress, pest impact, or nutrient deficiency at an early stage."
            },
            {
                title: "Irrigation Management",
                description: "Agricultural officers optimize irrigation schedules by monitoring soil moisture and crop water demand."
            },
            {
                title: "Yield Estimation",
                description: "Agribusiness companies use historical satellite data to estimate crop yield and plan supply chains."
            }
        ]
    },
    basic: {
        id: 'basic',
        title: "Mapzest GO",
        subtitle: "Core Web GIS Platform",
        icon: <Layers className="w-12 h-12 text-blue-500" />,
        color: "blue",
        accent: "from-blue-500 to-cyan-500",
        description: "Mapzest Basic is the foundational Web GIS platform for hosting and visualizing spatial data. Users can perform basic satellite analysis, run spatial queries, print maps, and manage everyday geospatial workflows with ease.",
        headerImage: "/mapzest_go.png",
        cardImage: "/mapzest_go_dashboard.png", // Data/Satellite view
        features: [
            "DEM & DSM generation",
            "Green Index calculation",
            "Automated tree counting",
            "Volumetric analysis"
        ],
        pricing: "Open Access",
        url: import.meta.env.VITE_MAPZEST_GO_URL || 'http://localhost:5174/',
        useCases: [
            {
                title: "Spatial Data Hosting",
                description: "Organizations upload and manage their vector and raster datasets in a centralized web-based GIS system."
            },
            {
                title: "Basic Spatial Analysis",
                description: "Users perform buffer, overlay, and spatial queries for day-to-day GIS tasks without desktop software."
            },
            {
                title: "Thematic Mapping & Reporting",
                description: "Analysts create thematic maps and printable layouts for reports and presentations."
            }
        ]
    },
    catalog: {
        id: 'catalog',
        title: "Geo Catalog",
        subtitle: "Spatial Data Discovery Platform",
        icon: <Database className="w-12 h-12 text-purple-500" />,
        color: "purple",
        accent: "from-purple-500 to-pink-500",
        description: "Geo Catalog is a centralized platform to explore and visualize spatial datasets. It presents geospatial data in a clean and interactive way, making discovery, preview, and understanding of spatial information effortless.",
        headerImage: "/geo_catalog.jpg",
        cardImage: "/geo_catalog_dashboard.jpg", // Server/Network
        features: [
            "Petabyte-scale data storage",
            "OGC compliant web services (WMS/WFS)",
            "Metadata management",
            "Granular access control"
        ],
        useCases: [
            {
                title: "Data Exploration",
                description: "Researchers browse available geospatial datasets before downloading or integrating them into projects."
            },
            {
                title: "Inter-Department Data Sharing",
                description: "Government departments publish and share spatial datasets internally through a single catalog."
            },
            {
                title: "Project Planning",
                description: "GIS teams preview spatial coverage and metadata to select suitable datasets for new studies."
            }
        ]
    },
    survey: {
        id: 'survey',
        title: "MapZest",
        subtitle: "Field Survey Application",
        icon: <ClipboardList className="w-12 h-12 text-orange-500" />,
        color: "orange",
        accent: "from-orange-500 to-red-500",
        description: "High-precision field utility. Geotagged evidence capture, offline synchronization, and instant cloud-based verification for synchronized team workflows.",
        headerImage: "/mapzest_survey.png",
        cardImage: "/mapzest_survey_dashboard.png", // Tablet/Survey
        features: [
            "Offline data collection",
            "GPS track recording",
            "Photo geotagging",
            "Custom form builder"
        ],
        useCases: [
            {
                title: "Field Asset Mapping",
                description: "Survey teams collect geotagged photos and attributes for assets like poles, pipelines, buildings, and roads."
            },
            {
                title: "Environmental Field Surveys",
                description: "Researchers capture location-based observations of vegetation, water quality, or wildlife."
            },
            {
                title: "Damage Assessment Surveys",
                description: "Teams document post-disaster damage with geotagged evidence and synchronize data to the cloud."
            }
        ]
    },
    utm: {
        id: 'utm',
        title: "Mapzest Geo Tools",
        subtitle: "Geodetic Utilities",
        icon: <Compass className="w-12 h-12 text-cyan-500" />,
        color: "cyan",
        accent: "from-cyan-500 to-blue-500",
        description: "Advanced geodetic utility. Instantly determine precise Universal Transverse Mercator zones with global coverage and sub-meter coordinate engineering.",
        headerImage: "/mapzest_geo_tools.png",
        cardImage: "/mapzest_geo_tools_dashboard.png", // Compass/Map
        features: [
            "Interactive global zone map",
            "Coordinate conversion (Lat/Long to UTM)",
            "Batch processing",
            "Export to KML/Shapefile"
        ],
        pricing: "Open Access",
        url: import.meta.env.VITE_MAPZEST_GeoTools_URL || 'http://localhost:5174/',
        useCases: [
            {
                title: "Survey Planning",
                description: "Surveyors determine correct UTM zones before conducting field measurements."
            },
            {
                title: "Coordinate System Validation",
                description: "GIS professionals verify coordinate systems while integrating multi-source spatial data."
            },
            {
                title: "Engineering Projects",
                description: "Civil engineers use precise coordinate references for infrastructure design and mapping."
            }
        ]
    }
};
