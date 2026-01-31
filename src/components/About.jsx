import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Layers, Cpu, Satellite, ArrowRight, BarChart3 } from 'lucide-react';

const features = [
    {
        icon: <Satellite className="w-8 h-8 text-accent-cyan" />,
        title: "High Resolution Data Acquisition",
        description: "Capturing precise optical, radar, and drone data from leading constellations and sensors.",
        provider: "Terraqua UAV",
        image: "https://d32bq2tih41htm.cloudfront.net/media/drone_service.png"
    },
    {
        icon: <Cpu className="w-8 h-8 text-accent-cyan" />,
        title: "Data Processing",
        description: "Processing raw inputs into clean, analysis-ready formats using automated pipelines.",
        provider: "Terraqua UAV",
        image: "https://d32bq2tih41htm.cloudfront.net/media/GISsolutions.jpg"
    },
    {
        icon: <Globe className="w-8 h-8 text-accent-cyan" />,
        title: "WebGIS",
        description: "A centralized, interactive platform for seamless spatial data management and exploration.",
        image: "https://d32bq2tih41htm.cloudfront.net/media/Webgisdevelop-ment.png"
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-accent-cyan" />,
        title: "Visualization & Analytics",
        description: "Empowering decision-making with advanced visualization, deep analytics, and actionable insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
];

const AnimatedArrow = ({ className }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                initial={{ x: -5, opacity: 0.5 }}
                animate={{ x: 5, opacity: 1 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            >
                <ArrowRight className="w-8 h-8 text-accent-cyan/80" />
            </motion.div>
        </div>
    );
};

const About = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]); // Reduced range
    const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]); // Reduced range
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.05]); // Subtle breath

    return (
        <section ref={containerRef} className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center mb-20">
                    <motion.div
                        style={{ y: imageY, rotate: imageRotate, scale: imageScale }}
                        className="relative perspective-1000 w-full max-w-5xl flex justify-center mb-16"
                    >
                        <img
                            src="https://d32bq2tih41htm.cloudfront.net/media/desktop.png"
                            alt="Geospatial Graphic"
                            className="w-full object-contain mix-blend-screen opacity-90 drop-shadow-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-10">
                            What is <span className="text-accent-cyan">MapZest?</span>
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center">
                            MapZest is a web-based geospatial platform designed to simplify how users explore, analyze, and manage spatial data across different domains. It provides a unified environment where multiple specialized modules are integrated under one system, each tailored for specific sectors such as agriculture, disaster management, environmental monitoring, and urban planning.
                            <br /><br />
                            <span className="text-base text-gray-500">
                                Powered by <a href="https://www.terraquauav.com" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:text-accent-purple transition-colors hover:underline">Terraqua UAV</a>
                            </span>
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
                    {features.map((feature, index) => (
                        <React.Fragment key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group flex-1 flex flex-col items-center text-center isolate h-[380px] shadow-lg border border-white/10"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300 backdrop-blur-[2px]" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 px-6 pt-24 pb-6 flex flex-col items-center h-full w-full"> {/* Increased pt-16 to pt-24 */}
                                    {feature.provider && (
                                        <div
                                            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center px-4 py-2 rounded-lg shadow-lg z-20 min-w-max border border-gray-100"
                                            style={{ backgroundColor: 'white' }}
                                        >
                                            <span className="font-extrabold text-xs tracking-wider whitespace-nowrap">
                                                <span style={{ color: '#000080' }}>TERR</span>
                                                <span style={{ color: '#F97316' }}>A</span>
                                                <span style={{ color: '#000080' }}>QUA</span>
                                                <span style={{ color: '#F97316' }} className="ml-1">UAV</span>
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-6 p-4 bg-white/10 rounded-full w-fit group-hover:bg-accent-cyan/20 group-hover:scale-110 transition-all duration-300 ring-1 ring-white/20 flex items-center justify-center">
                                        {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white group-hover:text-accent-cyan transition-colors" })}
                                    </div>

                                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent-cyan transition-colors min-h-[56px] flex items-center justify-center w-full leading-tight px-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-200 text-sm leading-relaxed max-w-[280px]">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Animated Arrow Connector */}
                            {index < features.length - 1 && (
                                <div className="hidden lg:flex items-center justify-center px-2">
                                    <AnimatedArrow />
                                </div>
                            )}

                            {/* Mobile Arrow (Rotated) */}
                            {index < features.length - 1 && (
                                <div className="flex lg:hidden items-center justify-center py-4">
                                    <ArrowRight className="w-6 h-6 text-gray-500 transform rotate-90" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
