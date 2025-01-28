import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Image as ImageIcon, Code, Paperclip, Menu, X, Plus, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function Agent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am CYANIS, your advanced AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: 'I understand your request. However, I am currently in demonstration mode and cannot process actual queries. In a production environment, I would analyze your input and provide a relevant, helpful response.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const startNewChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hello! I am CYANIS, your advanced AI assistant. How can I help you today?',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-black border-r border-white/10 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={startNewChat}
              className="w-full flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-3 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            <button className="w-full flex items-center space-x-2 hover:bg-white/10 text-white/70 rounded-lg px-3 py-2 transition-colors text-left">
              <MessageSquare className="w-4 h-4" />
              <span className="truncate">Current Chat</span>
            </button>
          </div>

          {/* Bottom Links */}
          <div className="p-4 border-t border-white/10">
            <Link to="/" className="block hover:bg-white/10 text-white/70 rounded-lg px-3 py-2 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-orbitron font-bold">CYANIS</span>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    message.role === 'assistant' ? 'bg-white/5' : ''
                  } p-3 rounded-lg`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`space-y-1 ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div className="font-medium text-sm text-white/60">
                      {message.role === 'assistant' ? 'CYANIS' : 'You'}
                    </div>
                    <p className={`text-white/90 whitespace-pre-wrap ${
                      message.role === 'user' ? 'bg-blue-600 rounded-lg p-2' : ''
                    }`}>{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[85%] bg-white/5 p-3 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-sm text-white/60">CYANIS</div>
                    <p className="text-white/90">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-black">
          <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-end space-x-2">
                <div className="flex-1 bg-white/10 rounded-lg">
                  <div className="flex items-center px-3 py-2 space-x-2">
                    <button
                      type="button"
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      onClick={handleFileUpload}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Code className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="px-3 pb-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Message CYANIS..."
                      className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-white/40"
                      rows={1}
                      style={{
                        height: 'auto',
                        minHeight: '24px',
                        maxHeight: '200px'
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={(e) => {
          // Handle file upload logic here
          console.log('File selected:', e.target.files?.[0]);
        }}
      />
    </div>
  );
}

export default Agent;