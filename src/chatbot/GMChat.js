import React, { useState, useRef, useEffect } from 'react';
import { X, Bell, Mic, MessageSquare, Layers, Database, Sparkles, Send } from 'lucide-react';
import { generateGeminiResponse } from './gemini-api';

const GMChat = ({ onClose }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateBotResponse = async (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        
        // Keep simple predefined responses for basic greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! How can I assist you today? I'm here to help with tasks, modules, data collection, and answer any questions you have about Yaikh platform or general topics.";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Use Gemini API for all other queries - modules, general questions, website info, world information
        try {
            // Build comprehensive context about Yaikh platform and modules
            const yaikhContext = `You are Yai, an intelligent AI assistant for Yaikh (Yaikh.com), an AI platform developed by TexLink Technologies Co., Ltd.

Yaikh Platform Information:
- Website: https://yaikh.com/ (demo/portfolio site)
- Main Application: https://ym.yaikh.com/ (real production system)
- Company: TexLink Technologies Co., Ltd.
- Location: Phnom Penh, Cambodia
- Contact: [email protected], +855 96 575 4574

Yaikh Specializations:
- Yai Digitalization: Digital transformation solutions
- Yai AiOT: AI and Internet of Things integration
- Yai Bots: AI-powered chatbot solutions
- Yai E-com: E-commerce solutions
- Yai Gov: Government digitalization solutions

Available Modules in Yaikh Dashboard:

ADMINISTRATION SECTION:
- Accountant: Purchase Request, E-Invoicing
- HR: YHR, Salary Bill, Org Chart, Training, Temp Work Request, Speak Up
- Admin: Support Ticket, Purchase Request, Y Shop (Stationery), Bill Record, Gate Pass, Meeting Room, My Car Booking, Fire Alarm, CCTV
- CSR: Digital Audit, Energy, Air, Water, Waste, Chemical
- E-GOV: E-GOVERNMENT

MANAGEMENT DASHBOARD:
- System Analysis

OPERATIONS SECTION:
- QA: YQMS, FC
- Production: Traffic Light, YTM, CE, YTM Shop
- DT Sync: DT Sync, Master Plan, Line Plan, PPM, TNA
- PRE PRO: TEC PACK, PPS, Sample
- Production Materials: Material Purchase

AI Assistant Bots (Yai 1 & Yai 2):
- Finance PA: Financial management, budgeting, accounting, purchase requests, invoices, payments
- Admin PA: Administrative operations, support tickets, food menu, car fuel tracking, security issues, job applications
- CSR PA: Corporate social responsibility, induction training, 6S reports, compliance certificates, audit checklists, equipment handling
- PPC PA: Production planning and control, order status, delay alerts, action items, supplier alerts, master plans, line plans
- Production PA: Production scheduling, inventory tracking, workflow optimization, quality metrics monitoring, production status
- Sale PA: Sales order management, buyer communications, quotations, email management, customer factory visits
- QMS PA: Quality management, defect inspections, third-party audits, buyer visits, pre-production meetings
- Social PA: Social media management for TikTok, Facebook, YouTube, Instagram, LinkedIn comments and engagement
- YTM PA: Yield to maturity tracking, machine maintenance schedules, repair status, late maintenance alerts, machine invoices, dashboard analytics

You can answer questions about:
1. Any Yaikh modules and their functions - provide detailed explanations
2. How to use the platform and navigate modules
3. General information and knowledge about any topic
4. Website-related questions about Yaikh
5. World information, current events, and general knowledge
6. Technical questions and explanations
7. Business and enterprise management topics
8. Any other questions users may have

Provide helpful, accurate, and professional responses. Be concise but informative. Use emojis appropriately for better readability. When answering about modules, be specific and helpful.`;

            // Get conversation history for context
            const chatHistory = messages.map(msg => ({
                from: msg.sender === 'user' ? 'user' : 'bot',
                text: msg.text
            }));

            // Generate response using Gemini API
            const geminiResponse = await generateGeminiResponse(
                userMessage,
                'Yai',
                yaikhContext,
                chatHistory
            );

            return geminiResponse;
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            // Fallback response
            return `I understand you're asking about "${userMessage}". I'm having trouble processing that right now. Could you please rephrase your question or try again?`;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        // Add user message
        const userMsg = { id: Date.now(), text: newMessage, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const currentMessage = newMessage;
        setNewMessage('');
        setIsTyping(true);

        // Generate bot response using Gemini API
        try {
            const botResponse = await generateBotResponse(currentMessage);
            const botMsg = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error generating response:', error);
            const botMsg = { id: Date.now() + 1, text: "I apologize, but I'm having trouble processing your request right now. Please try again.", sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleActionClick = async (action) => {
        // Handle action clicks (Speak, Chat, All modules, Data Collection)
        let actionMessage = '';
        switch(action) {
            case 'speak':
                actionMessage = "I want to see my salary bill";
                break;
            case 'chat':
                actionMessage = "I want to see my group chat";
                break;
            case 'modules':
                actionMessage = "show me my modules";
                break;
            case 'data':
                actionMessage = "I want to see my chat history";
                break;
            default:
                return;
        }
        
        // Add user message
        const userMsg = { id: Date.now(), text: actionMessage, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Generate bot response using Gemini API
        try {
            const botResponse = await generateBotResponse(actionMessage);
            const botMsg = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error generating response:', error);
            const botMsg = { id: Date.now() + 1, text: "I apologize, but I'm having trouble processing your request right now. Please try again.", sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const showInitialView = messages.length === 0;
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[100] flex items-center justify-center animate-in fade-in duration-500">
            {/* Main UI Frame - Full Screen Responsive Design */}
            <div className="relative bg-black border border-white/10 md:rounded-3xl shadow-2xl w-full h-full md:h-[95vh] md:max-h-[900px] md:w-[95vw] md:max-w-[1400px] overflow-hidden flex flex-col text-white font-sans">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-white/50 hover:bg-white/10 hover:text-white rounded-full transition-colors z-10">
                    <X size={24} className="md:w-6 md:h-6" />
                </button>

                {/* 1. Header Section */}
                <header className="p-3 md:p-6 pt-10 md:pt-16 pb-3 md:pb-6 flex-shrink-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        {/* User Avatar */}
                        <img 
                            src="/assets/modules-image/top-bot.png" 
                            alt="User Avatar" 
                            className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/20 shadow-lg flex-shrink-0"
                        />
                        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-white truncate">My AI Agent</h2>

                        
                        {/* Bell Icon */}
                        <div className="relative flex-shrink-0">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800/80 flex items-center justify-center">
                                <Bell size={16} className="md:w-5 md:h-5 text-white/80" />
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] xs:text-xs md:text-sm lg:text-base text-white/70 mt-1 md:mt-2 leading-relaxed line-clamp-2">
                        Control tasks effortlessly, from creating visuals to organizing your calendar.
                    </p>
                </header>

                {/* 2. Content Area - Shows either initial view or chat messages */}
                <div className="flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-4 md:py-6 relative overflow-y-auto min-h-0">
                    {showInitialView ? (
                        <>
                            {/* Central Glowing Orb */}
                            <div className="flex flex-col items-center justify-start py-4 md:py-8 relative min-h-full">
                                {/* Glowing Orb - Responsive sizing - Smaller on mobile to fit all content */}
                                <div className="relative w-40 h-40 xs:w-44 xs:h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-6 md:mb-8 lg:mb-12 flex-shrink-0">
                                    {/* Outer Glow Ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 via-pink-400/30 via-yellow-300/30 to-blue-300/30 blur-2xl animate-pulse"></div>
                                    
                                    {/* Main Orb */}
                                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 via-yellow-400 to-blue-400 shadow-[0_0_80px_rgba(139,92,246,0.8),0_0_120px_rgba(236,72,153,0.6),0_0_160px_rgba(250,204,21,0.4),inset_0_0_40px_rgba(255,255,255,0.1)] animate-pulse"></div>
                                    
                                    {/* Inner Highlight */}
                                    <div className="absolute top-3 left-3 md:top-4 md:left-4 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 blur-xl"></div>
                                    
                                    {/* Sparkle Icons on Orb */}
                                    <div className="absolute top-6 left-8 md:top-8 md:left-12 lg:top-10 lg:left-14 z-10">
                                        <Sparkles size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6 text-white drop-shadow-2xl animate-pulse" />
                                    </div>
                                    <div className="absolute bottom-8 right-10 md:bottom-10 md:right-14 lg:bottom-12 lg:right-16 z-10">
                                        <Sparkles size={14} className="md:w-4 md:h-4 lg:w-5 lg:h-5 text-white drop-shadow-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                                    </div>
                                    
                                    {/* Purple Glow Below - Elongated */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-28 h-20 md:w-32 md:h-24 lg:w-40 lg:h-32 bg-gradient-to-b from-purple-500/50 via-purple-400/30 to-transparent blur-3xl"></div>
                                </div>

                                {/* Interaction Cards Grid - Responsive - Ensure all visible */}
                                <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-3 md:gap-4 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg pb-4 flex-shrink-0">
                                    {/* My Salary Bill - Top Left */}
                                    <button 
                                        onClick={() => handleActionClick('speak')}
                                        className="bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border border-white/10 min-h-[90px] xs:min-h-[100px] sm:min-h-[110px] md:min-h-[120px] group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-1">
                                            <Mic 
                                                size={24} 
                                                className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform duration-200" 
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <span className="text-white text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-center leading-tight tracking-tight">
                                            My Salary Bill
                                        </span>
                                    </button>

                                    {/* My Group Chat - Top Right */}
                                    <button 
                                        onClick={() => handleActionClick('chat')}
                                        className="bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border border-white/10 min-h-[90px] xs:min-h-[100px] sm:min-h-[110px] md:min-h-[120px] group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-1">
                                            <MessageSquare 
                                                size={24} 
                                                className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform duration-200" 
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <span className="text-white text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-center leading-tight tracking-tight">
                                            My Group Chat
                                        </span>
                                    </button>

                                    {/* My Modules - Bottom Left */}
                                    <button 
                                        onClick={() => handleActionClick('modules')}
                                        className="bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border border-white/10 min-h-[90px] xs:min-h-[100px] sm:min-h-[110px] md:min-h-[120px] group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-1">
                                            <Layers 
                                                size={24} 
                                                className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform duration-200" 
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <span className="text-white text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-center leading-tight tracking-tight">
                                            My Modules
                                        </span>
                                    </button>

                                    {/* My Chat History - Bottom Right */}
                                    <button 
                                        onClick={() => handleActionClick('data')}
                                        className="bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg border border-white/10 min-h-[90px] xs:min-h-[100px] sm:min-h-[110px] md:min-h-[120px] group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-1">
                                            <Database 
                                                size={24} 
                                                className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white group-hover:scale-110 transition-transform duration-200" 
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <span className="text-white text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-center leading-tight tracking-tight">
                                            My Chat History
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Chat Messages Area */}
                            <div className="flex-1 overflow-y-auto mb-4 space-y-3 md:space-y-4 pr-2">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex items-start gap-2 md:gap-3 ${
                                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        {message.sender === 'bot' && (
                                            <img 
                                                src="/assets/modules-image/top-bot.png" 
                                                alt="Bot" 
                                                className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-purple-400/50 flex-shrink-0" 
                                            />
                                        )}
                                        <div
                                            className={`max-w-[75%] md:max-w-[70%] lg:max-w-[65%] rounded-2xl px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm lg:text-base ${
                                                message.sender === 'user'
                                                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-none'
                                                    : 'bg-slate-800/80 text-white/90 rounded-bl-none border border-white/10'
                                            }`}
                                        >
                                            {message.text}
                                        </div>
                                        {message.sender === 'user' && (
                                            <div className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs md:text-sm font-bold">SK</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex items-start gap-2 md:gap-3">
                                        <img 
                                            src="/assets/modules-image/top-bot.png" 
                                            alt="Bot" 
                                            className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-purple-400/50 flex-shrink-0" 
                                        />
                                        <div className="bg-slate-800/80 rounded-2xl rounded-bl-none px-3 py-2 md:px-4 md:py-3 border border-white/10">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </>
                    )}
                </div>

                {/* 4. Bottom Input Field */}
                <footer className="p-4 md:p-6 pt-4 pb-4 md:pb-6">
                    <form onSubmit={handleSendMessage} className="relative bg-slate-900/50 border border-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl flex items-center p-2 md:p-3 gap-2 md:gap-3">
                        <input 
                            type="text"
                            placeholder="Ask anything"
                            className="flex-1 bg-transparent text-xs md:text-sm lg:text-base placeholder:text-white/40 outline-none text-white"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity flex-shrink-0"
                        >
                            {newMessage.trim() ? (
                                <Send size={16} className="md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                            ) : (
                                <Sparkles size={16} className="md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                            )}
                        </button>
                    </form>
                </footer>

            </div>
        </div>
    );
};

export default GMChat;
