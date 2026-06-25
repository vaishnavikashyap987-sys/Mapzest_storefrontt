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
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
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
                <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-900/80 to-space-900 opacity-90"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-slate-900"
                    >
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-accent-cyan">Latest Stories</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto"
                    >
                        Insights, updates, and deep dives into the world of geospatial technology, satellite intelligence, and mapping solutions.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto gap-y-6 md:gap-y-12">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="group relative flex flex-col h-full pb-12"
                        >
                            <Link to={`/blogs/${blog.id}`} className="block h-full relative">
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-slate-200/50">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                                </div>

                                {/* Floating Content Box */}
                                <div className="premium-card-content relative z-10 mx-4 -mt-16 p-6 flex flex-col rounded-3xl flex-grow min-h-[280px]">
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-accent-cyan" />
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                        <span>{blog.readTime}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent-cyan transition-colors line-clamp-2 leading-tight">
                                        {blog.title}
                                    </h3>

                                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-xs font-bold text-white">
                                                {blog.author.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-slate-600">{blog.author}</span>
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
