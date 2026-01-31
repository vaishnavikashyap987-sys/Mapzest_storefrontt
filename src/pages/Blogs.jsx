import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Map } from 'lucide-react';

export const blogs = [
    {
        id: 1,
        title: "TerrAqua UAV’s Flood Response Innovation Featured in Leading Newspapers",
        excerpt: "Our contribution to the development of a web-based Flood Disaster Response System marks a significant milestone in leveraging geospatial intelligence for real-world impact.",
        author: "Terraqua UAV Solutions",
        date: "May 8, 2025",
        image: "https://static.wixstatic.com/media/9a5348_6c2fba433c86417fa5f059b7ffce8d89~mv2.png/v1/fill/w_1200,h_1200,al_c,q_90/9a5348_6c2fba433c86417fa5f059b7ffce8d89~mv2.webp",
        category: "Disaster Management",
        readTime: "1 min read"
    }
];

const Blogs = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
            {/* Universal Background Image */}
            <div className="fixed inset-0 z-0">
                {/* Global BackgroundLayer handles the image */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B15] via-[#0B0B15]/80 to-[#0B0B15] opacity-90"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Latest Stories</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Insights, updates, and deep dives into the world of geospatial technology, satellite intelligence, and mapping solutions.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-cyan/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-cyan/10"
                        >
                            <Link to={`/blogs/${blog.id}`} className="block h-full">
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                                            {blog.category}
                                        </span>
                                    </div>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B15] to-transparent opacity-60"></div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-accent-cyan" />
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                        <span>{blog.readTime}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-xs font-bold text-white">
                                                {blog.author.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{blog.author}</span>
                                        </div>
                                        <span className="flex items-center gap-1 text-accent-cyan text-sm font-bold group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
