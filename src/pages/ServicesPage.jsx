import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../components/Services';
import { ArrowRight } from 'lucide-react';

const ServicesPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
                >
                    Our Expertise
                </motion.h1>
                <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full mb-8"></div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                    Delivering comprehensive geospatial solutions that transform complex data into clear, actionable intelligence for industries worldwide.
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl glass-panel hover:border-accent-cyan/50 transition-colors duration-300"
                    >
                        {/* Image Container */}
                        <div className="h-64 overflow-hidden relative">
                            <div className="absolute inset-0 bg-space-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-cyan transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6 font-light">
                                {service.description}
                            </p>

                            <button className="flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">
                                Explore Service <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto mt-32 text-center p-12 rounded-3xl bg-gradient-to-b from-space-800 to-space-900 border border-white/10">
                <h2 className="text-3xl font-bold mb-6">Need a custom solution?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Our team of GIS experts and developers can build tailored applications to solve your specific challenges.
                </p>
                <button className="px-8 py-4 bg-accent-cyan text-space-900 font-bold rounded-full hover:bg-white transition-colors">
                    Contact Sales
                </button>
            </div>
        </div>
    );
};

export default ServicesPage;
