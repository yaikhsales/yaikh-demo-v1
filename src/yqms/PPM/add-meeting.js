import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    Save,
    Mic,
    Square,
    Activity,
    Calendar,
    Users,
    Tag,
    Briefcase,
    FileText,
    Hash,
    CalendarPlus,
    Languages
} from 'lucide-react';

const AddMeeting = ({ onCancel, onSave }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en-US'); // Default to English
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const [formData, setFormData] = useState({
        id: '',
        date: '',
        style: '',
        buyer: '',
        attendees: '',
        notes: ''
    });

    // Initialize Speech Recognition
    useEffect(() => {
        // Check if browser supports Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = selectedLanguage;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    setFormData(prev => ({
                        ...prev,
                        notes: prev.notes + finalTranscript
                    }));
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsRecording(false);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
                if (isRecording) {
                    // Restart if still in recording mode
                    recognition.start();
                }
            };

            recognitionRef.current = recognition;
        } else {
            console.warn('Speech Recognition not supported in this browser');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [selectedLanguage, isRecording]);

    const handleMicClick = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        if (!isRecording) {
            // Start recording
            setIsRecording(true);
            recognitionRef.current.lang = selectedLanguage;
            recognitionRef.current.start();
        } else {
            // Stop recording
            setIsRecording(false);
            recognitionRef.current.stop();
        }
    };

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);

        // If currently recording, restart with new language
        if (isRecording && recognitionRef.current) {
            recognitionRef.current.stop();
            setTimeout(() => {
                recognitionRef.current.lang = lang;
                recognitionRef.current.start();
            }, 100);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                {/* Form Header */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-slate-100 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-red-50 rounded-xl text-red-600">
                                <CalendarPlus className="w-6 h-6" />
                            </div>
                            Schedule New Meeting
                        </h2>
                        <p className="text-slate-500 text-xs font-bold mt-1 tracking-widest opacity-80">Initialize Pre-Production Strategy & Alignment</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-600 hover:rotate-90 duration-300"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1">
                    <div className="p-6 space-y-4">
                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Meeting ID */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                    <Hash className="w-3.5 h-3.5" /> Meeting ID
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                                    placeholder="Enter Meeting ID"
                                    value={formData.id}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                />
                            </div>

                            {/* Meeting Date */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                    <Calendar className="w-3.5 h-3.5" /> Meeting Date
                                </label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            {/* Style / Model */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                    <Tag className="w-3.5 h-3.5" /> Style / Model
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                                    placeholder="Enter Style / Model"
                                    value={formData.style}
                                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                />
                            </div>

                            {/* Buyer */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                    <Briefcase className="w-3.5 h-3.5" /> Buyer
                                </label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                                    value={formData.buyer}
                                    onChange={(e) => setFormData({ ...formData, buyer: e.target.value })}
                                >
                                    <option value="" disabled>Select Buyer</option>
                                    <option value="Aritzia">Aritzia</option>
                                    <option value="Costco">Costco</option>
                                    <option value="ANF">ANF</option>
                                    <option value="Reitmans">Reitmans</option>
                                </select>
                            </div>

                            {/* Attendees */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                    <Users className="w-3.5 h-3.5" /> Expected Attendees
                                </label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                                    placeholder="Number of attendees"
                                    value={formData.attendees}
                                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Meeting Minutes / Notes with Voice Feature */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                    <FileText className="w-3.5 h-3.5" /> Meeting Minutes / Notes
                                </label>
                                <div className="flex items-center gap-3">
                                    {/* Language Selector */}
                                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-full p-1 border border-slate-200">
                                        <button
                                            onClick={() => handleLanguageChange('en-US')}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${selectedLanguage === 'en-US'
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-slate-600 hover:bg-slate-200'
                                                }`}
                                            title="English"
                                        >
                                            EN
                                        </button>
                                        <button
                                            onClick={() => handleLanguageChange('km-KH')}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${selectedLanguage === 'km-KH'
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-slate-600 hover:bg-slate-200'
                                                }`}
                                            title="Khmer"
                                        >
                                            ខ្មែរ
                                        </button>
                                    </div>

                                    {/* Recording Status Badge */}
                                    {isRecording && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 rounded-full border border-red-100 animate-pulse">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                                                {selectedLanguage === 'km-KH' ? 'កំពុងថត...' : 'Recording...'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Mic Button */}
                                    <button
                                        onClick={handleMicClick}
                                        className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${isRecording
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-200 scale-110'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105'
                                            }`}
                                        title={isRecording ? "Stop Recording" : "Record Voice Notes"}
                                    >
                                        {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}

                                        {isRecording && (
                                            <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-20"></div>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="relative group">
                                <textarea
                                    className={`w-full px-6 py-5 bg-gray-50 border rounded-xl shadow-sm focus:ring-2 focus:outline-none transition-all font-medium placeholder:text-slate-300 min-h-[180px] resize-none ${isRecording
                                        ? 'border-blue-300 focus:ring-blue-500/20 focus:border-blue-400'
                                        : 'border-gray-300 focus:ring-blue-500/20 focus:border-blue-500'}`}
                                    placeholder={isRecording
                                        ? (selectedLanguage === 'km-KH' ? 'កំពុងស្តាប់កំណត់ត្រាការប្រជុំ...' : 'Listening to meeting notes...')
                                        : (selectedLanguage === 'km-KH' ? 'បញ្ចូលកំណត់ត្រាការប្រជុំ ឬថតសំឡេង...' : 'Enter meeting highlights or record voice minutes...')}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>

                                {/* Visual waveform effect when recording */}
                                {isRecording && (
                                    <div className="absolute bottom-8 right-8 flex items-end gap-1.5 h-10">
                                        {[0.4, 0.7, 0.5, 0.9, 0.3, 0.6, 0.8, 0.4, 0.6].map((v, i) => (
                                            <div key={i} className="w-1.5 bg-red-400 rounded-full" style={{ height: `${v * 100}%`, animation: `pulse 0.5s ease-in-out ${i * 0.1}s infinite alternate` }}></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {isRecording && (
                                <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.2em] text-center mt-3 flex items-center justify-center gap-2">
                                    <Activity className="w-3.5 h-3.5" />
                                    {selectedLanguage === 'km-KH'
                                        ? 'ការទទួលស្គាល់សំឡេងកម្រិតខ្ពស់កំពុងដំណើរការ'
                                        : 'High-fidelity voice recognition active'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Footer */}
                <div className="flex items-center justify-end gap-4 p-10 bg-slate-50/50 border-t border-slate-100">
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-[0.2em] shadow-sm active:scale-95"
                    >
                        Discard
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-all flex items-center uppercase tracking-[0.2em] shadow-xl shadow-red-200 active:scale-95"
                    >
                        <Save className="w-5 h-5 text-white/90" /> Confirm Schedule
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    from { height: 20%; }
                    to { height: 100%; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
};

export default AddMeeting;
