import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const headlines = [
        "Unveiling the Earth from Above",
        "Precision Mapping for a Better Future",
        "Geospatial Intelligence Redefined"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-space-900 text-white">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/herobg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

                <div className="h-32 md:h-40 mb-6 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.h1
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-cyan to-accent-green"
                        >
                            {headlines[index]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                >
                    Advanced Remote Sensing, GIS Analytics, and Geospatial Intelligence for a changing world.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="px-8 py-4 bg-accent-cyan/10 border border-accent-cyan/50 text-accent-cyan rounded-full hover:bg-accent-cyan/20 transition-all duration-300 backdrop-blur-sm font-medium tracking-wide hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105">
                        Explore Solutions
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-sm font-medium tracking-wide hover:scale-105">
                        Contact Us
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent-cyan to-transparent animate-pulse"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
