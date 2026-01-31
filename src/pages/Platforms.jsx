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
                                className={`glass-panel rounded-2xl border border-white/5 transition-all duration-300 group hover:-translate-y-2 hover:border-${platform.color}-500/50 h-full flex flex-col overflow-hidden`}
                            >
                                {/* Banner Image */}
                                <div className="h-48 w-full relative overflow-hidden group-hover:h-52 transition-all duration-500">
                                    <div className={`absolute inset-0 bg-${platform.color}-500/20 mixed-blend-overlay z-10 group-hover:bg-transparent transition-colors`}></div>
                                    <img
                                        src={platform.cardImage}
                                        alt={platform.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Icon Badge */}
                                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 z-20">
                                        {/* We don't have the icon component here directly unless we map it, 
                                             but platformsData has the 'icon' JSX element. 
                                             Normally passing JSX in data is tricky if not handled well, 
                                             but here we are mapping Object.values(platformsData).
                                             Wait, platform.icon IS a valid React element in platformsData.
                                         */}
                                        {/* Actually, let's just use the title or keep it clean. 
                                             The user liked the "dashboard" look. 
                                             Let's keep the content simple. 
                                          */}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">{platform.title}</h3>
                                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                    </div>

                                    <p className="text-sm text-accent-cyan font-medium mb-4">{platform.subtitle}</p>

                                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                        {platform.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Platforms;
