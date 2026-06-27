import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
    {
        id: "adss",
        prefix: "Precision ",
        accent: "Agriculture",
        description: "Optimize crop yields with multispectral imagery and AI-driven insights. Detect stress early and manage resources efficiently.",
        image: "/krishizest.jpg"
    },
    {
        id: "basic",
        prefix: "Urban ",
        accent: "Planning",
        description: "Visualize city growth and infrastructure with high-resolution 3D models. Plan smarter cities for a sustainable future.",
        image: "/mapzest_go.png",
        pricing: "Open Access"
    },
    {
        id: "fram",
        prefix: "Disaster ",
        accent: "Management",
        description: "Rapid response mapping for floods, fires, and natural disasters. Real-time data when it matters most.",
        image: "/fram_dashboard.png"
    },
    {
        id: "nrmm",
        prefix: "Environmental ",
        accent: "Monitoring",
        description: "Track deforestation, water quality, and climate change indicators with global satellite coverage.",
        image: "/nrmm_dashboard.png"
    }
];

const Card = ({ prefix, accent, description, image, i, progress, range, targetScale, id, pricing }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const navigate = useNavigate();
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-[70vh] sm:h-[80vh] md:h-[85vh] flex items-center justify-center sticky top-0 px-6 md:px-8">
            <motion.div
                style={{ scale, top: `calc(var(--card-top, -2vh) + ${i * 15}px)` }}
                className="group flex flex-col-reverse md:flex-row relative [--card-top:-2vh] md:[--card-top:-10vh] h-auto md:h-[400px] w-full max-w-[800px] rounded-2xl md:rounded-[30px] p-4 md:p-8 origin-top bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(2,132,199,0.12)] hover:border-slate-350/40 transition-all duration-500 overflow-hidden gap-4 md:gap-8"
            >
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/85 to-slate-50/70 pointer-events-none z-0"></div>
 
                {/* Tech corner brackets */}
                <div className="absolute top-5 left-5 w-3 h-3 border-t-2 border-l-2 border-slate-200 rounded-tl transition-colors duration-500 group-hover:border-accent-cyan/40 z-10"></div>
                <div className="absolute top-5 right-5 w-3 h-3 border-t-2 border-r-2 border-slate-200 rounded-tr transition-colors duration-500 group-hover:border-accent-cyan/40 z-10"></div>
                <div className="absolute bottom-5 left-5 w-3 h-3 border-b-2 border-l-2 border-slate-200 rounded-bl transition-colors duration-500 group-hover:border-accent-cyan/40 z-10"></div>
                <div className="absolute bottom-5 right-5 w-3 h-3 border-b-2 border-r-2 border-slate-200 rounded-br transition-colors duration-500 group-hover:border-accent-cyan/40 z-10"></div>
 
                {/* Text Content */}
                <div className="w-full md:w-[42%] flex flex-col justify-center gap-3 md:gap-5 relative z-10 text-center md:text-left">
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                        {prefix}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan block sm:inline">
                            {accent}
                        </span>
                    </h2>
                    <p className="text-xs md:text-[15px] text-slate-600 leading-relaxed font-normal">{description}</p>
                    <div className="flex justify-center md:justify-start mt-1 md:mt-2">
                        <button
                            onClick={() => navigate(`/platforms/${id}`)}
                            className="w-fit px-5 py-2.5 md:px-7 md:py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-[#0099FF] text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-xs md:text-sm font-semibold tracking-wide cursor-pointer flex items-center gap-1.5 md:gap-2"
                        >
                            Learn More
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
 
                {/* Image Content */}
                <div className="relative w-full md:w-[58%] h-[150px] sm:h-[180px] md:h-full rounded-xl md:rounded-[22px] overflow-hidden border border-slate-200/60 shadow-inner shrink-0 group-hover:border-accent-cyan/20 transition-all duration-500">
                    <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                        <img
                            src={image}
                            alt={prefix + accent}
                            className="object-cover w-full h-full transition-all duration-700 group-hover:brightness-105"
                        />
                    </motion.div>
                    {/* Pricing Badge */}
                    {pricing && (
                        <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-accent-cyan/30 text-accent-cyan text-[10px] font-bold px-3.5 py-1.5 rounded-full z-20 uppercase tracking-widest shadow-xl pointer-events-none">
                            {pricing}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const FeaturesSticky = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative mt-[6vh] mb-[6vh]">
            <div className="h-[14vh] flex items-center justify-center mb-10 md:mb-12 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900">
                    Impact Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Industries</span>
                </h2>
            </div>
            {features.map((project, i) => {
                const targetScale = 1 - ((features.length - i) * 0.05);
                return (
                    <Card
                        key={i}
                        i={i}
                        {...project}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </section>
    );
};

export default FeaturesSticky;
