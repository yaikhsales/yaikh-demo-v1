import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  MessageCircle,
  ArrowLeft,
  Users,
  Trophy,
  Target,
  BarChart2,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const TeamPerformance = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Weekly Ranking", count: 8 }];

  const teams = [
    {
      id: 1,
      line: "LINE 01",
      supervisor: "Mr. Arnold",
      efficiency: "94.2%",
      qualityRate: "99.1%",
      absenteeism: "1.2%",
      score: 95,
      rank: 1,
    },
    {
      id: 2,
      line: "LINE 04",
      supervisor: "Chhay",
      efficiency: "91.8%",
      qualityRate: "98.5%",
      absenteeism: "2.5%",
      score: 88,
      rank: 2,
    },
    {
      id: 3,
      line: "LINE 02",
      supervisor: "Daly",
      efficiency: "88.5%",
      qualityRate: "97.2%",
      absenteeism: "3.1%",
      score: 82,
      rank: 3,
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
              Team Performance
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-xl border border-teal-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Trophy size={14} />
              Weekly Best: Line 01
            </span>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="px-8 py-4 bg-white border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-teal-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Filter by Line..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-teal-100 focus:ring-4 focus:ring-teal-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-bold text-black uppercase tracking-widest sticky top-0 z-10">
                <th className="px-8 py-4 border-r border-b border-slate-200">Rank / Line</th>
                <th className="px-4 py-4 border-r border-b border-slate-200">Team Leader</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Avg Efficiency</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Quality Rate (DHU)</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Absenteeism</th>
                <th className="px-4 py-4 border-r border-b border-slate-200 text-center">Performance Score</th>
                <th className="px-8 py-4 border-b border-slate-200 text-right whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((rec, idx) => (
                <tr
                  key={rec.id}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-all duration-200`}
                >
                  <td className="px-8 py-4 border-r border-b border-slate-200">
                    <div className="flex items-center gap-5">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${rec.rank === 1 ? "bg-yellow-400 text-white shadow-lg shadow-yellow-100" : "bg-slate-50 text-slate-400 border border-slate-100"}`}
                      >
                        {rec.rank}
                      </span>
                      <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                        {rec.line}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 font-black text-slate-600 text-[10px] uppercase">
                    {rec.supervisor}
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <span className="font-black text-teal-600 text-xs">
                      {rec.efficiency}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <span className="font-black text-blue-600 text-xs text-nowrap">
                      {rec.qualityRate}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center text-rose-500 font-bold text-xs">
                    {rec.absenteeism}
                  </td>
                  <td className="px-4 py-4 border-r border-b border-slate-200 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                      <span className="font-black text-slate-800 text-xs">
                        {rec.score} / 100
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 border-b border-slate-200 text-right">
                    <span className="px-2.5 py-1 bg-teal-50 border border-teal-100 rounded text-[9px] font-black text-teal-600 shadow-sm uppercase">
                      Gold
                    </span>
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-teal-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Team Performance Comparison"
        />
      )}
    </div>
  );
};

export default TeamPerformance;
