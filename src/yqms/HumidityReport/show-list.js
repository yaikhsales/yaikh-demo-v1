import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Check,
    FileText,
    LayoutGrid,
    Search,
    Calendar,
    Download,
    Eye,
    Edit,
    ArrowLeft,
    Shield,
    Sparkles,
    User,
    X,
    Filter
} from 'lucide-react';

import { useTranslation } from '../../translate/TranslationContext';

const HumidityReportList = ({ onBack }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('Qc-daily-report');

    const tabs = [
        { id: 'Inspection', label: 'Inspection', icon: Check },
        { id: 'Qc-daily-report', label: 'Qc-daily-report', icon: FileText },
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutGrid },
    ];

    const [filters, setFilters] = useState({
        startDate: '02/23/2026',
        endDate: '02/23/2026',
        factoryStyle: '',
        buyerStyle: '',
        customer: ''
    });

    const reports = [
        { id: 1, factoryStyle: 'GPAR12244', buyerStyle: 'CPTR 02-01-37772-SU26', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 2, factoryStyle: 'GPAR12304', buyerStyle: 'FFS 99-06-41367-S-SU26', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 3, factoryStyle: 'GPAR12253', buyerStyle: 'FFS 99-26-60127-SU26(CB10)', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Failed', status: 'Pending' },
        { id: 4, factoryStyle: 'GPAR12299', buyerStyle: 'FFS 99-03-44504-SU26', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 5, factoryStyle: 'GPAF6134', buyerStyle: 'S261340014', customer: 'ANF', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 6, factoryStyle: 'GPAF6134', buyerStyle: 'S261340014', customer: 'ANF', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 7, factoryStyle: 'GPAR12308', buyerStyle: 'FFS 00-03-32364-SU26', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 8, factoryStyle: 'GPAR12306', buyerStyle: 'FFS 99-26-46013-SU26', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 9, factoryStyle: 'GPAR12359', buyerStyle: 'RBC 02-01-10008-SU26(AG2276)', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
        { id: 10, factoryStyle: 'GPAR12244', buyerStyle: 'CPTR 02-01-37772-SU26', customer: 'Aritzia', date: '2/23/2026', item: 1, result: 'Passed', status: 'Pending' },
    ];

    return (
        <div className="w-full flex flex-col min-h-screen bg-[#F0F4F8]">
            {/* High-Fidelity Header */}
            <div className="w-full bg-gradient-to-r from-[#5340C7] via-[#9F37B3] to-[#C9338D] p-4 shadow-xl relative z-50 rounded-xl">
                <div className="w-full flex items-center justify-between gap-4 px-4">
                    {/* Brand Section */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center border border-white/20 hover:scale-105 transition-all shadow-lg text-white font-black active:scale-95"
                        >
                            <ArrowLeft size={20} strokeWidth={3} />
                        </button>

                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/40">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-white leading-tight flex items-center gap-2">
                                {t('humidityReport')} | {t('qcDailyReport')}
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                                    <Sparkles size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-[10px] font-black tracking-wider text-white">PRO</span>
                                </div>
                            </h1>
                            <p className="text-white/80 text-[10px] font-bold uppercase mt-0.5">Humidity Level Monitoring & Control</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="flex items-center gap-3 py-2 px-4 bg-black/10 rounded-2xl border border-white/40">
                            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
                                <User className="text-white w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-white leading-none">QA Officer</span>
                                <span className="text-[9px] font-bold text-white/50 uppercase mt-1">ID: YM7625</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-6 pt-2">
                <div className="flex items-center gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                if (tab.id === 'Inspection') {
                                    navigate('/dashboard/yqms/aquaboy');
                                } else {
                                    setActiveTab(tab.id);
                                }
                            }}
                            className={`flex items-center gap-2 py-4 px-1 transition-all relative ${activeTab === tab.id
                                ? 'text-blue-600 font-bold'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <tab.icon size={16} />
                            <span className="text-sm font-bold uppercase tracking-tight">{tab.label.toUpperCase()}</span>
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
                {/* Filter Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Date Range */}
                        <div className="flex-1 min-w-[300px] space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date Range</label>
                                <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-100">
                                    {['Today', '7 Days', '30 Days'].map(p => (
                                        <button key={p} className="text-[9px] font-black px-2 py-1 rounded-md text-slate-400 hover:text-slate-600 uppercase transition-colors">{p}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={filters.startDate}
                                        className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 pr-10 text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
                                    />
                                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                                <span className="text-slate-400 font-bold text-xs uppercase">to</span>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={filters.endDate}
                                        className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 pr-10 text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
                                    />
                                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                        </div>

                        {/* Factory Style No */}
                        <div className="w-48 space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Factory Style No</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Style No..."
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Buyer Style */}
                        <div className="w-48 space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Buyer Style</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-700"
                            />
                        </div>

                        {/* Customer */}
                        <div className="w-36 space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Customer</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-700"
                            />
                        </div>

                        {/* Action Button */}
                        <button className="w-10 h-10 bg-red-400 flex items-center justify-center rounded-lg text-white hover:bg-red-500 transition-colors shadow-lg active:scale-95">
                            <Download size={18} />
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Table Header Row */}
                    <div className="px-6 py-4 bg-blue-50/50 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                                <FileText size={18} />
                            </div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight">Saved Humidity Reports</h2>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">500 reports (Page 1 of 50)</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Factory Style</th>
                                    <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Buyer Style</th>
                                    <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Item</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Results</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Approval Status</th>
                                    <th className="px-6 py-4 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {reports.map((report) => (
                                    <tr key={report.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-slate-700">{report.factoryStyle}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600">{report.buyerStyle}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{report.customer}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-slate-500">{report.date}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-50 text-purple-600 text-[11px] font-black">
                                                {report.item}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${report.result === 'Passed'
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                                                }`}>
                                                {report.result === 'Passed' ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                                                {report.result}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-50 text-orange-400 border border-orange-100 text-[11px] font-bold">
                                                {report.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-60 lg:group-hover:opacity-100 transition-opacity">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-rose-500 text-rose-600 hover:border-rose-500 transition-all shadow-sm">
                                                    <Check size={14} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-emerald-500 text-emerald-600 hover:border-emerald-500 transition-all shadow-sm">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-blue-500 text-blue-600 hover:border-blue-500 transition-all shadow-sm">
                                                    <Edit size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-end">
                        <div className="flex items-center gap-1">
                            <button className="px-4 py-2 text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest disabled:opacity-50">Previous</button>
                            <div className="flex items-center gap-1 px-2">
                                {[1, 2, 3, 4, '...', 50].map((p, i) => (
                                    <button
                                        key={i}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${p === 1
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                            : 'text-slate-500 hover:bg-white hover:shadow-sm'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <button className="px-4 py-2 text-[11px] font-bold text-slate-700 hover:text-blue-600 uppercase tracking-widest">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HumidityReportList;
