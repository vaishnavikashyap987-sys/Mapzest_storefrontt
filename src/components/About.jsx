import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Cpu, Satellite, BarChart3 } from 'lucide-react';

const features = [
    {
        icon: <Satellite strokeWidth={1.6} fill="currentColor" fillOpacity={0.12} />,
        title: "High Resolution Data Acquisition",
        description: "Capturing precise optical, radar, and drone data from leading constellations and sensors.",
        provider: "Terraqua UAV",
        image: "/3d.png"
    },
    {
        icon: <Cpu strokeWidth={1.6} fill="currentColor" fillOpacity={0.12} />,
        title: "Data Processing",
        description: "Processing raw inputs into clean, analysis-ready formats using automated pipelines.",
        provider: "Terraqua UAV",
        image: "/ortho copy1.png"
    },
    {
        icon: <Globe strokeWidth={1.6} fill="currentColor" fillOpacity={0.12} />,
        title: "WebGIS",
        description: "A centralized, interactive platform for seamless spatial data management and exploration.",
        image: "/media__1782880273608.png"
    },
    {
        icon: <BarChart3 strokeWidth={1.6} fill="currentColor" fillOpacity={0.12} />,
        title: "Visualization & Analytics",
        description: "Empowering decision-making with advanced visualization, deep analytics, and actionable insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
];


const About = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]); // Reduced range
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.05]); // Subtle breath

    return (
        <section ref={containerRef} className="pt-10 pb-12 md:pt-20 md:pb-16 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col items-center mb-10 sm:mb-14">
                    <motion.div
                        style={{ y: imageY, scale: imageScale }}
                        className="relative perspective-1000 w-full max-w-5xl flex justify-center mb-16"
                    >
                        <img
                            src="/media__1782891482370.png"
                            alt="MapZest Platform Collage"
                            className="w-full h-auto object-contain max-h-[500px] md:max-h-[600px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                        />
                    </motion.div>
 
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-slate-900">
                            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">MapZest?</span>
                        </h2>
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed text-center">
                            MapZest is a web-based geospatial platform designed to simplify how users explore, analyze, and manage spatial data across different domains. It provides a unified environment where multiple specialized modules are integrated under one system, each tailored for specific sectors such as agriculture, disaster management, environmental monitoring, and urban planning.
                        </p>
                        <p className="text-xs md:text-sm text-slate-550 mt-4 md:mt-6 text-center">
                            Powered by <a href="https://www.terraquauav.com" target="_blank" rel="noopener noreferrer" className="text-blue-900 font-semibold hover:text-accent-cyan transition-colors hover:underline">TerrAqua UAV</a>
                        </p>
                    </motion.div>
                </div>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 relative z-10 w-full mt-6 sm:mt-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col relative pb-6 sm:pb-12"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[2.4/1] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md z-0 border border-slate-200/50">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                            </div>

                            {/* Overlapping Floating Content Box */}
                            <div className="premium-card-content relative z-10 mx-5 sm:mx-3 -mt-6 sm:-mt-10 py-3 px-3 sm:py-5 sm:px-4 flex flex-col items-center text-center rounded-2xl sm:rounded-3xl flex-grow overflow-hidden">

                                {/* Sleek Corner Brackets for a high-tech instrument feel */}
                                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-slate-300/40 rounded-tl group-hover:border-accent-cyan/60 transition-colors"></div>
                                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-slate-300/40 rounded-tr group-hover:border-accent-cyan/60 transition-colors"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-slate-300/40 rounded-bl group-hover:border-accent-cyan/60 transition-colors"></div>
                                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-slate-300/40 rounded-br group-hover:border-accent-cyan/60 transition-colors"></div>

                                {/* High-tech pulsing/spinning radar ring container */}
                                <div className="relative mb-3 mt-1.5 sm:mt-3 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/30 animate-spin-slow group-hover:border-accent-cyan/70 scale-110 sm:scale-125 transition-all duration-500"></div>
                                    <div className="absolute inset-0 rounded-full border border-accent-cyan/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="relative p-2 sm:p-3 bg-white border border-slate-200/60 rounded-full w-fit group-hover:bg-cyan-50 group-hover:scale-110 group-hover:border-accent-cyan/30 transition-all duration-500 flex items-center justify-center shadow-md z-10">
                                        {React.cloneElement(feature.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan transition-colors" })}
                                    </div>
                                </div>


                                <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 text-slate-900 group-hover:text-blue-900 active:text-blue-950 transition-colors leading-tight min-h-0 sm:min-h-[44px] flex items-center justify-center">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-650 text-[11px] sm:text-sm leading-relaxed max-w-[280px] flex-grow">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
