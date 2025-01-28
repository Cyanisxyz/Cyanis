import React from 'react';
import { Cpu, Binary, Code, Terminal, ChevronRight, Github, Twitter, MessageSquare, Sparkles, Search, Zap, Settings, Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1.5px)] bg-[length:24px_24px] animate-grid opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(205_65%_35%)]/30 to-[hsl(183_31%_26%)]/30" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Floating Header */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 rounded-full backdrop-blur-sm py-2 px-4 z-50">
          <div className="flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors px-4">Features</a>
            <a href="#capabilities" className="text-white/80 hover:text-white transition-colors px-4">Capabilities</a>
            <div className="h-4 w-px bg-white/20" />
            <a href="https://github.com/Cyanisxyz/Cyanis" className="text-white/80 hover:text-white transition-colors p-2" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://x.com/cyanisxyz" className="text-white/80 hover:text-white transition-colors p-2" aria-label="X (Twitter)">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center">
            <span className="text-xl font-orbitron font-bold">CYANIS</span>
          </div>
        </nav>

        <header className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl font-orbitron font-bold mb-6">
            CYANIS
            <span className="block text-4xl mt-4 font-sans font-normal">Advanced AI System</span>
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-white/80">
            Experience the next evolution in artificial intelligence. CYANIS combines cutting-edge technology with unparalleled processing capabilities.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-black px-8 py-3 rounded-full flex items-center space-x-2 transition-all hover:bg-white/80">
              <span>Initialize System</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border border-white/20 hover:border-white/40 px-8 py-3 rounded-full transition-colors">
              View Documentation
            </button>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-black/80 p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
              <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quantum Processing</h3>
              <p className="text-white/70">
                Harness the power of quantum computing algorithms for unprecedented processing capabilities.
              </p>
            </div>
            <div className="bg-black/80 p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
              <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Binary className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Neural Networks</h3>
              <p className="text-white/70">
                Advanced neural networks that adapt and evolve with each interaction.
              </p>
            </div>
            <div className="bg-black/80 p-8 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
              <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6">
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
          <div className="bg-black/80 rounded-3xl border border-white/10 p-12 shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-4 mb-12">
              <Terminal className="w-8 h-8" />
              <h2 className="text-3xl font-orbitron font-bold">System Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Conversational Expertise</h3>
                <p className="text-white/70">
                  Engage in natural, human-like conversations across a wide range of topics, from casual chats to technical discussions.
                </p>
              </div>
              <div className="space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Creative Generation</h3>
                <p className="text-white/70">
                  CYANIS excels at drafting text, generating ideas, writing code, or assisting with creative content like stories, scripts, or essays.
                </p>
              </div>
              <div className="space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Information Retrieval</h3>
                <p className="text-white/70">
                  Quickly find accurate answers and summarize complex topics, helping you stay informed and make decisions faster.
                </p>
              </div>
              <div className="space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Task Efficiency</h3>
                <p className="text-white/70">
                  CYANIS simplifies daily tasks like brainstorming, outlining projects, and troubleshooting issues.
                </p>
              </div>
              <div className="space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Adaptability</h3>
                <p className="text-white/70">
                  Whether you need a tutor, a collaborator, or just someone to bounce ideas off, CYANIS adjusts to your needs effortlessly.
                </p>
              </div>
              <div className="space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Continuous Learning</h3>
                <p className="text-white/70">
                  CYANIS evolves with usage, learning from your preferences to offer more personalized and effective support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-xl font-orbitron font-bold">CYANIS</span>
            <p className="text-white/60">© 2024 CYANIS. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;