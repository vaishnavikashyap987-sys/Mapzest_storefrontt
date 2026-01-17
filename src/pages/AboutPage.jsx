import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Target, ShieldCheck } from 'lucide-react';



const values = [
    {
        icon: <Target className="w-8 h-8 text-red-500" />,
        title: "Precision",
        desc: "We believe in the power of accuracy. Every pixel counts when making critical decisions."
    },
    {
        icon: <Users className="w-8 h-8 text-blue-500" />,
        title: "Collaboration",
        desc: "Working side-by-side with our partners to build solutions that truly fit their needs."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
        title: "Integrity",
        desc: "Trusted data handling and secure platforms are the foundation of our business."
    },
    {
        icon: <Globe className="w-8 h-8 text-purple-500" />,
        title: "Innovation",
        desc: "Constantly pushing the boundaries of what's possible with geospatial technology."
    }
];

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            {/* Header / Mission */}
            <section className="max-w-7xl mx-auto mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-12 h-1 bg-accent-cyan rounded-full"></div>
                            <span className="text-accent-cyan font-bold tracking-widest uppercase">Our Story</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Mapping the Future of <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Global Intelligence</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Founded with a mission to democratize access to satellite insights, Mapzest has grown from a small research lab to a global leader in geospatial analytics. We bridge the complex gap between raw earth observation data and simplified, actionable business intelligence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative h-[600px] rounded-3xl overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                            alt="Earth from space"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-900 to-transparent"></div>
                    </motion.div>
                </div>
            </section>



            {/* Values */}
            <section className="max-w-7xl mx-auto mb-32">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-6 text-white">Our Core Values</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        These principles guide every line of code we write and every map we generate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl glass-panel hover:border-accent-cyan/30 transition-colors duration-300">
                            <div className="mb-6 p-4 bg-space-900 rounded-xl w-fit">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-300 leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
