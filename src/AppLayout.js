import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Search, Database, ChevronRight } from 'lucide-react';

import Header from './components/Header';
import SectionContainer from './components/SectionContainer';
import { DASHBOARD_DATA } from './data/module';
import YaiDataBot from './chatbot/YaiDataBot';

import GMChat from './chatbot/GMChat';

// A new layout component to hold the shared UI (Header, Background)
const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isGMChatOpen, setGMChatOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isYaiDataBotOpen, setYaiDataBotOpen] = useState(false);
    const [yaiVersion, setYaiVersion] = useState('yai1'); // 'yai1' or 'yai2'
    const [botModuleContext, setBotModuleContext] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const openBotForModule = (module) => {
        setBotModuleContext(module);
        setYaiDataBotOpen(true);
    };

    const handleModuleClick = (module) => {
        if (module.demoType) {
            const { demoType, id, title } = module;
            if (demoType === 'IMAGE_VIEW') navigate(`/image/${module.image}`);
            else if (demoType === 'VIEW_SYSTEM_ANALYSIS') navigate(`/${id}`);
            else if (demoType?.startsWith('SUBMENU')) {
                 const cards = id === 'digital-audit' ? [
                    { title: 'Checklist 6s', icon: 'CheckSquare', color: 'bg-cyan-500 text-white' },
                    { title: 'Digital Audit', icon: 'MonitorPlay', color: 'bg-blue-500 text-white' },
                    { title: 'Compliance Certificate', icon: 'FileCheck', color: 'bg-emerald-500 text-white' },
                    { title: 'Audit Plan', icon: 'Layout', color: 'bg-indigo-500 text-white' }
                ] : id === 'yhr' ? [
                    { title: 'Checklist Attendant', icon: 'CheckSquare', color: 'bg-sky-400 text-white' },
                    { title: 'My Attendant', icon: 'UserCog', color: 'bg-teal-500 text-white' }
                ] : id === 'pr-admin' ? [
                    { title: 'Show Lists Request', icon: 'Layout', color: 'bg-blue-500 text-white', image: 'modules-image/show-list-request.png' },
                    { title: 'Master List', icon: 'FileCheck', color: 'bg-blue-500 text-white', image: 'modules-image/Master-list-pr.png' },
                    { title: 'Purchaser Workspace', icon: 'Briefcase', color: 'bg-indigo-500 text-white' },
                    { title: 'My Confirm Received', icon: 'CheckCircle', color: 'bg-emerald-500 text-white' },
                    { title: 'Documents Joiner', icon: 'Plus', color: 'bg-orange-500 text-white' }
                ] : demoType === 'SUBMENU_PR' ? [
                    { title: 'Verify PR', icon: 'CheckCircle', color: 'bg-yellow-400', image: 'modules-image/Verify-pr.png' },//image path display 
                    { title: 'Approval PR', icon: 'FileCheck', color: 'bg-green-500 text-white', image: 'modules-image/Approval-pr.png' },
                    { title: 'Pay PR', icon: 'Banknote', color: 'bg-orange-500 text-white', image: 'modules-image/Pay-pr.png' }
                ] : id === 'gatepass' ? [
                    { title: 'Gate Pass', icon: 'Ticket', color: 'bg-blue-500 text-white' },
                    { title: 'Gate In/Out Records', icon: 'BookOpen', color: 'bg-sky-500 text-white' },
                    { title: 'Motorcycle Records', icon: 'Bike', color: 'bg-orange-500 text-white' },
                    { title: 'Car Plate Records', icon: 'Car', color: 'bg-red-500 text-white' },
                    { title: 'Truck Records', icon: 'Truck', color: 'bg-slate-500 text-white' },
                    { title: 'Walk In/Out', icon: 'Users', color: 'bg-teal-500 text-white' },
                    { title: 'Visitor Record', icon: 'FileCheck', color: 'bg-indigo-500 text-white' },
                    { title: '12K YM Tuk Tuk', icon: 'tuktuk', color: 'bg-lime-500 text-white' }
                ] : demoType === 'SUBMENU_ORG' ? [ // Org Chart
                    { title: 'Master Organization Chart', icon: 'LayoutDashboard', color: 'bg-purple-500 text-white', action: '/org-chart-master' },
                    { title: 'Custom Organization Chart', icon: 'Settings2', color: 'bg-indigo-500 text-white', action: '/org-chart-master' },
                    { title: 'Leader/Worker Sections', icon: 'Users', color: 'bg-sky-500 text-white', action: '/org-chart-master' }
                ] : id === 'cctv' ? [
                    { title: 'Face Scan Logs', icon: 'BookOpen', color: 'bg-sky-500 text-white',image: 'modules-image/face-scan-logs.png' },
                    { title: 'My Face Scan', icon: 'Scan', color: 'bg-teal-500 text-white' }
                
                ] : demoType === 'SUBMENU_ENERGY' ? [
                    { title: 'Meters', icon: 'GaugeCircle', color: 'bg-orange-500 text-white', action: '/energy/meters' },
                    { title: 'Solar Dashboard', icon: 'Sun', color: 'bg-yellow-500 text-white', action: '/energy/meters' },
                    { title: 'Switch Board Ampere Load Monitoring', icon: 'Activity', color: 'bg-red-500 text-white', action: '/energy/meters' },
                    { title: 'Energy Source', icon: 'Power', color: 'bg-green-500 text-white', action: '/energy/meters' }
                ] : demoType === 'SUBMENU_WASTE' ? [
                    { title: 'Waste', icon: 'Trash2', color: 'bg-purple-500 text-white', action: '/waste' },
                    { title: 'Boiler', icon: 'Flame', color: 'bg-orange-500 text-white' }
                ] : demoType === 'SUBMENU_AIR' ? [
                    { title: 'Temperature Humidity Sensor', icon: 'Thermometer', color: 'bg-red-500 text-white', action: '/sensors' },
                    { title: 'Switch (Fan & Pump)', icon: 'ToggleRight', color: 'bg-slate-500 text-white' },
                    { title: 'Air Quality Detector', icon: 'Wind', color: 'bg-sky-500 text-white', action: '/sensors' }
                ] : demoType === 'SUBMENU_WATER' ? [
                    { title: 'In', icon: 'ArrowDownToLine', color: 'bg-sky-500 text-white' },
                    { title: 'Out', icon: 'ArrowUpFromLine', color: 'bg-orange-500 text-white' }
                ] : demoType === 'SUBMENU_TEMP_WORKER' ? [
                    { title: 'Request Worker Form', icon: 'FileText', color: 'bg-blue-500 text-white' },
                    { title: 'Request Worker List', icon: 'Layout', color: 'bg-green-500 text-white' }
                ] : demoType === 'SUBMENU_E_INVOICING' ? [
                    { title: 'Cambodia E Invoice', icon: 'Banknote', color: 'bg-emerald-500 text-white' },
                    { title: 'Supplier Management', icon: 'Briefcase', color: 'bg-sky-500 text-white' },
                    { title: 'IEWS', icon: 'Layers', color: 'bg-indigo-500 text-white' }
                ] : demoType === 'SUBMENU_DEPARTMENTS' ? [
                    { title: 'Online Training', icon: 'MonitorPlay', color: 'bg-blue-500 text-white' }, // Correct
                    { title: 'YAI', icon: 'Building', color: 'bg-slate-500 text-white' }, // Correct
                    { title: 'CSR', icon: 'Globe', color: 'bg-green-500 text-white' }, // Correct
                    { title: 'IT', icon: 'Cpu', color: 'bg-sky-500 text-white' }, // Correct
                    { title: 'Shipping', icon: 'Truck', color: 'bg-orange-500 text-white' }, // Changed to Truck for shipping
                    { title: 'PPC', icon: 'ClipboardCheck', color: 'bg-indigo-500 text-white' }, // Correct
                    { title: 'Merchandising', icon: 'Tag', color: 'bg-pink-500 text-white' }, // Correct
                    { title: 'Purchasing', icon: 'ShoppingCart', color: 'bg-yellow-500 text-white' }, // Correct
                    { title: 'General Affairs', icon: 'Briefcase', color: 'bg-gray-500 text-white' }, // Correct
                    { title: 'Admin', icon: 'UserCog', color: 'bg-slate-600 text-white' }, // Correct
                    { title: 'HR', icon: 'Users', color: 'bg-blue-600 text-white' }, // Correct
                    { title: 'QA', icon: 'CheckSquare', color: 'bg-teal-500 text-white' }, // Correct
                    { title: 'Financial', icon: 'Banknote', color: 'bg-emerald-500 text-white' }, // Correct
                    { title: 'CBSA', icon: 'Shield', color: 'bg-red-500 text-white' }, // Correct
                    { title: 'Sample', icon: 'Shirt', color: 'bg-purple-500 text-white' }, // Correct
                    { title: 'Technical', icon: 'HardHat', color: 'bg-orange-600 text-white' }, // Correct
                    { title: 'Raw Material Warehouse', icon: 'Warehouse', color: 'bg-stone-500 text-white' }, // Correct
                    { title: 'Cutting', icon: 'Scissors', color: 'bg-rose-500 text-white' }, // Correct
                    { title: 'SCC', icon: 'Layers', color: 'bg-cyan-500 text-white' }, // Correct
                    { title: 'Sewing', icon: 'PenTool', color: 'bg-lime-500 text-white' }, // Changed to PenTool to represent a needle
                    { title: 'QC', icon: 'Search', color: 'bg-amber-500 text-white' }, // Correct
                    { title: 'Ironing', icon: 'Feather', color: 'bg-zinc-500 text-white' }, // Correct (No 'Iron' icon exists)
                    { title: 'Packing', icon: 'PackageCheck', color: 'bg-sky-600 text-white' }, // Correct
                    { title: 'Washing', icon: 'WashingMachine', color: 'bg-blue-400 text-white' }, // Correct
                    { title: 'TPM', icon: 'Wrench', color: 'bg-red-600 text-white' }, // Correct
                    { title: 'Warehouse', icon: 'Package', color: 'bg-neutral-500 text-white' }, // Changed to Package to differentiate from Raw Material Warehouse
                    { title: 'IE', icon: 'BrainCircuit', color: 'bg-fuchsia-500 text-white' }, // Correct
                    { title: 'QA (Fabric)', icon: 'TestTube', color: 'bg-violet-500 text-white' }, // Correct
                    { title: 'Production', icon: 'Factory', color: 'bg-gray-700 text-white' }, // Correct
                ] : [ // Energy & Others
                    { title: 'Analytics', icon: 'BarChart2', color: 'bg-blue-400 text-white' },
                    { title: 'Settings', icon: 'Settings', color: 'bg-gray-200' }
                ];
                navigate(`/submenu/${id}`, { state: { title, cards } });
            }  else if (demoType === 'GRID_TRAINING') navigate('/training');
            else if (demoType === 'VIEW_TICKET_CUSTOM') navigate('/ticket');
            else if (demoType === 'DASH_WASTE') navigate('/waste');
            else if (demoType === 'TIMELINE_MEETING') navigate('/meeting');
            else if (demoType?.startsWith('TABLE')) {
                if (id === 'ticket') navigate('/ticket');
                else navigate(`/${id}`);
            }
            else if (demoType === 'GRID_SHOP') navigate('/shop'); 
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-900 overflow-x-hidden" style={{ zIndex: 1 }}>
            <Header />

            {/* Chatbot Icon & Dropdown - Only show on home page */}
            {location.pathname === '/' && (
                <div className="fixed top-20 left-6 z-[60] text-white">
                    <button onClick={() => setDropdownOpen(prev => !prev)} className="rounded-full shadow-lg hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900" aria-label="Open AI Assistant">
                        <img src="assets/modules-image/chatbot.png" alt="AI Assistant" className="w-12 h-12 rounded-full object-cover animate-pulse" /> 
                    </button>
                    <div className='items-center'>Yai Data</div>

                {isDropdownOpen && (
                    <div className="absolute top-full mt-2 w-56 bg-slate-800/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <ul className="p-1 text-sm font-medium">
                            <li 
                                onClick={() => {
                                    setYaiVersion('yai1');
                                    setBotModuleContext(null);
                                    setYaiDataBotOpen(true);
                                    setDropdownOpen(false);
                                }}
                                className="relative flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer"
                            >
                                <div className="flex items-center gap-3"><Database size={16} /> Yai 1</div>
                                <ChevronRight size={16} />
                            </li>
                            <li 
                                onClick={() => {
                                    setYaiVersion('yai2');
                                    setYaiDataBotOpen(true);
                                    setDropdownOpen(false);
                                }}
                                className="relative flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-white/10 cursor-pointer"
                            >
                                <div className="flex items-center gap-3"><Database size={16} /> Yai 2</div>
                                <ChevronRight size={16} />
                            </li>
                        </ul>
                    </div>
                )}
                </div>
            )}

            {isYaiDataBotOpen && <YaiDataBot moduleContext={botModuleContext} version={yaiVersion} onClose={() => setYaiDataBotOpen(false)} />}
            {isGMChatOpen && <GMChat onClose={() => setGMChatOpen(false)} />}
            <main className="flex-1 relative p-4 md:p-6 overflow-x-auto">
                {/* === BACKGROUND LAYERS === */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0f172a] to-slate-900"></div>
                    <img
                        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
                        alt="Circuit Background"
                    />
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                </div>
                
                {/* Conditionally render dashboard content or other views */}
                {location.pathname === '/' ? (
                    <>
                        <div className="relative z-10 min-w-[1200px] max-w-[1800px] mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
                            <div className="w-full flex justify-end mb-4">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 flex items-center px-3 py-2 rounded-lg w-64 text-white">
                                    <Search className="w-4 h-4 text-cyan-300 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search modules..."
                                        className="bg-transparent border-none outline-none placeholder-cyan-100/50 w-full text-xs"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-start gap-4">
                                <SectionContainer
                                    section={DASHBOARD_DATA[0]}
                                    onModuleClick={handleModuleClick}
                                    onBotModuleClick={openBotForModule}
                                />
                                <SectionContainer
                                    section={DASHBOARD_DATA[1]}
                                    onModuleClick={handleModuleClick}
                                    onGMChatClick={() => setGMChatOpen(true)}
                                    onBotModuleClick={openBotForModule}
                                />
                                <SectionContainer
                                    section={DASHBOARD_DATA[2]}
                                    onModuleClick={handleModuleClick}
                                    onBotModuleClick={openBotForModule}
                                />
                            </div>
                        </div>
                    </>
                ) : <Outlet />}
            </main>
        </div>
    );
}

export default AppLayout;