import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BackgroundLayer = () => {
    // We use the viewport scroll for the global background
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20, restDelta: 0.001 });

    const y = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
    const scale = useTransform(smoothProgress, [0, 1], [1.1, 1.3]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.img
                style={{ y, scale }}
                src="https://mapzest.com/media/mpzbg.jpeg"
                alt=""
                className="w-full h-full object-cover opacity-10 brightness-10"
            />
        </div>
    );
};

export default BackgroundLayer;
