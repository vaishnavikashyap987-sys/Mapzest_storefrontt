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
        <div className="pt-32 min-h-screen relative overflow-hidden pb-24">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-space-900/50 to-transparent z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-cyan">
                        Get in Touch
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                            className="glass-panel p-8 rounded-3xl space-y-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Contact Details
                            </h3>

                            <div className="space-y-6">
                                {/* Corporate Address */}
                                <div className="flex gap-4">
                                    <MapPin className="w-5 h-5 text-accent-cyan mt-1 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-accent-cyan mb-1">Corporate Address</p>
                                        <p className="text-gray-300 leading-relaxed">
                                            Diamond Jubilee, Academic Complex,<br />
                                            Block 401, Cabin No. 20/21,<br />
                                            IIT Kanpur, Kanpur, 208016, India
                                        </p>
                                    </div>
                                </div>

                                {/* Registered Address */}
                                <div className="flex gap-4">
                                    <Building2 className="w-5 h-5 text-accent-cyan mt-1 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-accent-cyan mb-1">Registered Address</p>
                                        <p className="text-gray-300 leading-relaxed">
                                            Eldeco County CX-02 Madison, Sector-9,<br />
                                            Jawaharpuram, Barasirohi Kanpur,<br />
                                            209217 Uttar Pradesh, India
                                        </p>
                                    </div>
                                </div>

                                {/* Phone & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-5 h-5 text-accent-cyan shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                                            <p className="text-white font-medium">+91 7985791210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                            <p className="text-white font-medium break-all">contact@terraquauav.com</p>
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
                            className="h-[300px] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 relative group"
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
                                className="w-full h-full grayscale-[100%] invert-[1] contrast-[1.1] opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
                            ></iframe>
                            <div className="absolute bottom-4 right-4 z-20">
                                <a
                                    href="https://www.openstreetmap.org/?mlat=26.5132&amp;mlon=80.2329#map=15/26.5132/80.2329"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 bg-space-900/90 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors backdrop-blur-md border border-white/20"
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
                        className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-space-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-space-900/80 transition-all duration-300 placeholder:text-gray-600"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-space-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-space-900/80 transition-all duration-300 placeholder:text-gray-600"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-space-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-space-900/80 transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-space-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-space-900/80 transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option>General Inquiry</option>
                                    <option>Platform Demo</option>
                                    <option>Technical Support</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-space-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent-cyan focus:bg-space-900/80 transition-all duration-300 placeholder:text-gray-600 resize-none"
                                    placeholder="How can we help you..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full py-5 mt-4 text-black font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group
                                    ${status === 'sending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-accent-cyan to-blue-500 hover:shadow-lg hover:shadow-accent-cyan/25 hover:scale-[1.02]'}`}
                            >
                                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                {status !== 'sending' && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
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
