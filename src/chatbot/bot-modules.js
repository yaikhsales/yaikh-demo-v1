import React, { useState, useRef, useEffect } from 'react';
import {
    X, Plus, Grid3x3, Mic, Send, Sparkles,
    Wallet, UserCog, HeartHandshake, Megaphone, Factory,
    BarChart3, Lightbulb, Handshake, ClipboardCheck, MessageCircle,
    Copy, Edit2, RefreshCw, ThumbsUp, ThumbsDown, MoreVertical,
    Menu, Trash2
} from 'lucide-react';

// Predefined 10 bots for each moduleContext
const PREDEFINED_BOTS = [
    {
        id: 'finance-bot',
        name: 'Finance PA',
        description: 'AI assistant for financial management, budgeting, and accounting',
        icon: Wallet,
        bgGradient: 'from-green-500 to-emerald-500',
        lightBg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
        lightAccent: 'from-green-200 to-emerald-200',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        suggestedActions: [
            { text: 'Analyze budget report', highlight: true },
            { text: 'Create financial forecast' },
            { text: 'Review expenses' },
            { text: 'Generate invoice' },
            { text: 'Calculate ROI' }
        ]
    },
    {
        id: 'admin-bot',
        name: 'Admin PA',
        description: 'Administrative assistant for daily operations and management',
        icon: UserCog,
        bgGradient: 'from-blue-500 to-cyan-500',
        lightBg: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50',
        lightAccent: 'from-blue-200 to-cyan-200',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-200',
        suggestedActions: [
            { text: 'Schedule meeting', highlight: true },
            { text: 'Manage tasks' },
            { text: 'Generate report' },
            { text: 'Update policies' },
            { text: 'Organize documents' }
        ]
    },
    {
        id: 'csr-bot',
        name: 'CSR PA',
        description: 'Corporate social responsibility and sustainability assistant',
        icon: HeartHandshake,
        bgGradient: 'from-purple-500 to-pink-500',
        lightBg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50',
        lightAccent: 'from-purple-200 to-pink-200',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-200',
        suggestedActions: [
            { text: 'Plan CSR event', highlight: true },
            { text: 'Track sustainability goals' },
            { text: 'Create impact report' },
            { text: 'Find volunteer opportunities' },
            { text: 'Measure social impact' }
        ]
    },
    {
        id: 'ppc-bot',
        name: 'PPC PA',
        description: 'Pay-per-click and digital marketing campaign assistant',
        icon: Megaphone,
        bgGradient: 'from-orange-500 to-red-500',
        lightBg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
        lightAccent: 'from-orange-200 to-amber-200',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-200',
        suggestedActions: [
            { text: 'Create ad campaign', highlight: true },
            { text: 'Analyze ad performance' },
            { text: 'Optimize keywords' },
            { text: 'Set budget strategy' },
            { text: 'Generate ad copy' }
        ]
    },
    {
        id: 'productions-bot',
        name: 'Productions PA',
        description: 'Production planning and manufacturing operations assistant',
        icon: Factory,
        bgGradient: 'from-indigo-500 to-blue-500',
        lightBg: 'bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50',
        lightAccent: 'from-indigo-200 to-blue-200',
        textColor: 'text-indigo-800',
        borderColor: 'border-indigo-200',
        suggestedActions: [
            { text: 'Plan production schedule', highlight: true },
            { text: 'Track inventory levels' },
            { text: 'Optimize workflow' },
            { text: 'Monitor quality metrics' },
            { text: 'Generate production report' }
        ]
    },
    {
        id: 'ytm-bot',
        name: 'YTM PA',
        description: 'YTM (Yield to Maturity) and production tracking assistant',
        icon: BarChart3,
        bgGradient: 'from-teal-500 to-cyan-500',
        lightBg: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50',
        lightAccent: 'from-teal-200 to-cyan-200',
        textColor: 'text-teal-800',
        borderColor: 'border-teal-200',
        suggestedActions: [
            { text: 'Calculate yield metrics', highlight: true },
            { text: 'Track production yield' },
            { text: 'Analyze efficiency' },
            { text: 'Identify bottlenecks' },
            { text: 'Generate yield report' }
        ]
    },
    {
        id: 'pd-bot',
        name: 'PD PA',
        description: 'Product development and design innovation assistant',
        icon: Lightbulb,
        bgGradient: 'from-amber-500 to-yellow-500',
        lightBg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-lime-50',
        lightAccent: 'from-amber-200 to-yellow-200',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-200',
        suggestedActions: [
            { text: 'Create product roadmap', highlight: true },
            { text: 'Design new feature' },
            { text: 'Review product specs' },
            { text: 'Analyze user feedback' },
            { text: 'Plan product launch' }
        ]
    },
    {
        id: 'sale-bot',
        name: 'Sale PA',
        description: 'Sales management and customer relationship assistant',
        icon: Handshake,
        bgGradient: 'from-rose-500 to-pink-500',
        lightBg: 'bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50',
        lightAccent: 'from-rose-200 to-pink-200',
        textColor: 'text-rose-800',
        borderColor: 'border-rose-200',
        suggestedActions: [
            { text: 'Track sales pipeline', highlight: true },
            { text: 'Create sales forecast' },
            { text: 'Analyze customer data' },
            { text: 'Generate proposal' },
            { text: 'Follow up with leads' }
        ]
    },
    {
        id: 'qms-bot',
        name: 'QMS PA',
        description: 'Quality management system and compliance assistant',
        icon: ClipboardCheck,
        bgGradient: 'from-violet-500 to-purple-500',
        lightBg: 'bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50',
        lightAccent: 'from-violet-200 to-purple-200',
        textColor: 'text-violet-800',
        borderColor: 'border-violet-200',
        suggestedActions: [
            { text: 'Run quality audit', highlight: true },
            { text: 'Check compliance status' },
            { text: 'Generate quality report' },
            { text: 'Update procedures' },
            { text: 'Track quality metrics' }
        ]
    },
    {
        id: 'social-bot',
        name: 'Social PA',
        description: 'Social media management and engagement assistant',
        icon: MessageCircle,
        bgGradient: 'from-sky-500 to-blue-500',
        lightBg: 'bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50',
        lightAccent: 'from-sky-200 to-blue-200',
        textColor: 'text-sky-800',
        borderColor: 'border-sky-200',
        suggestedActions: [
            { text: 'Create social post', highlight: true },
            { text: 'Schedule content' },
            { text: 'Analyze engagement' },
            { text: 'Respond to comments' },
            { text: 'Plan content calendar' }
        ]
    }
];

