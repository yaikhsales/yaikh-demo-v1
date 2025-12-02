import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Outlet } from 'react-router-dom';
import { Scan, tuktuk } from '@lucide/lab';


import {
  Users, Calculator, Layout, Briefcase, Ticket, FileText, ShoppingBag, 
  User, CheckSquare, Zap, Wind, Droplet, Globe, Mic, Trash2, 
  Truck, AlertTriangle, Video, Factory, Box, Settings, Layers, 
  Clock, Tag, ShoppingCart, Search, Bell, Menu, Home, Mail, Calendar, Flame, Fan, ToggleRight, ArrowDownToLine, ArrowUpFromLine,
  MessageSquare, ChevronDown, QrCode, GraduationCap, UserCog, 
  Receipt, FlaskConical, MonitorPlay, ClipboardCheck, ArrowLeft, Building,
  CheckCircle, FileCheck, Banknote, BarChart2, PieChart, MapPin, Ticket as TicketIcon, Package, Scissors, Warehouse, Cpu, HardHat, Hand, Shirt, Feather, PackageCheck, WashingMachine, Wrench, BrainCircuit, TestTube, Shield, LayoutDashboard, Settings2, GaugeCircle, Sun, Activity, Power, Car, Bike, Bus, Rocket, BarChartBig, UsersRound, Download, X,

  Image as ImageIcon, Plus, Filter, MoreHorizontal, Thermometer, Droplets,
  BookOpen, Video as VideoIcon, PenTool, Coffee, Clock as ClockIcon
} from 'lucide-react';

import Header from './components/Header';
import SectionContainer from './components/SectionContainer'; 
import { DASHBOARD_DATA } from './data/module';
import SupportTicketForm from './support-tickets/form';


const TrainingGridView = ({ onBack }) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800">Training Courses</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-6 overflow-auto">
            {['Orientation', 'Safety', 'Compliance', 'Technical', 'Soft Skills', 'Leadership', 'IT Security', 'First Aid', 'Quality Control', 'Inventory', 'Customer Svc', 'Management'].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-20 h-20 bg-slate-50 border rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-300 transition-all">
                        <BookOpen size={32} className="text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <span className="text-xs font-bold text-center text-slate-600 group-hover:text-blue-600">{item}</span>
                </div>
            ))}
        </div>
    </div>
);

const iconMap = {
    CheckCircle,
    FileCheck,
    Banknote,
    Users,
    Mail,
    Layout,
    UserCog,
    FileText,
    BarChart2,
    Settings,
    CheckSquare,
    MonitorPlay,
    Layers,
    Briefcase,
    Plus,
    BookOpen,
    Truck,
    Building,
    Package,
    Scissors,
    Warehouse,
    Cpu,
    HardHat,
    Hand,
    Shirt,
    
    Feather,
    PackageCheck,
    WashingMachine,
    Wrench,
    BrainCircuit,
    TestTube,
    LayoutDashboard,
    Settings2,
    GaugeCircle,
    Sun,
    Activity,
    Power,
    Car,
    Bike,
    Bus,
    Rocket,
    BarChartBig,
    UsersRound,
   
    Download,
    Flame,
    Fan,
    ToggleRight,
    ArrowDownToLine,
    ArrowUpFromLine,
    X,
    
};

const IconRenderer = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <ImageIcon {...props} />;
    return <IconComponent {...props} />;
};

