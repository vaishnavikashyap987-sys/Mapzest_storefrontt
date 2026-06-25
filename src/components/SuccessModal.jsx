import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
    // Auto-close after a few seconds? Optional. Let's keep it manual or user preference.
    // But for a "toast" style it might simpler. 
    // The user asked for a "good popup", implying a modal is fine.

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-colors hover:bg-slate-100 rounded-lg"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.1
                                }}
                                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-2"
                            >
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </motion.div>

                            <h3 className="text-2xl font-bold text-slate-900">{title || 'Success!'}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {message || 'Your message has been sent successfully.'}
                            </p>

                            <button
                                onClick={onClose}
                                className="mt-4 px-8 py-3.5 bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-colors w-full"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default SuccessModal;
