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
  Star,
  Users,
  Award,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const SkillInventory = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Skills Matrix", count: 45 }];

  const skills = [
    {
      id: 1,
      name: "Dot Sreynoch",
      dept: "PRODUCTION",
      primarySkill: "Single Needle",
      grade: "A+",
      versatility: 85,
      performance: 98,
      status: "ACTIVE",
      photo: "/assets/about-us/teams/Dot-Sreynoch.jpeg",
    },
    {
      id: 2,
      name: "Koem Phanny",
      dept: "PRODUCTION",
      primarySkill: "Overlock",
      grade: "A",
      versatility: 70,
      performance: 92,
      status: "ACTIVE",
      photo: "/assets/about-us/teams/Koem-Phanny.jpeg",
    },
    {
      id: 3,
      name: "Sin Khun",
      dept: "PRODUCTION",
      primarySkill: "Flatlock",
      grade: "B",
      versatility: 60,
      performance: 88,
      status: "TRAINING",
      photo: "/assets/about-us/teams/Sin-Khun.jpeg",
    },
    {
      id: 4,
      name: "Voun Thida",
      dept: "ADMIN",
      primarySkill: "Quality Control",
      grade: "S",
      versatility: 95,
      performance: 100,
      status: "ACTIVE",
      photo: "/assets/about-us/teams/Voun-Thida.jpeg",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleAction = (type, name) => {
    alert(`${type} - Skill details for ${name}`);
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
              Skill Inventory
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-yellow-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-yellow-700 shadow-lg shadow-yellow-100 transition-all flex items-center gap-2">
              <Plus size={14} strokeWidth={3} />
              Update Skills
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
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-yellow-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-yellow-50 text-yellow-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Search by Employee..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-yellow-100 focus:ring-4 focus:ring-yellow-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Employee</th>
                <th className="px-4 py-5">Primary Skill</th>
                <th className="px-4 py-5 text-center">Grade</th>
                <th className="px-4 py-5 text-center">Versatility</th>
                <th className="px-4 py-5 text-center">Production Efficiency</th>
                <th className="px-4 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {skills.map((rec) => (
                <tr
                  key={rec.id}
                  className="group hover:bg-slate-50/50 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl border-2 border-slate-100 overflow-hidden shadow-sm">
                        <img
                          src={rec.photo}
                          className="w-full h-full object-cover"
                          alt={rec.name}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                          {rec.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {rec.dept}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 font-black text-slate-700 text-xs">
                    {rec.primarySkill}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 font-black text-xs border border-yellow-100 shadow-sm">
                      {rec.grade}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-slate-700 text-xs">
                        {rec.versatility}%
                      </span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${rec.versatility}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`font-black text-xs ${rec.performance >= 90 ? "text-emerald-500" : "text-blue-500"}`}
                    >
                      {rec.performance}%
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border ${
                        rec.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                          : "bg-amber-50 text-amber-600 border-amber-100/50"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 text-nowrap">
                      <button
                        onClick={() => handleAction("View", rec.name)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-yellow-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-yellow-700 transition-colors shadow-sm"
                      >
                        <Award size={12} />
                        Profile
                      </button>
                      <button
                        onClick={() => handleAction("Edit", rec.name)}
                        className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black uppercase hover:bg-slate-50 transition-colors"
                      >
                        Update
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-yellow-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Skill Matrix & Competency"
        />
      )}
    </div>
  );
};

export default SkillInventory;
