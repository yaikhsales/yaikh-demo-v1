import React from 'react';
import {
    Layout, Plus, Search, MoreHorizontal, FileText, ArrowLeft,
    GripVertical, CheckCircle2, XCircle, Info, Camera,
    Layers, MapPin, Bug, Ruler, ClipboardCheck, User,
    Trash2, Edit, ChevronRight, Shield, Sparkles
} from 'lucide-react';

const FinCheckTemplate = ({ onBack }) => {
    const navItems = [
        { icon: FileText, label: "Reports", active: true },
        { icon: Layout, label: "Header Preview" },
        { icon: Camera, label: "Photo Sections" },
        { icon: MapPin, label: "Defect Locations" },
        { icon: Bug, label: "Defect Selection" },
        { icon: Ruler, label: "Measurements" },
        { icon: ClipboardCheck, label: "PP Sheet" }
    ];

    const templateData = [
        {
            no: 1,
            type: "Pilot Run-Sewing",
            meas: "Before",
            meas2: "After",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF", "WA"],
            photos: ["Lab test & testing...", "Product", "PHOTOS ATTACH...", "Packing, Packagi..."],
            line: true, tab: false, col: true, stage: false, meth: "AQL", qty: 5, ctn: false, scan: false, qplan: false, conc: true
        },
        {
            no: 2,
            type: "First Output Sewing",
            meas: "Before",
            meas2: "After",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF"],
            photos: ["Lab test & testing...", "Product", "PHOTOS ATTACH...", "Packing, Packagi..."],
            line: true, tab: false, col: true, stage: false, meth: "Fixed", qty: 5, ctn: false, scan: false, qplan: false, conc: true
        },
        {
            no: 3,
            type: "Inline Inspection-Sewing",
            meas: "Before",
            meas2: "After",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF", "WA", "IR"],
            photos: ["Lab test & testing...", "Product", "PHOTOS ATTACH...", "Packing, Packagi..."],
            line: true, tab: false, col: true, stage: false, meth: "Fixed", qty: 28, ctn: false, scan: true, qplan: false, conc: true
        },
        {
            no: 4,
            type: "First output Finishing",
            meas: "After",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF", "WA", "IR", "PC"],
            photos: ["Lab test & testing...", "Packing, Packagi...", "PHOTOS ATTACH...", "Product"],
            line: false, tab: false, col: true, stage: false, meth: "Fixed", qty: 5, ctn: false, scan: false, qplan: false, conc: true
        },
        {
            no: 5,
            type: "Inline Inspection-Finishing",
            meas: "After",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF", "WA", "IR", "PC"],
            photos: ["Lab test & testing...", "Product", "PHOTOS ATTACH...", "Packing, Packagi..."],
            line: false, tab: true, col: true, stage: false, meth: "Fixed", qty: 25, ctn: false, scan: false, qplan: false, conc: true
        },
        {
            no: 6,
            type: "Interim Inspection",
            meas: "After",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF", "WA", "IR", "PC"],
            photos: ["Dummy View", "PHOTOS ATTACH...", "Packing, Packagi...", "Lab test & testing...", "Product", "SHIPPING MARK..."],
            line: false, tab: false, col: true, stage: true, meth: "AQL", qty: 0, ctn: false, scan: false, qplan: true, conc: true
        },
        {
            no: 7,
            type: "First output Carton",
            meas: "No",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["CLA", "FC", "TA"],
            photos: ["Lab test & testing...", "PHOTOS ATTACH...", "SHIPPING MARK...", "Packing, Packagi...", "Product"],
            line: false, tab: false, col: true, stage: true, meth: "AQL", qty: 0, ctn: true, scan: false, qplan: false, conc: true
        },
        {
            no: 8,
            type: "Pre-Final Inspection",
            meas: "After",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["FB", "WMS", "CLA", "TA", "LE", "WA", "IR", "PC"],
            photos: ["Dummy View", "Lab test & testing...", "PHOTOS ATTACH...", "Packing, Packagi...", "Product", "SHIPPING MARK..."],
            line: false, tab: false, col: true, stage: true, meth: "AQL", qty: 0, ctn: false, scan: false, qplan: true, conc: true
        },
        {
            no: 9,
            type: "Final Inspection",
            meas: "After",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["FR", "WMS", "CLA", "TA", "LF", "WA", "IR", "PC"],
            photos: ["Dummy View", "Lab test & testing...", "Product", "PHOTOS ATTACH...", "SHIPPING MARK...", "Packing, Packagi..."],
            line: false, tab: false, col: true, stage: true, meth: "AQL", qty: 0, ctn: false, scan: false, qplan: true, conc: true
        },
        {
            no: 10,
            type: "EMB Interim",
            meas: "No",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["EMB"],
            photos: ["Product", "PHOTOS ATTACH...", "Packing, Packagi..."],
            line: false, tab: false, col: true, stage: false, meth: "AQL", qty: 0, ctn: false, scan: false, qplan: true, conc: true
        },
        {
            no: 11,
            type: "Printing Interim",
            meas: "No",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["PRI"],
            photos: ["Product", "PHOTOS ATTACH...", "Packing, Packagi..."],
            line: false, tab: false, col: true, stage: false, meth: "AQL", qty: 0, ctn: false, scan: false, qplan: true, conc: true
        },
        {
            no: 12,
            type: "EMB Frist Output",
            meas: "No",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["EMB"],
            photos: ["PHOTOS ATTACH...", "Packing List & La...", "Product"],
            line: false, tab: false, col: false, stage: false, meth: "Fixed", qty: 25, ctn: false, scan: false, qplan: true, conc: true
        },
        {
            no: 13,
            type: "Printing First Output",
            meas: "No",
            meas2: "No",
            head: true,
            pics: true,
            defects: ["PRI"],
            photos: ["PHOTOS ATTACH...", "Packing List & La...", "Product"],
            line: false, tab: false, col: false, stage: false, meth: "Fixed", qty: 25, ctn: false, scan: false, qplan: true, conc: true
        }
    ];

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col">
            {/* Header with Visual Polish */}
            <div className="w-full bg-gradient-to-r from-[#5340C7] via-[#9F37B3] to-[#C9338D] text-white p-4 shadow-xl relative z-50 rounded-xl">
                <div className="flex items-center justify-between gap-2 max-w-full mx-auto px-6">
                    {/* Brand Section */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/40 hover:bg-white/20 transition-all group active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5 text-white transition-transform group-hover:-translate-x-0.5" />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/40">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black leading-tight flex items-center gap-2">
                                Fin Check | Templates
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm group/pro cursor-help">
                                    <Sparkles size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-[10px] font-black tracking-wider">PRO</span>
                                </div>
                            </h1>
                            <p className="text-white/70 text-sm font-bold mt-0.5">Manage Inspection Templates & Configurations</p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex-1 max-w-3xl bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/40 flex items-center gap-2 mx-6 overflow-x-auto no-scrollbar">
                        {navItems.map((item, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-center justify-center min-w-[100px] h-14 rounded-xl transition-all cursor-pointer relative group ${item.active ? 'bg-white text-[#9333EA] shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                            >
                                {item.active && (
                                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                )}
                                <item.icon className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 ${item.active ? 'text-[#9333EA]' : 'text-white'}`} />
                                <span className={`text-[12px] font-black text-center ${item.active ? 'text-xs' : 'text-white'}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Active Status & User */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="flex items-center gap-3 py-2 px-4 bg-white/10 rounded-2xl border border-white/40">
                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34D399]" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-white leading-none">Reports</span>
                                <span className="text-[8px] font-bold text-white/40 uppercase mt-0.5">Active Section</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 py-2 px-4 bg-white/10 rounded-2xl border border-white/40">
                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white leading-none">QA Officer</span>
                                <span className="text-[8px] font-bold text-white/40 uppercase mt-0.5">ID: YM7625</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="px-4 py-4 flex flex-col gap-6">
                {/* Section Title & Primary Action */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Manage Report Templates</h2>
                        <p className="text-slate-400 text-sm font-bold">Configure report structures and categories. <span className="text-indigo-500 cursor-pointer hover:underline">Drag rows to reorder.</span></p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-indigo-200">
                        <Plus className="w-4 h-4 stroke-[3px]" />
                        Add New Report
                    </button>
                </div>

                {/* Banner Alert */}
                <div className="w-full bg-[#EEF2FF] border border-blue-200 rounded-lg p-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                        <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-black text-indigo-700">Drag and Drop to Reorder</span>
                        <span className="text-[11px] font-bold text-indigo-400">Use the grip handle or drag any row to change the template order. Changes are saved automatically.</span>
                    </div>
                </div>

                {/* Dynamic Configuration Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1250px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-2 text-center w-10"><GripVertical className="w-4 h-4 text-slate-300 mx-auto" /></th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase">NO</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase">REPORT TYPE</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">MEAS.</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">MEAS 2</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">HEAD</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">PICS</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase">DEFECT CATEGORIES</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase">PHOTO SECTIONS</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">LINE</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">TAB</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">COL</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">STAGE</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">METH</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">QTY</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">CTN</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">SCAN</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">Q.PLAN</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">CONC</th>
                                <th className="p-2 text-[12px] font-black text-slate-400 uppercase text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {templateData.map((row) => (
                                <tr key={row.no} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-grab active:cursor-grabbing">
                                    <td className="p-2 text-center opacity-20 group-hover:opacity-100"><GripVertical className="w-4 h-4 mx-auto" /></td>
                                    <td className="p-2 border-r border-slate-50">
                                        <div className="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-xs font-black mx-auto border border-indigo-100">
                                            {row.no}
                                        </div>
                                    </td>
                                    <td className="p-2 border-r border-slate-50 max-w-[200px]">
                                        <span className="text-sm font-bold text-slate-700">{row.type}</span>
                                    </td>
                                    {/* MEAS Column */}
                                    <td className="p-2 text-center border-r border-slate-50">
                                        {row.meas === "No" ? (
                                            <div className="flex items-center justify-center gap-1.5 text-slate-300">
                                                <XCircle className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase">No</span>
                                            </div>
                                        ) : (
                                            <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 ${row.meas === 'Before' ? 'bg-[#E0E7FF] text-[#4338CA]' : 'bg-[#DBEAFE] text-[#1D4ED8]'}`}>
                                                <div className={`w-1 h-1 rounded-full ${row.meas === 'Before' ? 'bg-[#4338CA]' : 'bg-[#1D4ED8]'}`} />
                                                {row.meas}
                                            </div>
                                        )}
                                    </td>
                                    {/* MEAS 2 Column */}
                                    <td className="p-2 text-center border-r border-slate-50">
                                        {row.meas2 !== "No" ? (
                                            <div className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 border border-indigo-100">
                                                <div className="w-1 h-1 bg-[#6366F1] rounded-full" />
                                                {row.meas2}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-1.5 text-slate-300">
                                                <XCircle className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase">No</span>
                                            </div>
                                        )}
                                    </td>
                                    {/* YES/NO Badges (HEAD, PICS, etc) */}
                                    {[row.head, row.pics].map((val, idx) => (
                                        <td key={idx} className="p-2 text-center border-r border-slate-50">
                                            {val ? (
                                                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1.5 border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Yes
                                                </div>
                                            ) : (
                                                <div className="px-2 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1.5 border border-slate-100">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    No
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                    {/* Defect Categories Tags */}
                                    <td className="p-2 border-r border-slate-50 max-w-[150px]">
                                        <div className="flex flex-wrap gap-1">
                                            {row.defects.map((def, idx) => (
                                                <span key={idx} className="text-[8px] font-black px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded border border-indigo-100 uppercase">
                                                    {def}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    {/* Photo Sections Tags */}
                                    <td className="p-2 border-r border-slate-50 max-w-[200px]">
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {row.photos.map((photo, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50/50 text-emerald-600 rounded-md border border-emerald-100/50 overflow-hidden">
                                                    <Camera className="w-2.5 h-2.5 shrink-0" />
                                                    <span className="text-[9px] font-bold truncate tracking-tight">{photo}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    {/* Boolean Columns (LINE, TAB, COL, STAGE) */}
                                    {[row.line, row.tab, row.col, row.stage].map((val, idx) => (
                                        <td key={idx} className="p-2 text-center border-r border-slate-50">
                                            {val ? (
                                                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Yes
                                                </div>
                                            ) : (
                                                <div className="px-2 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 border border-slate-100">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    No
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-2 text-center border-r border-slate-50">
                                        <div className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1.5 border border-indigo-100">
                                            <Layers className="w-3.5 h-3.5" />
                                            {row.meth}
                                        </div>
                                    </td>
                                    <td className="p-2 text-center border-r border-slate-50 text-xs font-black text-slate-700">{row.qty}</td>
                                    {/* Boolean Columns Remaining (CTN, SCAN, QPLAN, CONC) */}
                                    {[row.ctn, row.scan, row.qplan, row.conc].map((val, idx) => (
                                        <td key={idx} className="p-2 text-center border-r border-slate-50">
                                            {val ? (
                                                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Yes
                                                </div>
                                            ) : (
                                                <div className="px-2 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 border border-slate-100">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    No
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                    {/* Actions */}
                                    <td className="p-2 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-600 rounded-lg border border-rose-100 hover:bg-rose-100 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinCheckTemplate;
