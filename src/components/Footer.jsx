import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/10 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="https://mapzest.com/MapzestBasic/assets/Powered%20by%20TerrAqua%20UAV%20(3).png"
                                alt="Mapzest Logo"
                                className="h-10"
                            />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"></span>
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            Empowering the world with geospatial intelligence. We turn pixels into meaningful data for a sustainable future.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                        <ul className="space-y-3 text-gray-400">
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
                        <h4 className="text-lg font-semibold mb-4 text-white">Social</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-cyan hover:text-black transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-cyan hover:text-black transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-cyan hover:text-black transition-all duration-300">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; 2024 Mapzest. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
