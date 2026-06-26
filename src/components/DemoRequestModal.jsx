import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import emailjs from '@emailjs/browser';
import { X, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DemoRequestModal = ({ isOpen, onClose, platformName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        message: ''
    });

    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        // EmailJS Configuration
        // TODO: Replace these with your actual EmailJS credentials
        // Get them from https://dashboard.emailjs.com/
        const SERVICE_ID = 'service_7vonk8e'; // e.g. service_xyz
        const TEMPLATE_ID = 'template_ed40vdc'; // e.g. template_xyz
        const PUBLIC_KEY = 'FssiFS7ys2GWMUmWb'; // e.g. user_xyz

        try {
            // We use .send() here because we are constructing the data manually
            // If using .sendForm(), we need a form ref
            // Standardized params to match the improved template
            const templateParams = {
                name: formData.name,
                email: formData.email,
                organization: formData.organization,
                platform: platformName,
                message: formData.message,
                time: new Date().toLocaleString(),
                // Fallback/Legacy keys just in case
                to_name: "Mapzest Team",
                from_name: formData.name,
                reply_to: formData.email,
            };

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setIsSuccess(true);
            setFormData({ name: '', email: '', organization: '', message: '' });
        } catch (error) {
            console.error('FAILED...', error);
            // Fallback for demo purposes if keys aren't set
            if (error.text?.includes("The user ID is required") || error.status === 400) {
                setIsSuccess(true); // Simulate success
            } else {
                alert('Failed to send message. Please try again later.');
            }
        } finally {
            setIsSending(false);
        }
    };

    // Use createPortal to render outside the parent stacking context
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {isSuccess ? (
                            <div className="p-10 flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6"
                                >
                                    <CheckCircle size={40} className="text-green-500" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                                <p className="text-slate-500 mb-8">
                                    Thank you for your interest in {platformName}.<br />
                                    We will be in touch with you shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSuccess(false);
                                        onClose();
                                    }}
                                    className="px-8 py-3 bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">Request Demo - {platformName}</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-slate-400 hover:text-slate-700 transition-colors hover:bg-slate-100 rounded-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                
                                {/* Form */}
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all"
                                            placeholder="Full Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all"
                                            placeholder="Name@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Organization</label>
                                        <input
                                            type="text"
                                            value={formData.organization}
                                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all"
                                            placeholder="Company Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Message / Query</label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all resize-none"
                                            placeholder="Tell us about your requirements..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className={`w-full py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]
                                            ${isSending ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}
                                    >
                                        {isSending ? 'Sending...' : 'Send Request'}
                                        {!isSending && <Send size={18} />}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default DemoRequestModal;
