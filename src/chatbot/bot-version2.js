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
    Search,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';

const GREETING_NAME = 'Mr. Khun';

const BotVersion2 = ({ onClose, moduleContext, onVersionChange, currentVersion = 'yai2' }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
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
        { text: 'Planning Status', highlight: true },
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
        
        if (lowerInput.includes('planning status') || (lowerInput.includes('planning') && lowerInput.includes('status'))) {
            return `⚠️ Planning Status Alert\n\n🔴 Please check the following delay alerts:\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📋 Alert Details:\n\n  • Order #7796: Material Delay\n  • Order #8486: Shipment Alert\n  • Order #445: Fabric Reject\n  • Order #8689: PPC Meeting - Critical Issue\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n⏰ Action Required:\n  Immediate attention needed for these items.\n\n  Please review each alert and take appropriate action.`;
        }
        
        if (lowerInput.includes('planning') || lowerInput.includes('platform')) {
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

    // Prevent body scroll when this component is mounted
    useEffect(() => {
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyHeight = document.body.style.height;
        const originalHtmlHeight = document.documentElement.style.height;
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.documentElement.style.height = '100vh';
        
        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.height = originalBodyHeight;
            document.documentElement.style.height = originalHtmlHeight;
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 z-[200] flex overflow-hidden bg-[#050505] text-white" 
            style={{ 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                width: '100vw', 
                height: '100vh',
                position: 'fixed',
                zIndex: 200
            }}
        >
            {/* Solar System Animation - Beautiful & Professional */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden w-full h-full z-10">
                <style>{`
                    @keyframes orbitMercury {
                        from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
                    }
                    @keyframes orbitVenus {
                        from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
                    }
                    @keyframes orbitEarth {
                        from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
                    }
                    @keyframes orbitMars {
                        from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
                    }
                    @keyframes orbitJupiter {
                        from { transform: rotate(0deg) translateX(260px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(260px) rotate(-360deg); }
                    }
                    @keyframes orbitSaturn {
                        from { transform: rotate(0deg) translateX(320px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(320px) rotate(-360deg); }
                    }
                    @keyframes orbitMoon {
                        from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
                        to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
                    }
                    @keyframes sunPulse {
                        0%, 100% { opacity: 0.6; transform: scale(1); }
                        50% { opacity: 0.9; transform: scale(1.05); }
                    }
                    @keyframes starTwinkle {
                        0%, 100% { opacity: 0.6; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.3); }
                    }
                    @keyframes planetRotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .orbit-mercury { animation: orbitMercury 8s linear infinite; }
                    .orbit-venus { animation: orbitVenus 12s linear infinite; }
                    .orbit-earth { animation: orbitEarth 16s linear infinite; }
                    .orbit-mars { animation: orbitMars 20s linear infinite; }
                    .orbit-jupiter { animation: orbitJupiter 30s linear infinite; }
                    .orbit-saturn { animation: orbitSaturn 40s linear infinite; }
                    .orbit-moon { animation: orbitMoon 2s linear infinite; }
                    .sun-pulse { animation: sunPulse 4s ease-in-out infinite; }
                    .star-twinkle { animation: starTwinkle 3s ease-in-out infinite; }
                    .planet-rotate { animation: planetRotate 10s linear infinite; }
                `}</style>
                
                {/* Background Stars */}
                <div className="absolute inset-0 w-full h-full">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className="absolute w-1.5 h-1.5 bg-white rounded-full star-twinkle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
                
                {/* Solar System Container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                    
                    {/* Central Sun */}
                    <div className="relative z-10">
                        {/* Sun Glow Layers */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/70 via-orange-400/60 to-red-400/50 blur-3xl sun-pulse"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/60 via-orange-300/50 to-red-300/40 blur-2xl"></div>
                        {/* Sun Core */}
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-yellow-400 shadow-[0_0_40px_rgba(251,191,36,1)] border-2 border-yellow-200/80">
                            {/* Sun Surface Texture */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/50 to-orange-400/30"></div>
                            <div className="absolute top-2 left-3 w-1 h-1 bg-yellow-200 rounded-full"></div>
                            <div className="absolute bottom-3 right-2 w-1 h-1 bg-orange-300 rounded-full"></div>
                            <div className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-yellow-100 rounded-full"></div>
                        </div>
                    </div>
                    
                    {/* Mercury - Closest Planet */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-mercury">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-[0_0_15px_rgba(156,163,175,0.9)] border border-gray-400/70"></div>
                    </div>
                    
                    {/* Venus */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-venus">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-100 to-orange-200 shadow-[0_0_18px_rgba(251,191,36,0.8)] border border-yellow-200/70"></div>
                    </div>
                    
                    {/* Earth with Moon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-earth">
                        <div className="relative">
                            {/* Earth */}
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-300 via-green-300 to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)] border border-blue-200/70 relative overflow-hidden">
                                {/* Earth Continents */}
                                <div className="absolute top-1 left-1 w-2 h-1.5 bg-green-400 rounded-full"></div>
                                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            </div>
                            {/* Moon Orbiting Earth */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-moon">
                                <div className="w-2 h-2 rounded-full bg-gray-200 shadow-[0_0_8px_rgba(209,213,219,1)]"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mars */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-mars">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-300 to-orange-400 shadow-[0_0_18px_rgba(239,68,68,0.9)] border border-red-200/70"></div>
                    </div>
                    
                    {/* Jupiter - Gas Giant */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-jupiter">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-300 shadow-[0_0_25px_rgba(251,191,36,0.8)] border-2 border-orange-100/60 relative overflow-hidden">
                            {/* Jupiter Bands */}
                            <div className="absolute top-1 left-0 right-0 h-0.5 bg-orange-300/80"></div>
                            <div className="absolute top-3 left-0 right-0 h-0.5 bg-yellow-200/80"></div>
                            <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-orange-300/80"></div>
                            {/* Great Red Spot */}
                            <div className="absolute top-2 right-1 w-2 h-1.5 rounded-full bg-red-400/90"></div>
                        </div>
                    </div>
                    
                    {/* Saturn with Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-saturn">
                        <div className="relative">
                            {/* Saturn Planet */}
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-yellow-100/70 relative z-10">
                                {/* Saturn Bands */}
                                <div className="absolute top-1 left-0 right-0 h-0.5 bg-yellow-200/80"></div>
                                <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-orange-200/80"></div>
                            </div>
                            {/* Saturn Rings */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-2 rounded-full bg-gradient-to-r from-transparent via-yellow-100/60 to-transparent border border-yellow-200/50 shadow-[0_0_12px_rgba(251,191,36,0.5)]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent"></div>
                        </div>
                    </div>
                    
                    {/* Orbital Paths - More Visible */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border border-white/15 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-white/15 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border border-white/15 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/15 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-white/15 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] border border-white/15 rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Sidebar - Chat History */}
            <div className={`fixed left-0 z-50 w-80 bg-[#050505] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
                isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
            }`} style={{ top: '120px', bottom: '0', height: 'calc(100vh - 120px)' }}>
                <div className="flex flex-col h-full w-full">
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
            <div className="flex-1 flex flex-col overflow-hidden w-full h-full min-h-0 flex-shrink relative z-20 pt-4">
                {/* Header with Bot Name and Avatar */}
                <div className="flex-shrink-0 flex flex-col px-4 sm:px-6 py-3 border-b border-white/10 bg-[#050505]/80 backdrop-blur-sm w-full h-auto relative z-30">
                    <style>{`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-10px) rotate(5deg); }
                        }
                        @keyframes pulse-glow {
                            0%, 100% { 
                                box-shadow: 0 0 20px rgba(59, 130, 246, 0.5),
                                           0 0 40px rgba(139, 92, 246, 0.3),
                                           0 0 60px rgba(59, 130, 246, 0.2);
                            }
                            50% { 
                                box-shadow: 0 0 30px rgba(59, 130, 246, 0.8),
                                           0 0 60px rgba(139, 92, 246, 0.5),
                                           0 0 90px rgba(59, 130, 246, 0.3);
                            }
                        }
                        @keyframes rotate-ring {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes sparkle {
                            0%, 100% { opacity: 0; transform: scale(0); }
                            50% { opacity: 1; transform: scale(1); }
                        }
                        .bot-icon-container-v2 {
                            position: relative;
                            animation: float 3s ease-in-out infinite;
                        }
                        .bot-icon-glow-v2 {
                            animation: pulse-glow 2s ease-in-out infinite;
                        }
                        .rotating-ring-v2 {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 72px;
                            height: 72px;
                            border: 2px solid transparent;
                            border-top-color: rgba(59, 130, 246, 0.6);
                            border-right-color: rgba(139, 92, 246, 0.6);
                            border-radius: 50%;
                            animation: rotate-ring 3s linear infinite;
                            pointer-events: none;
                        }
                        .rotating-ring-2-v2 {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 80px;
                            height: 80px;
                            border: 2px solid transparent;
                            border-bottom-color: rgba(139, 92, 246, 0.4);
                            border-left-color: rgba(59, 130, 246, 0.4);
                            border-radius: 50%;
                            animation: rotate-ring 4s linear infinite reverse;
                            pointer-events: none;
                        }
                        .sparkle-v2 {
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            background: white;
                            border-radius: 50%;
                            animation: sparkle 2s ease-in-out infinite;
                        }
                        .sparkle-1-v2 { top: 10%; left: 20%; animation-delay: 0s; }
                        .sparkle-2-v2 { top: 20%; right: 15%; animation-delay: 0.5s; }
                        .sparkle-3-v2 { bottom: 15%; left: 25%; animation-delay: 1s; }
                        .sparkle-4-v2 { bottom: 10%; right: 20%; animation-delay: 1.5s; }
                    `}</style>
                    
                    {/* Yai Data with Dropdown - First Row */}
                    <div className="flex items-center gap-4 mb-3 pointer-events-none relative">
                        {/* Back Button */}
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 pointer-events-auto z-50 shadow-lg hover:shadow-xl group"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft size={18} className="text-white drop-shadow-lg group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="text-white font-medium text-sm drop-shadow-lg">Back</span>
                        </button>
                        <div className={`relative ${isDropdownOpen ? '' : 'bot-icon-container-v2'} pointer-events-auto`}>
                            {/* Rotating Rings - Only show when dropdown is closed */}
                            {!isDropdownOpen && (
                                <>
                                    <div className="rotating-ring-v2"></div>
                                    <div className="rotating-ring-2-v2"></div>
                                    
                                    {/* Sparkles - Only show when dropdown is closed */}
                                    <div className="sparkle-v2 sparkle-1-v2"></div>
                                    <div className="sparkle-v2 sparkle-2-v2"></div>
                                    <div className="sparkle-v2 sparkle-3-v2"></div>
                                    <div className="sparkle-v2 sparkle-4-v2"></div>
                                </>
                            )}
                            
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className={`relative rounded-full hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 z-10 pointer-events-auto ${isDropdownOpen ? '' : 'bot-icon-glow-v2'}`}
                                aria-label="Yai Data"
                            >
                                <img 
                                    src="/assets/modules-image/chatbot.png" 
                                    alt="Yai Data" 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/50 relative z-10" 
                                />
                                {/* Gradient Overlay - Only show when dropdown is closed */}
                                {!isDropdownOpen && (
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-purple-500/20 mix-blend-screen pointer-events-none"></div>
                                )}
                            </button>
                        </div>
                        <span className={`text-white font-bold text-lg tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent pointer-events-auto ${isDropdownOpen ? '' : 'animate-pulse'}`}>
                            Yai Data
                        </span>
                        
                        {/* Dropdown Menu */}
                        {isDropdownOpen && onVersionChange && (
                            <div className="absolute top-full mt-2 left-0 w-72 bg-slate-800/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[60] pointer-events-auto">
                                <ul className="p-2">
                                    <li 
                                        onClick={() => {
                                            onVersionChange('yai1');
                                            setDropdownOpen(false);
                                        }}
                                        className="relative flex items-center justify-between gap-4 px-4 py-3 rounded-md hover:bg-orange-500/10 cursor-pointer group transition-all border border-transparent hover:border-orange-500/30"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src="assets/modules-image/yai1.png" 
                                                alt="Yai 1" 
                                                className="w-14 h-14 rounded-full object-cover border-2 border-orange-400/50 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] flex-shrink-0" 
                                            />
                                            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent font-bold text-lg drop-shadow-[0_0_4px_rgba(251,146,60,0.4)] whitespace-nowrap">Yai 1</span>
                                        </div>
                                        <ChevronRight size={20} className="text-orange-400/70 group-hover:text-orange-300 transition-colors flex-shrink-0" />
                                    </li>
                                    <li 
                                        onClick={() => {
                                            onVersionChange('yai2');
                                            setDropdownOpen(false);
                                        }}
                                        className="relative flex items-center justify-between gap-4 px-4 py-3 rounded-md hover:bg-gray-500/10 cursor-pointer group transition-all border border-transparent hover:border-gray-500/30"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src="assets/modules-image/yai2.png" 
                                                alt="Yai 2" 
                                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-400/50 drop-shadow-[0_0_8px_rgba(156,163,175,0.6)] flex-shrink-0" 
                                            />
                                            <span className="bg-gradient-to-r from-gray-400 via-slate-400 to-gray-500 bg-clip-text text-transparent font-bold text-lg drop-shadow-[0_0_4px_rgba(156,163,175,0.4)] whitespace-nowrap">Yai 2</span>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-400/70 group-hover:text-gray-300 transition-colors flex-shrink-0" />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    {/* Overlay to close dropdown when clicking outside */}
                    {isDropdownOpen && (
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setDropdownOpen(false)}
                        />
                    )}
                    
                    {/* Second Row: Menu buttons and Bot Info */}
                    <div className="flex items-center justify-between relative">
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
                                className="px-3 py-1.5 rounded-full hover:bg-white/10 transition text-xs font-medium text-white/70"
                                title="Menu"
                            >
                                Menu
                            </button>
                        </div>
                        {/* Bot Avatar and Name - Centered */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center border-2 border-white/20 shadow-md">
                                <Database size={18} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white/90">Yai 2</span>
                                <span className="text-xs text-white/60 hidden sm:block">Website Assistant</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-8 bg-[#050505]/60 backdrop-blur-sm relative z-20 min-h-0 w-full flex-shrink">
                    {!hasMessages ? (
                        // Welcome Screen
                        <div className="space-y-6 pt-8 max-w-3xl mx-auto relative z-20">
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
                        <div className="space-y-4 max-w-3xl mx-auto relative z-20">
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
                                            className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
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
                <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-white/10 bg-[#050505] w-full">
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
