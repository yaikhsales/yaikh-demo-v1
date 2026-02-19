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
  DollarSign,
  PieChart,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const StyleCosting = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Costing Archive", count: 12 }];

  const costings = [
    {
      id: 1,
      styleId: "Y-7821",
      name: "Men's Polo Shirt",
      sam: "12.45",
      cpm: "0.0175",
      laborCost: "$0.22",
      totalCost: "$3.45",
      customer: "Adidas",
      date: "Feb 10, 2026",
    },
    {
      id: 2,
      styleId: "Y-9902",
      name: "Denim Jackets",
      sam: "34.20",
      cpm: "0.0175",
      laborCost: "$0.60",
      totalCost: "$12.80",
      customer: "Nike",
      date: "Feb 12, 2026",
    },
    {
      id: 3,
      styleId: "Y-1120",
      name: "Basic Crew T-Shirt",
      sam: "6.15",
      cpm: "0.0175",
      laborCost: "$0.11",
      totalCost: "$1.95",
      customer: "Uniqlo",
      date: "Feb 05, 2026",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleAction = (type, name) => {
    alert(`${type} - Costing detailed breakdown for ${name}`);
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
              Style Costing analysis
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-violet-700 shadow-lg shadow-violet-100 transition-all flex items-center gap-2">
              <Plus size={14} strokeWidth={3} />
              Calculate New Style
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
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-violet-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-violet-50 text-violet-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Search by Style or Client..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-violet-100 focus:ring-4 focus:ring-violet-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-bold text-black uppercase tracking-widest sticky top-0 z-10">
                <th className="px-8 py-4 border-r border-b border-slate-200">Style Details</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">SAM</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">CPM Factor</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Labor Cost</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center text-violet-600">
                  Total Unit Cost
                </th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Customer</th>
                <th className="px-8 py-4 border-b border-slate-200 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {costings.map((rec, idx) => (
                <tr
                  key={rec.id}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-all duration-200`}
                >
                  <td className="px-8 py-4 border-r border-b border-slate-200">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                        {rec.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-violet-600 uppercase tracking-widest">
                        <span>
                          {rec.styleId} • {rec.date}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-slate-400 font-bold text-xs uppercase">
                    {rec.sam} Min
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-slate-400 font-bold text-xs">
                    ${rec.cpm}
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-slate-700 font-black text-xs">
                    {rec.laborCost}
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <span className="font-black text-violet-600 text-lg tabular-nums">
                      {rec.totalCost}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase">
                      {rec.customer}
                    </span>
                  </td>
                  <td className="px-8 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-end gap-2 text-nowrap">
                      <button
                        onClick={() => handleAction("View", rec.name)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-violet-700 transition-colors shadow-sm"
                      >
                        <FileSpreadsheet size={12} />
                        Full Sheet
                      </button>
                      <button
                        onClick={() => handleAction("Edit", rec.name)}
                        className="p-1.5 text-slate-300 hover:text-slate-600 rounded transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleAction("Delete", rec.name)}
                        className="p-1.5 text-slate-300 hover:text-red-500 rounded transition-all"
                      >
                        <Trash2 size={14} />
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-violet-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Style Costing & Estimation"
        />
      )}
    </div>
  );
};

export default StyleCosting;
