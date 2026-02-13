import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Plus,
  MessageCircle,
  ArrowLeft,
  Cpu,
  Wrench,
  Container,
  Settings,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const MachineAllocation = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Active Allocations", count: 24 }];

  const allocations = [
    {
      id: 1,
      line: "LINE 01",
      machine: "SN-021 (Single Needle)",
      operator: "Dot Sreynoch",
      style: "Y-7821",
      opName: "Front Placket Attach",
      condition: "OPTIMAL",
      status: "RUNNING",
    },
    {
      id: 2,
      line: "LINE 01",
      machine: "OL-045 (4-Thread Overlock)",
      operator: "Voun Thida",
      style: "Y-7821",
      opName: "Side Seam Join",
      condition: "NEEDS SERVICE",
      status: "RUNNING",
    },
    {
      id: 3,
      line: "LINE 05",
      machine: "FL-009 (Flatlock)",
      operator: "Sin Khun",
      style: "Y-9902",
      opName: "Bottom Hemming",
      condition: "OPTIMAL",
      status: "IDLE",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleAction = (type, name) => {
    alert(`${type} - Machine allocation for ${name}`);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-[50] font-sans text-slate-900 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-6">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">
              Machine Allocation
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2">
              <Plus size={14} strokeWidth={3} />
              Assign Machine
            </button>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="px-8 py-4 bg-white border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-indigo-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Filter by Line or Machine..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Line / Machine</th>
                <th className="px-4 py-5">Operation Details</th>
                <th className="px-4 py-5 text-center">Operator</th>
                <th className="px-4 py-5 text-center">Condition</th>
                <th className="px-4 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allocations.map((rec) => (
                <tr
                  key={rec.id}
                  className="group hover:bg-slate-50/50 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                        {rec.machine}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-600 uppercase tracking-widest">
                        <span>{rec.line}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-700 text-xs text-nowrap">
                        {rec.opName}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Style: {rec.style}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center text-slate-500 font-bold text-[10px] uppercase">
                    {rec.operator}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`text-[10px] font-black ${rec.condition === "OPTIMAL" ? "text-emerald-500" : "text-amber-500"}`}
                    >
                      {rec.condition}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border ${
                        rec.status === "RUNNING"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                          : "bg-slate-50 text-slate-400 border-slate-100/50"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 text-nowrap">
                      <button
                        onClick={() => handleAction("View", rec.machine)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        <Settings size={12} />
                        Config
                      </button>
                      <button
                        onClick={() => handleAction("Transfer", rec.machine)}
                        className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black uppercase hover:bg-slate-50 transition-colors"
                      >
                        Transfer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Bot */}
      <button
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Machine Allocation & Layout"
        />
      )}
    </div>
  );
};

export default MachineAllocation;
