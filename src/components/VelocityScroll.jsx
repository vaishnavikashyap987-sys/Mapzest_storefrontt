import React from "react";
import { motion } from "framer-motion";

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    return (
        <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div
                className="scroller font-bold uppercase text-6xl md:text-9xl flex whitespace-nowrap flex-nowrap gap-10"
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                    },
                }}
            >
                <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-400 opacity-60">{children} </span>
                <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-400 opacity-60">{children} </span>
                <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-400 opacity-60">{children} </span>
                <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-400 opacity-60">{children} </span>
            </motion.div>
        </div>
    );
};

const VelocityScroll = () => {
    return (
        <section className="py-10 md:py-20 overflow-hidden relative z-20 border-y border-slate-200">
            <ParallaxText>WebGIS Remote Sensing LiDAR Photogrammetry</ParallaxText>
            <ParallaxText>Queries Solutions Analytics </ParallaxText>
        </section>
    );
};

export default VelocityScroll;
