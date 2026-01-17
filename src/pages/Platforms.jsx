import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { platformsData } from '../data/platforms.jsx';

const Platforms = () => {
    return (
        <div className="pt-32 min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-space-900/50 to-transparent z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-cyan">
                        Our Platforms
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Specialized geospatial intelligence solutions tailored for specific industries and challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.values(platformsData).map((platform, index) => (
                        <Link to={`/platforms/${platform.id}`} key={platform.id} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-300 group hover:-translate-y-2 hover:border-${platform.color}-500/50 h-full flex flex-col`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-lg">
                                        <img
                                            src={platform.cardImage}
                                            alt={platform.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Overlay for tint matching platform color */}
                                        <div className={`absolute inset-0 bg-${platform.color}-500/20 mixed-blend-overlay`}></div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-2xl font-bold mb-1 text-white">{platform.title}</h3>
                                <p className="text-sm text-accent-cyan font-medium mb-4">{platform.subtitle}</p>

                                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                    {platform.description}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Platforms;
