import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Plus,
    Calendar,
    Users,
    CheckCircle2,
    Clock,
    ArrowLeft,
    Maximize2,
    Download,
    Eye,
    Pencil,
    Trash2,
    CalendarDays,
    LayoutDashboard
} from 'lucide-react';
import { useTranslation } from '../../translate/TranslationContext';
import AddMeeting from './add-meeting';

const PreProductionMeeting = ({ onBack }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const itemsPerPage = 8;

    const meetings = [
        { id: 'PPM-2024-001', date: '2024-02-18', buyer: 'Aritzia', style: 'AR-701-BLU', attendees: 12, status: 'Scheduled', statusColor: 'text-red-700 bg-red-100 border-red-200' },
        { id: 'PPM-2024-002', date: '2024-02-18', buyer: 'Costco', style: 'CS-SILK-TW', attendees: 8, status: 'In-Progress', statusColor: 'text-amber-700 bg-amber-100 border-amber-200' },
        { id: 'PPM-2024-003', date: '2024-02-17', buyer: 'Lululemon', style: 'LL-FAST-BLK', attendees: 15, status: 'Finished', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
        { id: 'PPM-2024-004', date: '2024-02-17', buyer: 'Nike', style: 'NK-TECH-GRY', attendees: 10, status: 'Finished', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
        { id: 'PPM-2024-005', date: '2024-02-19', buyer: 'Gap', style: 'GP-DENIM-99', attendees: 6, status: 'Scheduled', statusColor: 'text-red-700 bg-red-100 border-red-200' },
        { id: 'PPM-2024-006', date: '2024-02-20', buyer: 'Uniqlo', style: 'UQ-AIR-772', attendees: 14, status: 'Scheduled', statusColor: 'text-red-700 bg-red-100 border-red-200' },
        { id: 'PPM-2024-007', date: '2024-02-16', buyer: 'Zara', style: 'ZR-COAT-W24', attendees: 20, status: 'Finished', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
        { id: 'PPM-2024-008', date: '2024-02-15', buyer: 'H&M', style: 'HM-KNIT-PR', attendees: 5, status: 'Cancelled', statusColor: 'text-slate-700 bg-slate-100 border-slate-200' },
        { id: 'PPM-2024-009', date: '2024-02-21', buyer: 'Adidas', style: 'AD-PERF-RUN', attendees: 9, status: 'Scheduled', statusColor: 'text-red-700 bg-red-100 border-red-200' },
    ];

    const stats = [
        { label: 'Total Meetings', value: meetings.length, icon: LayoutDashboard, color: 'text-red-600', bgColor: 'bg-red-50' },
        { label: 'Meetings Today', value: '2', icon: CalendarDays, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        { label: 'Pending / Planned', value: '4', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
        { label: 'Completed', value: '3', icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    ];

    const filteredMeetings = meetings.filter(m =>
        m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.style.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeetings = filteredMeetings.slice(indexOfFirstItem, indexOfLastItem);

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
                            Pre-Production<span className="text-red-600">Meeting</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Strategy, Planning & Technical Alignment</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold transition-all text-slate-700">
                        <Download className="w-4 h-4" /> Export Summary
                    </button>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md shadow-red-200 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> New Meeting
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-red-300 transition-all shadow-sm hover:shadow-md">
                                <div className="absolute top-0 right-0 p-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Data</div>
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 leading-tight">{stat.value}</div>
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
                                <label htmlFor="search-ppm" className="sr-only">Search</label>
                                <div className="relative group/search">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                                        <Search className="w-4 h-4 text-slate-400 group-focus-within/search:text-red-500 transition-colors" />
                                    </div>
                                    <input
                                        type="search"
                                        id="search-ppm"
                                        className="block w-full p-3.5 ps-11 bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 transition-all shadow-sm placeholder:text-slate-400"
                                        placeholder="Search by ID, Style or Buyer..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute end-1.5 bottom-1.5 top-1.5 text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-100 font-bold rounded-lg text-[10px] px-4 uppercase tracking-wider transition-all shadow-sm"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-tight hover:border-slate-300 transition-all shadow-sm text-slate-700">
                                <Filter className="w-4 h-4 text-red-600" /> Advanced Filters
                            </button>
                            <div className="h-6 w-px bg-slate-200 mx-2"></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pr-2">Found {filteredMeetings.length} Results</span>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-sm uppercase font-bold tracking-widest text-slate-800 border-b border-slate-200">
                                    <th className="px-8 py-5 text-center w-16">No.</th>
                                    <th className="px-6 py-5">Meeting ID</th>
                                    <th className="px-6 py-5">Date</th>
                                    <th className="px-6 py-5">Style / Model</th>
                                    <th className="px-6 py-5">Buyer</th>
                                    <th className="px-6 py-5 text-center">Attendees</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {currentMeetings.map((meeting, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/80 transition-colors cursor-pointer">
                                        <td className="px-8 py-4 text-center">
                                            <div className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">{indexOfFirstItem + idx + 1}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-900 tracking-tight">{meeting.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                                <Calendar className="w-3.5 h-3.5 text-red-500" />
                                                {meeting.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-800">{meeting.style}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-600">{meeting.buyer}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="text-sm font-bold text-slate-900">{meeting.attendees}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase border ${meeting.statusColor}`}>
                                                    {meeting.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5 text-slate-700">
                                                <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all border border-transparent hover:border-red-100" title="Meeting Minutes">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-all border border-transparent hover:border-amber-100" title="Edit Plan">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all border border-transparent hover:border-red-100" title="Cancel Meeting">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Area */}
                        <div className="px-8 py-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-200">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border shadow-sm ${currentPage === 1
                                        ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-red-500 hover:text-red-600 active:scale-95'
                                        }`}
                                >
                                    Previous
                                </button>
                                <div className="flex items-center px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 shadow-sm">
                                    {currentPage}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border shadow-sm ${currentPage === totalPages
                                        ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-red-500 hover:text-red-600 active:scale-95'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Popup */}
            {showForm && (
                <AddMeeting
                    onCancel={() => setShowForm(false)}
                    onSave={(data) => {
                        console.log("New Meeting Saved:", data);
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
};

export default PreProductionMeeting;
