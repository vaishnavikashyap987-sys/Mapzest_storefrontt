import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-cyan">Differently</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        It’s not just about maps; it’s about understanding. Mapzest empowers you with deep insights into environmental changes and urban dynamics, making complex satellite data accessible and useful for everyone.
                    </p>
                    <Link to="/blogs">
                        <button className="text-accent-cyan font-bold text-lg hover:text-white transition-colors flex items-center gap-2 group">
                            Blogs
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </Link>
                </motion.div>

                {/* Image Parallax */}
                <div className="relative h-[600px] w-full flex items-center justify-center">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
                        className="w-full h-full z-10"
                    >
                        <img
                            src="https://d32bq2tih41htm.cloudfront.net/media/Mapzeststicker.png"
                            alt="Data Analysis"
                            className="w-full h-full object-contain scale-125 drop-shadow-2xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
