import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader, X } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            setError('');
            await loginWithGoogle();
            onClose();
            navigate('/console'); // Redirect to console/dashboard after login
        } catch (error) {
            setError('Failed to sign in with Google');
            console.error(error);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            onClose();
            navigate('/console'); // Redirect to console/dashboard after login
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-colors hover:bg-slate-100 rounded-lg z-10"
                        >
                            <X size={20} />
                        </button>

                        {/* Logo/Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                            <p className="text-slate-500">Sign in to access your dashboard</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 text-red-650 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-slate-800 border border-slate-200 font-bold py-3.5 rounded-xl hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-md mb-6"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                            Sign in with Google
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] bg-slate-200 flex-1" />
                            <span className="text-sm text-slate-400 font-medium">OR</span>
                            <div className="h-[1px] bg-slate-200 flex-1" />
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-650 font-medium ml-1">Email Address</label>
                                <div className="relative group/input">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-accent-cyan transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm text-slate-650 font-medium">Password</label>
                                    <Link to="/forgot-password" onClick={onClose} className="text-xs text-accent-cyan hover:text-cyan-700 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-accent-cyan transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-cyan focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                            >
                                {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Sign In'}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-500">
                            Don't have an account? {' '}
                            <button onClick={onSwitchToRegister} className="text-accent-cyan hover:text-cyan-755 transition-colors font-medium">
                                Create free account
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default LoginModal;