const SensorGridView = ({ onBack }) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800">Air Quality Sensors</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((s) => (
                <div key={s} className="border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Wind size={24} /></div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Online</span>
                    </div>
                    <h3 className="font-bold text-lg mb-4">Sensor Node #{s}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <Thermometer className="mx-auto text-red-400 mb-1" size={20} />
                            <div className="text-xl font-bold">24°C</div>
                            <div className="text-xs text-gray-500">Temp</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <Droplets className="mx-auto text-blue-400 mb-1" size={20} />
                            <div className="text-xl font-bold">60%</div>
                            <div className="text-xs text-gray-500">Humidity</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const WasteDashboardView = ({ onBack }) => (
    <div className="bg-slate-50 rounded-xl shadow-2xl h-[600px] m-4 animate-in fade-in duration-500 flex flex-col overflow-hidden">
        <div className="bg-purple-700 text-white p-4 flex items-center gap-4 shadow-md">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full"><ArrowLeft size={20} /></button>
            <h2 className="text-xl font-bold">Waste Management Analytics</h2>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6 flex-1 overflow-auto">
             <div className="col-span-3 grid grid-cols-4 gap-4 mb-2">
                 {['Total Waste', 'Recycled', 'Landfill', 'Hazardous'].map((t, i) => (
                     <div key={i} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
                         <div className="text-gray-500 text-xs uppercase font-bold">{t}</div>
                         <div className="text-2xl font-bold text-slate-800">{Math.floor(Math.random()*500)} kg</div>
                     </div>
                 ))}
             </div>
             <div className="col-span-1 bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                 <h3 className="font-bold text-gray-700 mb-6 self-start">Composition</h3>
                 <div className="w-48 h-48 rounded-full border-[20px] border-purple-200 border-t-purple-600 border-r-pink-500"></div>
                 <div className="flex gap-4 mt-6 text-xs font-bold">
                     <span className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-600 rounded-full"></div> Plastic</span>
                     <span className="flex items-center gap-1"><div className="w-3 h-3 bg-pink-500 rounded-full"></div> Paper</span>
                 </div>
             </div>
             <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
                 <h3 className="font-bold text-gray-700 mb-4">Monthly Trend</h3>
                 <div className="h-64 flex items-end justify-between gap-2">
                     {[30, 45, 20, 60, 40, 70, 50, 80, 55, 45, 65, 90].map((h, i) => (
                         <div key={i} className="w-full bg-purple-100 rounded-t-lg relative group">
                             <div className="absolute bottom-0 w-full bg-purple-600 rounded-t-lg transition-all duration-500" style={{height: `${h}%`}}></div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    </div>
);

const TimelineView = ({ onBack, onAdd }) => (
    <div className="bg-white rounded-xl shadow-2xl h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
                 <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={20} /></button>
                 <h2 className="text-xl font-bold text-slate-800">Meeting Room Booking</h2>
            </div>
            <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700">
                <Plus size={16} /> New Booking
            </button>
        </div>
        <div className="flex-1 p-6 overflow-auto">
             <div className="flex mb-4 pl-32 border-b pb-2">
                 {[9, 10, 11, 12, 13, 14, 15, 16, 17].map(h => (
                     <div key={h} className="flex-1 text-center text-xs font-bold text-gray-400">{h}:00</div>
                 ))}
             </div>
             {['Room A (Large)', 'Room B (Small)', 'Conf. Hall', 'Project Room'].map((room, i) => (
                 <div key={i} className="flex items-center mb-6 h-12 relative group">
                     <div className="w-32 font-bold text-slate-700 text-sm">{room}</div>
                     <div className="flex-1 bg-slate-100 h-10 rounded-lg relative overflow-hidden">
                         <div className="absolute top-1 bottom-1 bg-blue-500 rounded-md opacity-80 text-white text-[10px] flex items-center justify-center font-bold truncate px-2 border border-blue-600 shadow-sm"
                              style={{left: `${(i * 15) + 10}%`, width: '20%'}}>
                             Team Sync
                         </div>
                         {i % 2 === 0 && (
                            <div className="absolute top-1 bottom-1 bg-green-500 rounded-md opacity-80 text-white text-[10px] flex items-center justify-center font-bold truncate px-2 border border-green-600 shadow-sm"
                                 style={{left: '60%', width: '15%'}}>
                                Client Call
                            </div>
                         )}
                     </div>
                 </div>
             ))}
        </div>
    </div>
);

// 3.5 GENERIC SUB-MENU VIEW 
const SubMenuView = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const { state } = useLocation(); // Get title from navigation state
    const { title = 'Submenu', cards = [] } = state || {};

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] animate-in fade-in zoom-in duration-300">
        <div className="w-full max-w-4xl mb-8 flex items-center">
            <button onClick={() => navigate(-1)} className="flex items-center text-white hover:text-cyan-400 gap-2 font-bold bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <ArrowLeft /> Dashboard
            </button>
            <h2 className="text-3xl text-white font-bold ml-auto mr-auto uppercase tracking-wider drop-shadow-lg">{title}</h2>
            <div className="w-32"></div>
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
            {cards.map((card, idx) => (
                 <button 
                    key={idx}
                    onClick={() => card.action ? navigate(card.action) : (card.image ? navigate(`/image/${card.image}`) : navigate(`/submenu/${moduleId}`))}

                    className={`w-48 h-40 rounded-xl shadow-xl hover:scale-105 transition transform flex flex-col items-center justify-center gap-4 border-b-4 border-black/20 ${card.color || 'bg-white text-slate-800'}`}
                 >
                    <div className="bg-black/5 p-4 rounded-full"><IconRenderer iconName={card.icon} size={40} /></div>
                    <span className="font-bold text-lg text-center px-2 leading-tight">{card.title}</span>
                </button>
            ))}
        </div>
    </div>);
};

