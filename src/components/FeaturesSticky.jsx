import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
    {
        id: "adss",
        title: "Precision Agriculture",
        description: "Optimize crop yields with multispectral imagery and AI-driven insights. Detect stress early and manage resources efficiently.",
        color: "from-green-400 to-emerald-600",
        image: "https://d32bq2tih41htm.cloudfront.net/media/Agribg.jpeg"
    },
    {
        id: "basic",
        title: "Urban Planning",
        description: "Visualize city growth and infrastructure with high-resolution 3D models. Plan smarter cities for a sustainable future.",
        color: "from-blue-400 to-indigo-600",
        image: "https://d32bq2tih41htm.cloudfront.net/media/UBPbg.png"
    },
    {
        id: "fram",
        title: "Disaster Management",
        description: "Rapid response mapping for floods, fires, and natural disasters. Real-time data when it matters most.",
        color: "from-orange-400 to-red-600",
        image: "https://d32bq2tih41htm.cloudfront.net/media/FRAMbg.png"
    },
    {
        id: "nrmm",
        title: "Environmental Monitoring",
        description: "Track deforestation, water quality, and climate change indicators with global satellite coverage.",
        color: "from-teal-400 to-cyan-600",
        image: "https://d32bq2tih41htm.cloudfront.net/media/Mapzestbg.png"
    }
];

const Card = ({ title, description, color, image, i, progress, range, targetScale, id }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const navigate = useNavigate();
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="flex flex-col relative -top-[25%] h-[400px] w-[800px] rounded-[25px] p-8 origin-top bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden"
            >
                <div className="flex h-full gap-8">
                    <div className="w-[40%] flex flex-col justify-center gap-6 relative z-10">
                        <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${color}`}>{title}</h2>
                        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
                        <button
                            onClick={() => navigate(`/platforms/${id}`)}
                            className="w-fit px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white transition-all shadow-md text-sm font-medium cursor-pointer"
                        >
                            Learn More
                        </button>
                    </div>

                    <div className="relative w-[60%] h-full rounded-[25px] overflow-hidden border border-gray-900/10">
                        <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                            <img
                                src={image}
                                alt={title}
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    </div>
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
        <section ref={container} className="relative mt-[10vh] mb-[10vh]">
            <div className="h-[20vh] flex items-center justify-center mb-20 relative z-10">
                <h2 className="text-5xl font-bold text-center">
                    Impact Across <span className="text-accent-cyan">Industries</span>
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
