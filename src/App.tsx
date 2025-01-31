import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';
import Home from './pages/Home';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Documentation from './pages/Documentation';
import Agent from './pages/Agent';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAgentRoute = location.pathname === '/agent';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

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

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 rounded-full backdrop-blur-sm py-2 px-4 z-50 header-glow">
          <div className="flex items-center space-x-8">
            <button 
              onClick={handleLogoClick}
              className="text-xl font-orbitron font-bold text-white hover:text-white/80 transition-colors"
            >
              CYANIS
            </button>
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

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </div>

        <footer className="relative z-10 w-full border-t border-white/10">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between">
              {/* Company Info - Now positioned at the bottom left */}
              <div className="mb-8 lg:mb-0 lg:max-w-xs">
                <button 
                  onClick={handleLogoClick}
                  className="text-xl font-orbitron font-bold hover:text-white/80 transition-colors"
                >
                  CYANIS
                </button>
                <p className="text-white/60 mt-4">
                  An advanced AI platform revolutionizing human-machine interactions—bridging intelligence and innovation.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/Cyanisxyz/Cyanis" className="text-white/60 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/cyanisxyz" className="text-white/60 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Footer Links - Positioned to the right */}
              <div className="grid grid-cols-3 gap-8 lg:gap-16">
                {/* Resources */}
                <div>
                  <h3 className="font-semibold text-white/80 mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/docs" className="text-white/60 hover:text-white transition-colors">Documentation</Link>
                    </li>
                    <li>
                      <a href="/#features" className="text-white/60 hover:text-white transition-colors">Features</a>
                    </li>
                    <li>
                      <a href="/#capabilities" className="text-white/60 hover:text-white transition-colors">Capabilities</a>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="font-semibold text-white/80 mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Use</Link>
                    </li>
                    <li>
                      <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-white/80 mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="mailto:support@cyanis.xyz" className="text-white/60 hover:text-white transition-colors">support@cyanis.xyz</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;