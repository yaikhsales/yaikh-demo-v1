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
        name: 'Finance Bot',
        description: 'AI assistant for financial management, budgeting, and accounting',
        icon: Wallet,
        bgGradient: 'from-green-500 to-emerald-500',
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
        name: 'Admin Bot',
        description: 'Administrative assistant for daily operations and management',
        icon: UserCog,
        bgGradient: 'from-blue-500 to-cyan-500',
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
        name: 'CSR Bot',
        description: 'Corporate social responsibility and sustainability assistant',
        icon: HeartHandshake,
        bgGradient: 'from-purple-500 to-pink-500',
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
        name: 'PPC Bot',
        description: 'Pay-per-click and digital marketing campaign assistant',
        icon: Megaphone,
        bgGradient: 'from-orange-500 to-red-500',
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
        name: 'Productions Bot',
        description: 'Production planning and manufacturing operations assistant',
        icon: Factory,
        bgGradient: 'from-indigo-500 to-blue-500',
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
        name: 'YTM Bot',
        description: 'YTM (Yield to Maturity) and production tracking assistant',
        icon: BarChart3,
        bgGradient: 'from-teal-500 to-cyan-500',
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
        name: 'PD Bot',
        description: 'Product development and design innovation assistant',
        icon: Lightbulb,
        bgGradient: 'from-amber-500 to-yellow-500',
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
        name: 'Sale Bot',
        description: 'Sales management and customer relationship assistant',
        icon: Handshake,
        bgGradient: 'from-rose-500 to-pink-500',
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
        name: 'QMS Bot',
        description: 'Quality management system and compliance assistant',
        icon: ClipboardCheck,
        bgGradient: 'from-violet-500 to-purple-500',
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
        name: 'Social Bot',
        description: 'Social media management and engagement assistant',
        icon: MessageCircle,
        bgGradient: 'from-sky-500 to-blue-500',
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
        <div className="relative w-full h-full flex items-start justify-center">
            {/* Phone Frame */}
            <div className="relative mx-auto bg-gray-900 rounded-[3rem] p-2 shadow-2xl phone-frame flex-shrink-0">
                {/* Phone Screen */}
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative flex flex-col">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

                    {/* Gemini Chatbot Interface */}
                    <div className="flex flex-col h-full bg-[#050505] text-white relative">
                        {/* History Sidebar */}
                        <div className={`absolute inset-y-0 left-0 z-50 w-64 bg-[#050505] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}>
                            <div className="flex flex-col h-full">
                                {/* Sidebar Header */}
                                <div className="flex items-center justify-between p-4 border-b border-white/10">
                                    <h2 className="text-sm font-semibold text-white">Chat History</h2>
                                    <button
                                        onClick={() => setIsHistoryOpen(false)}
                                        className="p-1.5 rounded-full hover:bg-white/10 transition"
                                    >
                                        <X size={16} className="text-white/70" />
                                    </button>
                                </div>

                                {/* New Chat Button */}
                                <div className="p-3 border-b border-white/10">
                                    <button
                                        onClick={() => {
                                            if (onNewChat) onNewChat();
                                            setIsHistoryOpen(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition"
                                    >
                                        <Plus size={14} className="text-white/70" />
                                        <span className="text-xs text-white">New Chat</span>
                                    </button>
                                </div>

                                {/* Chat List */}
                                <div className="flex-1 overflow-y-auto">
                                    {chatHistory && chatHistory.length === 0 ? (
                                        <div className="p-4 text-center text-white/50 text-xs">
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
                                                    className={`group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition ${currentChatId === chat.id ? 'bg-white/10' : ''
                                                        }`}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-white/90 truncate">{chat.title}</p>
                                                        <p className="text-[10px] text-white/50 mt-0.5">
                                                            {new Date(chat.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (onDeleteChat) onDeleteChat(chat.id);
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-white/10 transition"
                                                    >
                                                        <Trash2 size={12} className="text-white/50" />
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
                                className="absolute inset-0 bg-black/50 z-40"
                                onClick={() => setIsHistoryOpen(false)}
                            />
                        )}

                        {/* Header with Bot Name and Avatar */}
                        <div className="flex-shrink-0 flex items-center justify-between px-4 pt-12 pb-3 border-b border-white/10 relative z-10">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsHistoryOpen(true)}
                                    className="p-2 rounded-full hover:bg-white/10 transition"
                                    title="Chat history"
                                >
                                    <Menu size={18} className="text-white/70" />
                                </button>
                                <button
                                    onClick={() => {
                                        setInputValue('');
                                        if (onNewChat) onNewChat();
                                    }}
                                    className="p-2 rounded-full hover:bg-white/10 transition"
                                    title="New chat"
                                >
                                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                            {/* Bot Name - Centered */}
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <span className="text-sm font-medium text-white/90">{bot.name}</span>
                            </div>
                            {/* Bot Avatar - Right Side */}
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${bot.bgGradient} flex items-center justify-center border-2 border-white/20 shadow-md`}>
                                <bot.icon size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            {!hasMessages ? (
                                // Welcome Screen
                                <div className="space-y-6 pt-8">
                                    <div>
                                        <p className="text-sm text-white/70 mb-2">Hi {GREETING_NAME}</p>
                                        <h2 className="text-3xl font-light leading-tight text-white">Where should we start?</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-8">
                                        {suggestedActions.map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => onSendMessage(action.text)}
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
                                                                onSendMessage(msg.text);
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
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${bot.bgGradient} flex items-center justify-center flex-shrink-0`}>
                                                <bot.icon size={16} className="text-white" />
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
                        <div className="flex-shrink-0 px-4 py-4 border-t border-white/10 bg-[#050505]">
                            <form onSubmit={handleSend} className="relative">
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
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={`Ask ${bot.name}`}
                                        className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-white/50 text-base"
                                    />
                                    {!inputValue.trim() && (
                                        <>
                                            <span className="text-xs text-white/50 mr-2 hidden sm:inline">{isTyping ? 'Thinking' : 'Fast'}</span>
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
                                    {inputValue.trim() && (
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
            </div>
        </div>
    );
};

const BotModules = ({ onClose, moduleContext }) => {
    const [isClosing, setIsClosing] = useState(false);
    const scrollContainerRef = useRef(null);

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
            `}</style>

            {/* Background */}
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"></div>

            {/* Close button - floating */}
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-all bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
                <X size={24} />
            </button>

            {/* Horizontal Scrollable Phone Interfaces */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-x-auto overflow-y-hidden scroll-smooth px-2 sm:px-4 pt-16 sm:pt-20 pb-2 sm:pb-4"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
                }}
            >
                <style>{`
                    .phone-frame {
                        width: 100%;
                        height: calc(100vh - 60px);
                        min-height: calc(100vh - 60px);
                    }
                    @media (min-width: 1920px) {
                        .phone-frame {
                            width: 380px;
                            height: calc(100vh - 60px);
                        }
                    }
                    @media (min-width: 1600px) and (max-width: 1919px) {
                        .phone-frame {
                            width: 340px;
                            height: calc(100vh - 60px);
                        }
                    }
                    @media (min-width: 1280px) and (max-width: 1599px) {
                        .phone-frame {
                            width: 300px;
                            height: calc(100vh - 60px);
                        }
                    }
                    @media (min-width: 1024px) and (max-width: 1279px) {
                        .phone-frame {
                            width: 280px;
                            height: calc(100vh - 60px);
                        }
                    }
                    @media (min-width: 768px) and (max-width: 1023px) {
                        .phone-frame {
                            width: 260px;
                            height: calc(100vh - 60px);
                        }
                    }
                    @media (max-width: 767px) {
                        .phone-frame {
                            width: 100%;
                            min-width: 240px;
                            max-width: 320px;
                            height: calc(100vh - 50px);
                        }
                    }
                    .bot-container {
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100vh;
                        justify-content: flex-start;
                }
            `}</style>
                <div className="flex gap-2 sm:gap-4 md:gap-6 items-start justify-start w-full h-full">
                    {PREDEFINED_BOTS.map((bot) => {
                        const botState = botStates[bot.id];
                        return (
                            <div
                                key={bot.id}
                                className="bot-container"
                            >
                                {/* Phone Frame */}
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
                                {/* Bot Name Label */}
                                <div className="mt-2 sm:mt-3 text-center w-full px-2">
                                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md whitespace-nowrap">
                                        {bot.name}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BotModules;
