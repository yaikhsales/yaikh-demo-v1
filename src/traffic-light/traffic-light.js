import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, X } from 'lucide-react';

const TrafficLight = ({ onBack }) => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState('1Day');
    const [selectedLocation, setSelectedLocation] = useState('All Location');
    const [currentReactionIndex, setCurrentReactionIndex] = useState(0);
    
    // Array of different reaction emojis
    const reactions = ['😊', '😢', '😂', '😄', '🤩', '😍', '😎', '🥳', '😋', '😃', '😁', '😆'];
    
    // Change reaction every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReactionIndex((prevIndex) => (prevIndex + 1) % reactions.length);
        }, 30000); // 30 seconds
        
        return () => clearInterval(interval);
    }, [reactions.length]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleRefresh = () => {
        // Refresh logic here
        console.log('Refreshing data...');
    };

    // Sample data for Lines 21-30
    const lineData = {
        'Line 21': ['L21-3 GPAR12270-1', 'L21-4 GPAR12270-1', 'L21-5 GPAR12270-1'],
        'Line 22': ['L22-1 GPAR12270-1', 'L22-2 GPAR12270-1', 'L22-3 GPAR12270-1'],
        'Line 23': ['L23-5 GPAR12270-1', 'L23-6 GPAR12270-1', 'L23-7 GPAR12270-1'],
        'Line 24': ['L24-1 GPAR12270-1', 'L24-2 GPAR12270-1', 'L24-3 GPAR12270-1'],
        'Line 25': ['L25-1 GPAR12270-1', 'L25-2 GPAR12270-1', 'L25-3 GPAR12270-1'],
        'Line 26': ['L26-1 GPAR12270-1', 'L26-2 GPAR12270-1', 'L26-3 GPAR12270-1'],
        'Line 27': ['L27-1 GPAR12270-1', 'L27-2 GPAR12270-1', 'L27-3 GPAR12270-1'],
        'Line 28': ['L28-1 GPAR12270-1', 'L28-2 GPAR12270-1', 'L28-3 GPAR12270-1'],
        'Line 29': ['L29-1 GPAR12270-1', 'L29-2 GPAR12270-1', 'L29-3 GPAR12270-1'],
        'Line 30': ['L30-1 GPAR12270-1', 'L30-2 GPAR12270-1', 'L30-3 GPAR12270-1']
    };

    // Assign different reaction index to each line (so each shows a different face)
    const lineReactionMap = {
        'Line 21': 0,  // 😊
        'Line 22': 1,  // 😢
        'Line 23': 2,  // 😂
        'Line 24': 3,  // 😄
        'Line 25': 4,  // 🤩
        'Line 26': 5,  // 😍
        'Line 27': 6,  // 😎
        'Line 28': 7,  // 🥳
        'Line 29': 8,  // 😋
        'Line 30': 9   // 😃
    };

    // Sample data for Printing Area (PA-PJ)
    const printingAreaData = {
        'PA': ['PA-001 GPAR12270-1', 'PA-002 GPAR12270-1'],
        'PB': ['PB-001 GPAR12270-1', 'PB-002 GPAR12270-1'],
        'PC': ['PC-001 GPAR12270-1', 'PC-002 GPAR12270-1'],
        'PD': ['PD-001 GPAR12270-1', 'PD-002 GPAR12270-1'],
        'PE': ['PE-001 GPAR12270-1', 'PE-002 GPAR12270-1'],
        'PF': ['PF-001 GPAR12270-1', 'PF-002 GPAR12270-1'],
        'PG': ['PG-001 GPAR12270-1', 'PG-002 GPAR12270-1'],
        'PH': ['PH-001 GPAR12270-1', 'PH-002 GPAR12270-1'],
        'PI': ['PI-001 GPAR12270-1', 'PI-002 GPAR12270-1'],
        'PJ': ['PJ-001 GPAR12270-1', 'PJ-002 GPAR12270-1']
    };

    // Sample data for Hot Stamping Area (SA-PN)
    const hotStampingAreaData = {
        'SA': ['SA-001 GPAR12270-1', 'SA-002 GPAR12270-1'],
        'SB': ['SB-001 GPAR12270-1', 'SB-002 GPAR12270-1'],
        'SC': ['SC-001 GPAR12270-1', 'SC-002 GPAR12270-1'],
        'SD': ['SD-001 GPAR12270-1', 'SD-002 GPAR12270-1'],
        'SE': ['SE-001 GPAR12270-1', 'SE-002 GPAR12270-1'],
        'SF': ['SF-001 GPAR12270-1', 'SF-002 GPAR12270-1'],
        'SG': ['SG-001 GPAR12270-1', 'SG-002 GPAR12270-1'],
        'SH': ['SH-001 GPAR12270-1', 'SH-002 GPAR12270-1'],
        'SI': ['SI-001 GPAR12270-1', 'SI-002 GPAR12270-1'],
        'SJ': ['SJ-001 GPAR12270-1', 'SJ-002 GPAR12270-1'],
        'SK': ['SK-001 GPAR12270-1', 'SK-002 GPAR12270-1'],
        'SL': ['SL-001 GPAR12270-1', 'SL-002 GPAR12270-1'],
        'SM': [],
        'SN': []
    };

    // Get current date
    const getCurrentDate = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const dayName = days[today.getDay()];
        const month = months[today.getMonth()];
        const day = today.getDate();
        const year = today.getFullYear();
        return `DayUp ${dayName}, ${month} ${day}, ${year}`;
    };

    const renderGridColumn = (title, items, reactionIndex = null, isRed = false) => {
        // Calculate which reaction to show for this column (different for each, rotating)
        const columnReactionIndex = reactionIndex !== null 
            ? (reactionIndex + currentReactionIndex) % reactions.length
            : null;
        
        return (
        <div key={title} className="flex flex-col border-r border-gray-600 min-w-[150px] flex-shrink-0">
            {/* Icon Row */}
            <div className="bg-gray-800 border-b border-gray-600 p-1 text-center min-h-[40px] flex items-center justify-center">
                {columnReactionIndex !== null ? (
                    <span className="text-3xl transition-all duration-500 animate-pulse">
                        {reactions[columnReactionIndex]}
                    </span>
                ) : (
                    <div className="w-10 h-10"></div>
                )}
            </div>
            {/* Line Header Row */}
            <div className="bg-gray-800 border-b border-gray-600 p-2 text-center min-h-[40px] flex items-center justify-center">
                <span className="text-white font-semibold text-sm whitespace-nowrap">{title}</span>
            </div>
            {/* Data Rows */}
            <div className="flex-1 bg-gray-900">
                {items.length > 0 ? (
                    items.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`p-2 border-b border-gray-700 text-xs ${isRed ? 'text-red-400' : 'text-white'} whitespace-normal break-words`}
                            style={{ 
                                wordBreak: 'break-word', 
                                overflowWrap: 'break-word',
                                lineHeight: '1.4'
                            }}
                        >
                            {item}
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-gray-600 text-xs text-center min-h-[40px] flex items-center justify-center">-</div>
                )}
            </div>
        </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-gray-900 flex flex-col overflow-hidden z-[100]">
            <style>{`
                .scrollbar-thin::-webkit-scrollbar {
                    height: 8px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #1f2937;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #4b5563;
                    border-radius: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #6b7280;
                }
            `}</style>
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-gray-700 rounded transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span className="font-medium">Back</span>
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 hover:border-orange-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0 bg-orange-500"
                            title="Home"
                        >
                            <img 
                                src="/logo.jpg" 
                                alt="Home" 
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>
                    <h1 className="text-base font-bold text-white flex-1 text-center">{getCurrentDate()}</h1>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={handleBack}
                            className="px-3 py-1.5 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-1"
                        >
                            <X size={16} />
                            Exit
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Filter Bar */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2.5 flex items-center gap-2 flex-wrap">
                {['1Day', '2Day', '3Day', '4Day', '7Day'].map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                            selectedDay === day
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {day}
                    </button>
                ))}
                <button
                    className="px-4 py-1.5 rounded text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                >
                    AB
                </button>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-1.5 rounded text-sm font-medium bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                    <option>All Location</option>
                    <option>Location 1</option>
                    <option>Location 2</option>
                </select>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-1.5 rounded text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors flex items-center gap-1.5"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
                {/* Workshop Section (车间) */}
                <div className="mb-5">
                    <div className="text-white font-bold text-base mb-2 px-1">车间</div>
                    <div className="bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {Object.entries(lineData).map(([line, items]) => (
                                renderGridColumn(
                                    line,
                                    items,
                                    lineReactionMap[line],
                                    line === 'Line 21' || line === 'Line 23'
                                )
                            ))}
                        </div>
                    </div>
                </div>

                {/* Printing Area Section (待印花区) */}
                <div className="mb-5">
                    <div className="text-white font-bold text-base mb-2 px-1">待印花区</div>
                    <div className="bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {Object.entries(printingAreaData).map(([area, items]) => (
                                renderGridColumn(area, items)
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hot Stamping Area Section (待烫标区) */}
                <div className="mb-5">
                    <div className="text-white font-bold text-base mb-2 px-1">待烫标区</div>
                    <div className="bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {Object.entries(hotStampingAreaData).map(([area, items]) => (
                                renderGridColumn(area, items)
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Logo */}
                <div className="flex justify-center items-center mt-8 mb-4 gap-4">
                    <div className="text-gray-500 text-xs">xiaomi</div>
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrafficLight;

