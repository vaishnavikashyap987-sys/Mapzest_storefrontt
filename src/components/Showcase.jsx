import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Showcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-4 md:py-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 items-center">
                {/* Text Content */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative z-10"
                >
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight text-slate-900">
                        See the World <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Differently</span>
                    </h2>
                    <p className="text-sm md:text-lg text-slate-600 mb-5 leading-relaxed">
                        It’s not just about maps; it’s about understanding. Mapzest empowers you with deep insights into environmental changes and urban dynamics, making complex satellite data accessible and useful for everyone.
                    </p>
                    <Link to="/blogs">
                        <button className="text-accent-cyan font-bold text-sm sm:text-base hover:text-cyan-700 transition-colors flex items-center gap-1.5 sm:gap-2 group">
                            Blogs
                            <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                        </button>
                    </Link>
                </motion.div>

                {/* Image Parallax */}
                <div className="relative w-full h-[260px] sm:h-[320px] md:h-[450px] lg:h-[500px] flex items-center justify-center -mt-2 md:mt-0">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
                        className="w-full h-full z-10 flex items-center justify-center"
                    >
                        <img
                            src="/mapzest_about_page_graphic.png"
                            alt="MapZest Graphic"
                            className="w-full h-full object-contain scale-[1.5] sm:scale-150 md:scale-[1.35] lg:scale-[1.6] transition-all duration-700 hover:scale-[1.6] lg:hover:scale-[1.7]"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
