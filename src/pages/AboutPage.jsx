import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Target, ShieldCheck } from 'lucide-react';


const values = [
    {
        Icon: Target,
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        title: "Scientific Rigor",
        desc: "We don't just guess. Our data is grounded in verified scientific methodologies and absolute ground truth."
    },
    {
        Icon: Globe,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        title: "Environmental Impact",
        desc: "Every insight we generate helps monitor, protect, and understand our changing planet."
    },
    {
        Icon: ShieldCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        title: "Uncompromising Truth",
        desc: "We deliver data as it is—real, unaltered, and transparent, enabling honest decision-making."
    },
    {
        Icon: Users,
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        title: "Human-Centric Design",
        desc: "Technology should adapt to people, not the other way around. We build for the user, not just for the machine."
    }
];

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-36 pb-20 px-4">
            {/* Header / Mission */}
            <section className="max-w-7xl mx-auto mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden order-last lg:order-first flex justify-center items-center"
                    >
                        <img
                            src="https://d32bq2tih41htm.cloudfront.net/media/desktop.png"
                            alt="Mapzest Desktop View"
                            className="w-full h-auto object-contain max-h-[500px]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Mapzest</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed mb-6 text-justify">
                            Mapzest is a premier geospatial platform backed by a team of expert Earth Observation scientists. As a specialized product of <span className="font-semibold text-accent-cyan">Terraqua UAV</span>, we leverage a robust foundation of high-resolution data acquisition and processing.
                        </p>
                        <p className="text-xl text-gray-300 leading-relaxed mb-6 text-justify">
                            <span className="font-semibold text-white">How we work:</span> Terraqua UAV captures and processes cutting-edge drone and satellite imagery. Mapzest then transforms this analysis-ready data into comprehensive, user-centric platforms tailored for diverse industrial needs, specific requirements, and strategic provisions.
                        </p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((item, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                            <div className={`mb-6 p-4 rounded-full w-fit ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                                <item.Icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-white">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
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
