import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const services = [
    {
        title: "Web GIS Platforms",
        description: "Enabling businesses with bespoke GIS platforms tailored to specific workflows.",
        image: "https://mapzest.com/media/Webgisdevelop-ment.png"
    },
    {
        title: "Remote Sensing",
        description: "Utilizing cutting-edge satellite and aerial imagery to monitor environmental changes.",
        image: "https://mapzest.com/media/GISsolutions.jpg"
    },
    {
        title: "GIS Solutions",
        description: "Comprehensive Geographic Information System services including data management.",
        image: "https://mapzest.com/media/remotesensing.png"
    },
    {
        title: "UAV Data Acquisition",
        description: "High-precision drone mapping and surveying for construction and mining.",
        image: "https://mapzest.com/media/drone_service.png"
    },
    {
        title: "3D Modeling",
        description: "Creating digital twins and 3D city models for urban planning.",
        image: "https://mapzest.com/media/3Dmodeling.jpeg"
    },
    {
        title: "Data Analytics",
        description: "Turning raw spatial data into actionable business intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
];

const Services = () => {
    const targetRef = useRef(null);
    const contentRef = useRef(null);
    const [xRange, setXRange] = useState(0);

    useEffect(() => {
        const updateScrollRange = () => {
            if (contentRef.current) {
                const scrollWidth = contentRef.current.scrollWidth;
                const clientWidth = contentRef.current.clientWidth;
                // Calculate how much we need to translate to see the end
                // Multiply by a factor or add padding if needed, but exact difference should work
                const range = scrollWidth - clientWidth + 50; // +50px buffer
                setXRange(range > 0 ? range : 0);
            }
        };

        // Initial calculation
        updateScrollRange();

        // Recalculate on resize
        window.addEventListener('resize', updateScrollRange);
        return () => window.removeEventListener('resize', updateScrollRange);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Map vertical scroll to horizontal translation in pixels
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${xRange}px`]);

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex flex-col h-screen justify-center overflow-hidden z-10">
                <div className="px-4 md:px-10 pt-20 pb-10 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Our Capabilities</h2>
                    <div className="w-20 h-1 bg-accent-cyan rounded-full"></div>
                </div>

                <motion.div
                    ref={contentRef}
                    style={{ x }}
                    className="flex gap-4 md:gap-8 px-4 md:px-10 items-center h-[50vh] md:h-[60vh]"
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="relative h-full w-[280px] md:w-[600px] shrink-0 rounded-3xl overflow-hidden group border border-white/10"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>

                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
