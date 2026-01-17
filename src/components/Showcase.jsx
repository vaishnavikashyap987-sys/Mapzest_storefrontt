import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Showcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative z-10"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        See the World <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Differently</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        Our advanced satellite constellations provide real-time data for agriculture, defense, and urban planning.
                        Experience the power of pixel-perfect precision.
                    </p>
                    <button className="text-accent-cyan font-bold text-lg hover:text-white transition-colors flex items-center gap-2 group">
                        View Case Studies
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                </motion.div>

                {/* Image Parallax */}
                <div className="relative h-[600px] w-full">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                        className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden border border-white/10 z-0"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"
                            alt="Satellite View"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                        className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden border border-accent-cyan/30 z-10 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                    >
                        <img
                            src="https://ai4edatasetspublicassets.blob.core.windows.net/assets/pc_thumbnails/io-lulc-annual-v02.png"
                            alt="Data Analysis"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
