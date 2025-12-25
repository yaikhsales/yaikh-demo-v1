import React, { useState, useRef, useEffect } from 'react';
import {
    X, Plus, Grid3x3, Mic, Send, Sparkles,
    Wallet, UserCog, HeartHandshake, Megaphone, Factory,
    BarChart3, Lightbulb, Handshake, ClipboardCheck, MessageCircle,
    Copy, Edit2, RefreshCw, ThumbsUp, ThumbsDown, MoreVertical,
    Menu, Trash2, ChevronRight
} from 'lucide-react';
import { generateGeminiResponse, shouldUseGemini } from './gemini-api';

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
            { text: 'Purchase Request appr', highlight: true },
            { text: 'Supp Payment Request' },
            { text: 'E-invoice' },
            { text: 'Generate Invoice' },
            { text: 'Data' }
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
            { text: 'Create Support Ticket', highlight: true },
            { text: 'Food Menu' },
            { text: 'Car fuel' },
            { text: 'Security Issue' },
            { text: '2 Applications Received for IE Job Post' }
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
            { text: 'Induction Training', highlight: true },
            { text: 'Monthly 6S Report' },
            { text: 'Compliance Certificate' },
            { text: 'Audit Checklist' },
            { text: 'CSR Equipment Handling' }
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
            { text: 'Order Status', highlight: true },
            { text: 'Delay Alert' },
            { text: 'Need Your Action' },
            { text: 'Supplier Alert' },
            { text: 'Master Plan' },
            { text: 'Line Plan' }
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
            { text: 'Production Status' }
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
            { text: 'Dashboard Analytics', highlight: true },
            { text: 'Repair Machine Status' },
            { text: 'Maintenance Schedule' },
            { text: 'Late Maintenance Alert' },
            { text: 'Machine Invoice' }
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
            { text: 'Sale Order Update Status', highlight: true },
            { text: 'Buyer Replied' },
            { text: 'Quotation update' },
            { text: 'You got 3 email to replied' },
            { text: 'Customer Factory Visit' }
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
            { text: 'Hight Defect Rate Inspection', highlight: true },
            { text: 'Thirt party schedule' },
            { text: 'Buyer Visit' },
            { text: 'Pre Production Meeting Schedule' },
            { text: 'You got 4 email to replied' }
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
            { text: 'Tiktok Comment', highlight: true },
            { text: 'Facebook Comment' },
            { text: 'Youtube Comment' },
            { text: 'Instagram Comment' },
            { text: 'Linkedin Comment' }
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
    currentChatId,
    botId,
    onShowInvoice
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
                                    className={`px-3 py-1.5 rounded-full hover:bg-black/5 transition text-xs font-medium ${bot.textColor || 'text-gray-600'}`}
                                    title="Menu"
                                >
                                    Menu
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
                                                    {msg.type !== 'social-media' && msg.text}
                                                    {msg.type === 'button' && msg.buttonText && (
                                                        <button
                                                            onClick={() => {
                                                                // Handle pay button click
                                                                onSendMessage(`Pay for ${msg.text}`);
                                                            }}
                                                            className={`mt-2 px-4 py-2 rounded-lg bg-gradient-to-r ${bot.bgGradient} text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md`}
                                                        >
                                                            {msg.buttonText}
                                                        </button>
                                                    )}
                                                    {msg.type === 'dropdown' && msg.dropdownItems && (
                                                        <div className="mt-2 space-y-2">
                                                            {msg.dropdownItems.map((item) => (
                                                                <button
                                                                    key={item.id}
                                                                    onClick={() => {
                                                                        onSendMessage(`Generate ${item.text}`);
                                                                    }}
                                                                    className={`w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r ${bot.lightAccent || 'from-gray-100 to-gray-200'} border ${bot.borderColor || 'border-gray-200'} ${bot.textColor || 'text-gray-800'} text-xs hover:opacity-80 transition-opacity`}
                                                                >
                                                                    {item.text}
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={() => {
                                                                    onSendMessage('Generate');
                                                                }}
                                                                className={`w-full px-3 py-2 rounded-lg bg-gradient-to-r ${bot.bgGradient} text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md`}
                                                            >
                                                                Generate
                                                            </button>
                                                        </div>
                                                    )}
                                                    {msg.type === 'invoice-list' && msg.dropdownItems && (
                                                        <div className="mt-2 space-y-2">
                                                            {msg.dropdownItems.map((item) => (
                                                                <button
                                                                    key={item.id}
                                                                    onClick={() => {
                                                                        // Show invoice image directly when clicked
                                                                        if (onShowInvoice) {
                                                                            onShowInvoice(item);
                                                                        } else {
                                                                            // Fallback: send message
                                                                            onSendMessage(`Show invoice: ${item.text}`);
                                                                        }
                                                                    }}
                                                                    className={`w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r ${bot.lightAccent || 'from-gray-100 to-gray-200'} border ${bot.borderColor || 'border-gray-200'} ${bot.textColor || 'text-gray-800'} text-xs hover:opacity-80 transition-opacity hover:shadow-md`}
                                                                >
                                                                    {item.text}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {msg.type === 'invoice-image' && msg.imageUrl && (
                                                        <div className="mt-2">
                                                            <div className="text-xs font-semibold mb-2 text-gray-700">{msg.invoiceName}</div>
                                                            <img
                                                                src={msg.imageUrl}
                                                                alt={msg.invoiceName || 'Invoice'}
                                                                className="w-full rounded-lg border-2 border-gray-200 shadow-lg max-h-96 object-contain bg-white"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    const fallback = e.target.nextSibling;
                                                                    if (fallback) fallback.style.display = 'block';
                                                                }}
                                                            />
                                                            <div className="hidden text-xs text-gray-500 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                                Invoice preview: {msg.invoiceName}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {msg.type === 'ppc-image' && msg.imageUrl && (
                                                        <div className="mt-2">
                                                            <img
                                                                src={msg.imageUrl}
                                                                alt={msg.imageName || 'PPC Image'}
                                                                className="w-full rounded-lg border-2 border-gray-200 shadow-lg max-h-96 object-contain bg-white"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    const fallback = e.target.nextSibling;
                                                                    if (fallback) fallback.style.display = 'block';
                                                                }}
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    onSendMessage(`See more: ${msg.imageName || 'Details'}`);
                                                                }}
                                                                className={`mt-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r ${bot.bgGradient} text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md`}
                                                            >
                                                                See more
                                                            </button>
                                                            <div className="hidden text-xs text-gray-500 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                                Image preview: {msg.imageName}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {msg.type === 'ytm-image' && msg.imageUrl && (
                                                        <div className="mt-2">
                                                            <div className="text-xs font-semibold mb-2 text-gray-700">{msg.imageName}</div>
                                                            <img
                                                                src={msg.imageUrl}
                                                                alt={msg.imageName || 'YTM Image'}
                                                                className="w-full rounded-lg border-2 border-gray-200 shadow-lg max-h-96 object-contain bg-white"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    const fallback = e.target.nextSibling;
                                                                    if (fallback) fallback.style.display = 'block';
                                                                }}
                                                            />
                                                            <div className="hidden text-xs text-gray-500 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                                Image preview: {msg.imageName}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {msg.type === 'social-media' && msg.iconUrl && (
                                                        <div className="flex items-start gap-3">
                                                            <img
                                                                src={msg.iconUrl}
                                                                alt={msg.platform || 'Social Media'}
                                                                className="w-10 h-10 rounded-lg object-contain flex-shrink-0 border border-gray-200 bg-white p-1"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                            <div className="flex-1">
                                                                <div className="text-sm font-semibold mb-1.5 text-gray-800">{msg.platform} Comments</div>
                                                                <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{msg.text}</div>
                                                            </div>
                                                        </div>
                                                    )}
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
                                <div className={`flex items-center px-4 py-3 rounded-full border ${bot.borderColor || 'border-gray-200'} bg-white shadow-md focus-within:ring-2 focus-within:ring-opacity-30 focus-within:border-transparent transition-all ${bot.bgGradient.includes('green') ? 'focus-within:ring-green-400' :
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

const BotModules = ({ onClose, moduleContext, onVersionChange, currentVersion = 'yai1' }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
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
        let chatHistoryForGemini = [];
        
        setBotStates(prev => {
            const botState = prev[botId];
            let currentChatId = botState.currentChatId;
            const userMessage = { from: 'user', text: message };
            const updatedMessages = [...botState.messages, userMessage];
            
            // Store chat history for Gemini API (before adding user message)
            chatHistoryForGemini = botState.messages;

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

        setTimeout(async () => {
            const bot = PREDEFINED_BOTS.find(b => b.id === botId);
            let botResponse = `Hello! I'm ${bot.name}. You asked: "${message}". ${bot.description}. How can I help you today?`;
            let responseType = 'text'; // 'text', 'button', 'dropdown'
            let buttonText = null;
            let dropdownItems = null;
            let hasPredefinedResponse = false;

            // Track if we found a predefined response
            const originalResponse = botResponse;

            // Finance PA specific responses
            if (botId === 'finance-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Purchase Request appr
                if (messageLower.includes('purchase request appr') || messageLower === 'purchase request appr') {
                    hasPredefinedResponse = true;
                    botResponse = 'PA: 776 waiting for payment';
                    buttonText = 'Pay';
                    responseType = 'button';

                    // Add first response immediately
                    setBotStates(prev => {
                        const botState = prev[botId];
                        const messageObj = { from: 'bot', text: botResponse, type: responseType, buttonText };
                        const updatedMessages = [...botState.messages, messageObj];
                        const updatedHistory = botState.currentChatId ? botState.chatHistory.map(chat =>
                            chat.id === botState.currentChatId ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() } : chat
                        ) : botState.chatHistory;

                        return {
                            ...prev,
                            [botId]: {
                                ...prev[botId],
                                messages: updatedMessages,
                                isTyping: false,
                                chatHistory: updatedHistory
                            }
                        };
                    });

                    // Second message after 3 seconds
                    setTimeout(() => {
                        setBotStates(prev => {
                            const botState = prev[botId];
                            if (!botState) return prev;
                            const updatedMessages = [...botState.messages, { from: 'bot', text: 'PA: ES packing payment 6500$ IMV 00078 pay data.' }];
                            const updatedHistory = botState.currentChatId ? botState.chatHistory.map(chat =>
                                chat.id === botState.currentChatId ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() } : chat
                            ) : botState.chatHistory;

                            return {
                                ...prev,
                                [botId]: {
                                    ...prev[botId],
                                    messages: updatedMessages,
                                    chatHistory: updatedHistory
                                }
                            };
                        });
                    }, 3000);

                    // Third message after 3 more seconds (6 seconds total)
                    setTimeout(() => {
                        setBotStates(prev => {
                            const botState = prev[botId];
                            if (!botState) return prev;
                            const updatedMessages = [...botState.messages, { from: 'bot', text: 'Payment processed successfully. Transaction ID: TXN-776-001' }];
                            const updatedHistory = botState.currentChatId ? botState.chatHistory.map(chat =>
                                chat.id === botState.currentChatId ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() } : chat
                            ) : botState.chatHistory;

                            return {
                                ...prev,
                                [botId]: {
                                    ...prev[botId],
                                    messages: updatedMessages,
                                    chatHistory: updatedHistory
                                }
                            };
                        });
                    }, 6000);
                    return; // Exit early, don't process default response
                }

                // 2. Supp Payment Request
                if (messageLower.includes('supp payment request') || messageLower === 'supp payment request') {
                    hasPredefinedResponse = true;
                    botResponse = 'PA: ES packing payment 6500$ IMV 00078';
                    buttonText = 'Pay';
                    responseType = 'button';

                    setBotStates(prev => {
                        const botState = prev[botId];
                        const messageObj = { from: 'bot', text: botResponse, type: responseType, buttonText };
                        const updatedMessages = [...botState.messages, messageObj];
                        const updatedHistory = botState.currentChatId ? botState.chatHistory.map(chat =>
                            chat.id === botState.currentChatId ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() } : chat
                        ) : botState.chatHistory;

                        return {
                            ...prev,
                            [botId]: {
                                ...prev[botId],
                                messages: updatedMessages,
                                isTyping: false,
                                chatHistory: updatedHistory
                            }
                        };
                    });

                    // Second message after 3 seconds
                    setTimeout(() => {
                        setBotStates(prev => {
                            const botState = prev[botId];
                            if (!botState) return prev;
                            const updatedMessages = [...botState.messages, { from: 'bot', text: 'PA: ABC COL LLDT 2500$ ....' }];
                            const updatedHistory = botState.currentChatId ? botState.chatHistory.map(chat =>
                                chat.id === botState.currentChatId ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() } : chat
                            ) : botState.chatHistory;

                            return {
                                ...prev,
                                [botId]: {
                                    ...prev[botId],
                                    messages: updatedMessages,
                                    chatHistory: updatedHistory
                                }
                            };
                        });
                    }, 3000);
                    return; // Exit early
                }

                // 3. E-invoice
                if (messageLower.includes('e-invoice') || messageLower === 'e-invoice' || messageLower === 'einvoice') {
                    hasPredefinedResponse = true;
                    botResponse = 'E-invoice received.';
                }
                // 4. Generate Invoice
                else if (messageLower.includes('generate invoice') || messageLower === 'generate invoice') {
                    hasPredefinedResponse = true;
                    botResponse = 'Select invoice to generate:';
                    responseType = 'invoice-list';
                    dropdownItems = [
                        {
                            id: 'inv-pr-001',
                            text: 'Invoice from Purchase Request appr',
                            source: 'purchase-request',
                            image: 'assets/modules-image/Verify-pr.png'
                        },
                        {
                            id: 'inv-spp-001',
                            text: 'Invoice from Supp Payment Request',
                            source: 'supp-payment',
                            image: 'assets/modules-image/Approval-pr.png'
                        }
                    ];
                }
                // Handle invoice display when user clicks on invoice name
                else if (messageLower.includes('show invoice:')) {
                    hasPredefinedResponse = true;
                    const invoiceText = message.substring(message.indexOf(':') + 1).trim();
                    if (invoiceText.includes('Purchase Request')) {
                        botResponse = `Invoice: ${invoiceText}`;
                        responseType = 'invoice-image';
                        dropdownItems = [{
                            id: 'inv-pr-img',
                            text: invoiceText,
                            image: 'assets/modules-image/Verify-pr.png'
                        }];
                    } else if (invoiceText.includes('Supp Payment')) {
                        botResponse = `Invoice: ${invoiceText}`;
                        responseType = 'invoice-image';
                        dropdownItems = [{
                            id: 'inv-spp-img',
                            text: invoiceText,
                            image: 'assets/modules-image/Approval-pr.png'
                        }];
                    }
                }
                // 5. Data
                else if (messageLower === 'data' || messageLower.includes('data')) {
                    hasPredefinedResponse = true;
                    botResponse = 'Monthly declaration';
                }
            }

            // Admin PA specific responses
            if (botId === 'admin-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Create Support Ticket
                if (messageLower.includes('create support ticket') || messageLower === 'create support ticket') {
                    hasPredefinedResponse = true;
                    botResponse = 'What happened? Is it broken or something new?';
                }
                // 2. Food Menu
                else if (messageLower.includes('food menu') || messageLower === 'food menu') {
                    hasPredefinedResponse = true;
                    botResponse = 'Here is the menu:';
                    responseType = 'invoice-image';
                    dropdownItems = [{
                        id: 'menu-img',
                        text: 'Food Menu',
                        image: 'assets/modules-image/menu.png'
                    }];
                }
                // 3. Car fuel
                else if (messageLower.includes('car fuel') || messageLower === 'car fuel') {
                    hasPredefinedResponse = true;
                    botResponse = 'Car plate 1C-7782: Fuel overconsumption. GPS 167km/week: 1L = 6km [STD: 1L = 10km]';
                }
                // 4. Security Issue
                else if (messageLower.includes('security issue') || messageLower === 'security issue') {
                    hasPredefinedResponse = true;
                    botResponse = 'Security found 3 strangers trying to enter the factory during lunch time.';
                }
                // 5. 2 Applications Received for IE Job Post
                else if (messageLower.includes('2 applications received for ie job post') || 
                         messageLower.includes('2 applications recieve for ie jobs post') ||
                         messageLower.includes('applications received') ||
                         messageLower.includes('applications recieve')) {
                    hasPredefinedResponse = true;
                    botResponse = 'Do you want to review the 2 applications?';
                }
            }

            // PPC PA specific responses
            if (botId === 'ppc-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Order Status
                if (messageLower.includes('order status') || messageLower === 'order status') {
                    hasPredefinedResponse = true;
                    botResponse = 'Order Status & Planning Gantt Chart';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'order-status-img',
                        text: 'Order Status',
                        image: 'assets/modules-image/order-status.png',
                        name: 'Order Status'
                    }];
                }
                // 2. Delay Alert
                else if (messageLower.includes('delay alert') || messageLower === 'delay alert') {
                    hasPredefinedResponse = true;
                    botResponse = 'Delay Alert Notification';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'delay-alert-img',
                        text: 'Delay Alert',
                        image: 'assets/modules-image/delay-alert.png',
                        name: 'Delay Alert'
                    }];
                }
                // 3. Need Your Action
                else if (messageLower.includes('need your action') || messageLower === 'need your action') {
                    hasPredefinedResponse = true;
                    botResponse = 'Action Required Notification';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'need-action-img',
                        text: 'Need Your Action',
                        image: 'assets/modules-image/need-action.png',
                        name: 'Need Your Action'
                    }];
                }
                // 4. Supplier Alert
                else if (messageLower.includes('supplier alert') || messageLower === 'supplier alert') {
                    hasPredefinedResponse = true;
                    botResponse = 'Supplier Alert Dashboard';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'supplier-alert-img',
                        text: 'Supplier Alert',
                        image: 'assets/modules-image/supplier-alert.png',
                        name: 'Supplier Alert'
                    }];
                }
                // 5. Master Plan
                else if (messageLower.includes('master plan') || messageLower === 'master plan') {
                    hasPredefinedResponse = true;
                    botResponse = 'Master Plan - Production Planning & Control';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'master-plan-img',
                        text: 'Master Plan',
                        image: 'assets/modules-image/master-plan.png',
                        name: 'Master Plan'
                    }];
                }
                // 6. Line Plan
                else if (messageLower.includes('line plan') || messageLower === 'line plan') {
                    hasPredefinedResponse = true;
                    botResponse = 'Monthly Line Plan - PPC Department';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'line-plan-img',
                        text: 'Line Plan',
                        image: 'assets/modules-image/Line-plan.png',
                        name: 'Line Plan'
                    }];
                }
            }

            // CSR PA specific responses
            if (botId === 'csr-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Induction Training
                if (messageLower.includes('induction training') || messageLower === 'induction training') {
                    hasPredefinedResponse = true;
                    botResponse = 'Factory Induction: Safety & Rules - Welcome!';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'induction-training-img',
                        text: 'Induction Training',
                        image: 'assets/modules-image/induction-training.png',
                        name: 'Induction Training'
                    }];
                }
                // 2. Monthly 6S Report
                else if (messageLower.includes('monthly 6s report') || messageLower === 'monthly 6s report' || messageLower.includes('6s report')) {
                    hasPredefinedResponse = true;
                    botResponse = 'Monthly 6S Report';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: '6s-report-img',
                        text: 'Monthly 6S Report',
                        image: 'assets/modules-image/6s.png',
                        name: 'Monthly 6S Report'
                    }];
                }
                // 3. Compliance Certificate
                else if (messageLower.includes('compliance certificate') || messageLower === 'compliance certificate') {
                    hasPredefinedResponse = true;
                    botResponse = 'Certificate of Compliance';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'certificate-compliance-img',
                        text: 'Compliance Certificate',
                        image: 'assets/modules-image/certificate-compliance.png',
                        name: 'Compliance Certificate'
                    }];
                }
                // 4. Audit Checklist
                else if (messageLower.includes('audit checklist') || messageLower === 'audit checklist') {
                    hasPredefinedResponse = true;
                    botResponse = 'CSR Audit Checklist';
                    responseType = 'ppc-image';
                    dropdownItems = [{
                        id: 'audit-checklist-img',
                        text: 'Audit Checklist',
                        image: 'assets/modules-image/audit-checklist.png',
                        name: 'Audit Checklist'
                    }];
                }
                // 5. CSR Equipment Handling
                else if (messageLower.includes('csr equipment handling') || messageLower === 'csr equipment handling' || messageLower.includes('equipment handling')) {
                    hasPredefinedResponse = true;
                    botResponse = 'CSR Equipment Handling:';
                    responseType = 'dropdown';
                    dropdownItems = [
                        {
                            id: 'equipment-1',
                            text: 'Smoke Detector and Fire Alarm'
                        },
                        {
                            id: 'equipment-2',
                            text: 'Fire Hose Reel Systems'
                        },
                        {
                            id: 'equipment-3',
                            text: 'Emergency Light and Exit'
                        },
                        {
                            id: 'equipment-4',
                            text: 'Fire Extinguishers'
                        },
                        {
                            id: 'equipment-5',
                            text: 'Sensor Humidity and Temperature'
                        }
                    ];
                }
            }

            // Production PA specific responses
            if (botId === 'productions-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Plan production schedule
                if (messageLower.includes('plan production schedule') || messageLower === 'plan production schedule' || messageLower.includes('production schedule')) {
                    hasPredefinedResponse = true;
                    botResponse = '📅 Production Schedule Planning\n\n✅ Status: Initiated\n📊 Current Capacity: 85%\n⏰ Available Time Slots: Ready for scheduling\n\nNext Steps:\n• Review current production load\n• Allocate resources\n• Set timeline targets';
                }
                // 2. Track inventory levels
                else if (messageLower.includes('track inventory levels') || messageLower === 'track inventory levels' || messageLower.includes('inventory levels')) {
                    hasPredefinedResponse = true;
                    botResponse = '📦 Inventory Tracking Status\n\n📊 Current Stock Levels:\n• Raw Materials: 72%\n• Finished Goods: 68%\n• Work in Progress: 45%\n\n⚠️ Alert: Raw materials below optimal level (80%)';
                }
                // 3. Optimize workflow
                else if (messageLower.includes('optimize workflow') || messageLower === 'optimize workflow' || messageLower.includes('workflow')) {
                    hasPredefinedResponse = true;
                    botResponse = '⚙️ Workflow Optimization Analysis\n\n✅ Analysis Complete\n\n💡 Recommendations:\n• Reduce setup time by 15%\n• Improve material flow efficiency by 22%\n• Optimize machine utilization\n\n📈 Expected Impact: +18% overall efficiency';
                }
                // 4. Monitor quality metrics
                else if (messageLower.includes('monitor quality metrics') || messageLower === 'monitor quality metrics' || messageLower.includes('quality metrics')) {
                    hasPredefinedResponse = true;
                    botResponse = '📊 Quality Metrics Monitoring\n\n📈 Current Metrics:\n• Defect Rate: 2.3%\n• First Pass Yield: 97.7%\n• Customer Satisfaction: 94.5%\n\n✅ Status: All metrics within acceptable range\n🎯 Target: Maintain current performance';
                }
                // 5. Production Status
                else if (messageLower.includes('production status') || messageLower === 'production status') {
                    hasPredefinedResponse = true;
                    botResponse = '🏭 Production Status Overview\n\n📋 Current Status:\n• Active Lines: 8/10\n• Efficiency: 87%\n• On-time Delivery: 92%\n• Current Output: 1,250 units/day\n\n✅ Production running smoothly';
                }
            }

            // Sale PA specific responses
            if (botId === 'sale-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Sale Order Update Status
                if (messageLower.includes('sale order update status') || messageLower === 'sale order update status' || messageLower.includes('order update status') || messageLower.includes('sale order')) {
                    hasPredefinedResponse = true;
                    botResponse = '📋 Sale Order Status Update\n\n📦 Order Details:\n• Order #SO-2024-001: ✅ Shipped\n• Order #SO-2024-002: ⚙️ In Production\n• Order #SO-2024-003: ⏳ Pending Payment\n• Order #SO-2024-004: ✅ Delivered\n\n📊 Summary: 2 completed, 1 in progress, 1 pending';
                }
                // 2. Buyer Replied
                else if (messageLower.includes('buyer replied') || messageLower === 'buyer replied' || messageLower.includes('buyer reply')) {
                    hasPredefinedResponse = true;
                    botResponse = '💬 Buyer Response Received\n\n👤 Buyer: ABC Corporation\n📝 Message: Requesting sample approval\n🔴 Priority: High\n⏰ Response Time: Within 24 hours\n\n✅ Action Required: Review and respond';
                }
                // 3. Quotation update
                else if (messageLower.includes('quotation update') || messageLower === 'quotation update' || messageLower.includes('quotation')) {
                    hasPredefinedResponse = true;
                    botResponse = '📄 Quotation Update\n\n📋 Updated Quotations:\n• #QT-2024-015: Updated pricing\n• #QT-2024-016: Revised delivery terms\n• #QT-2024-017: New product added\n\n⏳ Status: Pending buyer approval\n📅 Review deadline: 3 business days';
                }
                // 4. You got 3 email to replied
                else if (messageLower.includes('you got 3 email to replied') || messageLower === 'you got 3 email to replied' || messageLower.includes('3 email') || messageLower.includes('email to reply')) {
                    hasPredefinedResponse = true;
                    botResponse = '📧 You have 3 emails to reply\n\n1️⃣ From: Buyer XYZ Ltd\n   Subject: Order inquiry\n   Priority: Medium\n\n2️⃣ From: Customer ABC Corp\n   Subject: Delivery schedule\n   Priority: High\n\n3️⃣ From: Partner DEF Inc\n   Subject: Price negotiation\n   Priority: Medium\n\n⏰ Please respond within 24 hours';
                }
                // 5. Customer Factory Visit
                else if (messageLower.includes('customer factory visit') || messageLower === 'customer factory visit' || messageLower.includes('factory visit')) {
                    hasPredefinedResponse = true;
                    botResponse = '🏭 Customer Factory Visit Scheduled\n\n👥 Customer: Global Textiles Inc\n📅 Date: Next Friday, 10:00 AM\n👤 Attendees: 5 people\n🎯 Purpose: Quality inspection\n✅ Status: Confirmed\n\n📋 Preparation checklist sent';
                }
            }

            // QMS PA specific responses
            if (botId === 'qms-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. High Defect Rate Inspection
                if (messageLower.includes('hight defect rate inspection') || messageLower === 'hight defect rate inspection' || messageLower.includes('high defect rate') || messageLower.includes('defect rate inspection')) {
                    hasPredefinedResponse = true;
                    botResponse = '⚠️ High Defect Rate Inspection Alert\n\n📊 Current Status:\n• Defect Rate: 3.8% (Threshold: 2.5%)\n• Status: ⚠️ Above threshold\n• Affected Line: Line 4\n• Defect Type: Stitching issues\n\n🔧 Action Required:\n• Immediate inspection\n• Corrective measures needed\n• Root cause analysis\n\n📅 Scheduled Inspection: Today, 2:00 PM';
                }
                // 2. Third party schedule
                else if (messageLower.includes('thirt party schedule') || messageLower === 'thirt party schedule' || messageLower.includes('third party schedule') || messageLower.includes('third party')) {
                    hasPredefinedResponse = true;
                    botResponse = '🔍 Third Party Audit Schedule\n\n👤 Auditor: SGS Certification Services\n📅 Date: Next Monday, 9:00 AM\n📋 Type: ISO 9001:2015 Audit\n⏱️ Duration: 3 days\n\n📊 Preparation Status:\n• Progress: 85% complete\n• Documents: ✅ Ready\n• Team briefing: Scheduled\n\n✅ All systems ready for audit';
                }
                // 3. Buyer Visit
                else if (messageLower.includes('buyer visit') || messageLower === 'buyer visit') {
                    hasPredefinedResponse = true;
                    botResponse = '👥 Buyer Visit Scheduled\n\n🏢 Buyer: Fashion Retail Group\n📅 Date: This Thursday, 11:00 AM\n👤 Attendees: 3 representatives\n🎯 Purpose: Quality assessment and factory tour\n\n📋 Focus Areas:\n• Production process\n• Quality control\n• Compliance standards\n\n✅ Status: Confirmed';
                }
                // 4. Pre Production Meeting Schedule
                else if (messageLower.includes('pre production meeting schedule') || messageLower === 'pre production meeting schedule' || messageLower.includes('pre production meeting') || messageLower.includes('pre-production meeting')) {
                    hasPredefinedResponse = true;
                    botResponse = '📅 Pre-Production Meeting Schedule\n\n📋 Meeting Details:\n• Style: #2024-015 Pre-Production Review\n• Date: Tomorrow, 2:00 PM\n• Location: Conference Room A\n\n👥 Attendees:\n• Production Team\n• QA Team\n• Merchandising Team\n\n📝 Agenda:\n• Quality standards review\n• Production timeline\n• Resource allocation\n\n✅ Status: Scheduled';
                }
                // 5. You got 4 email to replied
                else if (messageLower.includes('you got 4 email to replied') || messageLower === 'you got 4 email to replied' || messageLower.includes('4 email') || messageLower.includes('email to reply')) {
                    hasPredefinedResponse = true;
                    botResponse = '📧 You have 4 emails to reply\n\n1️⃣ From: Quality Auditor\n   Subject: Audit report review\n   Priority: High\n\n2️⃣ From: Buyer QA Team\n   Subject: Sample approval request\n   Priority: High\n\n3️⃣ From: Supplier\n   Subject: Material quality certificate\n   Priority: Medium\n\n4️⃣ From: Internal QA\n   Subject: Defect analysis report\n   Priority: High\n\n⏰ Please respond within 24 hours';
                }
            }

            // Social PA specific responses
            if (botId === 'social-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. TikTok Comment
                if (messageLower.includes('tiktok comment') || messageLower === 'tiktok comment' || messageLower.includes('tiktok')) {
                    hasPredefinedResponse = true;
                    botResponse = '💬 Comment Statistics\n\n📊 Overview:\n• New Comments: 12\n• Pending Replies: 5\n• Engagement Rate: +15% this week\n• Response Time: Average 2 hours\n\n💭 Latest Comment:\n"Love this product! When will it be available?"\n\n✅ Action: Reply pending';
                    responseType = 'social-media';
                    dropdownItems = [{
                        id: 'tiktok-icon',
                        platform: 'TikTok',
                        iconUrl: 'https://www.google.com/s2/favicons?domain=tiktok.com&sz=64'
                    }];
                }
                // 2. Facebook Comment
                else if (messageLower.includes('facebook comment') || messageLower === 'facebook comment' || messageLower.includes('facebook')) {
                    hasPredefinedResponse = true;
                    botResponse = '💬 Comment Statistics\n\n📊 Overview:\n• New Comments: 28\n• Pending Replies: 8\n• Engagement Rate: +22% this week\n• Response Time: Average 3 hours\n\n💭 Latest Comment:\n"Great quality! Highly recommend!"\n\n✅ Action: Reply pending';
                    responseType = 'social-media';
                    dropdownItems = [{
                        id: 'facebook-icon',
                        platform: 'Facebook',
                        iconUrl: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=64'
                    }];
                }
                // 3. YouTube Comment
                else if (messageLower.includes('youtube comment') || messageLower === 'youtube comment' || messageLower.includes('youtube')) {
                    hasPredefinedResponse = true;
                    botResponse = '💬 Comment Statistics\n\n📊 Overview:\n• New Comments: 45\n• Pending Replies: 12\n• Engagement Rate: +18% this week\n• Response Time: Average 4 hours\n\n💭 Latest Comment:\n"Excellent video! Very informative."\n\n✅ Action: Reply pending';
                    responseType = 'social-media';
                    dropdownItems = [{
                        id: 'youtube-icon',
                        platform: 'YouTube',
                        iconUrl: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64'
                    }];
                }
                // 4. Instagram Comment
                else if (messageLower.includes('instagram comment') || messageLower === 'instagram comment' || messageLower.includes('instagram')) {
                    hasPredefinedResponse = true;
                    botResponse = '💬 Comment Statistics\n\n📊 Overview:\n• New Comments: 67\n• Pending Replies: 15\n• Engagement Rate: +25% this week\n• Response Time: Average 2.5 hours\n\n💭 Latest Comment:\n"Beautiful design! Where can I buy this?"\n\n✅ Action: Reply pending';
                    responseType = 'social-media';
                    dropdownItems = [{
                        id: 'instagram-icon',
                        platform: 'Instagram',
                        iconUrl: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=64'
                    }];
                }
                // 5. LinkedIn Comment
                else if (messageLower.includes('linkedin comment') || messageLower === 'linkedin comment' || messageLower.includes('linkedin')) {
                    hasPredefinedResponse = true;
                    botResponse = '💬 Comment Statistics\n\n📊 Overview:\n• New Comments: 19\n• Pending Replies: 6\n• Engagement Rate: +12% this week\n• Response Time: Average 5 hours\n\n💭 Latest Comment:\n"Impressive company growth! Congratulations!"\n\n✅ Action: Reply pending';
                    responseType = 'social-media';
                    dropdownItems = [{
                        id: 'linkedin-icon',
                        platform: 'LinkedIn',
                        iconUrl: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=64'
                    }];
                }
            }

            // YTM PA specific responses
            if (botId === 'ytm-bot') {
                const messageLower = message.toLowerCase().trim();

                // 1. Dashboard Analytics
                if (messageLower.includes('dashboard analytics') || messageLower === 'dashboard analytics' || messageLower.includes('dashboard') || messageLower.includes('analytics')) {
                    hasPredefinedResponse = true;
                    botResponse = '📊 Dashboard Analytics\n\nKey metrics and performance overview';
                    responseType = 'ytm-image';
                    dropdownItems = [{
                        id: 'dashboard-analytics',
                        image: '/assets/bot-images/dashboard-analytics.png',
                        name: 'Dashboard Analytics'
                    }];
                }
                // 2. Repair Machine Status
                else if (messageLower.includes('repair machine status') || messageLower === 'repair machine status' || messageLower.includes('repair machine') || messageLower.includes('machine repair')) {
                    hasPredefinedResponse = true;
                    botResponse = '🔧 Repair Machine Status\n\nActive: 1 | Completed: 3 | Pending: 2';
                }
                // 3. Maintenance Schedule
                else if (messageLower.includes('maintenance schedule') || messageLower === 'maintenance schedule' || messageLower.includes('maintenance') || messageLower.includes('schedule')) {
                    hasPredefinedResponse = true;
                    botResponse = '📅 Maintenance Schedule\n\nThis week: 3 scheduled | Next week: 5 scheduled';
                    responseType = 'ytm-image';
                    dropdownItems = [{
                        id: 'maintenance-schedule',
                        image: '/assets/bot-images/maintenance-schedule.png',
                        name: 'Maintenance Schedule'
                    }];
                }
                // 4. Late Maintenance Alert
                else if (messageLower.includes('late maintenance alert') || messageLower === 'late maintenance alert' || messageLower.includes('late maintenance') || messageLower.includes('maintenance alert')) {
                    hasPredefinedResponse = true;
                    botResponse = '⚠️ Late Maintenance Alert\n\n3 machines require immediate attention';
                }
                // 5. Machine Invoice
                else if (messageLower.includes('machine invoice') || messageLower === 'machine invoice' || messageLower.includes('invoice')) {
                    hasPredefinedResponse = true;
                    botResponse = '📄 Machine Invoice\n\nTotal paid: $2,500 | Pending: $5,000';
                    responseType = 'ytm-image';
                    dropdownItems = [{
                        id: 'machine-invoice',
                        image: '/assets/bot-images/machine-invoice.png',
                        name: 'Machine Invoice'
                    }];
                }
            }

            // Check if we should use Gemini API (ONLY when no predefined response found)
            const isDefaultResponse = botResponse === `Hello! I'm ${bot.name}. You asked: "${message}". ${bot.description}. How can I help you today?`;
            
            // Only use Gemini API if there's NO predefined response (hasPredefinedResponse is false)
            if (!hasPredefinedResponse && (isDefaultResponse || shouldUseGemini(message, hasPredefinedResponse))) {
                try {
                    // Generate response using Gemini API with stored chat history
                    const geminiResponse = await generateGeminiResponse(
                        message,
                        bot.name,
                        bot.description,
                        chatHistoryForGemini
                    );
                    
                    botResponse = geminiResponse;
                } catch (error) {
                    console.error('Error calling Gemini API:', error);
                    // Keep the default response if API fails
                }
            }

            setBotStates(prev => {
                const botState = prev[botId];
                const messageObj = { from: 'bot', text: botResponse };
                if (responseType === 'button' && buttonText) {
                    messageObj.type = 'button';
                    messageObj.buttonText = buttonText;
                } else if (responseType === 'dropdown' && dropdownItems) {
                    messageObj.type = 'dropdown';
                    messageObj.dropdownItems = dropdownItems;
                } else if (responseType === 'invoice-list' && dropdownItems) {
                    messageObj.type = 'invoice-list';
                    messageObj.dropdownItems = dropdownItems;
                } else if (responseType === 'invoice-image' && dropdownItems && dropdownItems[0]) {
                    messageObj.type = 'invoice-image';
                    messageObj.imageUrl = dropdownItems[0].image;
                    messageObj.invoiceName = dropdownItems[0].text;
                } else if (responseType === 'ppc-image' && dropdownItems && dropdownItems[0]) {
                    messageObj.type = 'ppc-image';
                    messageObj.imageUrl = dropdownItems[0].image;
                    messageObj.imageName = dropdownItems[0].name || dropdownItems[0].text;
                } else if (responseType === 'ytm-image' && dropdownItems && dropdownItems[0]) {
                    messageObj.type = 'ytm-image';
                    messageObj.imageUrl = dropdownItems[0].image;
                    messageObj.imageName = dropdownItems[0].name || dropdownItems[0].text;
                } else if (responseType === 'social-media' && dropdownItems && dropdownItems[0]) {
                    messageObj.type = 'social-media';
                    messageObj.iconUrl = dropdownItems[0].iconUrl;
                    messageObj.platform = dropdownItems[0].platform;
                    // Keep botResponse as the text content
                }
                const updatedMessages = [...botState.messages, messageObj];

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

            {/* Yai Data Header with Dropdown - Top Left */}
            <div className="absolute top-4 left-4 z-50 pointer-events-none">
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
                    .bot-icon-container-modules {
                        position: relative;
                        animation: float 3s ease-in-out infinite;
                    }
                    .bot-icon-glow-modules {
                        animation: pulse-glow 2s ease-in-out infinite;
                    }
                    .rotating-ring-modules {
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
                    .rotating-ring-2-modules {
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
                    .sparkle-modules {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: white;
                        border-radius: 50%;
                        animation: sparkle 2s ease-in-out infinite;
                    }
                    .sparkle-1-modules { top: 10%; left: 20%; animation-delay: 0s; }
                    .sparkle-2-modules { top: 20%; right: 15%; animation-delay: 0.5s; }
                    .sparkle-3-modules { bottom: 15%; left: 25%; animation-delay: 1s; }
                    .sparkle-4-modules { bottom: 10%; right: 20%; animation-delay: 1.5s; }
                `}</style>
                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className={`relative ${isDropdownOpen ? '' : 'bot-icon-container-modules'}`}>
                        {/* Rotating Rings - Only show when dropdown is closed */}
                        {!isDropdownOpen && (
                            <>
                                <div className="rotating-ring-modules"></div>
                                <div className="rotating-ring-2-modules"></div>

                                {/* Sparkles - Only show when dropdown is closed */}
                                <div className="sparkle-modules sparkle-1-modules"></div>
                                <div className="sparkle-modules sparkle-2-modules"></div>
                                <div className="sparkle-modules sparkle-3-modules"></div>
                                <div className="sparkle-modules sparkle-4-modules"></div>
                            </>
                        )}

                        <button
                            onClick={() => setDropdownOpen(prev => !prev)}
                            className={`relative rounded-full hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 z-10 pointer-events-auto ${isDropdownOpen ? '' : 'bot-icon-glow-modules'}`}
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
                        <div className="absolute top-full mt-2 left-0 w-72 bg-white/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[60] pointer-events-auto">
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
            </div>

            {/* Overlay to close dropdown when clicking outside */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                />
            )}

            {/* Horizontal Scrollable Phone Interfaces */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-x-scroll overflow-y-hidden scroll-smooth px-2 sm:px-4 pt-20 sm:pt-24 custom-scrollbar"
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
                                            botId={bot.id}
                                            onShowInvoice={(item) => {
                                                // Directly add invoice image message
                                                setBotStates(prev => {
                                                    const botState = prev[bot.id];
                                                    if (!botState) return prev;

                                                    const invoiceMessage = {
                                                        from: 'bot',
                                                        text: `Invoice: ${item.text}`,
                                                        type: 'invoice-image',
                                                        imageUrl: item.image,
                                                        invoiceName: item.text
                                                    };
                                                    const updatedMessages = [...botState.messages, invoiceMessage];
                                                    const updatedHistory = botState.currentChatId ? botState.chatHistory.map(chat =>
                                                        chat.id === botState.currentChatId ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() } : chat
                                                    ) : botState.chatHistory;

                                                    return {
                                                        ...prev,
                                                        [bot.id]: {
                                                            ...prev[bot.id],
                                                            messages: updatedMessages,
                                                            chatHistory: updatedHistory
                                                        }
                                                    };
                                                });
                                            }}
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
                        })}
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