// 3.6 MAP MODAL (Car Booking - Video 06:37)
const MapModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[600px] overflow-hidden animate-in zoom-in duration-200 flex">
            {/* Form Side */}
            <div className="w-1/3 bg-slate-50 p-6 border-r flex flex-col gap-4">
                 <h3 className="font-bold text-xl mb-4">New Car Booking</h3>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Destination</label>
                     <div className="flex gap-2">
                         <input type="text" className="w-full border rounded-lg p-2 text-sm" placeholder="Search location..." />
                         <button className="bg-blue-600 text-white p-2 rounded-lg"><Search size={16} /></button>
                     </div>
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Date & Time</label>
                     <input type="datetime-local" className="w-full border rounded-lg p-2 text-sm" />
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Reason</label>
                     <textarea className="w-full border rounded-lg p-2 text-sm h-24" placeholder="Client meeting, site visit..." />
                 </div>
                 <div className="mt-auto flex gap-2">
                     <button onClick={onClose} className="flex-1 bg-gray-200 py-3 rounded-xl font-bold hover:bg-gray-300">Cancel</button>
                     <button onClick={onClose} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Confirm</button>
                 </div>
            </div>
            <div className="w-2/3 bg-blue-50 relative">
                 <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <MapPin size={48} className="text-red-500 drop-shadow-2xl animate-bounce" />
                 </div>
                 <div className="absolute bottom-6 right-6 bg-white p-2 rounded shadow text-xs">
                     Map Data © 2024 Google
                 </div>
            </div>
        </div>
    </div>
);

