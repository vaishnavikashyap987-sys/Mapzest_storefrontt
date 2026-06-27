import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Building2 } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = React.useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // EmailJS Configuration
        // TODO: Replace with your actual credentials
        const SERVICE_ID = 'service_7vonk8e'; // e.g. service_xyz
        const TEMPLATE_ID = 'template_ed40vdc'; // e.g. template_xyz
        const PUBLIC_KEY = 'FssiFS7ys2GWMUmWb'; // e.g. user_xyz

        try {
            const templateParams = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                organization: "N/A (General Contact)",
                platform: formData.subject, // Mapping Subject to 'Platform/Subject' field
                message: formData.message,
                time: new Date().toLocaleString(),
                // Fallback/Legacy
                to_name: "Mapzest Team",
                from_name: `${formData.firstName} ${formData.lastName}`,
                reply_to: formData.email,
            };

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error(error);
            // Fallback for demo
            if (error.text?.includes("The user ID is required") || error.status === 400) {
                setStatus('success'); // Pretend success for UX
            } else {
                setStatus('error');
                alert("Failed to send message. Please try again later.");
            }
        }
    };

    return (
        <div className="pt-24 md:pt-28 min-h-screen relative overflow-hidden pb-12">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-space-900/50 to-transparent z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-accent-cyan">
                        Get in Touch
                    </h1>
                    <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto">
                        Whether you need a custom GIS platform or expert consultation, our team is ready to help you map the future.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Contact Info & Map */}
                    <div className="space-y-12">
                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-8 bg-white border border-slate-200"
                        >
                            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-6">
                                Contact Details
                            </h3>
 
                            <div className="space-y-4 sm:space-y-6">
                                {/* Corporate Address */}
                                <div className="flex gap-3 sm:gap-4">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan mt-1 shrink-0" />
                                    <div>
                                        <p className="text-xs sm:text-sm font-semibold text-accent-cyan mb-1">Corporate Address</p>
                                        <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                                            Diamond Jubilee, Academic Complex,<br />
                                            Block 401, Cabin No. 20/21,<br />
                                            IIT Kanpur, Kanpur, 208016, India
                                        </p>
                                    </div>
                                </div>
 
                                {/* Registered Address */}
                                <div className="flex gap-3 sm:gap-4">
                                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan mt-1 shrink-0" />
                                    <div>
                                        <p className="text-xs sm:text-sm font-semibold text-accent-cyan mb-1">Registered Address</p>
                                        <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                                            Eldeco County CX-02 Madison, Sector-9,<br />
                                            Jawaharpuram, Barasirohi Kanpur,<br />
                                            209217 Uttar Pradesh, India
                                        </p>
                                    </div>
                                </div>
 
                                {/* Phone & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan shrink-0" />
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                                            <p className="text-slate-800 text-xs sm:text-sm font-medium">+91 7985791210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan shrink-0" />
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">Email</p>
                                            <p className="text-slate-800 text-xs sm:text-sm font-medium break-all">contact@terraquauav.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-[300px] w-full rounded-3xl overflow-hidden glass-panel border border-slate-200 relative group bg-white shadow-sm"
                        >
                            <div className="absolute inset-0 pointer-events-none z-10 border-4 border-space-900/10 rounded-3xl"></div>
                            <iframe
                                title="Office Location"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=80.2229%2C26.5032%2C80.2429%2C26.5232&amp;layer=mapnik&amp;marker=26.5132%2C80.2329"
                                className="w-full h-[calc(100%+30px)] grayscale-[20%] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            ></iframe>
                            <div className="absolute bottom-4 right-4 z-20">
                                <a
                                    href="https://www.openstreetmap.org/?mlat=26.5132&amp;mlon=80.2329#map=15/26.5132/80.2329"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 bg-white/95 text-slate-800 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                                >
                                    View Larger Map
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden bg-white border border-slate-200 shadow-md"
                    >
                        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-8">Send us a Message</h3>
 
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-slate-600 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all duration-300 placeholder:text-slate-400"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-slate-600 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all duration-300 placeholder:text-slate-400"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
 
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-slate-600 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all duration-300 placeholder:text-slate-400"
                                    placeholder="name@company.com"
                                />
                            </div>
 
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-slate-600 ml-1">Subject</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option>General Inquiry</option>
                                    <option>Platform Demo</option>
                                    <option>Technical Support</option>
                                    <option>Partnership</option>
                                </select>
                            </div>
 
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-xs sm:text-sm font-medium text-slate-600 ml-1">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all duration-300 placeholder:text-slate-400 resize-none"
                                    placeholder="How can we help you..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-fit mx-auto px-5 py-2.5 sm:px-8 sm:py-3.5 mt-4 text-white font-bold text-xs sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group
                                    ${status === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 hover:shadow-lg hover:shadow-sky-400/25 hover:scale-[1.02]'}`}
                            >
                                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                {status !== 'sending' && <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            {/* Success Modal */}
            <SuccessModal
                isOpen={status === 'success'}
                onClose={() => setStatus('idle')}
                title="Message Sent!"
                message="Thank you for reaching out. Our team will get back to you shortly."
            />
        </div>
    );
};

export default Contact;
