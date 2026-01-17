import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const services = [
    {
        title: "Web GIS Platforms",
        description: "Enabling businesses with bespoke GIS platforms tailored to specific workflows.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
        title: "Remote Sensing",
        description: "Utilizing cutting-edge satellite and aerial imagery to monitor environmental changes.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    },
    {
        title: "GIS Solutions",
        description: "Comprehensive Geographic Information System services including data management.",
        image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2062&auto=format&fit=crop"
    },
    {
        title: "UAV Mapping",
        description: "High-precision drone mapping and surveying for construction and mining.",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "3D Modeling",
        description: "Creating digital twins and 3D city models for urban planning.",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Data Analytics",
        description: "Turning raw spatial data into actionable business intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
];

const Services = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">
                <div className="absolute top-10 left-10 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Our Capabilities</h2>
                    <div className="w-20 h-1 bg-accent-cyan rounded-full"></div>
                </div>

                <motion.div style={{ x }} className="flex gap-8 px-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="relative h-[60vh] w-[400px] md:w-[600px] shrink-0 rounded-3xl overflow-hidden group border border-white/10"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
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
