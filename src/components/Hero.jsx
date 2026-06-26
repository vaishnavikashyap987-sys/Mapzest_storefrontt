import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const headlines = [
        {
            prefix: "GEOINT for ",
            accent: "Monitoring, Planning, and Management"
        },
        {
            prefix: "Integrating ",
            accent: "Satellite, Drone, and GIS Data on One Platform"
        },
        {
            prefix: "Reliable Spatial Insights for ",
            accent: "Informed Decision-Making"
        }
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
                <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Light Black Overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="../public/Mapzest.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 md:px-8 max-w-5xl mx-auto">

                <div className="h-48 md:h-72 mb-6 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.h1
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-7xl font-bold tracking-tight text-white"
                        >
                            {headlines[index].prefix}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-400">
                                {headlines[index].accent}
                            </span>
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto"
                >
                    Advanced Remote Sensing, GIS Analytics, and Geospatial Intelligence for a changing world.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full transition-all duration-300 font-medium tracking-wide hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105">
                        Contact Us
                    </Link>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
