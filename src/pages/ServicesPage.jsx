import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../components/Services';
import { ArrowRight } from 'lucide-react';
import ContactSalesModal from '../components/ContactSalesModal';

const ServicesPage = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="min-h-screen pt-24 md:pt-28 pb-12 px-6 md:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 md:mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-slate-900"
                >
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Expertise</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
                >
                    Delivering comprehensive geospatial solutions that transform complex data into clear, actionable intelligence for industries worldwide.
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-6 md:gap-y-12">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group w-full"
                    >
                         <div className="premium-card-content flex flex-col h-[265px] sm:h-[460px] w-full rounded-2xl sm:rounded-[30px] p-3.5 sm:p-6 gap-3 sm:gap-6 justify-between overflow-hidden relative">
                            {/* Image Section */}
                            <div className="relative w-full h-[120px] sm:h-[220px] rounded-xl sm:rounded-[20px] overflow-hidden border border-slate-200/50 shadow-inner shrink-0 group-hover:border-accent-cyan/20 transition-all duration-500 bg-slate-50">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className={`${service.image.includes('dashboard') || service.image.includes('analysis') || service.image.includes('platform') ? 'object-contain p-1' : 'object-cover'} w-full h-full transform group-hover:scale-105 transition-transform duration-700 brightness-[0.98] group-hover:brightness-100`}
                                />
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
                                    <button className="group/btn inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-accent-cyan transition-colors duration-300 uppercase tracking-wider relative cursor-pointer">
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

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto mt-10 sm:mt-16 text-center p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6 text-slate-900">Need a custom solution?</h2>
                <p className="text-slate-600 text-xs sm:text-base mb-6 max-w-2xl mx-auto">
                    Our team of GIS experts and developers can build tailored applications to solve your specific challenges.
                </p>
                <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-fit mx-auto px-5 py-2.5 sm:px-8 sm:py-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-sky-400/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer text-xs sm:text-base"
                >
                    Contact Sales
                </button>
            </div>

            <ContactSalesModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};

export default ServicesPage;
