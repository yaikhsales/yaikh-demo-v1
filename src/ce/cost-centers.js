import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  MessageCircle,
  ArrowLeft,
  DollarSign,
  PieChart,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const CostCenters = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "Budget Distribution", count: 18 }];

  const centers = [
    {
      id: 1,
      name: "Sewing Floor A",
      directCost: "$45,000",
      indirectCost: "$12,000",
      utility: "$4,500",
      total: "$61,500",
      variance: "+2.5%",
      status: "STABLE",
    },
    {
      id: 2,
      name: "Cutting Dept",
      directCost: "$18,000",
      indirectCost: "$5,000",
      utility: "$2,800",
      total: "$25,800",
      variance: "-1.2%",
      status: "OPTIMAL",
    },
    {
      id: 3,
      name: "Quality Control",
      directCost: "$8,500",
      indirectCost: "$2,100",
      utility: "$500",
      total: "$11,100",
      variance: "+0.5%",
      status: "STABLE",
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
              Cost centers & Direct/Indirect
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-xl border border-cyan-100">
              <PieChart size={14} className="text-cyan-600" />
              <span className="text-[10px] font-black text-cyan-600 uppercase">
                Financial Audit
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
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-600 rounded-full"></div>
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
              placeholder="Filter by Center..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-cyan-100 focus:ring-4 focus:ring-cyan-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Cost Center</th>
                <th className="px-4 py-5 text-center">Direct Cost</th>
                <th className="px-4 py-5 text-center">Indirect Cost</th>
                <th className="px-4 py-5 text-center">Utilities</th>
                <th className="px-4 py-5 text-center text-cyan-600">
                  Total Monthly
                </th>
                <th className="px-4 py-5 text-center">Variance</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {centers.map((rec) => (
                <tr
                  key={rec.id}
                  className="group hover:bg-slate-50/50 transition-all duration-200"
                >
                  <td className="px-8 py-6">
                    <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap">
                      {rec.name}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center text-slate-700 font-bold text-xs">
                    {rec.directCost}
                  </td>
                  <td className="px-4 py-6 text-center text-slate-500 font-bold text-xs">
                    {rec.indirectCost}
                  </td>
                  <td className="px-4 py-6 text-center text-slate-500 font-bold text-xs">
                    {rec.utility}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="font-black text-blue-600 text-sm">
                      {rec.total}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div
                      className={`flex items-center justify-center gap-1 font-black text-xs ${rec.variance.startsWith("+") ? "text-rose-500" : "text-emerald-500"}`}
                    >
                      {rec.variance}
                      <ArrowUpRight
                        size={12}
                        className={
                          rec.variance.startsWith("-") ? "rotate-90" : ""
                        }
                      />
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span
                      className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border ${
                        rec.status === "OPTIMAL"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                          : "bg-blue-50 text-blue-600 border-blue-100/50"
                      }`}
                    >
                      {rec.status}
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
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-cyan-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Financial Cost Centers"
        />
      )}
    </div>
  );
};

export default CostCenters;
