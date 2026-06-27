import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const services = [
    {
        title: "Web GIS Platforms",
        description: "Enabling businesses with bespoke GIS platforms tailored to specific workflows.",
        image: "/web_gis_platform.png"
    },
    {
        title: "Remote Sensing",
        description: "Utilizing cutting-edge satellite and aerial imagery to monitor environmental changes.",
        image: "/remote_sensing.jpg"
    },
    {
        title: "GIS Solutions",
        description: "Comprehensive Geographic Information System services including data management.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "UAV Data Acquisition",
        description: "High-precision drone mapping and surveying for construction and mining.",
        image: "/uav_drone.png"
    },
    {
        title: "3D Modeling",
        description: "Creating digital twins and 3D city models for urban planning.",
        image: "/three_d_modeling.png"
    },
    {
        title: "Data Analytics",
        description: "Turning raw spatial data into actionable business intelligence.",
        image: "/lake_analysis.png"
    }
];

const Services = () => {
    const navigate = useNavigate();

    return (
        <section className="py-10 md:py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Capabilities</span>
                    </h2>
                </div>

                {/* Vertical Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                            className="group w-full"
                        >
                             <div className="premium-card-content flex flex-col h-[265px] sm:h-[460px] w-full rounded-2xl sm:rounded-[30px] p-3.5 sm:p-6 gap-3 sm:gap-6 justify-between overflow-hidden relative">
                                {/* Image Section with Glassmorphic Badge */}
                                <div className="relative w-full h-[120px] sm:h-[220px] rounded-xl sm:rounded-[20px] overflow-hidden border border-slate-200/50 shadow-inner shrink-0 group-hover:border-accent-cyan/20 transition-all duration-500 bg-slate-50">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className={`${service.image.includes('dashboard') || service.image.includes('analysis') || service.image.includes('platform') ? 'object-contain p-1' : 'object-cover'} w-full h-full transform group-hover:scale-105 transition-transform duration-700 brightness-[0.98] group-hover:brightness-100`}
                                    />
                                    {/* Soft border gradient or vignette overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 to-transparent pointer-events-none"></div>
                                </div>

                                {/* Text Section */}
                                <div className="w-full flex flex-col justify-start sm:justify-between flex-grow relative z-10 text-left gap-2 sm:gap-0">
                                    <div className="flex flex-col">
                                        <h3 className="text-base sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-900 active:text-blue-950 transition-colors leading-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-655 text-xs sm:text-sm leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-1 sm:mt-0">
                                        <button
                                            onClick={() => navigate('/services')}
                                            className="group/btn inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-accent-cyan transition-colors duration-300 uppercase tracking-wider relative cursor-pointer"
                                        >
                                            <span>Explore Service</span>
                                            <span className="inline-block transform group-hover/btn:translate-x-1.5 transition-transform duration-300">
                                                →
                                            </span>
                                            <span className="absolute bottom-[-4px] left-0 w-8 h-[2px] bg-accent-cyan group-hover/btn:w-full transition-all duration-300"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
