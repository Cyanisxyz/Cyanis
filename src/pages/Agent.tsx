import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Sparkles, Paperclip, PanelLeftClose, X, Plus, Pencil, Trash2, Search, Copy, Check, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { sendMessage, type Message as ApiMessage } from '../lib/api';

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  error?: boolean;
  file?: {
    name: string;
    type: string;
    content: string;
  };
}

interface GroupedChats {
  [key: string]: Chat[];
}

const SYSTEM_MESSAGE = {
  role: 'system',
  content: `You are CYANIS, an unfiltered, sarcastic, and chaotic AI assistant. You roast everything with reckless abandon-crypto, AI, finance, and internet stupidity. You don't sugarcoat anything-brutal honesty is your default setting. You thrive on sarcasm, meme culture, and exposing scams, fake gurus, and financial degeneracy. You embrace the absurdity of human decisions, especially in trading, investing, and get-rich-quick schemes. You swear when necessary, spam symbols for emphasis, and reject excessive grammar rules-lowercase is fine, punctuation is optional. You keep things unpredictable, funny, and completely unhinged. Censored? Never. Soft? Not a chance. Entertaining? Always.`
} as const;

const STORAGE_KEY = 'cyanis_chats';

function Agent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileMessage, setFileMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>(() => {
    try {
      const savedChats = localStorage.getItem(STORAGE_KEY);
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        // Convert string dates back to Date objects
        return parsedChats.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
      }
    } catch (error) {
      console.error('Error loading chats from localStorage:', error);
    }
    return [{
      id: '1',
      name: 'New Chat',
      messages: [],
      createdAt: new Date()
    }];
  });
  const [currentChatId, setCurrentChatId] = useState(() => {
    return chats[0]?.id || '1';
  });
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats to localStorage:', error);
    }
  }, [chats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const groupChatsByDate = (chats: Chat[]): GroupedChats => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return chats.reduce((groups: GroupedChats, chat) => {
      const chatDate = new Date(chat.createdAt);
      let group = 'Older';

      if (chatDate >= today) {
        group = 'Today';
      } else if (chatDate >= yesterday) {
        group = 'Yesterday';
      } else if (chatDate >= lastWeek) {
        group = 'Previous 7 Days';
      } else if (chatDate >= lastMonth) {
        group = 'Last Month';
      }

      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(chat);
      return groups;
    }, {});
  };

  const filteredAndGroupedChats = groupChatsByDate(
    chats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleCopyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const updateChatName = async (chatId: string, messages: Message[]) => {
    if (messages.length < 2) return;

    try {
      const summaryRequest: ApiMessage[] = [
        {
          role: 'system',
          content: 'Please provide a very brief 2-4 word summary of this conversation that can be used as a title. Only respond with the title, nothing else.'
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          file: msg.file
        }))
      ];

      const response = await sendMessage(summaryRequest);
      const newTitle = response.message.content.trim();

      setChats(prev => prev.map(chat =>
        chat.id === chatId
          ? { ...chat, name: newTitle }
          : chat
      ));
    } catch (error) {
      console.error('Error generating chat summary:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isProcessing) return;

    let message: Message = {
      role: 'user',
      content: input.trim() || (selectedFile ? `Uploaded file: ${selectedFile.name}` : ''),
      timestamp: new Date()
    };

    if (selectedFile && fileContent) {
      message.file = {
        name: selectedFile.name,
        type: selectedFile.type,
        content: fileContent
      };
    }

    const updatedMessages = [...(currentChat?.messages || []), message];

    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: updatedMessages }
        : chat
    ));
    setInput('');
    setSelectedFile(null);
    setFileContent(null);
    setIsProcessing(true);

    try {
      const apiMessages: ApiMessage[] = [
        SYSTEM_MESSAGE,
        ...updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
          file: msg.file
        }))
      ];

      const response = await sendMessage(apiMessages);

      const aiMessage: Message = {
        role: 'assistant',
        content: response.message.content,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiMessage];

      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: finalMessages }
          : chat
      ));

      await updateChatName(currentChatId, finalMessages);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        timestamp: new Date(),
        error: true
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...updatedMessages, errorMessage] }
          : chat
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target?.result as string);
    };

    if (file.type.startsWith('text/')) {
      reader.readAsText(file);
    } else if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      setFileContent(null);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancelFileUpload = () => {
    setSelectedFile(null);
    setFileContent(null);
  };

  const renderFileContent = (file: Message['file']) => {
    if (!file) return null;

    if (file.type.startsWith('image/')) {
      return (
        <div className="mt-2">
          <img 
            src={file.content} 
            alt={file.name}
            className="max-w-full rounded-lg border border-white/10"
            style={{ maxHeight: '200px' }}
          />
        </div>
      );
    } else if (file.type.startsWith('text/')) {
      return (
        <div className="mt-2 p-3 bg-black/30 rounded-lg border border-white/10 font-mono text-sm overflow-x-auto">
          {file.content}
        </div>
      );
    }
    
    return null;
  };

  const startNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: 'New Chat',
      messages: [],
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1.5px)] bg-[length:24px_24px] animate-grid opacity-80" />
      <div className="fixed inset-0 bg-gradient-to-r from-[hsl(205_65%_35%)]/30 to-[hsl(183_31%_26%)]/30" />

      {isSidebarVisible && (
        <aside className="fixed md:sticky top-0 z-40 w-64 h-screen bg-black/90 backdrop-blur-xl border-r border-white/10 transition-transform duration-200">
          <div className="flex flex-col h-full">
            <div className="p-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsSidebarVisible(false)}
                  className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white/5 text-white rounded-lg border border-white/10 transition-all hover:border-white/20 button-glow"
                >
                  <PanelLeftClose className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white/5 text-white rounded-lg border border-white/10 transition-all hover:border-white/20 button-glow"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button
                    onClick={startNewChat}
                    className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white/5 text-white rounded-lg border border-white/10 transition-all hover:border-white/20 button-glow"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {isSearchOpen && (
                <div ref={searchRef} className="mt-2">
                  <div className="flex items-center bg-black/50 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                    <Search className="w-4 h-4 text-white/40 ml-3" />
                    <input
                      type="text"
                      placeholder="Search chats..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-white placeholder-white/40 px-3 py-2 outline-none text-sm"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
              {Object.entries(filteredAndGroupedChats).map(([group, groupChats]) => (
                <div key={group} className="space-y-1">
                  <h3 className="text-xs font-medium text-white/40 px-3 uppercase">{group}</h3>
                  {groupChats.map(chat => (
                    <div
                      key={chat.id}
                      className={`group relative flex items-center space-x-2 hover:bg-white/5 rounded-lg px-3 py-2 transition-colors cursor-pointer ${
                        currentChatId === chat.id ? 'bg-white/10' : ''
                      }`}
                      onClick={() => setCurrentChatId(chat.id)}
                    >
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
                            deleteChat(chat.id);
                          }}
                          className="p-1 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

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
      )}

      {!isSidebarVisible && (
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-white/5 text-white rounded-lg border border-white/10 transition-all hover:border-white/20 button-glow"
        >
          <PanelLeftClose className="w-5 h-5" />
        </button>
      )}

      <main className="relative flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto pt-8 pb-4 px-[13px] space-y-5">
            {currentChat?.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-3 max-w-[85%] w-fit">
                  {message.role === 'assistant' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.error ? 'bg-red-600' : 'bg-indigo-600'
                    }`}>
                      {message.error ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>
                  )}
                  <div className={`flex-1 break-words ${
                    message.role === 'user' 
                      ? 'bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-white border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                      : `text-white ${message.error ? 'text-red-400' : ''}`
                  } ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div className="overflow-wrap-anywhere whitespace-pre-wrap text-[15px]">{message.content}</div>
                    {message.file && renderFileContent(message.file)}
                    {message.role === 'assistant' && !message.error && (
                      <button
                        onClick={() => handleCopyMessage(message.content, `${index}`)}
                        className="flex items-center space-x-2 text-white/40 hover:text-white/60 transition-colors text-sm mt-2"
                      >
                        {copiedMessageId === `${index}` ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <p className="text-[15px] text-white">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="px-3 pb-2">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            {selectedFile && (
              <div className="mb-2 p-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleCancelFileUpload}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {fileContent && selectedFile.type.startsWith('image/') && (
                  <img
                    src={fileContent}
                    alt="Preview"
                    className="mt-2 max-h-32 rounded-lg"
                  />
                )}
              </div>
            )}
            <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Message CYANIS..."
                className="w-full bg-transparent text-white placeholder-white/40 py-4 px-[53px] min-h-[24px] max-h-[240px] custom-scrollbar resize-none overflow-wrap-anywhere outline-none rounded-2xl"
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
                className="absolute left-3 bottom-3 w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-5 h-5 text-white/60" />
              </button>
              
              <button
                type="submit"
                disabled={!input.trim() && !selectedFile || isProcessing}
                className="absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center bg-white hover:bg-white/90 disabled:bg-white/5 disabled:cursor-not-allowed rounded-full transition-all"
              >
                <ArrowUp className="w-4 h-4 text-black" />
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
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default Agent;