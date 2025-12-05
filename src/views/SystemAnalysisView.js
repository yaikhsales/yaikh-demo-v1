import React from 'react';
import { ArrowLeft, BarChartBig, UsersRound, Download } from 'lucide-react';

const SystemAnalysisView = ({ onBack }) => {
    const moduleData = [
        { name: 'Gate Pass', requests: 35, users: 28 },
        { name: 'Shop Management', requests: 76, users: 41 },
        { name: 'Ticket Management', requests: 17, users: 14 },
        { name: 'Purchase Request', requests: 0, users: 0, cost: { usd: 0, khr: 0, rmb: 0 } },
        { name: 'Car Booking', requests: 4, users: 3 },
        { name: 'Meeting Room', requests: 2, users: 2 },
    ];

    const totalRequests = moduleData.reduce((sum, mod) => sum + mod.requests, 0);
    const totalUsers = moduleData.reduce((sum, mod) => sum + mod.users, 0);

    return (
        <div className="bg-slate-100 rounded-xl shadow-2xl h-auto min-h-[600px] m-4 animate-in fade-in duration-500 flex flex-col p-6 gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">🚀 System Analytics Dashboard</h1>
                    <p className="text-slate-500">Real-time insights and performance metrics</p>
                </div>
                <button
                    onClick={onBack}
                    className="bg-white px-4 py-2 rounded-lg font-bold text-slate-700 border hover:bg-slate-50"
                >
                    Back
                </button>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="font-bold text-slate-500 text-sm uppercase">📅 Active Period</h3>
                    <p className="text-lg font-bold text-slate-800 mt-1">2025-12-01 → 2025-12-01</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm flex items-center gap-6">
                    <BarChartBig className="w-12 h-12 text-blue-500" />
                    <div>
                        <h3 className="font-bold text-slate-500 text-sm uppercase">Total System Requests</h3>
                        <p className="text-3xl font-bold text-slate-800">134</p>
                        <p className="text-xs text-slate-400">Network activity tracked</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm flex items-center gap-6">
                    <UsersRound className="w-12 h-12 text-green-500" />
                    <div>
                        <h3 className="font-bold text-slate-500 text-sm uppercase">Unique Active Users</h3>
                        <p className="text-3xl font-bold text-slate-800">88</p>
                        <p className="text-xs text-slate-400">Engagement monitored</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex gap-2 flex-wrap">
                    {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month'].map(label => (
                        <button
                            key={label}
                            className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-md hover:bg-blue-500 hover:text-white"
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="flex-grow"></div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-bold">Start Date</label>
                    <input type="date" defaultValue="2025-12-01" className="border rounded-md p-1.5 text-sm" />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm font-bold">End Date</label>
                    <input type="date" defaultValue="2025-12-01" className="border rounded-md p-1.5 text-sm" />
                </div>
                <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Apply Filter
                </button>
                <button className="px-4 py-2 text-sm font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">
                    Reset
                </button>
                <button className="px-4 py-2 text-sm font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <Download size={16} /> Export Report
                </button>
            </div>

            {/* Main Content */}
            <div className="bg-white p-6 rounded-lg border shadow-sm flex-1">
                <h2 className="text-xl font-bold text-slate-800 mb-4">📊 Real-Time Analytics Dashboard</h2>
                {/* Tabs */}
                <div className="border-b mb-4">
                    <div className="flex gap-6">
                        <button className="py-2 border-b-2 border-blue-500 font-bold text-blue-600">
                            Module Requests
                        </button>
                        <button className="py-2 border-b-2 border-transparent font-bold text-slate-500 hover:text-blue-600">
                            User Distribution
                        </button>
                        <button className="py-2 border-b-2 border-transparent font-bold text-slate-500 hover:text-blue-600">
                            System Overview
                        </button>
                    </div>
                </div>
                {/* Table */}
                <table className="w-full text-sm">
                    <thead className="text-left text-slate-500">
                        <tr>
                            <th className="p-2">Module</th>
                            <th className="p-2">Total Requests</th>
                            <th className="p-2">Unique Users</th>
                            <th className="p-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moduleData.map(mod => (
                            <tr key={mod.name} className="border-b">
                                <td className="p-3 font-bold">{mod.name}</td>
                                <td className="p-3">{mod.requests}</td>
                                <td className="p-3">{mod.users}</td>
                                <td className="p-3 text-xs font-mono">
                                    {mod.cost ? `${mod.cost.usd}$ ${mod.cost.khr}KHR ${mod.cost.rmb}RMB` : ''}
                                </td>
                            </tr>
                        ))}
                        <tr className="font-bold bg-slate-50">
                            <td className="p-3">Total</td>
                            <td className="p-3">{totalRequests}</td>
                            <td className="p-3">{totalUsers}</td>
                            <td className="p-3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemAnalysisView;

