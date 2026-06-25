import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, Loader, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for password reset instructions.');
            setLoading(false);
        } catch (err) {
            setError('Failed to reset password. ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-20 pb-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md backdrop-blur-xl bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
                    <p className="text-slate-500">Enter your email to receive a reset link</p>
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

                {message && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-6 text-green-650 text-sm text-center flex items-center justify-center gap-2"
                    >
                        <CheckCircle className="w-4 h-4" />
                        {message}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
                        {!loading && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-8 text-center bg-slate-50 border border-slate-100 rounded-xl py-3">
                    <Link to="/login" className="text-slate-650 hover:text-slate-900 transition-colors text-sm font-medium">
                        <span className="text-slate-400 mr-2">Remember your password?</span>
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
