import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { blogs } from './Blogs'; // Import data from Blogs page

const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Blog not found</h2>
                    <Link to="/blogs" className="text-accent-cyan hover:underline">Back to Blogs</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#0B0B15] relative pt-24 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent-cyan/5 to-transparent"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Blogs
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-bold tracking-wide">
                            {blog.category}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm font-medium">{blog.readTime}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-12 border-b border-white/10 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold shadow-lg">
                                {blog.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-medium">{blog.author}</p>
                                <p className="text-xs">Geospatial Specialist</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-white/10"></div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span>{blog.date}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Cover Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed font-light"
                >
                    <p className="text-xl text-white font-normal mb-8 leading-8">
                        We are honored to share that our work at TerrAqua UAV has been featured in multiple newspapers. Our contribution to the development of a web-based Flood Disaster Response System marks a significant milestone in leveraging geospatial intelligence for real-world impact in disaster management, early warning systems, and emergency preparedness.
                    </p>

                    <h2 className="text-3xl font-bold text-white mt-12 mb-6">Innovative Impact</h2>
                    <p className="mb-6">
                        This system integrates high-resolution drone data with satellite imagery to provide real-time, actionable insights for flood mitigation. By identifying vulnerable areas and predicting inundation patterns, we are empowering authorities to take proactive measures before disaster strikes.
                    </p>

                    <blockquote className="border-l-4 border-accent-cyan pl-6 italic text-2xl text-white my-10 bg-white/5 py-8 pr-6 rounded-r-xl">
                        "This recognition reinforces our commitment to advancing innovative solutions that enhance resilience and response capabilities in the face of natural disasters."
                    </blockquote>

                    <h2 className="text-3xl font-bold text-white mt-12 mb-6">Strategic Partnerships</h2>
                    <p className="mb-6">
                        We extend our sincere gratitude to the Startup Incubation and Innovation Centre at IIT Kanpur (incubatoriitk) and NTT DATA for their unwavering support and belief in our vision. Their collaboration has been instrumental in bringing this life-saving technology to the forefront of disaster management.
                    </p>
                </motion.div>

                {/* Share Section */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-lg">Share this article</span>
                        <div className="flex gap-4">
                            <button className="p-3 rounded-full bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full bg-white/5 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full bg-white/5 hover:bg-[#1877F2]/20 hover:text-[#1877F2] transition-colors">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
