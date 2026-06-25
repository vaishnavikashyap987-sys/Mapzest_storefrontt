import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Showcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-12 md:py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative z-10"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-slate-900">
                        See the World <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Differently</span>
                    </h2>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        It’s not just about maps; it’s about understanding. Mapzest empowers you with deep insights into environmental changes and urban dynamics, making complex satellite data accessible and useful for everyone.
                    </p>
                    <Link to="/blogs">
                        <button className="text-accent-cyan font-bold text-lg hover:text-cyan-700 transition-colors flex items-center gap-2 group">
                            Blogs
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </Link>
                </motion.div>

                {/* Image Parallax */}
                <div className="relative aspect-[16/10] md:h-[450px] lg:h-[500px] w-full rounded-3xl overflow-hidden border border-slate-200/50 shadow-md">
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [40, -40]) }}
                        className="w-full h-full z-10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000&auto=format&fit=crop"
                            alt="Data Analysis"
                            className="w-full h-full object-cover scale-110 transition-all duration-700 brightness-[0.98] hover:brightness-100"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
