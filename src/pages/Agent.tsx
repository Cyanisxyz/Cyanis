import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Paperclip, Menu, X, Plus, MessageSquare, Share2, Pencil, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function Agent() {
  const [chats, setChats] = useState<Chat[]>([{
    id: '1',
    name: 'New Chat',
    messages: [{
      role: 'assistant',
      content: 'Hello! I am CYANIS, your advanced AI assistant. How can I help you today?',
      timestamp: new Date()
    }],
    createdAt: new Date()
  }]);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const maxHeight = lineHeight * 10;
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ));
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: 'I understand your request. However, I am currently in demonstration mode and cannot process actual queries. In a production environment, I would analyze your input and provide a relevant, helpful response.',
        timestamp: new Date()
      };
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      ));
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const startNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: 'New Chat',
      messages: [{
        role: 'assistant',
        content: 'Hello! I am CYANIS, your advanced AI assistant. How can I help you today?',
        timestamp: new Date()
      }],
      createdAt: new Date()
    };
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        startNewChat();
      }
    }
  };

  const shareChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      const chatContent = chat.messages.map(m => 
        `${m.role === 'assistant' ? 'CYANIS' : 'You'}: ${m.content}`
      ).join('\n\n');
      navigator.clipboard.writeText(chatContent);
    }
  };

  const startEditing = (chatId: string, currentName: string) => {
    setEditingChatId(chatId);
    setEditingName(currentName);
  };

  const saveEditing = () => {
    if (editingChatId && editingName.trim()) {
      setChats(prev => prev.map(chat =>
        chat.id === editingChatId
          ? { ...chat, name: editingName.trim() }
          : chat
      ));
    }
    setEditingChatId(null);
    setEditingName('');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1.5px)] bg-[length:24px_24px] animate-grid opacity-80" />
      <div className="fixed inset-0 bg-gradient-to-r from-[hsl(205_65%_35%)]/30 to-[hsl(183_31%_26%)]/30" />

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 z-50 w-64 h-screen bg-black/90 backdrop-blur-xl border-r border-white/10 transition-transform duration-200 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Search and New Chat */}
          <div className="p-2 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <div className="flex items-center bg-black/50 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                  <Search className="w-4 h-4 text-white/40 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-white/40 pl-10 pr-4 py-2 outline-none text-sm"
                  />
                </div>
              </div>
              <button
                onClick={startNewChat}
                className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white/5 text-white rounded-lg border border-white/10 transition-all hover:border-white/20 button-glow"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`group relative flex items-center space-x-2 hover:bg-white/5 rounded-lg px-3 py-2 transition-colors cursor-pointer ${
                  currentChatId === chat.id ? 'bg-white/10' : ''
                }`}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={saveEditing}
                    onKeyDown={(e) => e.key === 'Enter' && saveEditing()}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                    autoFocus
                  />
                ) : (
                  <>
                    <span className="flex-1 truncate text-sm">{chat.name}</span>
                    <div className="hidden group-hover:flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(chat.id, chat.name);
                        }}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareChat(chat.id);
                        }}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Back to Home */}
          <div className="p-2 mt-auto">
            <Link 
              to="/" 
              className="block hover:bg-white/5 text-white/70 rounded-lg px-3 py-2 transition-colors text-sm button-glow border border-white/10 hover:border-white/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-black/90 backdrop-blur-xl border-b border-white/10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-orbitron font-bold">CYANIS</span>
          <div className="w-10" />
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
            {!currentChat?.messages.length ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-white/40">No messages yet</p>
              </div>
            ) : (
              currentChat?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.role === 'assistant' && (
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-white/60">CYANIS</span>
                      </div>
                    )}
                    <div className={`text-white/90 ${message.role === 'user' ? 'text-indigo-400' : ''}`}>
                      <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-sm text-white/60">CYANIS</span>
                  </div>
                  <p className="text-white/90">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative bg-black/50 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Message CYANIS..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 py-4 px-4 pr-16 pl-12 min-h-[24px] max-h-[240px] custom-scrollbar resize-none overflow-wrap-anywhere"
                style={{
                  lineHeight: '1.5',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              
              <button
                type="button"
                className="absolute left-2 bottom-2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                onClick={handleFileUpload}
              >
                <Paperclip className="w-5 h-5 text-white/60" />
              </button>
              
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="absolute right-2 bottom-2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed rounded-full transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </main>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={(e) => {
          console.log('File selected:', e.target.files?.[0]);
        }}
      />
    </div>
  );
}

export default Agent;