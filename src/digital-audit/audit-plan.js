import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Eye, CheckCircle, FileText, MapPin, Calendar } from 'lucide-react';

const AuditPlan = ({ onBack }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Sample audit plan data
    const auditPlans = [
        {
            id: 1,
            location: 'Yorktown (Cambodia)',
            company: 'Burwood MFG Co., LTD',
            form: 'Hybrid',
            stages: [
                { name: 'Pre-Audit', date: '08 Dec 202x', status: 'active', icon: FileText },
                { name: 'On-site Audit', date: '10 Dec 202x', status: 'pending', icon: MapPin },
                { name: 'Reporting', date: '10 Dec 202x', status: 'pending', icon: FileText },
                { name: 'Post-Audit', date: '10 Dec 202x', status: 'pending', icon: MapPin },
                { name: 'Completed', date: '', status: 'pending', icon: CheckCircle }
            ]
        },
        {
            id: 2,
            location: 'Yorktown (Cambodia)',
            company: 'Burwood MFG Co., LTD',
            form: 'GMP Follow up Audit',
            stages: [
                { name: 'Pre-Audit', date: '01 Oct 202x', status: 'completed', icon: CheckCircle },
                { name: 'On-site Audit', date: '28 Oct 202x', status: 'completed', icon: CheckCircle },
                { name: 'Reporting', date: '28 Oct 202x', status: 'completed', icon: CheckCircle },
                { name: 'Post-Audit', date: '28 Oct 202x', status: 'completed', icon: CheckCircle },
                { name: 'Completed', date: '', status: 'in-progress', icon: CheckCircle }
            ]
        },
        {
            id: 3,
            location: 'Yorktown (Cambodia)',
            company: 'Burwood MFG Co., LTD',
            form: 'Initial COSTCO GMP Audit',
            stages: [
                { name: 'Pre-Audit', date: '01 Aug 202x', status: 'completed', icon: CheckCircle },
                { name: 'On-site Audit', date: '28 Aug 202x', status: 'completed', icon: CheckCircle },
                { name: 'Reporting', date: '28 Aug 202x', status: 'completed', icon: CheckCircle },
                { name: 'Post-Audit', date: '28 Aug 202x', status: 'completed', icon: CheckCircle },
                { name: 'Completed', date: '', status: 'in-progress', icon: CheckCircle }
            ]
        }
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleSearch = () => {
        console.log('Search:', searchTerm);
    };

    const handleReset = () => {
        setSearchTerm('');
    };

    const filteredPlans = auditPlans.filter(plan =>
        searchTerm === '' ||
        plan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.form.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderProcessFlow = (stages, isMainFlow = false) => {
        const stageColors = {
            'Pre-Audit': isMainFlow ? 'bg-yellow-500' : 'bg-blue-500',
            'On-site Audit': 'bg-blue-500',
            'Reporting': 'bg-purple-500',
            'Reporting & Assessment': 'bg-purple-500',
            'Post-Audit': 'bg-orange-500',
            'Completed': 'bg-green-500'
        };

        return (
            <div className="flex items-center gap-2 relative">
                {stages.map((stage, idx) => {
                    const Icon = stage.icon;
                    const isActive = stage.status === 'active' || stage.status === 'completed' || stage.status === 'in-progress';
                    const isCompleted = stage.status === 'completed';
                    const isInProgress = stage.status === 'in-progress';
                    const isPending = stage.status === 'pending';
                    const lineColor = isMainFlow 
                        ? 'bg-blue-500' 
                        : (isCompleted || isInProgress ? 'bg-green-500' : 'bg-slate-300');

                    return (
                        <React.Fragment key={idx}>
                            <div className="flex flex-col items-center relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    isActive && !isPending
                                        ? stageColors[stage.name] || 'bg-blue-500'
                                        : 'bg-slate-300'
                                } ${isMainFlow && idx === 0 ? 'bg-yellow-500' : ''} ${isMainFlow && idx === 1 ? 'bg-blue-500' : ''} ${isMainFlow && idx === 2 ? 'bg-purple-500' : ''} ${isMainFlow && idx === 3 ? 'bg-orange-500' : ''} ${isMainFlow && idx === 4 ? 'bg-green-500' : ''}`}>
                                    {isMainFlow ? (
                                        idx === 4 ? (
                                            <>
                                                <CheckCircle size={20} className="text-white" />
                                                {idx === 4 && (
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        3
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-white font-bold text-lg">{idx + 1}</span>
                                        )
                                    ) : (
                                        <Icon size={20} className={isActive && !isPending ? 'text-white' : 'text-slate-500'} />
                                    )}
                                </div>
                                <div className="mt-2 text-center max-w-[120px]">
                                    <div className={`text-xs font-semibold ${isActive && !isPending ? 'text-slate-700' : 'text-slate-400'}`}>
                                        {stage.name}
                                    </div>
                                    {stage.date && (
                                        <div className={`text-xs mt-1 ${isActive && !isPending ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {stage.date}
                                        </div>
                                    )}
                                    {isInProgress && (
                                        <div className="text-xs mt-1 text-green-600 font-semibold">
                                            In progress
                                        </div>
                                    )}
                                    {isCompleted && stage.name === 'Completed' && (
                                        <div className="text-xs mt-1 text-green-600 font-semibold">
                                            completed
                                        </div>
                                    )}
                                </div>
                            </div>
                            {idx < stages.length - 1 && (
                                <div className={`h-0.5 flex-1 ${lineColor} -mx-2`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-white flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center justify-between flex-shrink-0 shadow-sm relative z-[201]">
                <div className="w-32"></div> {/* Left spacer */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleBack} 
                            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold text-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title="Home"
                        >
                            <img 
                                src="/logo.jpg" 
                                alt="Home" 
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">Audit Plan</h1>
                </div>
                <div className="w-32"></div> {/* Right spacer */}
            </div>

            {/* Search Section */}
            <div className="bg-slate-50 p-4 border-b flex items-center gap-4 flex-shrink-0">
                <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Search:</label>
                <div className="flex items-center gap-2 flex-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                        <Search size={16} />
                        Search
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-white text-slate-700 border border-slate-300 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-sm flex items-center gap-2"
                    >
                        <X size={16} />
                        Reset
                    </button>
                </div>
            </div>

            {/* Activity Audit Plan Section */}
            <div className="bg-white p-6 border-b flex-shrink-0">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-2">Activity Audit Plan</h2>
                    <p className="text-sm text-slate-600">Track the progress of audit activities through each stage</p>
                </div>
                
                {/* Main Process Flow */}
                <div className="mb-6">
                    {renderProcessFlow([
                        { name: 'Pre-Audit', date: 'Planning & Preparation', status: 'active', icon: FileText },
                        { name: 'On-site Audit', date: '', status: 'pending', icon: MapPin },
                        { name: 'Reporting & Assessment', date: '', status: 'pending', icon: FileText },
                        { name: 'Post-Audit', date: 'Verification & Final', status: 'pending', icon: MapPin },
                        { name: 'Completed', date: '', status: 'pending', icon: CheckCircle }
                    ], true)}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                        View Audit Plan
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                        Add Audit Plan
                    </button>
                </div>
            </div>

            {/* Audit Plan List Section */}
            <div className="flex-1 overflow-auto p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">Audit Plan List</h2>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold">
                            total: {filteredPlans.length} report(s)
                        </div>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">
                            showing: {filteredPlans.length} on this page
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">AUDIT LOCATION</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">AUDIT FORM</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">ACTIVITY PROCESS FLOW</th>
                                <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-16 text-slate-500">
                                        No audit plans found
                                    </td>
                                </tr>
                            ) : (
                                filteredPlans.map((plan) => (
                                    <tr key={plan.id} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-4 border border-slate-200">
                                            <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm font-semibold inline-block">
                                                {plan.location}
                                            </div>
                                            <div className="text-slate-700 mt-1">{plan.company}</div>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200">
                                            <a href="#" className="text-blue-600 hover:underline font-semibold">
                                                {plan.form}
                                            </a>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200">
                                            <div className="py-2">
                                                {renderProcessFlow(plan.stages)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border border-slate-200 text-center">
                                            <button className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
                                                <Eye size={16} className="text-white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditPlan;

