import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Twitter, Linkedin, Github, Map } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#f1f3eb]/70 py-12 border-t border-[#e2e6d6] relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <img src="/MAPZEST.png" alt="Mapzest" className="h-10 w-auto object-contain mb-4 transition-transform hover:scale-105 duration-300" />
                        <p className="text-slate-600 max-w-sm mt-4">
                            Empowering the world with geospatial intelligence. We turn pixels into meaningful data for a sustainable future.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-slate-900">Contact</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent-cyan" />
                                <span>contact@terraquauav.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-accent-cyan" />
                                <span>+91 7985791210</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-accent-cyan mt-1 shrink-0" />
                                <span className="text-sm">
                                    Diamond Jubilee, Academic Complex,<br />
                                    Block 401, Cabin No. 20/21,<br />
                                    IIT Kanpur, Kanpur, 208016, India
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 text-slate-900">Social</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-cyan-50/70 flex items-center justify-center border border-cyan-100 text-accent-cyan hover:bg-accent-cyan hover:text-white hover:border-accent-cyan transition-all duration-300 shadow-sm hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-cyan-50/70 flex items-center justify-center border border-cyan-100 text-accent-cyan hover:bg-accent-cyan hover:text-white hover:border-accent-cyan transition-all duration-300 shadow-sm hover:scale-110">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-cyan-50/70 flex items-center justify-center border border-cyan-100 text-accent-cyan hover:bg-accent-cyan hover:text-white hover:border-accent-cyan transition-all duration-300 shadow-sm hover:scale-110">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#e2e6d6] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; 2026 Mapzest. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
