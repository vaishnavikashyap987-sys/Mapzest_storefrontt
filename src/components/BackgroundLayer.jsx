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
                src="https://images.unsplash.com/photo-1579159278991-f698b0667a16?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-full object-cover opacity-30 brightness-10"
            />
        </div>
    );
};

export default BackgroundLayer;
