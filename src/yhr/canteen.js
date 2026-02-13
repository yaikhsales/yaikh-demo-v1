import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Check,
  X,
  Plus,
  MessageCircle,
  ArrowLeft,
  Utensils,
  Coffee,
  Phone,
  FileText,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const Canteen = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Canteen Orders", count: 9 }];

  const orders = [
    {
      id: 1,
      name: "Dot Sreynoch",
      gender: "FEMALE",
      phone: "+855 010 223 445",
      department: "Production",
      meal: "KHMER NOODLE",
      status: "COMPLETED",
      type: "BREAKFAST",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/Dot-Sreynoch.jpeg",
    },
    {
      id: 2,
      name: "Koem Phanny",
      gender: "FEMALE",
      phone: "+855 012 334 556",
      department: "Logistics",
      meal: "FRIED RICE",
      status: "COMPLETED",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/Koem-Phanny.jpeg",
    },
    {
      id: 3,
      name: "Sin Khun",
      gender: "MALE",
      phone: "+855 015 445 667",
      department: "Engineering",
      meal: "BEEF LOK LAK",
      status: "PENDING",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/Sin-Khun.jpeg",
    },
    {
      id: 4,
      name: "Voun Thida",
      gender: "FEMALE",
      phone: "+855 099 556 778",
      department: "Admin",
      meal: "FISH AMOK",
      status: "COMPLETED",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/Voun-Thida.jpeg",
    },
    {
      id: 5,
      name: "Set Sophy",
      gender: "FEMALE",
      phone: "+855 088 667 889",
      department: "Operations",
      meal: "PORK CURRY",
      status: "COMPLETED",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/Set-Sophy.jpg",
    },
    {
      id: 6,
      name: "Chhay",
      gender: "MALE",
      phone: "+855 081 223 998",
      department: "Production",
      meal: "FRIED NOODLE",
      status: "COMPLETED",
      type: "BREAKFAST",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/chhay.jpg",
    },
    {
      id: 7,
      name: "Daly",
      gender: "FEMALE",
      phone: "+855 092 556 887",
      department: "Marketing",
      meal: "VEGETARIAN",
      status: "COMPLETED",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/daly.jpg",
    },
    {
      id: 8,
      name: "Yasomi",
      gender: "FEMALE",
      phone: "+855 061 445 112",
      department: "Design",
      meal: "FRIED RICE",
      status: "COMPLETED",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/yasomi.jpg",
    },
    {
      id: 9,
      name: "Yeom Chetra",
      gender: "MALE",
      phone: "+855 012 889 001",
      department: "Production",
      meal: "BEEF LOK LAK",
      status: "COMPLETED",
      type: "LUNCH",
      date: "Feb 15, 2026",
      photo: "/assets/about-us/teams/Yeom-Chetra.jpeg",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleAction = (type, name) => {
    alert(`${type} - Canteen Order for ${name}`);
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
              Canteen Management
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-cyan-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all flex items-center gap-2">
              New Meal Order
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
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-cyan-600 font-black" : "text-slate-400 font-bold hover:text-slate-600"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-cyan-50 text-cyan-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-600 rounded-full animate-in slide-in-from-bottom-2"></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative group w-72">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 transition-colors"
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-cyan-100 focus:ring-4 focus:ring-cyan-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Photo</th>
                <th className="px-4 py-5">Employee / Contact</th>
                <th className="px-4 py-5 font-center">Meal Item</th>
                <th className="px-4 py-5 text-center">Status</th>
                <th className="px-4 py-5 text-center">Meal Type</th>
                <th className="px-4 py-5">Order Date</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((rec) => (
                <tr
                  key={rec.id}
                  className="group hover:bg-slate-50/50 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <div className="relative w-12 h-12 rounded-xl border-2 border-slate-100 overflow-hidden shadow-sm group-hover:border-cyan-100 transition-colors">
                      <img
                        src={rec.photo}
                        alt={rec.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-slate-800 text-sm tracking-tight">
                        {rec.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
                        <span>{rec.department}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                        <Phone size={10} className="text-slate-300" />
                        <span>{rec.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="font-black text-slate-700 text-xs">
                      {rec.meal}
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border ${rec.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border-emerald-100/50" : "bg-amber-50 text-amber-600 border-amber-100/50"}`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[9px] font-black text-cyan-600 shadow-sm uppercase">
                      {rec.type}
                    </span>
                  </td>
                  <td className="px-4 py-6">
                    <div className="font-black text-slate-700 text-xs">
                      {rec.date}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction("View", rec.name)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-cyan-700 transition-colors shadow-sm"
                      >
                        <Eye size={12} strokeWidth={3} />
                        View
                      </button>
                      <button
                        onClick={() => handleAction("Edit", rec.name)}
                        className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black uppercase hover:bg-slate-50 transition-colors"
                      >
                        Edit
                      </button>
                      <div className="flex items-center gap-1 ml-2 border-l border-slate-100 pl-3">
                        <button className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-white hover:shadow-sm rounded transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-cyan-600 text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Canteen"
        />
      )}
    </div>
  );
};

export default Canteen;
