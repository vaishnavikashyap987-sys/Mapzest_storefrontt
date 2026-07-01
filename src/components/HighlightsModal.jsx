import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const HighlightsModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-3xl bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] flex flex-col md:flex-row border border-gray-100 my-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-1.5 md:p-2 bg-gray-100/80 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Side: Text Content */}
                        <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col justify-center bg-white relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 md:mb-4 tracking-tighter leading-none">
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#df573a] to-[#db9d38]">
                                    MapZest
                                </span>
                                Web App.
                            </h2>
                            <p className="text-xs md:text-base text-gray-500 leading-relaxed mb-4 md:mb-8 font-medium max-w-sm">
                                With MapZest, you can capture waypoints, record GPS paths, and navigate endless field adventures and much more.
                            </p>
                            
                            <a 
                                href="https://app.mapzest.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-2 md:gap-3 text-[10px] md:text-xs tracking-[0.2em] text-gray-900 hover:text-[#df573a] uppercase font-bold group transition-colors w-max"
                            >
                                OPEN MAPZEST APP
                                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </a>
                        </div>

                        {/* Right Side: Main Card + 3 Thumbnails */}
                        <div 
                            className="w-full md:w-1/2 p-3 md:p-8 relative border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center gap-2 md:gap-4"
                            style={{ backgroundColor: '#f8f5ee', backgroundImage: 'url("https://www.transparenttextures.com/patterns/topography.png")' }}
                        >
                            {/* Decorative blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#df573a]/5 blur-[80px] pointer-events-none rounded-full" />
                            
                            {/* Main Featured Card */}
                            <a 
                                href="https://app.mapzest.com" target="_blank" rel="noopener noreferrer"
                                className="relative bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full flex items-center p-3 md:p-6 z-10 border border-white/50 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow block cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-[#df573a]/10 to-[#db9d38]/10 rounded-bl-full opacity-80 -z-10" />
                                
                                <div className="relative z-20 flex-1 pr-2">
                                    <h3 className="text-base md:text-2xl font-black text-[#df573a] tracking-tight leading-none mb-0.5 md:mb-1">Map,</h3>
                                    <h3 className="text-base md:text-2xl font-black text-[#3c8a9e] tracking-tight leading-none mb-0.5 md:mb-1">Track,</h3>
                                    <h3 className="text-base md:text-2xl font-black text-[#db9d38] tracking-tight leading-none mb-0.5 md:mb-1">Collect,</h3>
                                    <h3 className="text-base md:text-2xl font-black text-[#4a572a] tracking-tight leading-none mb-2 md:mb-4">Share.</h3>
                                    
                                    <p className="text-gray-500 text-[8px] md:text-[11px] mb-2 md:mb-4 leading-relaxed max-w-[100px] md:max-w-[140px]">
                                        Capture the moment. Share the experience.
                                    </p>
                                    <button className="bg-[#df573a] hover:bg-[#c24124] text-white px-2.5 md:px-4 py-1 md:py-1.5 rounded-full font-bold flex items-center gap-1 md:gap-1.5 transition-colors shadow-md shadow-[#df573a]/20 text-[8px] md:text-[10px] w-max relative z-30">
                                        DOWNLOAD <Download className="w-2 md:w-3 h-2 md:h-3 bg-white text-[#df573a] rounded-full p-[1px] md:p-0.5" />
                                    </button>
                                </div>

                                <div className="relative z-20 w-[110px] md:w-[180px] h-[100px] md:h-[160px] shrink-0">
                                    <div className="w-full h-full relative transform group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-500">
                                        {/* Main Image */}
                                        <div className="absolute top-0 right-0 w-[80px] md:w-[130px] aspect-[4/3] rounded-[0.6rem] md:rounded-[1rem] overflow-hidden shadow-lg border md:border-2 border-gray-200 z-10">
                                            <img src="/image copy 2.png" alt="Map App" className="w-full h-full object-cover" />
                                        </div>
                                        
                                        {/* Phone Mockup */}
                                        <div className="absolute bottom-0 left-0 w-[45px] md:w-[70px] aspect-[1/2.1] bg-gray-50 rounded-[0.6rem] md:rounded-[1.2rem] p-[2px] md:p-1 shadow-2xl border md:border border-gray-300 z-20">
                                            <div className="w-full h-full rounded-[0.4rem] md:rounded-[1rem] overflow-hidden relative bg-white">
                                                <img src="/highlightpic.png" alt="Map Interface" className="w-full h-full object-cover" />
                                                <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-1/3 h-[2px] md:h-1 bg-black rounded-full" />
                                                <div className="absolute bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#df573a] border border-white flex items-center justify-center shadow-lg">
                                                    <div className="w-[1px] h-[1px] md:w-[2px] md:h-[2px] bg-white rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/* 3 Images Collage Row */}
                            <div className="flex gap-2 md:gap-3 h-[45px] md:h-[90px] z-10 w-full">
                                <div className="flex-1 bg-white rounded-lg md:rounded-xl overflow-hidden relative border border-white/50 shadow-sm group">
                                    <img src="/highlightpic.png" alt="Thumb 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 bg-white rounded-lg md:rounded-xl overflow-hidden relative border border-white/50 shadow-sm group">
                                    <img src="/highlight3.png" alt="Drone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 bg-white rounded-lg md:rounded-xl overflow-hidden relative border border-white/50 shadow-sm group">
                                    <img src="/pichighlight2.png" alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HighlightsModal;
