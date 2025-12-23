import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';

const MyConfirmReceived = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('pending');

    // Sample data - empty for pending, can add sample data for "My Received"
    const pendingRequests = [];
    const myReceivedRequests = [
        {
            id: 1,
            code: 1939,
            requestedBy: 'Hoth Tongiang',
            department: 'Admin',
            topic: 'For repair',
            requestDate: '10-12-20'
        },
        {
            id: 2,
            code: 1938,
            requestedBy: 'ZHAOWEI',
            department: 'Cutting',
            topic: '剪样费',
            requestDate: '10-12-20'
        }
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleDetail = (code) => {
        console.log('View details for:', code);
    };

    const handleReceived = (code) => {
        console.log('Confirm received for:', code);
    };

    const currentData = activeTab === 'pending' ? pendingRequests : myReceivedRequests;

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
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">Confirm Received Product/Service</h1>
            </div>

            {/* Main Content Card */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto bg-white rounded-lg border-2 border-dashed border-slate-300 p-6 min-h-full">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Confirm Received Product/Service List</h2>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-6 py-3 font-semibold transition-colors rounded-lg ${
                                activeTab === 'pending'
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setActiveTab('my')}
                            className={`px-6 py-3 font-semibold transition-colors rounded-lg ${
                                activeTab === 'my'
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            My Received
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">№</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Code</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Requested By</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Department</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Topic</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">Request Date</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">Detail</th>
                                    <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16 text-slate-500">
                                            No approved requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((req, idx) => (
                                        <tr key={req.id} className="hover:bg-blue-50 transition-colors">
                                            <td className="px-4 py-4 border border-slate-200 text-slate-700 text-center">{idx + 1}</td>
                                            <td className="px-4 py-4 border border-slate-200 text-slate-700 font-medium">{req.code}</td>
                                            <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.requestedBy}</td>
                                            <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.department}</td>
                                            <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.topic}</td>
                                            <td className="px-4 py-4 border border-slate-200 text-slate-700">{req.requestDate}</td>
                                            <td className="px-4 py-4 border border-slate-200 text-center">
                                                <button
                                                    onClick={() => handleDetail(req.code)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 mx-auto"
                                                >
                                                    <Eye size={12} />
                                                    Detail
                                                </button>
                                            </td>
                                            <td className="px-4 py-4 border border-slate-200 text-center">
                                                {activeTab === 'pending' ? (
                                                    <button
                                                        onClick={() => handleReceived(req.code)}
                                                        className="bg-green-600 text-white px-4 py-2 rounded text-xs font-semibold hover:bg-green-700 transition-colors"
                                                    >
                                                        Received
                                                    </button>
                                                ) : (
                                                    <span className="text-green-600 font-semibold text-sm">Confirmed</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyConfirmReceived;

