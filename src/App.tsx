import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';
import Home from './pages/Home';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Documentation from './pages/Documentation';
import Agent from './pages/Agent';

function App() {
  const location = useLocation();
  const isAgentRoute = location.pathname === '/agent';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAgentRoute) {
    return (
      <div className="min-h-screen bg-black text-white font-sans">
        <Routes>
          <Route path="/agent" element={<Agent />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-y-auto custom-scrollbar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1.5px)] bg-[length:24px_24px] animate-grid opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(205_65%_35%)]/30 to-[hsl(183_31%_26%)]/30" />

      <div className="relative z-10">
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 rounded-full backdrop-blur-sm py-2 px-4 z-50 header-glow">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-orbitron font-bold text-white">CYANIS</Link>
            <div className="h-4 w-px bg-white/20" />
            <a href="/#features" className="nav-link text-white/80 hover:text-white transition-colors px-4">Features</a>
            <a href="/#capabilities" className="nav-link text-white/80 hover:text-white transition-colors px-4">Capabilities</a>
            <a href="/#token" className="nav-link text-white/80 hover:text-white transition-colors px-4">Token</a>
            <div className="h-4 w-px bg-white/20" />
            <a href="https://github.com/Cyanisxyz/Cyanis" className="social-link text-white/80 hover:text-white transition-all p-2 hover:-translate-y-0.5">
              <Github className="w-4 h-4 social-icon" />
            </a>
            <a href="https://x.com/cyanisxyz" className="social-link text-white/80 hover:text-white transition-all p-2 hover:-translate-y-0.5">
              <Twitter className="w-4 h-4 social-icon" />
            </a>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>

        <footer className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="space-y-4 md:w-1/2">
                <Link to="/" className="text-xl font-orbitron font-bold">CYANIS</Link>
                <p className="text-white/60 max-w-md">
                  An advanced AI platform revolutionizing human-machine interactions—bridging intelligence and innovation.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com/Cyanisxyz/Cyanis" className="text-white/60 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/cyanisxyz" className="text-white/60 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="mt-8 md:mt-0 space-y-4">
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Use</Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;