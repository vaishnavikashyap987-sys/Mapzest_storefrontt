import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle, Lock, MonitorSmartphone } from 'lucide-react';
import { platformsData } from '../data/platforms.jsx';
import DemoRequestModal from '../components/DemoRequestModal';

const PlatformDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const platform = platformsData[id];
    const [showDemoModal, setShowDemoModal] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Redirect if platform not found
    useEffect(() => {
        if (!platform) {
            navigate('/platforms');
        }
    }, [id, platform, navigate]);

    if (!platform) return null;

    // Mobile Restriction for non-UTM platforms
    if (isMobile && platform.id !== 'utm') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-space-900 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-slate-200 p-8 rounded-2xl backdrop-blur-xl max-w-sm shadow-xl"
                >
                    <div className="w-16 h-16 bg-gradient-to-tr from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-6">
                        <MonitorSmartphone className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Desktop View Required</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Oops! To get the best experience with <span className="text-accent-cyan font-semibold">{platform.title}</span>, please switch to a larger display or desktop device.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-accent-cyan text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-md"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate('/platforms')}
                        className="w-full py-3 mt-3 text-slate-500 font-medium hover:text-slate-950 transition-colors"
                    >
                        Browse Other Platforms
                    </button>
                </motion.div>
            </div>
        );
    }

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

                <div className="absolute bottom-0 left-0 w-full z-30 p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.button
                            onClick={() => navigate('/platforms')}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Platforms
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20`}>
                                {platform.icon}
                            </div>
                            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${platform.accent} uppercase tracking-wider`}>
                                {platform.subtitle}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                        >
                            {platform.title}
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
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
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction</h2>
                            <p className="text-xl text-slate-700 leading-relaxed border-l-4 border-slate-300 pl-6">
                                {platform.description}
                            </p>
                        </motion.section>

                        {/* Use Cases */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Use Cases & Case Studies</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {platform.useCases.map((useCase, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-panel p-6 rounded-xl hover:bg-white transition-colors"
                                    >
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                                        <p className="text-slate-600">{useCase.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="relative">
                        <div className="sticky top-32 space-y-8">
                            {/* Actions Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="glass-panel p-8 rounded-2xl border border-slate-200 bg-white"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Get Started</h3>
                                <p className="text-slate-600 mb-8">
                                    {isLaunchUnlocked
                                        ? `Ready to deploy ${platform.title} for your organization? Launch the platform now or contact sales.`
                                        : `The ${platform.title} platform is currently available for enterprise partners. Request a demo to get started.`
                                    }
                                </p>

                                {/* Launch Button - Locked/Unlocked */}
                                <button
                                    onClick={() => isLaunchUnlocked && platform.url ? window.open(platform.url, '_blank') : null}
                                    disabled={!isLaunchUnlocked}
                                    className={`w-full py-4 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 mb-4 group
                                        ${isLaunchUnlocked
                                            ? `bg-gradient-to-r ${platform.accent} hover:opacity-90 cursor-pointer`
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                        }`}
                                >
                                    {isLaunchUnlocked ? 'Launch Platform' : 'Launch Platform'}
                                    {isLaunchUnlocked ? (
                                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                                    ) : (
                                        <Lock size={18} className="text-slate-400" />
                                    )}
                                </button>

                                {/* Request Demo Button */}
                                {platform.id !== 'utm' && ( // Keep existing exclusion if intentional, but user requested functionality
                                    <button
                                        onClick={() => setShowDemoModal(true)}
                                        className="w-full py-4 rounded-lg font-bold text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
                                    >
                                        Request Demo
                                    </button>
                                )}
                            </motion.div>

                            {/* Features List */}
                            <div className="glass-panel p-8 rounded-2xl bg-white border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Key Features</h3>
                                <ul className="space-y-4">
                                    {platform.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 text-${platform.color}-500`} />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
