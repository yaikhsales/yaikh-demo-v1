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
  Activity,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const Productivity = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Real-time Output", count: 12 }];

  const lines = [
    {
      id: 1,
      line: "LINE 01",
      style: "Y-7821",
      target: 450,
      actual: 412,
      efficiency: "91.5%",
      status: "ON TRACK",
      section: "SEWING",
    },
    {
      id: 2,
      line: "LINE 05",
      style: "Y-9902",
      target: 200,
      actual: 145,
      efficiency: "72.5%",
      status: "BEHIND",
      section: "SEWING",
    },
    {
      id: 3,
      line: "CUTTING-A",
      style: "Mixed",
      target: 2500,
      actual: 2650,
      efficiency: "106%",
      status: "EXCELLENT",
      section: "CUTTING",
    },
    {
      id: 4,
      line: "PACKING-02",
      style: "Mixed",
      target: 800,
      actual: 780,
      efficiency: "97.5%",
      status: "ON TRACK",
      section: "PACKING",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleAction = (type, name) => {
    alert(`${type} - Real-time productivity for ${name}`);
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
              Cut, Sew, Pack Productivity
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-600 uppercase">
                Live Tracking
              </span>
            </div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="px-8 py-4 bg-white border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-orange-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-orange-50 text-orange-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Filter by Line..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-orange-100 focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Line / Section</th>
                <th className="px-4 py-5 font-center">Running Style</th>
                <th className="px-4 py-5 text-center">Daily Target</th>
                <th className="px-4 py-5 text-center">Actual Output</th>
                <th className="px-4 py-5 text-center">Efficiency</th>
                <th className="px-4 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lines.map((rec) => (
                <tr
                  key={rec.id}
                  className="group hover:bg-slate-50/50 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                        {rec.line}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">
                        <span>{rec.section}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 font-black text-slate-500 text-xs">
                    {rec.style}
                  </td>
                  <td className="px-4 py-6 text-center text-slate-700 font-black text-xs">
                    {rec.target}
                  </td>
                  <td className="px-4 py-6 text-center text-slate-700 font-black text-xs">
                    {rec.actual}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-black text-sm ${parseFloat(rec.efficiency) >= 90 ? "text-emerald-600" : parseFloat(rec.efficiency) >= 80 ? "text-blue-600" : "text-rose-600"}`}
                      >
                        {rec.efficiency}
                      </span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${parseFloat(rec.efficiency) >= 90 ? "bg-emerald-500" : parseFloat(rec.efficiency) >= 80 ? "bg-blue-500" : "bg-rose-500"}`}
                          style={{ width: rec.efficiency }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border ${
                        rec.status === "EXCELLENT" || rec.status === "ON TRACK"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                          : "bg-rose-50 text-rose-600 border-rose-100/50"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 text-nowrap">
                      <button
                        onClick={() => handleAction("View", rec.line)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-orange-700 transition-colors shadow-sm"
                      >
                        <TrendingUp size={12} strokeWidth={3} />
                        Analytics
                      </button>
                      <button
                        onClick={() => handleAction("Report", rec.line)}
                        className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black uppercase hover:bg-slate-50 transition-colors"
                      >
                        Report
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-orange-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Production Line Monitoring"
        />
      )}
    </div>
  );
};

export default Productivity;
