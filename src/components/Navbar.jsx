import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, LayoutDashboard, ChevronDown, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Modal states
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus when route changes
    useEffect(() => {
        setIsOpen(false);
        setProfileOpen(false);
        setShowLogoutConfirm(false);
    }, [location]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Platforms', path: '/platforms' },
        ...(user ? [{ name: 'My Console', path: '/console' }] : []),
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Contact', path: '/contact' },
    ];

    // Active link color logic
    const activeColorClass = scrolled ? 'text-cyan-600 font-bold' : 'text-accent-cyan font-bold';
    const inactiveColorClass = scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white';

    const initiateLogout = () => {
        setProfileOpen(false);
        setShowLogoutConfirm(true);
    };

    const confirmLogout = async () => {
        try {
            await logout();
            setShowLogoutConfirm(false);
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center gap-2 group flex-shrink-0 z-20">
                        <img
                            src="https://mapzest.com/MapzestBasic/assets/Powered%20by%20TerrAqua%20UAV%20(3).png"
                            alt="Mapzest Logo"
                            className="h-12 transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* Center: Nav Links - Absolute Centered */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${location.pathname === link.path
                                    || (link.path !== '/' && location.pathname.startsWith(link.path))
                                    ? activeColorClass
                                    : inactiveColorClass
                                    }`}
                            >
                                {link.name}
                                {(location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) && (
                                    <motion.div
                                        layoutId="underline"
                                        className={`absolute -bottom-1 left-0 w-full h-[2px] ${scrolled ? 'bg-cyan-600' : 'bg-accent-cyan'}`}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Auth Section (Profile or Sign In) */}
                    <div className="hidden md:flex items-center gap-4 z-20">
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className={`group flex items-center gap-2 rounded-full p-1 pr-3 transition-all border ${scrolled
                                        ? 'border-gray-200 hover:bg-gray-100 hover:shadow-md'
                                        : 'border-white/10 hover:bg-white/10 hover:border-white/20'
                                        } ${profileOpen ? 'ring-2 ring-accent-cyan/50 bg-white/5' : ''}`}
                                >
                                    {/* Enhanced Avatar Container */}
                                    <div className={`relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border-2 ${scrolled ? 'border-white shadow-sm' : 'border-black/20'
                                        }`}>
                                        {/* Gradient Background for User (cool effect) */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan to-accent-purple" />

                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-full h-full object-cover z-10"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <span className="relative z-10 font-bold text-white text-xs tracking-wider shadow-sm">
                                                {getInitials(user.displayName)}
                                            </span>
                                        )}
                                    </div>

                                    <span className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-700 group-hover:text-black' : 'text-gray-200 group-hover:text-white'}`}>
                                        {user.displayName?.split(' ')[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''} ${scrolled ? 'text-gray-500' : 'text-gray-400'}`} />
                                </button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-72 bg-[#0B0B15]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 ring-1 ring-white/10"
                                        >
                                            {/* Header */}
                                            <div className="p-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} className="w-full h-full rounded-full object-cover" />
                                                        ) : getInitials(user.displayName)}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="text-white font-bold truncate">{user.displayName}</p>
                                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 space-y-1">
                                                <Link
                                                    to="/console"
                                                    onClick={() => setIsOpen(false)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
                                                >
                                                    <LayoutDashboard className="w-4 h-4 text-accent-cyan group-hover:scale-110 transition-transform" />
                                                    My Console
                                                </Link>

                                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all group">
                                                    <Settings className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                                    Settings
                                                </button>
                                            </div>

                                            <div className="p-2 border-t border-white/10 bg-black/20">
                                                <button
                                                    onClick={initiateLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-sm text-sm font-medium border ${scrolled
                                    ? 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 shadow-md'
                                    : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white text-white'
                                    }`}
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden focus:outline-none transition-colors duration-300 z-20 ${scrolled ? 'text-gray-900' : 'text-white'
                            }`}
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-8 h-8" />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-space-900/95 backdrop-blur-xl flex flex-col items-center justify-center"
                        >
                            <button
                                className="absolute top-6 right-6 text-white hover:text-accent-cyan transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-10 h-10" />
                            </button>

                            <div className="flex flex-col gap-8 text-center w-full px-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {user ? (
                                    <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-xs mx-auto">
                                        <div className="w-full h-[1px] bg-white/10 mb-4"></div>
                                        <div className="flex items-center gap-3">
                                            {/* Mobile Avatar */}
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold ring-2 ring-white/10">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} className="w-full h-full rounded-full object-cover" />
                                                ) : getInitials(user.displayName)}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-white font-medium">{user.displayName}</p>
                                                <p className="text-xs text-gray-400">Logged In</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 w-full mt-4">

                                            <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10">
                                                <Settings className="w-5 h-5 text-white" />
                                                <span className="text-xs text-gray-300">Settings</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => { setIsOpen(false); initiateLogout(); }}
                                            className="w-full mt-4 px-6 py-3 rounded-xl text-lg font-bold transition-all border border-red-500/50 text-red-500 hover:bg-red-500/10"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setIsLoginOpen(true);
                                        }}
                                        className="text-2xl font-bold text-accent-cyan hover:text-white transition-colors mt-4"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowLogoutConfirm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative backdrop-blur-xl bg-space-950/40 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                                    <LogOut className="w-8 h-8 text-red-500" />
                                </div>
                                <p className="text-gray-400">
                                    Are you sure you want to sign out of your account?
                                </p>
                                <div className="flex gap-3 w-full mt-4">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="flex-1 px-4 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmLogout}
                                        className="flex-1 px-4 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20 transition-all"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </>
    );
};

export default Navbar;
