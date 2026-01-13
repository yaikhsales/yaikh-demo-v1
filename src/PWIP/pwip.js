import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, X } from 'lucide-react';

const PWIP = ({ onBack }) => {
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

    // Generate data for Lines 1-30
    const generateLineData = (prefix) => {
        const data = {};
        for (let i = 1; i <= 30; i++) {
            data[`Line ${i}`] = [
                `${prefix}${i}-1 GPAR12270-1`,
                `${prefix}${i}-2 GPAR12270-1`,
                `${prefix}${i}-3 GPAR12270-1`
            ];
        }
        return data;
    };

    // Sample data for Sewing (Lines 1-30)
    const sewingData = generateLineData('S');

    // Assign different reaction index to each line (so each shows a different face)
    const generateLineReactionMap = () => {
        const map = {};
        for (let i = 1; i <= 30; i++) {
            map[`Line ${i}`] = (i - 1) % reactions.length;
        }
        return map;
    };

    const lineReactionMap = generateLineReactionMap();

    // Sample data for Finishing Input (A, B, C, ...)
    const finishingInputData = {
        'A': ['A-001 GPAR12270-1', 'A-002 GPAR12270-1'],
        'B': ['B-001 GPAR12270-1', 'B-002 GPAR12270-1'],
        'C': ['C-001 GPAR12270-1', 'C-002 GPAR12270-1'],
        'D': ['D-001 GPAR12270-1', 'D-002 GPAR12270-1'],
        'E': ['E-001 GPAR12270-1', 'E-002 GPAR12270-1'],
        'F': ['F-001 GPAR12270-1', 'F-002 GPAR12270-1'],
        'G': ['G-001 GPAR12270-1', 'G-002 GPAR12270-1'],
        'H': ['H-001 GPAR12270-1', 'H-002 GPAR12270-1'],
        'I': ['I-001 GPAR12270-1', 'I-002 GPAR12270-1'],
        'J': ['J-001 GPAR12270-1', 'J-002 GPAR12270-1']
    };

    // Sample data for Packing (A, B, C, ...)
    const packingData = {
        'A': ['A-001 GPAR12270-1', 'A-002 GPAR12270-1'],
        'B': ['B-001 GPAR12270-1', 'B-002 GPAR12270-1'],
        'C': ['C-001 GPAR12270-1', 'C-002 GPAR12270-1'],
        'D': ['D-001 GPAR12270-1', 'D-002 GPAR12270-1'],
        'E': ['E-001 GPAR12270-1', 'E-002 GPAR12270-1'],
        'F': ['F-001 GPAR12270-1', 'F-002 GPAR12270-1'],
        'G': ['G-001 GPAR12270-1', 'G-002 GPAR12270-1'],
        'H': ['H-001 GPAR12270-1', 'H-002 GPAR12270-1'],
        'I': ['I-001 GPAR12270-1', 'I-002 GPAR12270-1'],
        'J': ['J-001 GPAR12270-1', 'J-002 GPAR12270-1']
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

    const renderGridColumn = (title, items, reactionIndex = null, columnColor = null) => {
        // Calculate which reaction to show for this column (different for each, rotating)
        const columnReactionIndex = reactionIndex !== null 
            ? (reactionIndex + currentReactionIndex) % reactions.length
            : null;
        
        // Determine colors for data area based on columnColor
        let dataBgColor = 'bg-gray-900';
        let textColor = 'text-white';
        let borderColor = 'border-gray-600';
        
        if (columnColor === 'green') {
            dataBgColor = 'bg-green-900/20';
            textColor = 'text-green-300';
            borderColor = 'border-green-500';
        } else if (columnColor === 'red') {
            dataBgColor = 'bg-red-900/20';
            textColor = 'text-red-300';
            borderColor = 'border-red-500';
        } else if (columnColor === 'orange') {
            dataBgColor = 'bg-orange-900/20';
            textColor = 'text-orange-300';
            borderColor = 'border-orange-500';
        }
        
        return (
        <div key={title} className={`flex flex-col border-r ${borderColor} min-w-[150px] flex-shrink-0`}>
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
            <div className={`flex-1 ${dataBgColor}`}>
                {items.length > 0 ? (
                    items.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`p-2 border-b border-gray-700 text-xs ${textColor} whitespace-normal break-words`}
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
                    <div className={`p-2 ${textColor}/50 text-xs text-center min-h-[40px] flex items-center justify-center`}>-</div>
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
                {/* Sewing Section */}
                <div className="mb-5">
                    <div className="text-white font-bold text-base mb-2 px-1">Sewing</div>
                    <div className="bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {Object.entries(sewingData).map(([line, items], index) => {
                                const colors = ['green', 'red', 'orange'];
                                const columnColor = colors[index % colors.length];
                                return renderGridColumn(
                                    line,
                                    items,
                                    lineReactionMap[line],
                                    columnColor
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Finishing Input Section */}
                <div className="mb-5">
                    <div className="text-white font-bold text-base mb-2 px-1">Finishing Input</div>
                    <div className="bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {Object.entries(finishingInputData).map(([area, items], index) => {
                                const colors = ['green', 'red', 'orange'];
                                const columnColor = colors[index % colors.length];
                                return renderGridColumn(area, items, null, columnColor);
                            })}
                        </div>
                    </div>
                </div>

                {/* Packing Section */}
                <div className="mb-5">
                    <div className="text-white font-bold text-base mb-2 px-1">Packing</div>
                    <div className="bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {Object.entries(packingData).map(([area, items], index) => {
                                const colors = ['green', 'red', 'orange'];
                                const columnColor = colors[index % colors.length];
                                return renderGridColumn(area, items, null, columnColor);
                            })}
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

export default PWIP;

