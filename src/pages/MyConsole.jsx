import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Database, HardDrive, Download, ChevronRight, Activity, Clock, ExternalLink, CreditCard, X, Layers, CheckCircle, Crown, Trash2 } from 'lucide-react';
import { platforms, APPLICATIONS, STORAGE_TIERS, checkOwnership } from '../data/platforms';
import { getUserProfile, addSubscription } from '../lib/firebase';
import { api } from '../lib/api';

const MyConsole = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedPlatform, setSelectedPlatform] = useState(null); // For buying
    const [configApp, setConfigApp] = useState(null); // New State for Config Modal
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploading, setIsUploading] = useState(false); // Upload State
    const [userSubscriptions, setUserSubscriptions] = useState([]); // Real State from DB
    const [deleteFileId, setDeleteFileId] = useState(null); // ID of file to delete (for Modal)

    // Real Data State
    const [usage, setUsage] = useState({ used_mb: 0, file_count: 0, tier: 'free' });
    const [limits, setLimits] = useState({ total_mb: 500 });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    // Fetch User Subscriptions & Cloud Data on Load
    useEffect(() => {
        const initData = async () => {
            if (user?.email) {
                // 1. Firebase Profile
                let activePlans = ['p_geo_tools'];
                const profile = await getUserProfile(user.email);
                if (profile && profile.active_plans) {
                    activePlans = profile.active_plans;
                }
                setUserSubscriptions(activePlans); // Update state

                // 2. Central DB Data
                try {
                    const [usageData, filesData] = await Promise.all([
                        api.getUsage(),
                        api.getFiles()
                    ]);

                    // Calculate Dynamic Storage Limit based on Plans
                    const ownedPlatforms = platforms.filter(p => checkOwnership(activePlans, p.id));

                    let maxStorage = 500; // Base Free Tier
                    ownedPlatforms.forEach(p => {
                        // Check for specific markers or tiers
                        // Mapzest Pro (Add-on) -> 5GB
                        if (p.id === 'mapzest-pro') maxStorage = Math.max(maxStorage, 5120);

                        // Tiered Plans (e.g., adss_pro)
                        if (p.tierId) {
                            const tier = STORAGE_TIERS.find(t => t.id === p.tierId);
                            if (tier?.limitMb) maxStorage = Math.max(maxStorage, tier.limitMb);
                        }
                    });

                    // Update State
                    setUsage(usageData.usage);
                    setLimits({ ...usageData.limits, total_mb: maxStorage }); // Override with plan-based limit
                    setFiles(filesData);
                } catch (error) {
                    console.error("Failed to fetch cloud data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        initData();
    }, [user]);

    // Handle Buy Click
    const handleBuyClick = (platform) => {
        setConfigApp(null); // Close config modal if open
        setSelectedPlatform(platform);
    };

    // Handle Confirm Purchase
    const handleConfirmPurchase = async () => {
        setIsProcessing(true);
        try {
            // 1. Update Firestore
            const updatedPlans = await addSubscription(user.email, selectedPlatform.id);

            // 2. Simulate Payment Delay (Just for UX feeling)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 3. Update UI
            setUserSubscriptions(updatedPlans);
            setSelectedPlatform(null);
        } catch (error) {
            console.error("Purchase failed", error);
            alert("Transaction failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLaunch = async (url) => {
        try {
            const token = await user.getIdToken(true);
            const targetUrl = new URL(url);
            targetUrl.searchParams.append('token', token);
            window.open(targetUrl.toString(), '_blank');
        } catch (error) {
            console.error("Token generation failed", error);
        }
    };

    // File Upload Handler
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            await api.uploadFile(file);
            // Refresh Data
            const [usageData, filesData] = await Promise.all([
                api.getUsage(),
                api.getFiles()
            ]);
            setUsage(usageData.usage);
            setLimits(usageData.limits);
            setFiles(filesData);
            alert("Upload Successful!");
        } catch (error) {
            console.error("Upload failed", error);
            alert(`Upload Failed: ${error.message}`);
        } finally {
            setIsUploading(false);
            event.target.value = null; // Reset input
        }
    };

    // File Delete Handler
    const confirmDelete = (id) => {
        setDeleteFileId(id);
    };

    const handleDeleteFile = async () => {
        if (!deleteFileId) return;
        try {
            await api.deleteFile(deleteFileId);
            setFiles(prev => prev.filter(f => f.id !== deleteFileId));
            const usageData = await api.getUsage();
            setUsage(usageData.usage);
            setLimits(usageData.limits);
        } catch (error) {
            console.error("Delete failed", error);
            alert("Delete Failed");
        } finally {
            setDeleteFileId(null);
        }
    };

    const handleDownload = async (file) => {
        try {
            await api.downloadFile(file.id, file.name);
        } catch (error) {
            console.error("Download failed", error);
            alert("Download failed. Please try again.");
        }
    };

    // Mock Data Removed
    // const quota = {
    //     used: formatSize(usage.used_mb),
    //     total: formatSize(limits.total_mb),
    //     percent: validUsedPercent
    // };

    const validUsedPercent = Math.min((usage.used_mb / limits.total_mb) * 100, 100).toFixed(1);

    // Helper to format bytes
    const formatSize = (mb) => {
        if (mb < 1) return `${(mb * 1024).toFixed(0)} KB`;
        if (mb > 1024) return `${(mb / 1024).toFixed(1)} GB`;
        return `${mb.toFixed(1)} MB`;
    };

    const cardStyle = "backdrop-blur-xl bg-[#12121A]/80 border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-colors";

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center sm:text-left relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12121A] to-[#0B0B15] border border-white/10 shadow-2xl p-8 sm:p-12"
            >
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent-cyan/10 via-accent-purple/10 to-transparent pointer-events-none blur-3xl" />
                <div className="relative z-10 flex flex-col gap-2">
                    <span className="text-accent-cyan font-medium tracking-wide uppercase text-sm">Dashboard</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{user?.displayName?.split(' ')[0] || 'Explorer'}</span>
                    </h1>
                    <p className="text-gray-400 text-lg mt-2 max-w-2xl">
                        Here's what's happening with your projects today.
                    </p>
                </div>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-6">
                    <nav className="flex flex-col gap-2">
                        {['overview', 'platforms', 'data', 'plans'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all font-medium border ${activeTab === tab
                                    ? 'bg-gradient-to-r from-accent-cyan/20 to-transparent text-white border-accent-cyan/30'
                                    : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab === 'overview' && <LayoutDashboard className="w-5 h-5" />}
                                {tab === 'platforms' && <Activity className="w-5 h-5" />}
                                {tab === 'data' && <Database className="w-5 h-5" />}
                                {tab === 'plans' && <Crown className="w-5 h-5" />}
                                <span className="capitalize">{tab}</span>
                                {activeTab === tab && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    {/* Quick Storage Stat for Sidebar */}
                    <div className={`${cardStyle} hidden lg:block`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-purple/5 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4 text-gray-300 relative z-10">
                            <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                <HardDrive className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold">Storage Quota</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3 relative z-10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${validUsedPercent}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 relative z-10 font-mono">
                            <span>{formatSize(usage.used_mb)} used</span>
                            <span>{formatSize(limits.total_mb)}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Stats Grid - Show on Overview Only */}
                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className={cardStyle}>
                                    <div className="flex items-center gap-5">
                                        <div className="p-4 bg-white/5 rounded-2xl text-gray-400 ring-1 ring-inset ring-white/10">
                                            <Activity className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-gray-400 text-sm font-medium mb-1">Active Platforms</h3>
                                            <p className="text-3xl font-bold text-white">{platforms.filter(p => p.type !== 'Add-on' && checkOwnership(userSubscriptions, p.id)).length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={cardStyle}>
                                    <div className="flex items-center gap-5">
                                        <div className="p-4 bg-white/5 rounded-2xl text-gray-400 ring-1 ring-inset ring-white/10">
                                            <Database className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Files</h3>
                                            <p className="text-3xl font-bold text-white">{files.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={cardStyle}>
                                    <div className="flex items-center gap-5">
                                        <div className="p-4 bg-white/5 rounded-2xl text-gray-400 ring-1 ring-inset ring-white/10">
                                            <Crown className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-gray-400 text-sm font-medium mb-1">Current Plan</h3>
                                            <p className="text-xl font-bold text-white truncate max-w-[140px]" title={checkOwnership(userSubscriptions, 'mapzest-pro') ? 'Mapzest Pro' : checkOwnership(userSubscriptions, 'p_urban_analytics') ? 'Mapzest Go' : 'Free Tier'}>
                                                {checkOwnership(userSubscriptions, 'mapzest-pro') ? 'Mapzest Pro' :
                                                    checkOwnership(userSubscriptions, 'p_urban_analytics') ? 'Mapzest Go' : 'Free Tier'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${cardStyle} lg:hidden`}>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-white/5 rounded-xl text-gray-400">
                                        <HardDrive className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 text-sm">Storage</h3>
                                        <p className="text-2xl font-bold text-white">{validUsedPercent}%</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Recent Data Section - Show on Overview OR Data */}
                    {(activeTab === 'overview' || activeTab === 'data') && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8"
                        >
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Database className="w-5 h-5 text-gray-400" />
                                    Recent Data Uploads
                                </h2>
                                <div className="flex gap-3">
                                    <label className={`cursor-pointer text-sm font-bold text-white bg-accent-cyan hover:bg-cyan-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        {isUploading ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4 rotate-180" /> {/* Upload Icon */}
                                                Upload Data
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".json,.geojson,.kml,.csv,.zip"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                    <button className="text-sm font-medium text-accent-cyan hover:text-white transition-colors bg-accent-cyan/10 hover:bg-accent-cyan/20 px-4 py-2 rounded-lg">View All</button>
                                </div>
                            </div>

                            <div className="backdrop-blur-xl bg-[#12121A]/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-white/5 border-b border-white/5">
                                            <tr>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Size</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {files.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                                        No files uploaded yet.
                                                    </td>
                                                </tr>
                                            ) : (
                                                files.map((file) => (
                                                    <tr key={file.id} className="hover:bg-white/5 transition-colors group">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                                                                    {file.type === 'vector' ? <Activity size={16} /> : <Database size={16} />}
                                                                </div>
                                                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{file.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-gray-400 text-sm capitalize">{file.type}</td>
                                                        <td className="p-4 text-gray-400 font-mono text-sm">{file.file_size_mb} MB</td>
                                                        <td className="p-4 text-gray-400 text-sm">{new Date(file.created_at).toLocaleDateString()}</td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    className="h-8 w-8 flex items-center justify-center bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                                                                    title="Download GeoJSON"
                                                                    onClick={() => handleDownload(file)}
                                                                >
                                                                    <Download size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => confirmDelete(file.id)}
                                                                    className="h-8 w-8 flex items-center justify-center bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors"
                                                                    title="Delete File"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Custom Delete Confirmation Modal */}
                    <AnimatePresence>
                        {deleteFileId && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            >
                                <motion.div
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.95 }}
                                    className="bg-[#181824] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                                >
                                    <h3 className="text-xl font-bold text-white mb-2">Delete File?</h3>
                                    <p className="text-gray-400 mb-6">
                                        This action cannot be undone. This file will be permanently removed from your database.
                                    </p>
                                    <div className="flex gap-3 justify-end">
                                        <button
                                            onClick={() => setDeleteFileId(null)}
                                            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteFile}
                                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                                        >
                                            Delete Forever
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Platforms Section - Show on Overview OR Platforms Only */}
                    {(activeTab === 'overview' || activeTab === 'platforms') && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-8"
                        >
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-gray-400" />
                                    My Platforms
                                </h2>
                                <button onClick={() => setActiveTab('plans')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Manage Subscriptions</button>
                            </div>
                            <div className="backdrop-blur-xl bg-[#12121A]/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-white/5 border-b border-white/5">
                                            <tr>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Platform</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Description</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {platforms.filter(p => p.type !== 'Add-on' && checkOwnership(userSubscriptions, p.id)).length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center">
                                                        <Layers className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                                        <h3 className="text-lg font-medium text-gray-300">No Active Platforms</h3>
                                                        <p className="text-gray-500 mb-6">Explore our plans to unlock powerful tools.</p>
                                                        <button onClick={() => setActiveTab('plans')} className="px-6 py-2 bg-accent-cyan text-[#0B0B15] font-bold rounded-xl hover:bg-cyan-400 transition-colors">
                                                            View Plans
                                                        </button>
                                                    </td>
                                                </tr>
                                            ) : (
                                                platforms.filter(p => p.type !== 'Add-on' && checkOwnership(userSubscriptions, p.id)).map((platform) => {
                                                    const isProOwned = checkOwnership(userSubscriptions, 'mapzest-pro');
                                                    const displayName = (platform.id === 'p_urban_analytics' && isProOwned) ? 'Mapzest Pro' : platform.name;

                                                    return (
                                                        <tr key={platform.id} className="hover:bg-white/5 transition-colors group">
                                                            <td className="p-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                                                                        <Layers className="w-5 h-5" />
                                                                    </div>
                                                                    <div className="font-bold text-white text-sm">{displayName}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 hidden md:table-cell">
                                                                <p className="text-sm text-gray-400 truncate max-w-[250px]" title={platform.description}>{platform.description}</p>
                                                            </td>
                                                            <td className="p-4">
                                                                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1 w-fit">
                                                                    <CheckCircle className="w-3 h-3" /> Licensed
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    {platform.id === 'p_urban_analytics' && !isProOwned && (
                                                                        <button
                                                                            onClick={() => handleBuyClick({
                                                                                id: 'mapzest-pro',
                                                                                name: 'Mapzest Pro',
                                                                                description: 'Unlock advanced features: Analysis tools & Branding removal.',
                                                                                price: 29.99,
                                                                                type: 'Add-on',
                                                                                renewal: 'Monthly',
                                                                                url: ''
                                                                            })}
                                                                            className="h-9 px-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-xs font-bold hover:bg-purple-500/20 transition-all flex items-center justify-center whitespace-nowrap"
                                                                        >
                                                                            Upgrade Pro
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        onClick={() => handleLaunch(platform.url)}
                                                                        className="h-9 px-4 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
                                                                    >
                                                                        Launch <ExternalLink className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Plans Section - Detailed View - Show ONLY on Plans Tab */}
                    {activeTab === 'plans' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 space-y-6"
                        >
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Crown className="w-5 h-5 text-gray-400" />
                                    Manage Subscriptions
                                </h2>
                            </div>

                            <div className="backdrop-blur-xl bg-[#12121A]/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col max-h-[600px]">
                                <div className="overflow-y-auto custom-scrollbar flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-md border-b border-white/5">
                                            <tr>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Application</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Description</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Current Plan</th>
                                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {APPLICATIONS.map((app) => {
                                                // Find all owned plans for this app
                                                const ownedPlans = app.plans.filter(p => checkOwnership(userSubscriptions, p.id));
                                                const statusLabel = ownedPlans.length > 0
                                                    ? ownedPlans.map(p => p.name).join(', ')
                                                    : 'None';

                                                return (
                                                    <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                                                                    <Layers className="w-5 h-5" />
                                                                </div>
                                                                <div className="font-bold text-white text-sm">{app.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 hidden md:table-cell">
                                                            <p className="text-sm text-gray-400 truncate max-w-[250px]" title={app.desc}>{app.desc}</p>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${ownedPlans.length > 0
                                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                                : 'bg-gray-700/30 text-gray-400 border-gray-600/30'
                                                                }`}>
                                                                {statusLabel}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <button
                                                                onClick={() => setConfigApp(app)}
                                                                className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 text-xs font-medium hover:text-white hover:bg-white/5 transition-colors"
                                                            >
                                                                Configure
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Plan Configuration Modal (New) */}
                    <AnimatePresence>
                        {configApp && (
                            <PlanConfigModal
                                app={configApp}
                                onClose={() => setConfigApp(null)}
                                onSelectPlan={handleBuyClick}
                                userSubscriptions={userSubscriptions}
                            />
                        )}
                    </AnimatePresence>

                    {/* Purchase Modal */}
                    <AnimatePresence>
                        {selectedPlatform && (
                            <PurchaseModal
                                key="modal"
                                platform={selectedPlatform}
                                onClose={() => setSelectedPlatform(null)}
                                onConfirm={handleConfirmPurchase}
                                isProcessing={isProcessing}
                            />
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div >
    );
};

export default MyConsole;

// ... (PurchaseModal Component Code assumed to be here or imported, keeping it if it's in the file)

// New Plan Configuration Modal Component
const PlanConfigModal = ({ app, onClose, onSelectPlan, userSubscriptions }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-[#0B0B15] border border-white/10 rounded-3xl p-8 max-w-4xl w-full shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Configure {app.name}</h3>
                        <p className="text-gray-400">{app.desc}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-4">
                    {app.plans.map((plan) => {
                        const isOwned = checkOwnership(userSubscriptions, plan.id);
                        return (
                            <div key={plan.id} className={`relative flex flex-col p-6 rounded-2xl border transition-all ${isOwned
                                ? 'bg-green-500/5 border-green-500/30'
                                : 'bg-white/5 border-white/5 hover:border-white/10'
                                }`}>
                                {isOwned && (
                                    <div className="absolute top-4 right-4">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                )}
                                <div className="mb-4">
                                    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-2xl font-bold text-accent-cyan">${plan.price}</span>
                                        <span className="text-sm text-gray-400">/{plan.renewal === 'Monthly' ? 'mo' : ''}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features?.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                            {feature}
                                        </li>
                                    )) || (
                                            <li className="text-sm text-gray-500 italic">Standard features included</li>
                                        )}
                                </ul>

                                <button
                                    onClick={() => !isOwned && onSelectPlan(plan)}
                                    disabled={isOwned}
                                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${isOwned
                                        ? 'bg-green-500/10 text-green-400 cursor-default'
                                        : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02]'
                                        }`}
                                >
                                    {isOwned ? 'Current Plan' : 'Select Plan'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

const PurchaseModal = ({ platform, onClose, onConfirm, isProcessing }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-[#0B0B15] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple p-[1px] mb-6">
                        <div className="w-full h-full bg-[#0B0B15] rounded-2xl flex items-center justify-center">
                            <CreditCard className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">Unlock {platform.name}</h3>
                    <p className="text-gray-400 mb-6">
                        Get full access to {platform.description} for <span className="text-white font-bold">${platform.price}</span>/{platform.renewal.toLowerCase()}.
                    </p>

                    {/* Mock Payment Form */}
                    <div className="w-full bg-white/5 rounded-xl p-4 mb-6 border border-white/10 text-left space-y-3">
                        <div className="h-4 bg-white/10 rounded-md w-3/4 animate-pulse" />
                        <div className="h-4 bg-white/10 rounded-md w-1/2 animate-pulse" />
                        <p className="text-xs text-gray-500 mt-2 text-center">🔒 Mock Payment Gateway (Test Mode)</p>
                    </div>

                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Confirm Purchase'
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
