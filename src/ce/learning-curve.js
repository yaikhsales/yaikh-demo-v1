import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  MessageCircle,
  ArrowLeft,
  Zap,
  LineChart,
  BarChart,
  ArrowRight,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const LearningCurve = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Style Maturity", count: 6 }];

  const styles = [
    {
      id: 1,
      style: "Y-7821 (Polo)",
      runDay: "Day 08",
      startEfficiency: "35%",
      currentEfficiency: "88%",
      targetEfficiency: "92%",
      daysToMaturity: 10,
      status: "MATURING",
    },
    {
      id: 2,
      style: "Y-9902 (Denim)",
      runDay: "Day 02",
      startEfficiency: "22%",
      currentEfficiency: "45%",
      targetEfficiency: "85%",
      daysToMaturity: 15,
      status: "INITIAL",
    },
    {
      id: 3,
      style: "Y-1120 (Tee)",
      runDay: "Day 25",
      startEfficiency: "40%",
      currentEfficiency: "94%",
      targetEfficiency: "95%",
      daysToMaturity: 5,
      status: "COMPLETED",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
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
              Learning Curve Tracking
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-xl border border-pink-100">
              <LineChart size={14} className="text-pink-600" />
              <span className="text-[10px] font-black text-pink-600 uppercase">
                Trend Analysis
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
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-pink-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-pink-50 text-pink-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Search Style..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-pink-100 focus:ring-4 focus:ring-pink-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-bold text-black uppercase tracking-widest sticky top-0 z-10">
                <th className="px-8 py-4 border-r border-b border-slate-200">Running Style</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Run Day</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Start Eff.</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Current Progress</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Days to Mature</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Status</th>
                <th className="px-8 py-4 border-b border-slate-200 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {styles.map((rec, idx) => (
                <tr
                  key={rec.id}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-all duration-200`}
                >
                  <td className="px-8 py-4 border-r border-b border-slate-200">
                    <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                      {rec.style}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-black text-slate-600 shadow-sm uppercase">
                      {rec.runDay}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-slate-400 font-bold text-xs">
                    {rec.startEfficiency}
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-black text-slate-400 text-[10px]">
                        {rec.startEfficiency}
                      </span>
                      <ArrowRight size={12} className="text-slate-200" />
                      <span className="font-black text-pink-600 text-sm">
                        {rec.currentEfficiency}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-slate-700 font-black text-xs">
                    {rec.daysToMaturity} Days
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-nowrap">
                    <span
                      className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border ${
                        rec.status === "COMPLETED"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                          : rec.status === "MATURING"
                            ? "bg-blue-50 text-blue-600 border-blue-100/50"
                            : "bg-pink-50 text-pink-600 border-pink-100/50"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 border-b border-slate-200 text-right">
                    <button className="p-2 text-slate-300 hover:text-pink-600 hover:bg-white hover:shadow-sm rounded transition-all">
                      <LineChart size={16} />
                    </button>
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-pink-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Production Learning Curve Analysis"
        />
      )}
    </div>
  );
};

export default LearningCurve;
