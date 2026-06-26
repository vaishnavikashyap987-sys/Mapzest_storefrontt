import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../components/Services';
import { ArrowRight } from 'lucide-react';
import ContactSalesModal from '../components/ContactSalesModal';

const ServicesPage = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-4 text-slate-900"
                >
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Expertise</span>
                </motion.h1>
                <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-6"></div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
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
                        className="group relative flex flex-col h-full pb-12"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-slate-200/50">
                            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Content Box */}
                        <div className="premium-card-content relative z-10 mx-4 -mt-16 p-6 md:p-8 flex flex-col rounded-3xl flex-grow min-h-[220px]">
                            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-900 active:text-blue-950 transition-colors leading-tight">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6 text-sm flex-grow">
                                {service.description}
                            </p>

                            <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors uppercase tracking-wider mt-auto">
                                Explore Service <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto mt-16 text-center p-12 rounded-3xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Need a custom solution?</h2>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                    Our team of GIS experts and developers can build tailored applications to solve your specific challenges.
                </p>
                <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer"
                >
                    Contact Sales
                </button>
            </div>

            <ContactSalesModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};

export default ServicesPage;
