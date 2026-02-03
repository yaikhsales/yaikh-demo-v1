import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Calendar } from 'lucide-react';
import { useTranslation } from '../translate/TranslationContext';

const Training = ({ onBack }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { department } = useParams();
    const { state } = location;
    const { t, translateModuleTitle } = useTranslation();
    const departmentName = state?.departmentName || decodeURIComponent(department || '') || 'Training';
    const [activeView, setActiveView] = useState('main'); // 'main', 'course', 'lessons', 'activity'
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar' for activity view
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    // Debug log
    console.log('Training component - department:', department, 'departmentName:', departmentName);

    // Training videos from YouTube - search results for each department
    const trainingVideos = {
        'YAI': [
            { id: 'dQw4w9WgXcQ', title: 'YAI Department Training', description: 'YAI Department overview and training' },
            { id: 'jNQXAC9IVRw', title: 'YAI Workflow', description: 'Understanding YAI workflow processes' }
        ],
        'CSR': [
            { id: 'dQw4w9WgXcQ', title: 'CSR Department Training', description: 'CSR Department overview and training' },
            { id: 'jNQXAC9IVRw', title: 'CSR Best Practices', description: 'CSR best practices and guidelines' }
        ],
        'IT': [
            { id: 'dQw4w9WgXcQ', title: 'IT Department Training', description: 'IT Department overview and training' },
            { id: 'jNQXAC9IVRw', title: 'IT System Management', description: 'IT system management training' }
        ],
        'Shipping': [
            { id: 'dQw4w9WgXcQ', title: 'Shipping Department Training', description: 'Shipping Department overview and training' },
            { id: 'jNQXAC9IVRw', title: 'Shipping Procedures', description: 'Shipping procedures and guidelines' }
        ],
        'PPC': [
            { id: 'dQw4w9WgXcQ', title: 'PPC Department Training', description: 'PPC Department overview and training' },
            { id: 'jNQXAC9IVRw', title: 'PPC Planning', description: 'Production planning and control training' }
        ],
        'Merchandising': [
            { id: 'dQw4w9WgXcQ', title: 'Merchandising Training', description: 'Merchandising Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Merchandising Strategies', description: 'Merchandising strategies and techniques' }
        ],
        'Purchasing': [
            { id: 'dQw4w9WgXcQ', title: 'Purchasing Training', description: 'Purchasing Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Purchase Request Process', description: 'Purchase request process training' }
        ],
        'General Affairs': [
            { id: 'dQw4w9WgXcQ', title: 'General Affairs Training', description: 'General Affairs Department overview' },
            { id: 'jNQXAC9IVRw', title: 'General Affairs Procedures', description: 'General Affairs procedures training' }
        ],
        'Admin': [
            { id: 'dQw4w9WgXcQ', title: 'Admin Training', description: 'Admin Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Admin Management', description: 'Administrative management training' }
        ],
        'HR': [
            { id: 'dQw4w9WgXcQ', title: 'HR Training', description: 'HR Department overview' },
            { id: 'jNQXAC9IVRw', title: 'HR Management', description: 'Human resources management training' }
        ],
        'QA': [
            { id: 'dQw4w9WgXcQ', title: 'QA Training', description: 'QA Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Quality Assurance', description: 'Quality assurance procedures' }
        ],
        'Financial': [
            { id: 'dQw4w9WgXcQ', title: 'Financial Training', description: 'Financial Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Financial Management', description: 'Financial management training' }
        ],
        'CBSA': [
            { id: 'dQw4w9WgXcQ', title: 'CBSA Training', description: 'CBSA Department overview' },
            { id: 'jNQXAC9IVRw', title: 'CBSA Procedures', description: 'CBSA procedures training' }
        ],
        'Sample': [
            { id: 'dQw4w9WgXcQ', title: 'Sample Training', description: 'Sample Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Sample Management', description: 'Sample management training' }
        ],
        'Technical': [
            { id: 'dQw4w9WgXcQ', title: 'Technical Training', description: 'Technical Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Technical Procedures', description: 'Technical procedures training' }
        ],
        'Raw Material Warehouse': [
            { id: 'dQw4w9WgXcQ', title: 'Raw Material Warehouse Training', description: 'Raw Material Warehouse overview' },
            { id: 'jNQXAC9IVRw', title: 'Warehouse Management', description: 'Warehouse management training' }
        ],
        'Cutting': [
            { id: 'dQw4w9WgXcQ', title: 'Cutting Department Training', description: 'Cutting Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Cutting Procedures', description: 'Cutting procedures training' }
        ],
        'SCC': [
            { id: 'dQw4w9WgXcQ', title: 'SCC Training', description: 'SCC Department overview' },
            { id: 'jNQXAC9IVRw', title: 'SCC Management', description: 'SCC management training' }
        ],
        'Sewing': [
            { id: 'dQw4w9WgXcQ', title: 'Sewing Department Training', description: 'Sewing Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Sewing Procedures', description: 'Sewing procedures training' }
        ],
        'QC': [
            { id: 'dQw4w9WgXcQ', title: 'QC Training', description: 'QC Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Quality Control', description: 'Quality control procedures' }
        ],
        'Ironing': [
            { id: 'dQw4w9WgXcQ', title: 'Ironing Department Training', description: 'Ironing Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Ironing Procedures', description: 'Ironing procedures training' }
        ],
        'Packing': [
            { id: 'dQw4w9WgXcQ', title: 'Packing Department Training', description: 'Packing Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Packing Procedures', description: 'Packing procedures training' }
        ],
        'Washing': [
            { id: 'dQw4w9WgXcQ', title: 'Washing Department Training', description: 'Washing Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Washing Procedures', description: 'Washing procedures training' }
        ],
        'TPM': [
            { id: 'dQw4w9WgXcQ', title: 'TPM Training', description: 'TPM Department overview' },
            { id: 'jNQXAC9IVRw', title: 'TPM Management', description: 'TPM management training' }
        ],
        'Warehouse': [
            { id: 'dQw4w9WgXcQ', title: 'Warehouse Training', description: 'Warehouse Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Warehouse Operations', description: 'Warehouse operations training' }
        ],
        'IE': [
            { id: 'dQw4w9WgXcQ', title: 'IE Training', description: 'IE Department overview' },
            { id: 'jNQXAC9IVRw', title: 'IE Management', description: 'IE management training' }
        ],
        'QA (Fabric)': [
            { id: 'dQw4w9WgXcQ', title: 'QA Fabric Training', description: 'QA Fabric Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Fabric Quality Assurance', description: 'Fabric quality assurance training' }
        ],
        'Production': [
            { id: 'dQw4w9WgXcQ', title: 'Production Training', description: 'Production Department overview' },
            { id: 'jNQXAC9IVRw', title: 'Production Management', description: 'Production management training' }
        ]
    };

    // Training lessons data
    const trainingLessons = {
        'YAI': [
            { title: 'Support Ticket User', icon: 'Ticket' },
            { title: 'Car Booking', icon: 'Car' },
            { title: 'Personal Gatepass', icon: 'User' },
            { title: 'Purchase Request', icon: 'ShoppingCart' },
            { title: 'Material Gatepass', icon: 'Package' },
            { title: 'Log in to the main platform', icon: 'LogIn' },
            { title: 'Gatepass for Fixed asset', icon: 'FileCheck' }
        ]
    };

    // Training activities data
    const trainingActivities = [
        { trainer: 'Self Training', dept: 'YAI_Department', title: 'Support Ticket User', category: 'Training', date: '04/07/2025', start: '07:00 AM', end: '08:00 AM', course: 'Support Ticket User', description: 'All Support Ticket User' },
        { trainer: 'Self Training', dept: 'YAI_Department', title: 'Personal Gatepass', category: 'Personal Gatepass', date: '11/07/2025', start: '08:00 AM', end: '09:00 AM', course: 'Personal Gatepass', description: 'The online training how to use Personal Gatepass' },
        { trainer: 'Self Training', dept: 'YAI_Department', title: 'Car Booking', category: 'Car Booking', date: '12/07/2025', start: '02:00 PM', end: '03:00 PM', course: 'Car Booking', description: 'The Video training how to use Car Booking' },
        { trainer: 'Self Training', dept: 'YAI_Department', title: 'Material Gatepass', category: 'Material Gatepass', date: '14/07/2025', start: '10:00 AM', end: '11:00 AM', course: 'Material Gatepass', description: 'The Video demonstration for Material Gatepass' },
        { trainer: 'Self Training', dept: 'YAI_Department', title: 'Purchase Request', category: 'Purchase Request', date: '15/07/2025', start: '03:00 PM', end: '04:00 PM', course: 'Purchase Request', description: 'Purchase Request demonstration' },
        { trainer: 'khun', dept: 'YAI_Department', title: 'YAI Login to the main platform', category: 'YAI', date: '18/07/2025', start: '09:00 AM', end: '10:00 AM', course: 'Log in to the main platform', description: 'How to login to the main platform' },
        { trainer: 'Self Training', dept: 'YAI_Department', title: 'Purchase Request', category: 'Purchase Request', date: '24/07/2025', start: '07:00 AM', end: '08:00 AM', course: 'Purchase Request', description: 'Purchase Request' }
    ];

    // Main view - Three cards
    if (activeView === 'main') {
        return (
            <div className="fixed inset-0 bg-gray-100 flex flex-col animate-in fade-in duration-500 z-[200]" style={{ position: 'relative' }}>
                {/* Header */}
                <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onBack ? onBack() : navigate(-1)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                        >
                            <ArrowLeft size={20} />
                            {t('back')}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title={t('home')}
                        >
                            <img 
                                src="/logo.jpg" 
                                alt={t('home')} 
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold text-center flex-1 underline">{translateModuleTitle(departmentName)}</h1>
                    <div className="w-24"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                <div className="max-w-6xl mx-auto">

                    {/* Three Cards */}
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 min-h-[500px] flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                            {/* Course Card */}
                            <button
                                onClick={() => setActiveView('course')}
                                className="bg-white border-2 border-black rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col items-center gap-4"
                            >
                                <BookOpen size={64} className="text-black" />
                                <span className="text-xl font-semibold text-black">{t('course')}</span>
                            </button>

                            {/* Lessons (PDF) Card */}
                            <button
                                onClick={() => setActiveView('lessons')}
                                className="bg-white border-2 border-black rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col items-center gap-4"
                            >
                                <FileText size={64} className="text-black" />
                                <span className="text-xl font-semibold text-black">{t('lessons')}</span>
                            </button>

                            {/* Activity Card */}
                            <button
                                onClick={() => setActiveView('activity')}
                                className="bg-white border-2 border-black rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col items-center gap-4"
                            >
                                <Calendar size={64} className="text-black" />
                                <span className="text-xl font-semibold text-black">{t('activity')}</span>
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    // Course View - Video Grid
    if (activeView === 'course') {
        const videos = trainingVideos[departmentName] || trainingVideos['YAI'];
        
        return (
            <div className="fixed inset-0 bg-gray-100 flex flex-col animate-in fade-in duration-500 z-[200]" style={{ position: 'relative' }}>
                {/* Header */}
                <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                    <div className="w-32"></div> {/* Left spacer */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveView('main')}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                {t('back')}
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                                title={t('home')}
                            >
                                <img 
                                    src="/logo.jpg" 
                                    alt={t('home')} 
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                        <h1 className="text-3xl font-bold">{t('trainingCourse')}</h1>
                    </div>
                    <div className="w-32"></div> {/* Right spacer */}
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">

                    {/* Video Grid */}
                    <div className="bg-white rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">{t('dashboardVideoTraining')}</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {videos.map((video, index) => (
                                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative aspect-video bg-gray-200 cursor-pointer group" onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}>
                                        <img
                                            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                                            Yai
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                                        <p className="text-gray-600 text-sm">{video.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    // Lessons View - Lesson Cards
    if (activeView === 'lessons') {
        const lessons = trainingLessons[departmentName] || trainingLessons['YAI'];
        
        return (
            <div className="fixed inset-0 bg-gray-100 flex flex-col animate-in fade-in duration-500 z-[200]" style={{ position: 'relative' }}>
                {/* Header */}
                <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                    <div className="w-32"></div> {/* Left spacer */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveView('main')}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                {t('back')}
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                                title={t('home')}
                            >
                                <img 
                                    src="/logo.jpg" 
                                    alt={t('home')} 
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                        <h1 className="text-3xl font-bold">{t('trainingLesson')}</h1>
                    </div>
                    <div className="w-32"></div> {/* Right spacer */}
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">

                    {/* Header Image */}
                    <div className="bg-white rounded-lg p-6 mb-6 overflow-hidden">
                        <img
                            src="/assets/icons/sub-icons/header.png"
                            alt="Company Header"
                            className="w-full h-auto object-contain"
                            onError={(e) => {
                                console.error('Header image failed to load:', e.target.src);
                            }}
                        />
                    </div>

                    {/* Lesson Cards Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {lessons.map((lesson, index) => (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                style={{
                                    background: 'linear-gradient(to right, rgba(34, 197, 94, 0.1) 0%, transparent 10%, transparent 90%, rgba(34, 197, 94, 0.1) 100%)'
                                }}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 border-2 border-black rounded flex items-center justify-center">
                                        <FileText size={32} className="text-black" />
                                    </div>
                                </div>
                                <h3 className="text-center font-semibold text-lg">{lesson.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        );
    }

    // Activity View - Table and Calendar
    if (activeView === 'activity') {

        return (
            <div className="fixed inset-0 bg-gray-100 flex flex-col animate-in fade-in duration-500 z-[200]" style={{ position: 'relative' }}>
                {/* Header */}
                <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                    <div className="w-32"></div> {/* Left spacer */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveView('main')}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                {t('back')}
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                                title={t('home')}
                            >
                                <img 
                                    src="/logo.jpg" 
                                    alt={t('home')} 
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                        <h1 className="text-3xl font-bold underline">{t('activity')}</h1>
                    </div>
                    <div className="w-32"></div> {/* Right spacer */}
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">

                    {/* Main Content Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-center mb-6">{t('listAndScheduleTrainingCourse')}</h2>
                        
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 border-b">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-6 py-2 font-semibold ${
                                    viewMode === 'list'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                {t('list')}
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`px-6 py-2 font-semibold ${
                                    viewMode === 'calendar'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                {t('calendar')}
                            </button>
                        </div>

                        {/* List View */}
                        {viewMode === 'list' && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold">TRAINER</th>
                                            <th className="px-4 py-3 text-left font-semibold">DEPT</th>
                                            <th className="px-4 py-3 text-left font-semibold">TITLE</th>
                                            <th className="px-4 py-3 text-left font-semibold">CATEGORY</th>
                                            <th className="px-4 py-3 text-left font-semibold">DATE</th>
                                            <th className="px-4 py-3 text-left font-semibold">START</th>
                                            <th className="px-4 py-3 text-left font-semibold">END</th>
                                            <th className="px-4 py-3 text-left font-semibold">COURSE</th>
                                            <th className="px-4 py-3 text-left font-semibold">DESCRIPTION</th>
                                            <th className="px-4 py-3 text-left font-semibold">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainingActivities.map((activity, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3">{activity.trainer}</td>
                                                <td className="px-4 py-3">{activity.dept}</td>
                                                <td className="px-4 py-3">{activity.title}</td>
                                                <td className="px-4 py-3">{activity.category}</td>
                                                <td className="px-4 py-3">{activity.date}</td>
                                                <td className="px-4 py-3">{activity.start}</td>
                                                <td className="px-4 py-3">{activity.end}</td>
                                                <td className="px-4 py-3">{activity.course}</td>
                                                <td className="px-4 py-3">{activity.description}</td>
                                                <td className="px-4 py-3">
                                                    <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Calendar View */}
                        {viewMode === 'calendar' && (
                            <div>
                                {/* Calendar Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">
                                            &lt;
                                        </button>
                                        <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-400">
                                            today
                                        </button>
                                        <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">
                                            &gt;
                                        </button>
                                    </div>
                                    <div className="text-lg font-semibold">
                                        Dec 21 - 27, 2025
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-8 border-b bg-gray-50">
                                        <div className="p-2 border-r font-semibold"></div>
                                        <div className="p-2 border-r text-center font-semibold">Sun 12/21</div>
                                        <div className="p-2 border-r text-center font-semibold">Mon 12/22</div>
                                        <div className="p-2 border-r text-center font-semibold">Tue 12/23</div>
                                        <div className="p-2 border-r text-center font-semibold bg-yellow-100">Wed 12/24</div>
                                        <div className="p-2 border-r text-center font-semibold">Thu 12/25</div>
                                        <div className="p-2 border-r text-center font-semibold">Fri 12/26</div>
                                        <div className="p-2 text-center font-semibold">Sat 12/27</div>
                                    </div>
                                    <div className="grid grid-cols-8 max-h-[600px] overflow-y-auto">
                                        {['all-day', '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm'].map((time, timeIndex) => (
                                            <React.Fragment key={timeIndex}>
                                                <div className="p-2 border-r border-b bg-gray-50 font-semibold text-sm">
                                                    {time}
                                                </div>
                                                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                                                    <div
                                                        key={day}
                                                        className={`p-2 border-r border-b ${timeIndex === 0 && day === 3 ? 'bg-yellow-100' : ''}`}
                                                    >
                                                        {/* Empty cells for now */}
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Training;

