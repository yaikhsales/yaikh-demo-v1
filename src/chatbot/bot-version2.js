import React, { useState, useEffect, useMemo } from 'react';
import {
    X,
    Send,
    Sparkles,
    MessageSquare,
    Stars,
    BookmarkCheck,
    NotebookPen,
    Compass
} from 'lucide-react';

const BotVersion2 = ({ onClose, moduleContext }) => {
    const moduleTitle = moduleContext?.title || 'your module';
    const friendlyName = useMemo(() => moduleTitle.replace(/_/g, ' '), [moduleTitle]);

    const buildWelcome = () =>
        `Welcome to ${friendlyName}! I'm the Yaikh Bot Version2. Ask me anything about this module, workflows, or best practices.`;

    const buildHelper = () =>
        `I'm ready to help you get the most out of ${friendlyName}. Try a quick action below or type your own request.`;

    const suggestionTemplates = [
        `Give me an overview of ${friendlyName}`,
        `What are the key actions inside ${friendlyName}?`,
        `Show pending tasks in ${friendlyName}`,
        `Who can approve items in ${friendlyName}?`
    ];

    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', text: buildWelcome() },
        { id: 2, from: 'bot', text: buildHelper() }
    ]);
    const [input, setInput] = useState('');

    useEffect(() => {
        setMessages([
            { id: 1, from: 'bot', text: buildWelcome() },
            { id: 2, from: 'bot', text: buildHelper() }
        ]);
        setInput('');
    }, [friendlyName]);

    const appendBotResponse = (userText) => {
        const botReply = `Great question about ${friendlyName}! I'm compiling guidance so you can navigate ${friendlyName} confidently. I’ll keep learning from your feedback.`;
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: botReply }]);
        }, 800);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { id: Date.now(), from: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        appendBotResponse(input.trim());
    };

    const handleSuggestionClick = (text) => {
        const userMessage = { id: Date.now(), from: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        appendBotResponse(text);
    };

    return (
        <div className="fixed inset-0 z-[140] bg-slate-950 text-white flex flex-col">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute -top-24 -right-10 w-96 h-96 bg-purple-500/20 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px]"></div>
            </div>

            <div className="relative flex flex-col h-full overflow-hidden">
                <header className="p-4 sm:p-6 lg:p-8 border-b border-white/10 flex flex-col gap-4 overflow-y-auto">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center shadow-lg">
                                <Sparkles size={26} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50">Yaikh Bot Version2</p>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{friendlyName}</h1>
                                <p className="text-sm text-white/70">Personalized assistant for this module</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="self-start xl:self-auto px-4 py-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-2 transition"
                        >
                            <X size={18} />
                            Close
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Module', value: friendlyName, icon: MessageSquare },
                            { label: 'Status', value: (moduleContext?.status || 'Active').toUpperCase(), icon: Stars },
                            { label: 'Demo Type', value: moduleContext?.demoType || 'Standard', icon: NotebookPen },
                            { label: 'Shortcode', value: moduleContext?.id || 'N/A', icon: Compass }
                        ].map((info, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                                <info.icon size={20} className="text-cyan-300" />
                                <div className="flex flex-col">
                                    <p className="text-[10px] uppercase tracking-wide text-white/40">{info.label}</p>
                                    <p className="text-sm font-semibold text-white truncate">{info.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {suggestionTemplates.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm text-white/80 hover:bg-white/10 transition"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col xl:flex-row gap-4 h-full">
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col min-h-[300px]">
                            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[90%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                                msg.from === 'user'
                                                    ? 'bg-gradient-to-br from-sky-500 to-purple-500 text-white shadow-lg rounded-br-none'
                                                    : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="p-4 border-t border-white/10 flex gap-3"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={`Ask something about ${friendlyName}...`}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                                <button
                                    type="submit"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-xl hover:opacity-90 transition"
                                >
                                    <Send size={20} className="text-white" />
                                </button>
                            </form>
                        </div>

                        <aside className="w-full xl:w-[340px] flex flex-col gap-4">
                            <div className="bg-gradient-to-br from-purple-600/80 to-blue-600/80 border border-white/10 rounded-2xl p-5 shadow-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <BookmarkCheck size={20} className="text-white" />
                                    <p className="text-sm font-semibold tracking-wide uppercase text-white/80">Assistant Notes</p>
                                </div>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    I automatically tailor my responses to the <span className="font-semibold">{friendlyName}</span> module.
                                    The more you interact, the smarter I become for your workflows.
                                </p>
                                <ul className="mt-4 space-y-2 text-white/80 text-sm">
                                    <li>• Summaries of module capabilities</li>
                                    <li>• Step-by-step walkthroughs</li>
                                    <li>• Approvals & escalation hints</li>
                                </ul>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Quick Prompts</p>
                                {['Show recent activity', 'List required inputs', 'Explain automation options'].map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(`${prompt} for ${friendlyName}`)}
                                        className="w-full text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-white/80 text-sm hover:bg-white/10 transition"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotVersion2;
