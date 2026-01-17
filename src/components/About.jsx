import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layers, Cpu, Satellite } from 'lucide-react';

const features = [
    {
        icon: <Satellite className="w-8 h-8 text-accent-zinc" />,
        title: "Satellite Imagery",
        description: "High-resolution optical and radar data acquisition from leading constellations."
    },
    {
        icon: <Layers className="w-8 h-8 text-accent-zinc" />,
        title: "GIS Mapping",
        description: "Advanced spatial analysis and cartography for urban planning and environmental monitoring."
    },
    {
        icon: <Cpu className="w-8 h-8 text-accent-zinc" />,
        title: "AI Analytics",
        description: "Machine learning models for automated object detection and land cover classification."
    },
    {
        icon: <Globe className="w-8 h-8 text-accent-zinc" />,
        title: "Global Coverage",
        description: "Seamless data access anywhere on Earth with rapid revisit times."
    }
];

const About = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Pioneering Geospatial Intelligence</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Mapzest bridges the gap between raw satellite data and actionable insights.
                        We empower industries to make data-driven decisions with precision and speed.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors duration-300 group"
                        >
                            <div className="mb-6 p-4 bg-white/5 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
