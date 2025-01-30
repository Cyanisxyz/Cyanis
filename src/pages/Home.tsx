import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Image, Brain, Shield, Terminal, ChevronRight, Sparkles, Search, Zap, Settings, Copy, Check } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';

function Home() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("COMING SOON");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="custom-scrollbar">
      <header className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-orbitron font-bold mb-6">CYANIS</h1>
          <div className="space-y-4 mb-12">
            <p className="text-2xl font-light text-white/90">
              Experience the next evolution in artificial intelligence.
            </p>
            <p className="text-lg text-white/80">
              CYANIS combines cutting-edge technology with unparalleled processing capabilities to deliver intelligent, adaptive solutions.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link to="/agent" className="bg-white text-black px-8 py-3 rounded-full flex items-center space-x-2 transition-all hover:bg-white/90 button-glow primary-button">
              <span>Initialize System</span>
              <ChevronRight className="w-5 h-5 chevron-icon" />
            </Link>
            <Link to="/docs" className="border border-white/20 hover:border-white/40 px-8 py-3 rounded-full transition-all button-glow">
              View Documentation
            </Link>
          </div>
        </div>
      </header>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-black/80 rounded-3xl border border-white/10 p-12 backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-12">
            <Sparkles className="w-8 h-8" />
            <h2 className="text-3xl font-orbitron font-bold">Core Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: MessageSquare, title: "Conversational AI", description: "Experience natural, human-like dialogue that adapts to your communication style, making every interaction feel seamless and intuitive." },
              { icon: Image, title: "Multimodal Capabilities", description: "Seamlessly understand and process text, images, and code, enabling comprehensive analysis and interaction across different types of content." },
              { icon: Brain, title: "Personalization", description: "Continuously learn and adapt to your preferences over time, creating a more personalized and efficient experience with each interaction." },
              { icon: Shield, title: "Security & Privacy", description: "Built with data protection at its core, ensuring your information remains secure and private throughout all interactions." }
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="feature-card space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="feature-icon bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-white/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-black/80 rounded-3xl border border-white/10 p-12 backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-12">
            <Terminal className="w-8 h-8" />
            <h2 className="text-3xl font-orbitron font-bold">System Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Sparkles, title: "Creative Generation", description: "Draft text, generate ideas, write code, or assist with creative content like stories, scripts, or essays." },
              { icon: Search, title: "Information Retrieval", description: "Quickly find accurate answers and summarize complex topics, helping you stay informed and make decisions faster." },
              { icon: Zap, title: "Task Efficiency", description: "Simplify daily tasks like brainstorming, outlining projects, and troubleshooting issues." },
              { icon: Settings, title: "Adaptability", description: "Adjust to your needs effortlessly, whether you need a tutor, a collaborator, or just someone to bounce ideas off." }
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="capability-card space-y-6 p-6 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="capability-icon bg-white/5 w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-white/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="token" className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="floating-card group p-8 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(255,255,255,0.1),_transparent_70%)]" />
            
            <div className="relative flex flex-col items-center space-y-6">
              <h3 className="text-2xl font-orbitron font-bold text-center text-white/90">CONTRACT ADDRESS</h3>
              <div className="flex items-center justify-between w-full max-w-2xl p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-mono text-lg text-white/80">COMING SOON</span>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                  aria-label="Copy contract address"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-white/60 hover:text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;