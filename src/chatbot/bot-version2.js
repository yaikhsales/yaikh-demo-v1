import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    Send,
    Sparkles,
    Plus,
    Grid3x3,
    Mic,
    Copy,
    Edit2,
    RefreshCw,
    MoreVertical,
    Database,
    Menu,
    Clock,
    Trash2,
    Search
} from 'lucide-react';

const GREETING_NAME = 'Mr. Khun';

const BotVersion2 = ({ onClose, moduleContext }) => {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    
    // Chat history state
    const [chatHistory, setChatHistory] = useState(() => {
        const saved = localStorage.getItem('yai2-chat-history');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentChatId, setCurrentChatId] = useState(null);
    
    // Website-related suggested actions
    const suggestedActions = [
        { text: 'Tell me about this website', highlight: true },
        { text: 'What modules are available?' },
        { text: 'How to navigate the dashboard' },
        { text: 'Show website features' },
        { text: 'Explain the system architecture' }
    ];

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Load chat history from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('yai2-chat-history');
        if (saved) {
            setChatHistory(JSON.parse(saved));
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    useEffect(() => {
        if (chatHistory.length > 0) {
            localStorage.setItem('yai2-chat-history', JSON.stringify(chatHistory));
        }
    }, [chatHistory]);

    // Save current chat when messages change
    useEffect(() => {
        if (messages.length > 0 && currentChatId) {
            updateChatInHistory(currentChatId, messages);
        }
    }, [messages, currentChatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const createNewChat = () => {
        const newChatId = Date.now().toString();
        const newChat = {
            id: newChatId,
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChatId);
        setMessages([]);
        setInput('');
    };

    const updateChatInHistory = (chatId, newMessages) => {
        setChatHistory(prev => prev.map(chat => {
            if (chat.id === chatId) {
                const firstUserMessage = newMessages.find(m => m.from === 'user');
                return {
                    ...chat,
                    messages: newMessages,
                    title: firstUserMessage?.text?.substring(0, 50) || 'New Chat',
                    updatedAt: new Date().toISOString()
                };
            }
            return chat;
        }));
    };

    const loadChat = (chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages(chat.messages);
            setIsHistoryOpen(false);
        }
    };

    const deleteChat = (chatId, e) => {
        e.stopPropagation();
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
        if (currentChatId === chatId) {
            setCurrentChatId(null);
            setMessages([]);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        // Create new chat if none exists
        if (!currentChatId) {
            createNewChat();
            const newChatId = Date.now().toString();
            setCurrentChatId(newChatId);
        }
        
        const userMessage = { from: 'user', text: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        // Generate website-related response
        setTimeout(() => {
            const botResponse = generateWebsiteResponse(input.trim());
            const updatedMessages = [...newMessages, { from: 'bot', text: botResponse }];
            setMessages(updatedMessages);
            
            // Update chat history
            if (currentChatId) {
                updateChatInHistory(currentChatId, updatedMessages);
            }
            setIsTyping(false);
        }, 1000 + Math.random() * 500);
    };

    const generateWebsiteResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('website') || lowerInput.includes('site') || lowerInput.includes('platform')) {
            return `This is the Yaikh Dashboard - a comprehensive enterprise management platform. It provides various modules for different departments including Finance, Admin, CSR, PPC, Productions, YTM, PD, Sales, QMS, and Social Media management. The platform offers real-time analytics, workflow automation, and integrated tools for efficient business operations.`;
        }
        
        if (lowerInput.includes('module') || lowerInput.includes('feature')) {
            return `The platform includes multiple modules: Finance Bot for financial management, Admin Bot for operations, CSR Bot for corporate responsibility, PPC Bot for marketing campaigns, Productions Bot for manufacturing, YTM Bot for yield tracking, PD Bot for product development, Sale Bot for sales management, QMS Bot for quality control, and Social Bot for social media. Each module is designed to streamline specific business processes.`;
        }
        
        if (lowerInput.includes('navigate') || lowerInput.includes('use') || lowerInput.includes('how')) {
            return `To navigate the dashboard: Click on any module card to access its features. Use the search bar to find specific modules quickly. The chatbot icon (Yai 2) provides AI assistance - Yai 1 shows multiple specialized bots, while Yai 2 provides a single comprehensive assistant. Each module has its own interface tailored to its specific function.`;
        }
        
        if (lowerInput.includes('architecture') || lowerInput.includes('system') || lowerInput.includes('structure')) {
            return `The system architecture is built on a modern tech stack with React for the frontend, providing a responsive and interactive user experience. It features modular design allowing each department to have specialized tools. The platform supports real-time data updates, secure authentication, and scalable infrastructure to handle enterprise-level operations efficiently.`;
        }
        
        if (lowerInput.includes('feature') || lowerInput.includes('capability')) {
            return `Key features include: Multi-module dashboard, AI-powered chatbots (Yai 2), Real-time analytics and reporting, Workflow automation, Task management, Document management, Integration capabilities, Role-based access control, Mobile-responsive design, and Customizable modules for different business needs.`;
        }
        
        // Default response
        return `I'm here to help you understand and navigate the Yaikh Dashboard platform. You can ask me about the website features, available modules, how to use the system, or any specific questions about the platform's capabilities. What would you like to know?`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    const handleSuggestionClick = (actionText) => {
        if (!currentChatId) {
            createNewChat();
            const newChatId = Date.now().toString();
            setCurrentChatId(newChatId);
        }
        
        const userMessage = { from: 'user', text: actionText };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = generateWebsiteResponse(actionText);
            const updatedMessages = [...newMessages, { from: 'bot', text: botResponse }];
            setMessages(updatedMessages);
            
            if (currentChatId) {
                updateChatInHistory(currentChatId, updatedMessages);
            }
            setIsTyping(false);
        }, 1000 + Math.random() * 500);
    };

    const handleNewChat = () => {
        createNewChat();
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="fixed inset-0 z-[200] flex overflow-hidden bg-[#050505] text-white">
            {/* Sidebar - Chat History */}
            <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#050505] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
                isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h2 className="text-lg font-semibold">Chat History</h2>
                        <button
                            onClick={() => setIsHistoryOpen(false)}
                            className="p-2 rounded-full hover:bg-white/10 transition"
                        >
                            <X size={20} className="text-white/70" />
                        </button>
                    </div>
                    
                    {/* New Chat Button */}
                    <div className="p-4 border-b border-white/10">
                        <button
                            onClick={handleNewChat}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition"
                        >
                            <Plus size={18} className="text-white/70" />
                            <span className="text-sm text-white">New Chat</span>
                        </button>
                    </div>
                    
                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto">
                        {chatHistory.length === 0 ? (
                            <div className="p-4 text-center text-white/50 text-sm">
                                No chat history yet
                            </div>
                        ) : (
                            <div className="p-2">
                                {chatHistory.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => loadChat(chat.id)}
                                        className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/5 transition ${
                                            currentChatId === chat.id ? 'bg-white/10' : ''
                                        }`}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white/90 truncate">{chat.title}</p>
                                            <p className="text-xs text-white/50 mt-1">
                                                {new Date(chat.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => deleteChat(chat.id, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-white/10 transition"
                                        >
                                            <Trash2 size={14} className="text-white/50" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay when sidebar is open */}
            {isHistoryOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsHistoryOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header with Bot Name and Avatar */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#050505]">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsHistoryOpen(true)}
                            className="p-2 rounded-full hover:bg-white/10 transition"
                            title="Chat history"
                        >
                            <Menu size={20} className="text-white/70" />
                        </button>
                        <button 
                            onClick={handleNewChat}
                            className="p-2 rounded-full hover:bg-white/10 transition"
                            title="New chat"
                        >
                            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    {/* Bot Avatar and Name */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center border-2 border-white/20 shadow-md">
                            <Database size={18} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white/90">Yai 2</span>
                            <span className="text-xs text-white/60 hidden sm:block">Website Assistant</span>
                        </div>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition"
                        title="Close"
                    >
                        <X size={20} className="text-white/70" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 bg-[#050505]">
                    {!hasMessages ? (
                        // Welcome Screen
                        <div className="space-y-6 pt-8 max-w-3xl mx-auto">
                            <div>
                                <p className="text-sm text-white/70 mb-2">Hi {GREETING_NAME}</p>
                                <h2 className="text-3xl font-light leading-tight text-white">Where should we start?</h2>
                            </div>
                            <div className="flex flex-col gap-2 mt-8">
                                {suggestedActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(action.text)}
                                        className="text-left px-5 py-3 rounded-full bg-white/10 border border-white/15 text-sm text-white hover:bg-white/15 transition flex items-center gap-2"
                                    >
                                        {action.highlight && <Sparkles size={16} className="text-yellow-400" />}
                                        {action.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Messages Display
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start gap-3 group ${
                                        msg.from === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    {msg.from === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center flex-shrink-0">
                                            <Database size={16} className="text-white" />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1 max-w-[85%]">
                                        <div
                                            className={`rounded-2xl px-4 py-2.5 text-sm ${
                                                msg.from === 'user'
                                                    ? 'bg-blue-500 text-white rounded-br-none'
                                                    : 'bg-white/5 border border-white/10 text-white rounded-bl-none'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                        {msg.from === 'bot' && (
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity px-1">
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(msg.text);
                                                    }}
                                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                                    title="Copy"
                                                >
                                                    <Copy size={14} className="text-white/70" />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={14} className="text-white/70" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleSuggestionClick(msg.text);
                                                    }}
                                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                                    title="Regenerate"
                                                >
                                                    <RefreshCw size={14} className="text-white/70" />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                                    title="More"
                                                >
                                                    <MoreVertical size={14} className="text-white/70" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {msg.from === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-semibold text-white">U</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center flex-shrink-0">
                                        <Database size={16} className="text-white" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Field with Thinking Status */}
                <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-white/10 bg-[#050505]">
                    <form onSubmit={handleSend} className="relative max-w-3xl mx-auto">
                        <div className="flex items-center px-4 py-3 rounded-full border border-white/15 bg-white/5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <button
                                type="button"
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors mr-2"
                            >
                                <Plus size={18} className="text-white/70" />
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about the website..."
                                className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-white/50 text-base"
                            />
                            {!input.trim() && (
                                <>
                                    <span className="text-xs text-white/50 mr-2">{isTyping ? 'Thinking' : 'Fast'}</span>
                                    <button
                                        type="button"
                                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-2"
                                    >
                                        <Grid3x3 size={18} className="text-white/70" />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-2"
                                    >
                                        <Mic size={18} className="text-white/70" />
                                    </button>
                                </>
                            )}
                            {input.trim() && (
                                <button
                                    type="submit"
                                    className="p-1.5 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors ml-2"
                                >
                                    <Send size={18} className="text-white" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BotVersion2;
