import React from 'react';
import { ArrowLeft } from 'lucide-react';

// Import Modular Components
import FinCheckInspection from './fin-check-inspection';
import FinCheckReport from './fin-check-report';
import FinCheckSetting from './fin-check-setting';
import FinCheckUpload from './fin-check-upload';
import FinCheckTemplate from './fin-check-template';
import P88LegacySystem from './p88';

import {
    FinCheckSettingIcon,
    FinCheckTemplateIcon,
    InspectionIcon,
    UploadIcon,
    FinCheckReportIcon,
    P88LegacyIcon
} from './fin-check-icon';

const FinCheckDashboard = ({ onBack }) => {
    const [activeModule, setActiveModule] = React.useState(null);
    const [view, setView] = React.useState('grid');
    const [selectedStyle, setSelectedStyle] = React.useState(null);
    const [defects, setDefects] = React.useState({
        "Broken Stitch": 0,
        "Uncut Thread": 2,
        "Shading Issue": 0,
        "Label Placement": 1
    });
    const [decision, setDecision] = React.useState(null);

    const updateDefect = (label, delta) => {
        setDefects(prev => ({
            ...prev,
            [label]: Math.max(0, prev[label] + delta)
        }));
    };

    const modules = [
        {
            id: 'settings',
            title: "FinCheck Setting",
            icon: FinCheckSettingIcon,
            theme: 'light'
        },
        {
            id: 'templates',
            title: "FinCheck Template",
            icon: FinCheckTemplateIcon,
            theme: 'dark'
        },
        {
            id: 'inspection',
            title: "Inspection",
            icon: InspectionIcon,
            theme: 'light'
        },
        {
            id: 'upload',
            title: "Inspection",
            icon: UploadIcon,
            theme: 'light'
        },
        {
            id: 'reports',
            title: "FinCheck Report",
            icon: FinCheckReportIcon,
            theme: 'dark'
        },
        {
            id: 'legacy',
            title: "P88 Legacy",
            icon: P88LegacyIcon,
            theme: 'light'
        }
    ];

    const DashboardCard = ({ module, isActive, onClick }) => {
        const Icon = module.icon;
        const isDark = module.theme === 'dark';

        return (
            <div
                onClick={onClick}
                className="flex flex-col items-center gap-6 group cursor-pointer"
            >
                <div
                    className={`w-48 h-48 rounded-[40px] p-8 flex items-center justify-center transition-all duration-300 shadow-lg relative overflow-hidden
                        ${isDark
                            ? 'bg-[#2E7CCF] border-0 hover:bg-[#2563EB] hover:scale-105'
                            : 'bg-white border-[2.5px] border-[#2E7CCF] hover:shadow-xl hover:scale-105'
                        }
                        ${isActive ? 'ring-4 ring-blue-500/20' : ''}
                    `}
                >
                    <Icon className="w-full h-full drop-shadow-sm" />
                    {/* Subtle Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[16px] font-bold text-gray-700 tracking-tight text-center">
                    {module.title}
                </span>
            </div>
        );
    };

    const renderContent = () => {
        if (view === 'selection' || view === 'inspection_detail') {
            return (
                <FinCheckInspection
                    view={view}
                    setView={setView}
                    selectedStyle={selectedStyle}
                    setSelectedStyle={setSelectedStyle}
                    defects={defects}
                    updateDefect={updateDefect}
                    decision={decision}
                    setDecision={setDecision}
                    onBack={() => setView('grid')}
                />
            );
        }
        if (view === 'reports') return <FinCheckReport onBack={() => { setView('grid'); setActiveModule(null); }} />;
        if (view === 'settings') return <FinCheckSetting onBack={() => { setView('grid'); setActiveModule(null); }} />;
        if (view === 'upload') return <FinCheckUpload onBack={() => { setView('grid'); setActiveModule(null); }} />;
        if (view === 'templates') return <FinCheckTemplate onBack={() => { setView('grid'); setActiveModule(null); }} />;
        if (view === 'legacy') return <P88LegacySystem onBack={() => { setView('grid'); setActiveModule(null); }} />;
        return null;
    };

    if (view !== 'grid') {
        return (
            <div className="min-h-screen bg-[#EBEEF3] p-6 flex flex-col items-center animate-in fade-in duration-500 overflow-y-auto w-full relative">
                {renderContent()}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F0F2F5] text-slate-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-3xl" />

            {/* Context-aware Back Button */}
            <button
                onClick={onBack}
                className="absolute top-10 left-10 flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all group border border-slate-100 active:scale-95 z-50"
                title="Back to YQMS"
            >
                <ArrowLeft size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            {/* Grid Container */}
            <div className="w-full max-w-[1400px] px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-12 gap-y-16 justify-items-center">
                    {modules.map((module) => (
                        <DashboardCard
                            key={module.id}
                            module={module}
                            isActive={activeModule === module.id}
                            onClick={() => {
                                setActiveModule(module.id);
                                if (module.id === 'inspection') setView('selection');
                                else if (module.id === 'legacy') setView('legacy');
                                else setView(module.id);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinCheckDashboard;
