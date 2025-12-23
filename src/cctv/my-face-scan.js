import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Search, RotateCcw } from 'lucide-react';

const MyFaceScan = ({ onBack }) => {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState('2025-12-23');
    const [toDate, setToDate] = useState('2025-12-23');

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleFilter = () => {
        console.log('Filter logs:', { fromDate, toDate });
    };

    const handleReset = () => {
        setFromDate('2025-12-23');
        setToDate('2025-12-23');
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                <button 
                    onClick={handleBack} 
                    className="p-2 hover:bg-slate-100 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold px-3 py-1 text-sm"
                    aria-label="Go back"
                >
                    <ArrowLeft size={16} className="inline" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 underline">My Face Scan History</h1>
            </div>

            {/* Main Content - Full Screen */}
            <div className="flex-1 overflow-auto p-6">
                <div className="w-full h-full">
                    {/* White Card with Dashed Border - Full Width */}
                    <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-8 h-full min-h-[calc(100vh-200px)] flex flex-col">
                        {/* Filter Section */}
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            {/* From Date */}
                            <div className="flex items-center gap-3">
                                <Calendar className="text-slate-600 flex-shrink-0" size={20} />
                                <span className="text-sm text-slate-700 font-semibold whitespace-nowrap">From Date</span>
                                <div className="relative">
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                                    />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="flex items-center gap-3">
                                <Calendar className="text-slate-600 flex-shrink-0" size={20} />
                                <span className="text-sm text-slate-700 font-semibold whitespace-nowrap">To Date</span>
                                <div className="relative">
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className="px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                                    />
                                </div>
                            </div>

                            {/* Filter Logs Button */}
                            <button
                                onClick={handleFilter}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                            >
                                <Search size={16} />
                                Filter Logs
                            </button>

                            {/* Reset Button */}
                            <button
                                onClick={handleReset}
                                className="px-6 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                            >
                                <RotateCcw size={16} />
                                Reset
                            </button>
                        </div>

                        {/* Empty State - Centered */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="text-slate-500 text-xl font-semibold">
                                No logs found for your account.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyFaceScan;