// 3.7 GENERIC TABLE (For tickets, lists)
const TableView = ({ onBack }) => {
    const { moduleId } = useParams();
    const [showModal, setShowModal] = useState(false);

    // Define data based on the route parameter
    const tableConfig = {
        car: {
            title: 'My Car Bookings',
            columns: ['ID', 'Destination', 'Date', 'Status'],
            data: [
                { id: '#CB-001', destination: 'Suvarnabhumi Airport', date: '2024-11-30', status: 'ACTIVE' },
                { id: '#CB-002', destination: 'Client Office (Silom)', date: '2024-12-02', status: 'ACTIVE' },
            ],
            actionLabel: 'New Booking',
            showAction: true,
        },
        default: {
            title: 'Data List',
            columns: ['ID', 'Name', 'Value'],
            data: [{ id: 'N/A', name: 'No data available', value: '' }],
            showAction: false,
        }
    };

    const { title, columns, data, actionLabel, showAction } = tableConfig[moduleId] || tableConfig.default;
    const isCar = moduleId === 'car';

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-500 m-4">
            <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft size={20} /></button>
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                </div>
                {showAction && <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700"><Plus size={16} /> {actionLabel}</button>}
            </div>
            <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                        <tr>{columns.map((col, i) => <th key={i} className="px-6 py-3">{col}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                {Object.values(row).map((val, vIdx) => <td key={vIdx} className="px-6 py-4 font-medium text-gray-900">{val === 'ACTIVE' ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span> : val}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && isCar && <MapModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

// NEW: Support Ticket View
const SupportTicketView = ({ onBack }) => {
    const [requests, setRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const columns = ['REF', 'Type', 'Subject', 'Image', 'Details', 'Created Date', 'Plan Date', 'Finish Date', 'Status'];

    return (
        <>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-500 m-4">
                <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft size={20} /></button>
                        <h2 className="text-xl font-bold text-slate-800">Support Ticket</h2>
                    </div>
                    <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700">
                        <Plus size={16} /> Add Request
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                <tr>{columns.map((col, i) => <th key={i} className="px-6 py-3">{col}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="text-center py-20">
                                            <TicketIcon size={48} className="mx-auto text-slate-300 mb-4" />
                                            <h3 className="text-lg font-bold text-slate-700">Looks like you have no requests yet!</h3>
                                            <p className="text-slate-500 mt-2">Need help? Submit a ticket, and we’ll be happy to assist you.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <></> // Placeholder for future data rows
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showForm && <SupportTicketForm onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />}
        </>
    );
};

// NEW: Organization Chart View
const OrgChartView = ({ onBack }) => {
    const chartData = {
        name: 'CEO / President',
        title: 'YAI',
        children: [
            {
                name: 'VP of Operations', title: 'Operations',
                children: [ { name: 'Production Manager', title: 'Production' }, { name: 'QA Manager', title: 'QA' } ]
            },
            {
                name: 'VP of Finance', title: 'Finance',
                children: [ { name: 'Accountant', title: 'Accounting' }, { name: 'Purchasing Head', title: 'Purchasing' } ]
            },
            {
                name: 'VP of HR & Admin', title: 'HR & Admin',
                children: [ { name: 'HR Manager', title: 'HR' }, { name: 'Admin Manager', title: 'Admin' } ]
            },
        ],
    };

    const renderNode = (node) => (
        <li key={node.name} className="relative px-4">
            <div className="flex flex-col items-center text-center">
                <div className="bg-sky-200 text-sky-800 font-bold px-4 py-2 rounded-lg border-2 border-sky-400 shadow-md">{node.name}</div>
                <div className="text-xs text-slate-500">{node.title}</div>
            </div>
            {node.children && node.children.length > 0 && (
                <ul className="flex justify-center pt-8 before:content-[''] before:absolute before:top-0 before:left-1/2 before:w-px before:h-8 before:bg-slate-300">
                    {node.children.map(renderNode)}
                </ul>
            )}
        </li>
    );

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={20} /></button>
                <h2 className="text-xl font-bold text-slate-800">Master Organization Chart</h2>
            </div>
            <div className="flex-1 overflow-auto text-center p-4"><ul>{renderNode(chartData)}</ul></div>
        </div>
    );
};

// NEW: Meter Device List View for Energy Module
const MeterDeviceListView = ({ onBack }) => {
    const meterData = [
        { id: 'MTR-001', location: 'Factory A, Floor 1', status: 'Online', lastReading: '2025-12-01 07:30', energy: '1205.75 kWh' },
        { id: 'MTR-002', location: 'Factory A, Floor 2', status: 'Online', lastReading: '2025-12-01 07:30', energy: '1543.21 kWh' },
        { id: 'MTR-003', location: 'Factory B, Main Hall', status: 'Offline', lastReading: '2025-11-30 18:00', energy: '987.50 kWh' },
        { id: 'MTR-004', location: 'Admin Building', status: 'Online', lastReading: '2025-12-01 07:31', energy: '450.10 kWh' },
    ];

    const columns = ['Device ID', 'Location', 'Status', 'Last Reading', 'Energy Usage'];

    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-4 duration-500 m-4">
            <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft size={20} /></button>
                    <h2 className="text-xl font-bold text-slate-800">Meter's Device List</h2>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                        <tr>{columns.map((col, i) => <th key={i} className="px-6 py-3">{col}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {meterData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50">
                                {Object.values(row).map((val, vIdx) => <td key={vIdx} className="px-6 py-4 font-medium text-gray-800">{
                                    val === 'Online' ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Online</span> :
                                    val === 'Offline' ? <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">Offline</span> : val
                                }</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// NEW: System Analysis Dashboard View
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
                <button onClick={onBack} className="bg-white px-4 py-2 rounded-lg font-bold text-slate-700 border hover:bg-slate-50">Back</button>
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
                        <button key={label} className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-md hover:bg-blue-500 hover:text-white">{label}</button>
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
                <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply Filter</button>
                <button className="px-4 py-2 text-sm font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">Reset</button>
                <button className="px-4 py-2 text-sm font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"><Download size={16} /> Export Report</button>
            </div>

            {/* Main Content */}
            <div className="bg-white p-6 rounded-lg border shadow-sm flex-1">
                <h2 className="text-xl font-bold text-slate-800 mb-4">📊 Real-Time Analytics Dashboard</h2>
                {/* Tabs */}
                <div className="border-b mb-4">
                    <div className="flex gap-6">
                        <button className="py-2 border-b-2 border-blue-500 font-bold text-blue-600">Module Requests</button>
                        <button className="py-2 border-b-2 border-transparent font-bold text-slate-500 hover:text-blue-600">User Distribution</button>
                        <button className="py-2 border-b-2 border-transparent font-bold text-slate-500 hover:text-blue-600">System Overview</button>
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
                                <td className="p-3 text-xs font-mono">{mod.cost ? `${mod.cost.usd}$ ${mod.cost.khr}KHR ${mod.cost.rmb}RMB` : ''}</td>
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

// 3.8 SHOP GRID (NEW - For Y Shop)
const ShopGridView = ({ onBack }) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 h-[600px] m-4 animate-in fade-in duration-500 flex flex-col">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800">Y Shop - Stationery</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-6 overflow-auto">
            {['Pens', 'Notebooks', 'Staplers', 'Paper Clips', 'Folders', 'Highlighters', 'Sticky Notes', 'Tape', 'Scissors', 'Envelopes'].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group border rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center">
                        <ImageIcon size={48} className="text-slate-300" />
                    </div>
                    <span className="text-sm font-bold text-center text-slate-700">{item}</span>
                    <button className="w-full bg-blue-50 text-blue-700 font-bold text-xs py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">Add to Cart</button>
                </div>
            ))}
        </div>
    </div>
);

// NEW: Generic Image View
const ImageView = ({ onBack }) => {
    const params = useParams();
    const imagePath = params['*']; // Use the wildcard parameter
    const imageUrl = `/assets/${imagePath}`;
    const altText = imagePath ? imagePath.split('/').pop().split('.')[0] : 'Displayed image';

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl h-[600px] m-4 animate-in fade-in duration-500 flex flex-col overflow-hidden">
            <div className="p-4 flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full text-white"><ArrowLeft size={20} /></button>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center">
                <img src={imageUrl} alt={altText} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
            </div>
        </div>
    );
};

// Main Dashboard Component
const Dashboard = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);
//Handle all image display
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
                    <SectionContainer section={DASHBOARD_DATA[0]} onModuleClick={handleModuleClick} />
                    <SectionContainer section={DASHBOARD_DATA[1]} onModuleClick={handleModuleClick} />
                    <SectionContainer section={DASHBOARD_DATA[2]} onModuleClick={handleModuleClick} />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 text-white text-[10px] py-1 px-4 flex justify-between items-center z-50 border-t border-slate-700">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="font-mono text-cyan-400">SYSTEM ONLINE</span></div>
                <div className="flex gap-4 opacity-70 font-mono"><span>{currentTime}</span></div>
            </div>
        </>
    );
}

// A new layout component to hold the shared UI (Header, Background)
const AppLayout = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-900 overflow-x-hidden">
            <Header />
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
                <Outlet /> {/* This will render the matched child route */}
            </main>
        </div>
    );
}

export default function App() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1); // Go back to the previous page

    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} /> 
                <Route path="training" element={<TrainingGridView onBack={handleBack} />} />
                <Route path="sensors" element={<SensorGridView onBack={handleBack} />} />
                <Route path="waste" element={<WasteDashboardView onBack={handleBack} />} />
                <Route path="shop" element={<ShopGridView onBack={handleBack} />} />
                <Route path="meeting" element={<TimelineView onBack={handleBack} onAdd={() => {}} />} />
                <Route path="ticket" element={<SupportTicketView onBack={handleBack} />} />
                <Route path="submenu/:moduleId" element={<SubMenuView />} />
                <Route path="image/*" element={<ImageView onBack={handleBack} />} />
                <Route path="org-chart-master" element={<OrgChartView onBack={handleBack} />} />
                <Route path="energy/meters" element={<MeterDeviceListView onBack={handleBack} />} />
                <Route path="system-analysis" element={<SystemAnalysisView onBack={handleBack} />} />
                <Route path=":moduleId" element={<TableView onBack={handleBack} />} />
            </Route>
        </Routes>
    );
}