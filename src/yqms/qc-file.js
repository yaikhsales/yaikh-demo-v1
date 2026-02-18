import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Filter,
    Maximize2,
    Download,
    Plus,
    ChevronRight,
    Package,
    Clock,
    TrendingUp,
    Truck,
    FileText,
    CheckCircle,
    Activity,
    Eye,
    Pencil,
    Trash2,
    Calendar,
    ThumbsUp,
    MessageSquare
} from 'lucide-react';
import { useTranslation } from '../translate/TranslationContext';

const QCFile = ({ onBack }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const records = [
        { id: 'GPAR12376NOS', date: '2024-02-14', buyer: 'Aritzia', style: 'FFS 99-06-60284-R-SU26', rolls: 45, qty: '2,250m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_001.pdf', comments: 12 },
        { id: 'GPAR12261', date: '2024-02-14', buyer: 'Aritzia', style: 'RBCY 02-01-10008-SU26(RMG0546)', rolls: 12, qty: '600m', status: 'In-Progress', statusColor: 'text-red-700 bg-red-100 border-red-200', file: 'QC_Report_002.pdf', comments: 5 },
        { id: 'PTCOC400A', date: '2024-02-13', buyer: 'Costco', style: 'CR1411CC-01', rolls: 88, qty: '4,000m', status: 'Pending', statusColor: 'text-amber-700 bg-amber-100 border-amber-200', file: 'Pending', comments: 0 },
        { id: 'GPAF6007RGD', date: '2024-02-11', buyer: 'ANF', style: 'S261220001', rolls: 25, qty: '1,250m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_004.pdf', comments: 8 },
        { id: 'GPAR12343NOS', date: '2024-02-10', buyer: 'Aritzia', style: 'FFS 99-03-44504-SU26-02', rolls: 30, qty: '1,500m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_005.pdf', comments: 3 },
        { id: 'GPRT00188A', date: '2024-02-09', buyer: 'Reitmans', style: 'W02-493553', rolls: 50, qty: '2,500m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_006.pdf', comments: 15 },
        { id: 'PTAF0449', date: '2024-02-08', buyer: 'ANF', style: '134F0410', rolls: 40, qty: '2,000m', status: 'In-Progress', statusColor: 'text-red-700 bg-red-100 border-red-200', file: 'QC_Report_007.pdf', comments: 2 },
        { id: 'GPRT00174A', date: '2024-02-07', buyer: 'Reitmans', style: 'P21-470072', rolls: 60, qty: '3,000m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_008.pdf', comments: 20 },
        { id: 'GPAF6137R', date: '2024-02-06', buyer: 'ANF', style: 'S261220058', rolls: 15, qty: '750m', status: 'In-Progress', statusColor: 'text-red-700 bg-red-100 border-red-200', file: 'QC_Report_009.pdf', comments: 4 },
        { id: 'PTCOC381R', date: '2024-02-05', buyer: 'Costco', style: 'STCO6690', rolls: 35, qty: '1,750m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_010.pdf', comments: 6 },
        { id: 'GPAR12167GD-2', date: '2024-02-04', buyer: 'Aritzia', style: 'FFS 99-03-32364-SU26(DW1830)', rolls: 20, qty: '1,000m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_011.pdf', comments: 9 },
        { id: 'GPAR12275-1', date: '2024-02-03', buyer: 'Aritzia', style: 'FFS 99-03-44514-SU26', rolls: 45, qty: '2,250m', status: 'Pending', statusColor: 'text-amber-700 bg-amber-100 border-amber-200', file: 'Pending', comments: 0 },
        { id: 'GPAR12220', date: '2024-02-02', buyer: 'Aritzia', style: 'RBC 02-01-52114-SU26(AG2276)', rolls: 55, qty: '2,750m', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200', file: 'QC_Report_012.pdf', comments: 11 },
        { id: 'GPAR12274-1', date: '2024-02-01', buyer: 'Aritzia', style: 'FFS 99-03-44504-SU26', rolls: 10, qty: '500m', status: 'In-Progress', statusColor: 'text-red-700 bg-red-100 border-red-200', file: 'QC_Report_013.pdf', comments: 7 }
    ];

    const totalMeters = records.reduce((sum, r) => sum + parseInt(r.qty.replace(/,/g, '')), 0);
    const totalRolls = records.reduce((sum, r) => sum + r.rolls, 0);
    const totalComments = records.reduce((sum, r) => sum + (r.comments || 0), 0);

    const stats = [
        { label: 'Total Complete', value: `${records.filter(r => r.status === 'Completed').length} Styles`, icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
        { label: 'Total File', value: `${records.length} Files`, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { label: 'Pending Docs', value: `${records.filter(r => r.file === 'Pending').length} Styles`, icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-100' },
        { label: 'Total Comment', value: `${totalComments.toLocaleString()}`, icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-100' }
    ];

    const filteredRecords = records.filter(record =>
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.style.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

    const handleBack = () => {
        if (onBack) onBack();
        else navigate(-1);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleBack}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors group text-slate-600"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
                            QC<span className="text-blue-600">File</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Material Inflow & Documentation Tracking</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold transition-all text-slate-700">
                        <Maximize2 className="w-4 h-4" /> Full Screen
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold transition-all text-slate-700">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-200 transition-all">
                        <Plus className="w-4 h-4" /> New Entry
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden group hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                            <div className="absolute top-0 right-0 p-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates</div>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter & Search Section */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-xl">
                        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative group/search">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                                    <Search className="w-4 h-4 text-slate-400 group-focus-within/search:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="search"
                                    id="search"
                                    className="block w-full p-3.5 ps-11 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 transition-all shadow-sm placeholder:text-slate-400"
                                    placeholder="Search by ID, Style or Buyer..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute end-1.5 bottom-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-100 font-bold rounded-lg text-[10px] px-3 py-2 uppercase tracking-wider transition-all shadow-sm"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-tight hover:border-slate-300 transition-all shadow-sm text-slate-700">
                            <Filter className="w-4 h-4 text-blue-600" /> Filters
                        </button>
                        <div className="h-4 w-px bg-slate-200 mx-2"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing {filteredRecords.length} Records</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-sm uppercase font-bold tracking-widest text-slate-800 border-b border-slate-200">
                                <th className="px-10 py-6 text-left font-bold">No.</th>
                                <th className="px-10 py-6 text-left font-bold">Date</th>
                                <th className="px-10 py-6 text-left font-bold">Factory Style</th>
                                <th className="px-6 py-4 font-bold">Buyer</th>
                                <th className="px-6 py-4 font-bold">Buyer Style</th>
                                <th className="px-6 py-4 text-center font-bold">Recommended</th>
                                <th className="px-6 py-4 text-center font-bold">Status</th>
                                <th className="px-6 py-4 text-center font-bold">File</th>
                                <th className="px-6 py-4 w-24 text-center font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentRecords.map((record, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/80 transition-colors cursor-pointer">
                                    <td className="px-10 py-4 text-left">
                                        <div className="text-sm font-bold text-slate-800 tracking-tight">{indexOfFirstItem + idx + 1}</div>
                                    </td>
                                    <td className="px-10 py-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <div className="text-sm font-bold text-slate-800 tracking-tight">{record.date}</div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-4 text-left">
                                        <div className="text-sm font-bold text-slate-800 tracking-tight">{record.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-slate-800">{record.buyer}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm"></div>
                                            <span className="text-sm font-medium text-slate-700">{record.style}</span>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 text-center">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600 border border-slate-200">{record.rolls}</span>
                                    </td> */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            className="flex items-center justify-center gap-2 mx-auto hover:bg-blue-50 px-2 py-1 rounded-xl transition-all group/comment border border-blue-200 hover:border-blue-200 shadow-sm"
                                            onClick={() => console.log('View buyer comments for', record.id)}
                                        >

                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Feedback</span>
                                                <span className="bg-blue-100 text-blue-700 text-[11px] font-black px-2 py-0.5 rounded-full border border-blue-200">
                                                    {record.comments || 0}
                                                </span>
                                            </div>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold tracking-tight border ${record.statusColor}`}>
                                                {record.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            {record.file !== 'Pending' ? (
                                                <button
                                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-red-200 rounded-lg text-red-600 transition-all border border-slate-200 group/down"
                                                    title={`Download ${record.file}`}
                                                >
                                                    <Download className="w-4 h-4 text-red-600 group-hover/down:scale-110 transition-transform" />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight">{record.file.split('.').pop()}</span>
                                                </button>
                                            ) : (
                                                <span className="text-[10px] px-2 py-1.5 rounded-lg font-bold border border-red-200 text-red-400 uppercase tracking-widest italic">No File</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button
                                                className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border border-emerald-100 group/inline shadow-sm"
                                                title="Recommend"
                                            >
                                                <MessageSquare className="w-3.5 h-3.5 group-hover/inline:scale-110 transition-transform" />
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border border-blue-100 group/inline shadow-sm"
                                                title="View Detail"
                                            >
                                                <Eye className="w-3.5 h-3.5 group-hover/inline:scale-110 transition-transform" />
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border border-amber-100 group/inline shadow-sm"
                                                title="Edit Record"
                                            >
                                                <Pencil className="w-3.5 h-3.5 group-hover/inline:scale-110 transition-transform" />
                                            </button>
                                            <button
                                                className="flex items-center gap-2 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border border-red-100 group/inline shadow-sm"
                                                title="Delete Record"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 group-hover/inline:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
                        <span className="text-[11px] font-bold text-slate-500 tracking-widest">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm transition-all border ${currentPage === 1
                                    ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                                    : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm transition-all border ${currentPage === totalPages
                                    ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                                    : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QCFile;
