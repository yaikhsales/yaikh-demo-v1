import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  MessageCircle,
  ArrowLeft,
  Clock,
  Circle as CircleDollarSign,
  Calculator,
  RefreshCw,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const CPM = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);

  const tabs = [{ id: "all", label: "CPM Breakdown", count: 1 }];

  const calculation = [
    {
      id: 1,
      factor: "Total Monthly Overhead",
      value: "$185,420",
      description: "Direct labor + Factory Expenses",
    },
    {
      id: 2,
      factor: "Working Days / Month",
      value: "26 Days",
      description: "Standard monthly capacity",
    },
    {
      id: 3,
      factor: "Daily Working Minutes",
      value: "480 Min",
      description: "8 hours per shift",
    },
    {
      id: 4,
      factor: "Total Manpower",
      value: "850 Workers",
      description: "Active production staff",
    },
  ];

  const totalMinutes = 26 * 480 * 850;
  const cpm = 185420 / totalMinutes;

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
              CPM (Cost Per Minute)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Active Factory CPM
              </span>
              <span className="text-2xl font-black text-emerald-600">
                ${cpm.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-12 bg-slate-50/50">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Result Hero */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[32px] p-10 text-white shadow-2xl shadow-emerald-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                <CircleDollarSign size={200} />
              </div>
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-lg font-black uppercase tracking-[0.2em] opacity-80 decoration-emerald-200 decoration-2">
                  Global CPM Value
                </h3>
                <p className="text-6xl font-black tabular-nums">
                  ${cpm.toFixed(4)}{" "}
                  <span className="text-xl opacity-60 font-bold ml-2">
                    / Minute
                  </span>
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    Validated: Feb 2026
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-100">
                    <RefreshCw size={14} />
                    Recalculates every 24h
                  </span>
                </div>
              </div>
            </div>

            {/* Factors Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-50 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Calculation Factors
                </h4>
                <button className="text-[10px] font-black text-emerald-600 uppercase hover:underline">
                  Update Factors
                </button>
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-slate-50">
                  {calculation.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-800">
                            {item.factor}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {item.description}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="font-black text-slate-700 text-sm tabular-nums">
                          {item.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info Note */}
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex gap-4">
              <Calculator size={20} className="text-blue-600 shrink-0" />
              <p className="text-[11px] font-bold text-blue-600 leading-relaxed uppercase tracking-wider">
                The CPM value is used as the base rate for all style costing. It
                reflects the operational cost of one minute of productive time
                across the factory floor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Bot */}
      <button
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-emerald-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Cost Per Minute Calculation"
        />
      )}
    </div>
  );
};

export default CPM;
