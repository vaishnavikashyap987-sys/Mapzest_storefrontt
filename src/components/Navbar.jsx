import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, LayoutDashboard, ChevronDown, AlertCircle, Map } from 'lucide-react';
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

    const hasDarkHeader = (location.pathname.startsWith('/platforms/') && location.pathname !== '/platforms') || location.pathname === '/';
    const useWhiteText = hasDarkHeader && !scrolled;

    // Active link color logic
    const activeColorClass = useWhiteText 
        ? 'text-sky-400 font-bold' 
        : 'text-accent-cyan font-bold';
    const inactiveColorClass = useWhiteText 
        ? 'text-white/80 hover:text-white' 
        : 'text-slate-600 hover:text-slate-900';

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
                className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center relative">
                    <Link to="/" className="relative flex items-center group flex-shrink-0 z-20 h-10 w-48">
                        <img 
                            src="/MAPZEST.png" 
                            alt="Mapzest" 
                            className="absolute h-56 max-w-none w-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-[1.05] duration-300" 
                        />
                    </Link>

                    {/* Center: Nav Links - Absolute Centered */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-[17px] font-semibold tracking-wide transition-colors duration-300 ${location.pathname === link.path
                                    || (link.path !== '/' && location.pathname.startsWith(link.path))
                                    ? activeColorClass
                                    : inactiveColorClass
                                    }`}
                                
                            >
                                {link.name}
                                {(location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) && (
                                    <motion.div
                                        layoutId="underline"
                                        className={`absolute -bottom-1 left-0 w-full h-[2px] ${useWhiteText ? 'bg-sky-400' : 'bg-accent-cyan'}`}
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
                                    className={`group flex items-center gap-2 rounded-full p-1 pr-3 transition-all border border-slate-200 hover:bg-slate-50 hover:shadow-sm ${profileOpen ? 'ring-2 ring-accent-cyan/50 bg-slate-100' : ''}`}
                                >
                                    {/* Enhanced Avatar Container */}
                                    <div className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
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

                                     <span className={`text-sm font-medium transition-colors ${useWhiteText ? 'text-white/85 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                         {user.displayName?.split(' ')[0]}
                                     </span>
                                     <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''} ${useWhiteText ? 'text-white/60' : 'text-slate-500'}`} />
                                </button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 ring-1 ring-black/5"
                                        >
                                            {/* Header */}
                                            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-transparent">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} className="w-full h-full rounded-full object-cover" />
                                                        ) : getInitials(user.displayName)}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="text-slate-900 font-bold truncate">{user.displayName}</p>
                                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 space-y-1">
                                                <Link
                                                    to="/console"
                                                    onClick={() => setIsOpen(false)}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all group"
                                                >
                                                    <LayoutDashboard className="w-4 h-4 text-accent-cyan group-hover:scale-110 transition-transform" />
                                                    My Console
                                                </Link>

                                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all group">
                                                    <Settings className="w-4 h-4 text-slate-500 group-hover:scale-110 transition-transform" />
                                                    Settings
                                                </button>
                                            </div>

                                            <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                                                <button
                                                    onClick={initiateLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
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
                                className="px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium border bg-orange-600 text-white border-orange-600 hover:bg-orange-700 hover:border-orange-700 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden focus:outline-none transition-colors duration-300 z-20 ${useWhiteText ? 'text-white' : 'text-slate-800'}`}
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-8 h-8" />
                    </button>
                </div>

                {/* Mobile Menu Portal */}
                {createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
                                    onClick={() => setIsOpen(false)}
                                />

                                {/* Drawer */}
                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="fixed top-0 right-0 h-full w-[300px] z-[10000] bg-white border-l border-slate-200 shadow-2xl flex flex-col"
                                >
                                    <div className="p-6 flex justify-between items-center border-b border-slate-100">
                                        <span className="text-xl font-bold text-slate-900 tracking-wide">Menu</span>
                                        <button
                                            className="text-slate-500 hover:text-slate-800 transition-colors p-2 hover:bg-slate-100 rounded-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                onClick={() => setIsOpen(false)}
                                                className={`text-lg font-medium transition-colors ${location.pathname === link.path
                                                    ? 'text-accent-cyan'
                                                    : 'text-slate-600 hover:text-slate-900'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}

                                        <div className="w-full h-[1px] bg-slate-200 my-2"></div>

                                        {user ? (
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold ring-1 ring-white/10 shrink-0">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                                                        ) : getInitials(user.displayName)}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="text-slate-800 font-medium truncate">{user.displayName}</p>
                                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                                    </div>
                                                </div>

                                                <Link
                                                    to="/console"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                                >
                                                    <LayoutDashboard className="w-5 h-5" />
                                                    My Console
                                                </Link>

                                                <button className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                                                    <Settings className="w-5 h-5" />
                                                    Settings
                                                </button>

                                                <button
                                                    onClick={() => { setIsOpen(false); initiateLogout(); }}
                                                    className="flex items-center gap-3 px-3 py-2 text-red-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2"
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsLoginOpen(true);
                                                }}
                                                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors mt-auto shadow-md cursor-pointer"
                                            >
                                                Sign In
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
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
