import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle, Lock, Download } from 'lucide-react';
import { platformsData } from '../data/platforms.jsx';
import DemoRequestModal from '../components/DemoRequestModal';

const PlatformDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const platform = platformsData[id];
    const [showDemoModal, setShowDemoModal] = React.useState(false);

    // Redirect if platform not found
    useEffect(() => {
        if (!platform) {
            navigate('/platforms');
        }
    }, [id, platform, navigate]);

    if (!platform) return null;

    // Logic to lock the launch button for platforms other than Mapzest GO (basic) and Geo Tools (utm)
    const isLaunchUnlocked = platform.id === 'basic' || platform.id === 'utm';

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background elements managed globally, but we can add specific tints */}

            {/* Broad Header */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10 transition-colors duration-500"></div>
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent z-20"></div>

                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src={platform.headerImage}
                    alt={platform.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full z-30 px-6 py-8 md:px-8 md:py-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.button
                            onClick={() => navigate('/platforms')}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-slate-300 hover:text-white mb-4 sm:mb-6 transition-colors text-sm"
                        >
                            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                            Back to Platforms
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4"
                        >
                            <div className={`p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0`}>
                                {React.cloneElement(platform.icon, { className: platform.icon.props.className.replace('w-12 h-12', 'w-8 h-8 sm:w-12 sm:h-12') })}
                            </div>
                            <span className={`text-xs sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${platform.accent} uppercase tracking-wider`}>
                                {platform.subtitle}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6"
                        >
                            {platform.title}
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Introduction */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-invert max-w-none"
                        >
                            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6">Introduction</h2>
                            <p className="text-sm md:text-lg text-slate-600 leading-relaxed border-l-4 border-slate-300 pl-6">
                                {platform.description}
                            </p>
                        </motion.section>

                        {/* Use Cases */}
                        <section>
                            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-8">Use Cases & Case Studies</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {platform.useCases.map((useCase, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group glass-panel p-5 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-accent-cyan hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                                        <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300 mb-3">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-slate-600 group-hover:text-slate-800 transition-colors duration-300 leading-relaxed text-xs sm:text-sm">
                                            {useCase.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="relative">
                        <div className="sticky top-32 space-y-8">
                             {/* Features List */}
                             <div className="group glass-panel p-5 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-accent-cyan hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                 <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                                 <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300 mb-4 sm:mb-6">Key Features</h3>
                                 <ul className="space-y-3 sm:space-y-4">
                                     {platform.features.map((feature, index) => (
                                         <li key={index} className="flex items-start gap-3 group/item">
                                             <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-${platform.color}-500 transition-transform duration-300 group-hover/item:scale-110`} />
                                             <span className="text-slate-600 text-xs sm:text-sm transition-colors duration-300 group-hover/item:text-slate-950">{feature}</span>
                                         </li>
                                     ))}
                                 </ul>
                             </div>

                            {/* Actions Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="glass-panel p-5 sm:p-8 rounded-2xl border border-slate-200 bg-white"
                            >
                                {platform.id === 'survey' ? (
                                    <>
                                        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Download App</h3>
                                        <p className="text-slate-600 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                                            Download the MapZest mobile application directly from the Google Play Store to start field data collection, offline mapping, and GPS tracking.
                                        </p>
                                        <button
                                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.terraqua.gis', '_blank')}
                                            className="w-fit px-6 mx-auto py-3.5 rounded-lg font-bold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] transition-all duration-300 shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            Download App <Download size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Get Started</h3>
                                        <p className="text-slate-600 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                                            {isLaunchUnlocked
                                                ? `Ready to deploy ${platform.title} for your organization? Launch the platform now or contact sales.`
                                                : `The ${platform.title} platform is currently available for enterprise partners. Request a demo to get started.`
                                            }
                                        </p>

                                        {/* Launch Button - Locked/Unlocked */}
                                        <button
                                            onClick={() => isLaunchUnlocked && platform.url ? window.open(platform.url, '_blank') : null}
                                            disabled={!isLaunchUnlocked}
                                            className={`w-fit px-6 mx-auto py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mb-4 group text-xs sm:text-sm
                                                ${isLaunchUnlocked
                                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] cursor-pointer'
                                                    : 'bg-blue-50/50 text-blue-500 border border-blue-200/60 cursor-not-allowed'
                                                }`}
                                        >
                                            {isLaunchUnlocked ? 'Launch Platform' : 'Launch Platform'}
                                            {isLaunchUnlocked ? (
                                                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                            ) : (
                                                <Lock size={16} className="text-blue-500" />
                                            )}
                                        </button>

                                        {/* Request Demo Button */}
                                        {platform.id !== 'utm' && ( // Keep existing exclusion if intentional, but user requested functionality
                                            <button
                                                onClick={() => setShowDemoModal(true)}
                                                className="w-fit px-6 mx-auto py-3.5 rounded-lg font-bold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] transition-all duration-300 shadow-md text-xs sm:text-sm flex items-center justify-center"
                                            >
                                                Request Demo
                                            </button>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Request Modal */}
            <DemoRequestModal
                isOpen={showDemoModal}
                onClose={() => setShowDemoModal(false)}
                platformName={platform.title}
            />
        </div>
    );
};

export default PlatformDetail;