const GREETING_NAME = 'Mr. Khun';

// Phone Frame Component with Gemini Chatbot Inside
const PhoneFrame = ({
    bot,
    messages,
    onSendMessage,
    inputValue,
    setInputValue,
    isTyping,
    onNewChat,
    chatHistory,
    onLoadChat,
    onDeleteChat,
    currentChatId
}) => {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const suggestedActions = bot.suggestedActions || [
        { text: 'Create image', highlight: true },
        { text: 'Create video' },
        { text: 'Write anything' },
        { text: 'Help me learn' },
        { text: 'Boost my day' }
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSendMessage(inputValue.trim());
        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="relative w-full h-full flex items-stretch justify-center">
            {/* Phone Frame */}
            <div className="relative mx-auto bg-gray-900 rounded-[3rem] p-2 shadow-2xl phone-frame flex-shrink-0 w-full h-full">
                    {/* Phone Screen */}
                <div className={`w-full h-full ${bot.lightBg || 'bg-gradient-to-br from-slate-50 to-gray-50'} rounded-[2.5rem] overflow-hidden relative flex flex-col shadow-2xl border-2 ${bot.borderColor || 'border-gray-200'}`}>
                    {/* Notch */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 ${bot.lightBg || 'bg-gradient-to-br from-slate-50 to-gray-50'} rounded-b-2xl z-20`}></div>

                    {/* Gemini Chatbot Interface */}
                    <div className={`flex flex-col h-full min-h-0 ${bot.lightBg || 'bg-gradient-to-br from-slate-50 to-gray-50'} ${bot.textColor || 'text-gray-800'} relative`}>
                        {/* History Sidebar */}
                        <div className={`absolute inset-y-0 left-0 z-50 w-64 ${bot.lightBg || 'bg-gradient-to-br from-slate-50 to-gray-50'} border-r ${bot.borderColor || 'border-gray-200'} transform transition-transform duration-300 ease-in-out ${isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}>
                            <div className="flex flex-col h-full">
                                {/* Sidebar Header */}
                                <div className={`flex items-center justify-between p-4 border-b ${bot.borderColor || 'border-gray-200'}`}>
                                    <h2 className={`text-sm font-semibold ${bot.textColor || 'text-gray-800'}`}>Chat History</h2>
                                    <button
                                        onClick={() => setIsHistoryOpen(false)}
                                        className={`p-1.5 rounded-full hover:bg-black/5 transition`}
                                    >
                                        <X size={16} className={bot.textColor || 'text-gray-600'} />
                                    </button>
                                </div>

                                {/* New Chat Button */}
                                <div className={`p-3 border-b ${bot.borderColor || 'border-gray-200'}`}>
                                    <button
                                        onClick={() => {
                                            if (onNewChat) onNewChat();
                                            setIsHistoryOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r ${bot.lightAccent || 'from-gray-100 to-gray-200'} border ${bot.borderColor || 'border-gray-200'} hover:opacity-80 transition shadow-sm`}
                                    >
                                        <Plus size={14} className={bot.textColor || 'text-gray-700'} />
                                        <span className={`text-xs font-medium ${bot.textColor || 'text-gray-700'}`}>New Chat</span>
                                    </button>
            </div>

                                {/* Chat List */}
                                <div className="flex-1 overflow-y-auto">
                                    {chatHistory && chatHistory.length === 0 ? (
                                        <div className={`p-4 text-center ${bot.textColor || 'text-gray-500'} text-xs`}>
                                            No chat history yet
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            {chatHistory && chatHistory.map((chat) => (
                                                <div
                                                    key={chat.id}
                                                    onClick={() => {
                                                        if (onLoadChat) onLoadChat(chat.id);
                                                        setIsHistoryOpen(false);
                                                    }}
                                                    className={`group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-black/5 transition ${currentChatId === chat.id ? `bg-gradient-to-r ${bot.lightAccent || 'from-gray-100 to-gray-200'}` : ''
                                                        }`}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-xs ${bot.textColor || 'text-gray-800'} font-medium truncate`}>{chat.title}</p>
                                                        <p className={`text-[10px] ${bot.textColor || 'text-gray-500'} mt-0.5`}>
                                                            {new Date(chat.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (onDeleteChat) onDeleteChat(chat.id);
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-100 transition"
                                                    >
                                                        <Trash2 size={12} className="text-red-500" />
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
                                className="absolute inset-0 bg-black/20 z-40"
                                onClick={() => setIsHistoryOpen(false)}
                            />
                        )}

                        {/* Header with Bot Name and Avatar */}
                        <div className={`flex-shrink-0 flex items-center justify-between px-4 pt-12 pb-3 border-b ${bot.borderColor || 'border-gray-200'} relative z-10`}>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsHistoryOpen(true)}
                                    className={`p-2 rounded-full hover:bg-black/5 transition`}
                                    title="Chat history"
                                >
                                    <Menu size={18} className={bot.textColor || 'text-gray-600'} />
                                </button>
                                <button
                                    onClick={() => {
                                        setInputValue('');
                                        if (onNewChat) onNewChat();
                                    }}
                                    className={`p-2 rounded-full hover:bg-black/5 transition`}
                                    title="New chat"
                                >
                                    <svg className={`w-5 h-5 ${bot.textColor || 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                            {/* Bot Name - Centered */}
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <span className={`text-sm font-semibold ${bot.textColor || 'text-gray-800'}`}>{bot.name}</span>
                            </div>
                            {/* Bot Avatar - Right Side */}
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${bot.bgGradient} flex items-center justify-center border-2 border-white/20 shadow-md`}>
                                <bot.icon size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8 min-h-0">
                            {!hasMessages ? (
                                // Welcome Screen
                                <div className="space-y-6 pt-8">
                                    <div>
                                        <p className={`text-sm ${bot.textColor || 'text-gray-600'} mb-2`}>Hi {GREETING_NAME}</p>
                                        <h2 className={`text-3xl font-light leading-tight ${bot.textColor || 'text-gray-800'}`}>Where should we start?</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-8">
                                        {suggestedActions.map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => onSendMessage(action.text)}
                                                className={`text-left px-5 py-3 rounded-full bg-gradient-to-r ${bot.lightAccent || 'from-gray-100 to-gray-200'} border ${bot.borderColor || 'border-gray-200'} text-sm ${bot.textColor || 'text-gray-800'} hover:opacity-80 hover:shadow-md transition flex items-center gap-2 font-medium`}
                                            >
                                                {action.highlight && <Sparkles size={16} className={`text-${bot.bgGradient.split('-')[1]}-500`} />}
                                                {action.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Messages Display
                                <div className="space-y-4">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-start gap-3 group ${msg.from === 'user' ? 'justify-end' : 'justify-start'
                                                }`}
                                        >
                                            {msg.from === 'bot' && (
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${bot.bgGradient} flex items-center justify-center flex-shrink-0`}>
                                                    <bot.icon size={16} className="text-white" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-1 max-w-[85%]">
                                                <div
                                                    className={`rounded-2xl px-4 py-2.5 text-sm ${msg.from === 'user'
                                                            ? `bg-gradient-to-r ${bot.bgGradient} text-white rounded-br-none shadow-lg`
                                                            : `bg-white border ${bot.borderColor || 'border-gray-200'} ${bot.textColor || 'text-gray-800'} rounded-bl-none shadow-sm`
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
                                                            className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors`}
                                                            title="Copy"
                                                        >
                                                            <Copy size={14} className={bot.textColor || 'text-gray-600'} />
                                                        </button>
                                                        <button
                                                            className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors`}
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={14} className={bot.textColor || 'text-gray-600'} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onSendMessage(msg.text);
                                                            }}
                                                            className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors`}
                                                            title="Regenerate"
                                                        >
                                                            <RefreshCw size={14} className={bot.textColor || 'text-gray-600'} />
                                                        </button>
                                                        <button
                                                            className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors`}
                                                            title="More"
                                                        >
                                                            <MoreVertical size={14} className={bot.textColor || 'text-gray-600'} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            {msg.from === 'user' && (
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${bot.bgGradient} border-2 border-white shadow-md flex items-center justify-center flex-shrink-0`}>
                                                    <span className="text-xs font-semibold text-white">U</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex items-start gap-3 justify-start">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${bot.bgGradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                                <bot.icon size={16} className="text-white" />
                                            </div>
                                            <div className={`bg-white border ${bot.borderColor || 'border-gray-200'} rounded-2xl rounded-bl-none px-4 py-2 shadow-sm`}>
                                                <div className="flex gap-1.5">
                                                    <div className={`w-2 h-2 bg-gradient-to-r ${bot.bgGradient} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                                                    <div className={`w-2 h-2 bg-gradient-to-r ${bot.bgGradient} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                                                    <div className={`w-2 h-2 bg-gradient-to-r ${bot.bgGradient} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                                            </div>

                        {/* Input Field with Thinking Status */}
                        <div className={`flex-shrink-0 px-4 py-4 border-t ${bot.borderColor || 'border-gray-200'}`}>
                            <form onSubmit={handleSend} className="relative">
                                <div className={`flex items-center px-4 py-3 rounded-full border ${bot.borderColor || 'border-gray-200'} bg-white shadow-md focus-within:ring-2 focus-within:ring-opacity-30 focus-within:border-transparent transition-all ${
                                    bot.bgGradient.includes('green') ? 'focus-within:ring-green-400' :
                                    bot.bgGradient.includes('blue') ? 'focus-within:ring-blue-400' :
                                    bot.bgGradient.includes('purple') ? 'focus-within:ring-purple-400' :
                                    bot.bgGradient.includes('orange') ? 'focus-within:ring-orange-400' :
                                    bot.bgGradient.includes('indigo') ? 'focus-within:ring-indigo-400' :
                                    bot.bgGradient.includes('teal') ? 'focus-within:ring-teal-400' :
                                    bot.bgGradient.includes('amber') ? 'focus-within:ring-amber-400' :
                                    bot.bgGradient.includes('rose') ? 'focus-within:ring-rose-400' :
                                    bot.bgGradient.includes('violet') ? 'focus-within:ring-violet-400' :
                                    bot.bgGradient.includes('sky') ? 'focus-within:ring-sky-400' : 'focus-within:ring-blue-400'
                                }`}
                                >
                                    <button
                                        type="button"
                                        className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors mr-2`}
                                    >
                                        <Plus size={18} className={bot.textColor || 'text-gray-600'} />
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={`Ask ${bot.name}`}
                                        className={`flex-1 bg-transparent border-0 outline-none ${bot.textColor || 'text-gray-800'} placeholder:${bot.textColor || 'text-gray-400'} text-base`}
                                    />
                                    {!inputValue.trim() && (
                                        <>
                                            <span className={`text-xs ${bot.textColor || 'text-gray-500'} mr-2 hidden sm:inline`}>{isTyping ? 'Thinking' : 'Fast'}</span>
                                            <button
                                                type="button"
                                                className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors ml-2`}
                                            >
                                                <Grid3x3 size={18} className={bot.textColor || 'text-gray-600'} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`p-1.5 hover:bg-gray-100 rounded-full transition-colors ml-2`}
                                            >
                                                <Mic size={18} className={bot.textColor || 'text-gray-600'} />
                                            </button>
                                        </>
                                    )}
                                    {inputValue.trim() && (
                                        <button
                                            type="submit"
                                            className={`p-1.5 bg-gradient-to-r ${bot.bgGradient} hover:opacity-90 rounded-full transition-all ml-2 shadow-md`}
                                        >
                                            <Send size={18} className="text-white" />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                            </div>
                </div>
            </div>
        </div>
    );
};

const BotModules = ({ onClose, moduleContext }) => {
    const [isClosing, setIsClosing] = useState(false);
    const scrollContainerRef = useRef(null);
    const scrollbarTrackRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [thumbWidth, setThumbWidth] = useState(100);

    // Load chat history from localStorage
    const loadChatHistory = (botId) => {
        const saved = localStorage.getItem(`yai1-chat-history-${botId}`);
        return saved ? JSON.parse(saved) : [];
    };

    // Save chat history to localStorage
    const saveChatHistory = (botId, history) => {
        localStorage.setItem(`yai1-chat-history-${botId}`, JSON.stringify(history));
    };

    // State for each bot's messages, input, and chat history
    const [botStates, setBotStates] = useState(() => {
        const states = {};
        PREDEFINED_BOTS.forEach(bot => {
            const history = loadChatHistory(bot.id);
            states[bot.id] = {
                messages: [],
                input: '',
                isTyping: false,
                chatHistory: history,
                currentChatId: null
            };
        });
        return states;
    });

    // Save chat history whenever it changes
    useEffect(() => {
        PREDEFINED_BOTS.forEach(bot => {
            const botState = botStates[bot.id];
            if (botState && botState.chatHistory) {
                saveChatHistory(bot.id, botState.chatHistory);
            }
        });
    }, [botStates]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const createNewChat = (botId) => {
        const newChatId = Date.now().toString();
        const newChat = {
            id: newChatId,
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setBotStates(prev => ({
            ...prev,
            [botId]: {
                ...prev[botId],
                messages: [],
                input: '',
                isTyping: false,
                chatHistory: [newChat, ...prev[botId].chatHistory],
                currentChatId: newChatId
            }
        }));
    };

    const updateChatInHistory = (botId, chatId, newMessages) => {
        setBotStates(prev => {
            const botState = prev[botId];
            const firstUserMessage = newMessages.find(m => m.from === 'user');
            const updatedHistory = botState.chatHistory.map(chat => {
                if (chat.id === chatId) {
                    return {
                        ...chat,
                        messages: newMessages,
                        title: firstUserMessage?.text?.substring(0, 50) || 'New Chat',
                        updatedAt: new Date().toISOString()
                    };
                }
                return chat;
            });

            return {
                ...prev,
                [botId]: {
                    ...prev[botId],
                    chatHistory: updatedHistory
                }
            };
        });
    };

    const loadChat = (botId, chatId) => {
        setBotStates(prev => {
            const botState = prev[botId];
            const chat = botState.chatHistory.find(c => c.id === chatId);
            if (chat) {
                return {
                    ...prev,
                    [botId]: {
                        ...prev[botId],
                        messages: chat.messages,
                        currentChatId: chatId
                    }
                };
            }
            return prev;
        });
    };

    const deleteChat = (botId, chatId) => {
        setBotStates(prev => {
            const botState = prev[botId];
            const updatedHistory = botState.chatHistory.filter(chat => chat.id !== chatId);
            return {
                ...prev,
                [botId]: {
                    ...prev[botId],
                    chatHistory: updatedHistory,
                    messages: botState.currentChatId === chatId ? [] : botState.messages,
                    currentChatId: botState.currentChatId === chatId ? null : botState.currentChatId
                }
            };
        });
    };

    const handleSendMessage = (botId, message) => {
        setBotStates(prev => {
            const botState = prev[botId];
            let currentChatId = botState.currentChatId;
            const userMessage = { from: 'user', text: message };
            const updatedMessages = [...botState.messages, userMessage];

            // Create new chat if none exists
            if (!currentChatId) {
                currentChatId = Date.now().toString();
                const newChat = {
                    id: currentChatId,
                    title: message.substring(0, 50),
                    messages: updatedMessages,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                return {
                    ...prev,
                    [botId]: {
                        ...prev[botId],
                        messages: updatedMessages,
                        isTyping: true,
                        chatHistory: [newChat, ...prev[botId].chatHistory],
                        currentChatId: currentChatId
                    }
                };
            }

            // Update existing chat in history with user message
            const updatedHistory = botState.chatHistory.map(chat => {
                if (chat.id === currentChatId) {
                    return {
                        ...chat,
                        messages: updatedMessages,
                        updatedAt: new Date().toISOString()
                    };
                }
                return chat;
            });

            return {
                ...prev,
                [botId]: {
                    ...prev[botId],
                    messages: updatedMessages,
                    isTyping: true,
                    chatHistory: updatedHistory
                }
            };
        });

        setTimeout(() => {
            const bot = PREDEFINED_BOTS.find(b => b.id === botId);
            const botResponse = `Hello! I'm ${bot.name}. You asked: "${message}". ${bot.description}. How can I help you today?`;

            setBotStates(prev => {
                const botState = prev[botId];
                const updatedMessages = [...botState.messages, { from: 'bot', text: botResponse }];

                // Update chat in history if currentChatId exists
                if (botState.currentChatId) {
                    const firstUserMessage = updatedMessages.find(m => m.from === 'user');
                    const updatedHistory = botState.chatHistory.map(chat => {
                        if (chat.id === botState.currentChatId) {
                            return {
                                ...chat,
                                messages: updatedMessages,
                                title: firstUserMessage?.text?.substring(0, 50) || 'New Chat',
                                updatedAt: new Date().toISOString()
                            };
                        }
                        return chat;
                    });

                    return {
                        ...prev,
                        [botId]: {
                            ...prev[botId],
                            messages: updatedMessages,
                            isTyping: false,
                            chatHistory: updatedHistory
                        }
                    };
                }

                return {
                    ...prev,
                    [botId]: {
                        ...prev[botId],
                        messages: updatedMessages,
                        isTyping: false
                    }
                };
            });
        }, 1000 + Math.random() * 500);
    };

    const handleInputChange = (botId, value) => {
        setBotStates(prev => ({
            ...prev,
            [botId]: {
                ...prev[botId],
                input: value
            }
        }));
    };

    const handleNewChat = (botId) => {
        createNewChat(botId);
    };

    // Check scroll position
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScroll = scrollWidth - clientWidth;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < maxScroll - 10);
            // Calculate scroll progress (0 to 100)
            const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
            
            // Calculate thumb width and position for custom scrollbar
            if (scrollbarTrackRef.current && scrollWidth > clientWidth) {
                const trackWidth = scrollbarTrackRef.current.offsetWidth;
                const thumbWidthPercent = (clientWidth / scrollWidth) * 100;
                const maxThumbPosition = trackWidth - (trackWidth * thumbWidthPercent / 100);
                const thumbPos = (progress / 100) * maxThumbPosition;
                
                setThumbWidth(Math.max(60, trackWidth * thumbWidthPercent / 100));
                setThumbPosition(thumbPos);
            } else {
                setThumbWidth(100);
                setThumbPosition(0);
            }
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            // Check on resize
            window.addEventListener('resize', checkScrollPosition);
            // Initial calculation after a short delay to ensure DOM is ready
            setTimeout(checkScrollPosition, 100);
            return () => {
                container.removeEventListener('scroll', checkScrollPosition);
                window.removeEventListener('resize', checkScrollPosition);
            };
        }
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    // Handle custom scrollbar drag
    const handleScrollbarMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const track = scrollbarTrackRef.current;
        if (!track || !scrollContainerRef.current) return;

        const trackRect = track.getBoundingClientRect();
        const clickX = e.clientX - trackRect.left;
        const trackWidth = track.offsetWidth;
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // Calculate scroll position based on click
        const scrollPercent = clickX / trackWidth;
        const targetScroll = scrollPercent * maxScroll;
        
        scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    const handleScrollbarThumbMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        
        const startX = e.clientX;
        const startScrollLeft = scrollContainerRef.current?.scrollLeft || 0;
        const track = scrollbarTrackRef.current;
        if (!track || !scrollContainerRef.current) return;

        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const trackWidth = track.offsetWidth;
        const thumbWidthPercent = (clientWidth / scrollWidth) * 100;
        const maxThumbPosition = trackWidth - (trackWidth * thumbWidthPercent / 100);

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaPercent = (deltaX / maxThumbPosition) * 100;
            const newScrollPercent = (startScrollLeft / maxScroll) * 100 + deltaPercent;
            const targetScroll = Math.max(0, Math.min(maxScroll, (newScrollPercent / 100) * maxScroll));
            
            scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            className={`fixed inset-0 z-[200] flex flex-col overflow-hidden transition-all duration-300 ease-out ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
            style={{
                animation: isClosing ? 'none' : 'fadeInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
        >
            <style>{`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                /* Custom Scrollbar Styling - Always Visible and Interactive */
                .custom-scrollbar {
                    overflow-x: scroll !important;
                    overflow-y: hidden !important;
                    scrollbar-width: auto !important;
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    height: 20px !important;
                    display: block !important;
                    -webkit-appearance: none;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.9) !important;
                    border-radius: 12px;
                    margin: 0 10px;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4) !important;
                    border-radius: 12px;
                    border: 3px solid rgba(255, 255, 255, 0.9);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                    min-width: 80px;
                    cursor: pointer;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(90deg, #7c3aed, #2563eb, #0891b2) !important;
                    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
                    cursor: grab;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(90deg, #6d28d9, #1d4ed8, #0e7490) !important;
                    cursor: grabbing;
                }
                
                /* Firefox scrollbar */
                .custom-scrollbar {
                    scrollbar-width: auto !important;
                    scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.9) !important;
                }
            `}</style>

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 transition-colors duration-300"></div>

            {/* Close button - floating */}
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
                <X size={24} />
            </button>

            {/* Horizontal Scrollable Phone Interfaces */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-x-scroll overflow-y-hidden scroll-smooth px-2 sm:px-4 pt-12 sm:pt-16 custom-scrollbar"
                    style={{
                        scrollbarGutter: 'stable',
                        WebkitOverflowScrolling: 'touch',
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        paddingBottom: 0
                    }}
                    onScroll={checkScrollPosition}
                >
                <style>{`
                    .phone-frame {
                        width: 100%;
                        height: 100%;
                        min-height: 100%;
                        max-height: 100%;
                    }
                    @media (min-width: 1920px) {
                        .phone-frame {
                            width: 380px;
                            height: 100%;
                            min-height: 100%;
                            max-height: 100%;
                        }
                    }
                    @media (min-width: 1600px) and (max-width: 1919px) {
                        .phone-frame {
                            width: 340px;
                            height: 100%;
                            min-height: 100%;
                            max-height: 100%;
                        }
                    }
                    @media (min-width: 1280px) and (max-width: 1599px) {
                        .phone-frame {
                            width: 300px;
                            height: 100%;
                            min-height: 100%;
                            max-height: 100%;
                        }
                    }
                    @media (min-width: 1024px) and (max-width: 1279px) {
                        .phone-frame {
                            width: 280px;
                            height: 100%;
                            min-height: 100%;
                            max-height: 100%;
                        }
                    }
                    @media (min-width: 768px) and (max-width: 1023px) {
                        .phone-frame {
                            width: 260px;
                            height: 100%;
                            min-height: 100%;
                            max-height: 100%;
                        }
                    }
                    @media (max-width: 767px) {
                        .phone-frame {
                            width: 100%;
                            min-width: 240px;
                            max-width: 320px;
                            height: 100%;
                            min-height: 100%;
                            max-height: 100%;
                        }
                    }
                    .bot-container {
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        max-height: 100%;
                        justify-content: space-between;
                        overflow: visible;
                        padding-bottom: 0;
                    }
                    .phone-frame-wrapper {
                        flex: 1 1 auto;
                        display: flex;
                        align-items: stretch;
                        justify-content: center;
                        min-height: 0;
                        width: 100%;
                        overflow: hidden;
                    }
                    .phone-frame-wrapper .phone-frame {
                        height: 100% !important;
                        max-height: 100% !important;
                    }
                `}</style>
                <div className="flex gap-2 sm:gap-4 md:gap-6 items-stretch justify-start w-max h-full min-h-full flex-1">
                    {PREDEFINED_BOTS.map((bot) => {
                        const botState = botStates[bot.id];
                        return (
                            <div
                                key={bot.id}
                                className="bot-container"
                            >
                                {/* Phone Frame Wrapper */}
                                <div className="phone-frame-wrapper">
                                    <PhoneFrame
                                        bot={bot}
                                        messages={botState.messages}
                                        onSendMessage={(msg) => handleSendMessage(bot.id, msg)}
                                        inputValue={botState.input}
                                        setInputValue={(value) => handleInputChange(bot.id, value)}
                                        isTyping={botState.isTyping}
                                        onNewChat={() => handleNewChat(bot.id)}
                                        chatHistory={botState.chatHistory || []}
                                        onLoadChat={(chatId) => loadChat(bot.id, chatId)}
                                        onDeleteChat={(chatId) => deleteChat(bot.id, chatId)}
                                        currentChatId={botState.currentChatId}
                                    />
                                </div>
                                {/* Bot Name Label */}
                                <div className="flex-shrink-0 text-center w-full px-2 py-1">
                                    <span className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r ${bot.bgGradient} text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg whitespace-nowrap border-2 border-white/30`}>
                                        {bot.name}
                                    </span>
                                </div>
                            </div>
                        );
                    }                    )}
                </div>
                </div>
                
                {/* Custom Footer Scrollbar */}
                <div className="flex-shrink-0 px-4 sm:px-8 py-2 bg-white/50 backdrop-blur-sm border-t border-gray-200">
                    <div 
                        ref={scrollbarTrackRef}
                        className="relative w-full h-6 bg-white/80 rounded-full border-2 border-gray-300 shadow-inner cursor-pointer hover:bg-white/90 transition-colors"
                        onClick={handleScrollbarMouseDown}
                    >
                        <div
                            ref={scrollbarRef}
                            className="absolute top-0 h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full shadow-lg border-2 border-white cursor-grab active:cursor-grabbing transition-all hover:shadow-xl hover:scale-y-110"
                            style={{
                                left: `${thumbPosition}px`,
                                width: `${thumbWidth}px`,
                                minWidth: '60px'
                            }}
                            onMouseDown={handleScrollbarThumbMouseDown}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-8 h-1 bg-white/60 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotModules;
