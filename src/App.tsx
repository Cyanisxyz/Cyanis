import React from 'react';
import { Cpu, Binary, Code, Terminal, ChevronRight, Github, Twitter } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Floating Header */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm py-2 px-4">
          <div className="flex items-center space-x-8">
            <a href="#features" className="hover:text-white/80 transition-colors px-4">Features</a>
            <a href="#capabilities" className="hover:text-white/80 transition-colors px-4">Capabilities</a>
            <div className="h-4 w-px bg-white/20" />
            <a href="https://github.com/Cyanisxyz/Cyanis" className="hover:text-white/80 transition-colors p-2" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://x.com/cyanisxyz" className="hover:text-white/80 transition-colors p-2" aria-label="X (Twitter)">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center">
            <span className="text-xl font-orbitron font-bold text-glow">CYANIS</span>
          </div>
        </nav>

        <header className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl font-orbitron font-bold mb-6 text-glow">
            CYANIS
            <span className="block text-4xl mt-4 font-sans font-normal">Advanced AI System</span>
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-80">
            Experience the next evolution in artificial intelligence. CYANIS combines cutting-edge technology with unparalleled processing capabilities.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full flex items-center space-x-2 transition-colors backdrop-blur-sm button-glow">
              <span>Initialize System</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border border-white/20 hover:border-white/40 px-8 py-3 rounded-full transition-colors backdrop-blur-sm button-glow">
              View Documentation
            </button>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm button-glow">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quantum Processing</h3>
              <p className="text-white/70">
                Harness the power of quantum computing algorithms for unprecedented processing capabilities.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm button-glow">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Binary className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Neural Networks</h3>
              <p className="text-white/70">
                Advanced neural networks that adapt and evolve with each interaction.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm button-glow">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Code Synthesis</h3>
              <p className="text-white/70">
                Generate optimized code across multiple paradigms with intelligent pattern recognition.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities" className="container mx-auto px-6 py-24">
          <div className="bg-white/5 rounded-3xl border border-white/10 p-12 backdrop-blur-sm button-glow">
            <div className="flex items-center space-x-4 mb-12">
              <Terminal className="w-8 h-8" />
              <h2 className="text-3xl font-orbitron font-bold text-glow">System Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">Core Functions</h3>
                <ul className="space-y-4">
                  {[
                    "Advanced algorithmic problem solving",
                    "Real-time code optimization",
                    "Natural language processing",
                    "System architecture design",
                    "Automated testing and debugging",
                    "Technical documentation generation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
                  alt="Advanced Technology Visualization"
                  className="rounded-2xl object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-xl font-orbitron font-bold text-glow">CYANIS</span>
            <p className="text-white/60">© 2024 CYANIS. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;