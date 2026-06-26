import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const services = [
    {
        title: "Web GIS Platforms",
        description: "Enabling businesses with bespoke GIS platforms tailored to specific workflows.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Remote Sensing",
        description: "Utilizing cutting-edge satellite and aerial imagery to monitor environmental changes.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "GIS Solutions",
        description: "Comprehensive Geographic Information System services including data management.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "UAV Data Acquisition",
        description: "High-precision drone mapping and surveying for construction and mining.",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "3D Modeling",
        description: "Creating digital twins and 3D city models for urban planning.",
        image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Data Analytics",
        description: "Turning raw spatial data into actionable business intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
];

const Services = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 md:py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Capabilities</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent-cyan rounded-full"></div>
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
                            <div className="premium-card-content flex flex-col h-[460px] w-full rounded-[30px] p-6 gap-6 justify-between overflow-hidden relative">
                                {/* Image Section with Glassmorphic Badge */}
                                <div className="relative w-full h-[220px] rounded-[20px] overflow-hidden border border-slate-200/50 shadow-inner shrink-0 group-hover:border-accent-cyan/20 transition-all duration-500">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 brightness-[0.98] group-hover:brightness-100"
                                    />
                                    {/* Soft border gradient or vignette overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 to-transparent pointer-events-none"></div>
                                </div>

                                {/* Text Section */}
                                <div className="w-full flex flex-col justify-between flex-grow relative z-10 text-left">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-cyan mb-2">
                                            Capability
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-900 active:text-blue-950 transition-colors leading-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed font-normal line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4">
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
