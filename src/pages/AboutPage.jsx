import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Target, ShieldCheck } from 'lucide-react';


const values = [
    {
        Icon: Target,
        color: "text-rose-500",
        borderColor: "group-hover:border-rose-400/60 border-rose-200/40",
        ringColor: "border-rose-400/20",
        hoverBg: "group-hover:bg-rose-50/50",
        hoverBorder: "group-hover:border-rose-500/30",
        cornerColor: "group-hover:border-rose-500/60",
        title: "Scientific Rigor",
        desc: "We don't just guess. Our data is grounded in verified scientific methodologies and absolute ground truth."
    },
    {
        Icon: Globe,
        color: "text-emerald-500",
        borderColor: "group-hover:border-emerald-400/60 border-emerald-200/40",
        ringColor: "border-emerald-400/20",
        hoverBg: "group-hover:bg-emerald-50/50",
        hoverBorder: "group-hover:border-emerald-500/30",
        cornerColor: "group-hover:border-emerald-500/60",
        title: "Environmental Impact",
        desc: "Every insight we generate helps monitor, protect, and understand our changing planet."
    },
    {
        Icon: ShieldCheck,
        color: "text-blue-500",
        borderColor: "group-hover:border-blue-400/60 border-blue-200/40",
        ringColor: "border-blue-400/20",
        hoverBg: "group-hover:bg-blue-50/50",
        hoverBorder: "group-hover:border-blue-500/30",
        cornerColor: "group-hover:border-blue-500/60",
        title: "Uncompromising Truth",
        desc: "We deliver data as it is—real, unaltered, and transparent, enabling honest decision-making."
    },
    {
        Icon: Users,
        color: "text-violet-500",
        borderColor: "group-hover:border-violet-400/60 border-violet-200/40",
        ringColor: "border-violet-400/20",
        hoverBg: "group-hover:bg-violet-50/50",
        hoverBorder: "group-hover:border-violet-500/30",
        cornerColor: "group-hover:border-violet-500/60",
        title: "Human-Centric Design",
        desc: "Technology should adapt to people, not the other way around. We build for the user, not just for the machine."
    }
];

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-36 pb-20 px-6 sm:px-10 md:px-16">
            {/* Header / Mission */}
            <section className="max-w-7xl mx-auto mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden order-last lg:order-first flex justify-center items-center"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop"
                            alt="Mapzest Desktop View"
                            className="w-full h-auto object-contain max-h-[500px]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">
                            About
                        </h1>
                        <p className="text-xl text-slate-650 leading-relaxed mb-6">
                            Mapzest is a premier geospatial platform backed by a team of expert Earth Observation scientists. As a specialized product of <span className="font-semibold text-accent-cyan">Terraqua UAV</span>, we leverage a robust foundation of high-resolution data acquisition and processing.
                        </p>
                        <p className="text-xl text-slate-650 leading-relaxed mb-6">
                            <span className="font-semibold text-slate-800">How we work:</span> Terraqua UAV captures and processes cutting-edge drone and satellite imagery. Mapzest then transforms this analysis-ready data into comprehensive, user-centric platforms tailored for diverse industrial needs, specific requirements, and strategic provisions.
                        </p>
                    </motion.div>
                </div>
            </section>



            {/* Values */}
            <section className="max-w-7xl mx-auto mb-16">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-6 text-slate-900">
                        Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Values</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
                        These principles guide every line of code we write and every map we generate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, i) => (
                        <div key={i} className="group h-full">
                            <div className="bg-white/95 border border-slate-200 h-full p-8 rounded-[30px] overflow-hidden flex flex-col justify-start relative shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-md hover:border-slate-300">
                                {/* Sleek Corner Brackets for a high-tech instrument feel */}
                                <div className={`absolute top-4 left-4 w-2 h-2 border-t border-l border-slate-300/40 rounded-tl ${item.cornerColor} transition-colors duration-500`}></div>
                                <div className={`absolute top-4 right-4 w-2 h-2 border-t border-r border-slate-300/40 rounded-tr ${item.cornerColor} transition-colors duration-500`}></div>
                                <div className={`absolute bottom-4 left-4 w-2 h-2 border-b border-l border-slate-300/40 rounded-bl ${item.cornerColor} transition-colors duration-500`}></div>
                                <div className={`absolute bottom-4 right-4 w-2 h-2 border-b border-r border-slate-300/40 rounded-br ${item.cornerColor} transition-colors duration-500`}></div>

                                {/* High-tech pulsing/spinning radar ring container */}
                                <div className="relative mb-6 flex items-center justify-start w-fit">
                                    <div className={`absolute inset-0 rounded-full border border-dashed ${item.borderColor} animate-spin-slow scale-125 transition-all duration-500`}></div>
                                    <div className={`absolute inset-0 rounded-full border ${item.ringColor} animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                    
                                    <div className={`relative p-3 bg-white border border-slate-200/60 rounded-full w-fit ${item.hoverBg} group-hover:scale-110 ${item.hoverBorder} transition-all duration-500 flex items-center justify-center shadow-md z-10`}>
                                        <item.Icon strokeWidth={1.6} fill="currentColor" fillOpacity={0.12} className={`w-7 h-7 ${item.color} transition-colors duration-300`} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-slate-900 transition-colors">{item.title}</h3>
                                <p className="text-slate-650 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
