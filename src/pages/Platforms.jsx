import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { platformsData } from '../data/platforms.jsx';

const colorClasses = {
    red: { bg: 'bg-red-50/50', border: 'border-red-200/40', text: 'text-red-500', hoverBorder: 'group-hover:border-red-500/30' },
    green: { bg: 'bg-green-50/50', border: 'border-green-200/40', text: 'text-green-500', hoverBorder: 'group-hover:border-green-500/30' },
    yellow: { bg: 'bg-yellow-50/50', border: 'border-yellow-200/40', text: 'text-yellow-600', hoverBorder: 'group-hover:border-yellow-500/30' },
    blue: { bg: 'bg-blue-50/50', border: 'border-blue-200/40', text: 'text-blue-500', hoverBorder: 'group-hover:border-blue-500/30' },
    purple: { bg: 'bg-purple-50/50', border: 'border-purple-200/40', text: 'text-purple-500', hoverBorder: 'group-hover:border-purple-500/30' },
    orange: { bg: 'bg-orange-50/50', border: 'border-orange-200/40', text: 'text-orange-500', hoverBorder: 'group-hover:border-orange-500/30' },
    cyan: { bg: 'bg-cyan-50/50', border: 'border-cyan-200/40', text: 'text-cyan-500', hoverBorder: 'group-hover:border-cyan-500/30' },
};

const Platforms = () => {
    return (
        <div className="pt-32 min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-space-900/50 to-transparent z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Platforms</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Specialized geospatial intelligence solutions tailored for specific industries and challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-6 md:gap-y-12">
                    {Object.values(platformsData).map((platform, index) => {
                        const style = colorClasses[platform.color] || colorClasses.cyan;
                        return (
                            <Link to={`/platforms/${platform.id}`} key={platform.id} className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative flex flex-col h-full pb-12"
                                >
                                    {/* Banner Image */}
                                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-slate-200/50">
                                        <img
                                            src={platform.cardImage}
                                            alt={platform.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Pricing Badge */}
                                        {platform.pricing && (
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-accent-cyan/30 text-accent-cyan text-[10px] font-bold px-3 py-1 rounded-full z-20 uppercase tracking-widest shadow-xl">
                                                {platform.pricing}
                                            </div>
                                        )}
                                    </div>

                                    {/* Floating Content Box */}
                                    <div className="premium-card-content relative z-10 mx-4 -mt-16 p-6 md:p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-100 flex flex-col flex-grow min-h-[260px]">
                                        <div className="flex items-start justify-between mb-4 gap-2">
                                            <div className="flex flex-col">
                                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-900 active:text-blue-950 transition-colors leading-tight">{platform.title}</h3>
                                                <p className="text-xs text-accent-cyan font-bold mt-1 uppercase tracking-wider">{platform.subtitle}</p>
                                            </div>
                                            <div className={`p-2.5 rounded-2xl ${style.bg} border ${style.border} flex items-center justify-center shrink-0`}>
                                                {React.cloneElement(platform.icon, { className: `w-5 h-5 ${style.text}` })}
                                            </div>
                                        </div>

                                        <p className="text-slate-600 text-sm leading-relaxed flex-grow mt-2">
                                            {platform.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
                                            <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 group-hover:text-accent-cyan transition-colors tracking-wider uppercase">
                                                Launch Platform <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Platforms;
