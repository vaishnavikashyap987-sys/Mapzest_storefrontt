import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Platforms from './pages/Platforms';
import PlatformDetail from './pages/PlatformDetail';
import About from './components/About';
import Services from './components/Services';
import BackgroundLayer from './components/BackgroundLayer';
import { AnimatePresence } from 'framer-motion';

import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyConsole from './pages/MyConsole';
import ProtectedRoute from './components/ProtectedRoute';

// ... other imports ...

import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen text-white selection:bg-accent-cyan selection:text-space-900 flex flex-col relative">
          <BackgroundLayer />
          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/platforms/:id" element={<PlatformDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              <Route path="/console" element={
                <ProtectedRoute>
                  <MyConsole />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
