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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const Productivity = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (sectionLabel) => {
    setExpandedSections((prev) =>
      prev.includes(sectionLabel)
        ? prev.filter((s) => s !== sectionLabel)
        : [...prev, sectionLabel],
    );
  };

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
      department: "BUILDING 1",
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
      department: "BUILDING 2",
    },
    {
      id: 3,
      line: "TEAM 1",
      style: "J-0012",
      target: 800,
      actual: 850,
      efficiency: "106.2%",
      status: "EXCELLENT",
      section: "CUTTING",
      department: "BUILDING 1",
    },
    {
      id: 7,
      line: "TEAM 2",
      style: "Mixed",
      target: 1000,
      actual: 950,
      efficiency: "95%",
      status: "ON TRACK",
      section: "CUTTING",
      department: "BUILDING 2",
    },
    {
      id: 21,
      line: "TEAM 3",
      style: "Batch-A",
      target: 1200,
      actual: 1150,
      efficiency: "95.8%",
      status: "ON TRACK",
      section: "CUTTING",
      department: "BUILDING 1",
    },
    {
      id: 4,
      line: "STYLE 1",
      style: "P-5521",
      target: 400,
      actual: 390,
      efficiency: "97.5%",
      status: "ON TRACK",
      section: "PACKING",
      department: "BUILDING 3",
    },
    {
      id: 8,
      line: "STYLE 2",
      style: "Mixed",
      target: 500,
      actual: 525,
      efficiency: "105%",
      status: "EXCELLENT",
      section: "PACKING",
      department: "BUILDING 3",
    },
    {
      id: 20,
      line: "STYLE 3",
      style: "P-5521",
      target: 400,
      actual: 410,
      efficiency: "102.5%",
      status: "EXCELLENT",
      section: "PACKING",
      department: "BUILDING 3",
    },
    {
      id: 5,
      line: "LINE 02",
      style: "Y-7821",
      target: 450,
      actual: 440,
      efficiency: "97.8%",
      status: "ON TRACK",
      section: "SEWING",
      department: "BUILDING 1",
    },
    {
      id: 6,
      line: "LINE 03",
      style: "B-2210",
      target: 400,
      actual: 380,
      efficiency: "95%",
      status: "ON TRACK",
      section: "SEWING",
      department: "BUILDING 1",
    },
    {
      id: 9,
      line: "LINE 04",
      style: "K-990",
      target: 350,
      actual: 310,
      efficiency: "88.5%",
      status: "ON TRACK",
      section: "SEWING",
      department: "BUILDING 2",
    },
    {
      id: 10,
      line: "SAMPLE-L",
      style: "S-001",
      target: 50,
      actual: 48,
      efficiency: "96%",
      status: "ON TRACK",
      section: "SAMPLE ROOM",
      department: "BUILDING 1",
    },
    {
      id: 11,
      line: "FINISHING-1",
      style: "Mixed",
      target: 1200,
      actual: 1150,
      efficiency: "95.8%",
      status: "ON TRACK",
      section: "PACKING",
      department: "BUILDING 3",
    },
    {
      id: 12,
      line: "AUTO-CUT",
      style: "Batch-Z",
      target: 5000,
      actual: 5200,
      efficiency: "104%",
      status: "EXCELLENT",
      section: "CUTTING",
      department: "BUILDING 2",
    },
    {
      id: 13,
      line: "LINE 06",
      style: "Y-7821",
      target: 450,
      actual: 410,
      efficiency: "91.1%",
      status: "ON TRACK",
      section: "SEWING",
      department: "BUILDING 1",
    },
    {
      id: 14,
      line: "LINE 07",
      style: "B-2210",
      target: 400,
      actual: 320,
      efficiency: "80%",
      status: "BEHIND",
      section: "SEWING",
      department: "BUILDING 1",
    },
    {
      id: 15,
      line: "FINISH-02",
      style: "Mixed",
      target: 1500,
      actual: 1550,
      efficiency: "103.3%",
      status: "EXCELLENT",
      section: "FINISHING",
      department: "BUILDING 3",
    },
    {
      id: 16,
      line: "WASH-01",
      style: "Denim-X",
      target: 2000,
      actual: 1850,
      efficiency: "92.5%",
      status: "ON TRACK",
      section: "WASHING",
      department: "BUILDING 4",
    },
    {
      id: 17,
      line: "WASH-02",
      style: "Denim-Y",
      target: 2000,
      actual: 2100,
      efficiency: "105%",
      status: "EXCELLENT",
      section: "WASHING",
      department: "BUILDING 4",
    },
    {
      id: 18,
      line: "LINE 08",
      style: "J-0012",
      target: 300,
      actual: 295,
      efficiency: "98.3%",
      status: "ON TRACK",
      section: "SEWING",
      department: "BUILDING 2",
    },
    {
      id: 19,
      line: "LINE 09",
      style: "K-990",
      target: 350,
      actual: 345,
      efficiency: "98.6%",
      status: "ON TRACK",
      section: "SEWING",
      department: "BUILDING 2",
    },
    {
      id: 22,
      line: "LINE 10",
      style: "Y-7821",
      target: 450,
      actual: 430,
      efficiency: "95.6%",
      status: "EXCELLENT",
      section: "SEWING",
      department: "BUILDING 3",
    },
  ];

  // Logic for Section Aggregation
  const sectionsMap = lines.reduce((acc, curr) => {
    if (!acc[curr.section]) {
      acc[curr.section] = {
        label: curr.section,
        target: 0,
        actual: 0,
        linesCount: 0,
      };
    }
    acc[curr.section].target += curr.target;
    acc[curr.section].actual += curr.actual;
    acc[curr.section].linesCount += 1;
    return acc;
  }, {});

  const sectionsData = Object.values(sectionsMap).map((s) => ({
    ...s,
    efficiency: ((s.actual / s.target) * 100).toFixed(1) + "%",
    status: s.actual / s.target >= 0.95 ? "EXCELLENT" : "ON TRACK",
  }));

  // Logic for Department Aggregation
  const departmentsMap = lines.reduce((acc, curr) => {
    if (!acc[curr.department]) {
      acc[curr.department] = {
        label: curr.department,
        target: 0,
        actual: 0,
        sectionsCount: new Set(),
      };
    }
    acc[curr.department].target += curr.target;
    acc[curr.department].actual += curr.actual;
    acc[curr.department].sectionsCount.add(curr.section);
    return acc;
  }, {});

  const departmentsData = Object.values(departmentsMap).map((d) => ({
    ...d,
    efficiency: ((d.actual / d.target) * 100).toFixed(1) + "%",
    status: d.actual / d.target >= 0.95 ? "EXCELLENT" : "ON TRACK",
    sectionsCount: d.sectionsCount.size,
  }));

  const tabs = [
    { id: "all", label: "Real-time Output", count: lines.length },
    { id: "section", label: "Section", count: sectionsData.length },
    { id: "department", label: "Department", count: departmentsData.length },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleAction = (type, name) => {
    alert(`${type} - Real-time productivity for ${name}`);
  };

  const renderContent = () => {
    if (activeTab === "all") {
      return lines.map((rec) => (
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
                className={`font-black text-sm ${parseFloat(rec.efficiency) >= 95 ? "text-emerald-600" : parseFloat(rec.efficiency) >= 90 ? "text-blue-600" : "text-rose-600"}`}
              >
                {rec.efficiency}
              </span>
              <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${parseFloat(rec.efficiency) >= 95 ? "bg-emerald-500" : parseFloat(rec.efficiency) >= 90 ? "bg-blue-500" : "bg-rose-500"}`}
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
            </div>
          </td>
        </tr>
      ));
    } else if (activeTab === "section") {
      return sectionsData.map((rec, idx) => {
        const isExpanded = expandedSections.includes(rec.label);
        const sectionLines = lines.filter((l) => l.section === rec.label);

        return (
          <React.Fragment key={idx}>
            <tr
              onClick={() => toggleSection(rec.label)}
              className={`group cursor-pointer transition-all duration-200 ${isExpanded ? "bg-slate-50" : "hover:bg-slate-50/50"}`}
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-1 rounded bg-slate-100 text-slate-400 group-hover:text-orange-600 transition-colors ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <ChevronDown size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap uppercase">
                      {rec.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">
                      <span>Total Units: {rec.linesCount}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-6 font-black text-slate-400 text-xs italic">
                Aggregated
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
                    className={`font-black text-sm ${parseFloat(rec.efficiency) >= 95 ? "text-emerald-600" : "text-blue-600"}`}
                  >
                    {rec.efficiency}
                  </span>
                  <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${parseFloat(rec.efficiency) >= 95 ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: rec.efficiency }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-6 text-center">
                <span
                  className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border bg-emerald-50 text-emerald-600 border-emerald-100/50`}
                >
                  {rec.status}
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center justify-end gap-2 text-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("View", rec.label);
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-orange-700 transition-colors shadow-sm"
                  >
                    <TrendingUp size={12} strokeWidth={3} />
                    Sec Analytics
                  </button>
                </div>
              </td>
            </tr>
            {isExpanded &&
              sectionLines.map((line) => (
                <tr
                  key={`line-${line.id}`}
                  className="bg-slate-50/30 animate-in slide-in-from-top-1 duration-200"
                >
                  <td className="px-8 py-4 pl-16">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-700 text-xs tracking-tight">
                        {line.line}
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        {line.department}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-500 text-[10px]">
                    {line.style}
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600 font-bold text-xs">
                    {line.target}
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600 font-bold text-xs">
                    {line.actual}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-bold text-xs ${parseFloat(line.efficiency) >= 95 ? "text-emerald-600" : parseFloat(line.efficiency) >= 90 ? "text-blue-600" : "text-rose-600"}`}
                      >
                        {line.efficiency}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest border ${
                        line.status === "EXCELLENT" ||
                        line.status === "ON TRACK"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                          : "bg-rose-50 text-rose-600 border-rose-100/50"
                      }`}
                    >
                      {line.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button
                      onClick={() => handleAction("Detail", line.line)}
                      className="text-[9px] font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
                    >
                      Line Detail
                    </button>
                  </td>
                </tr>
              ))}
          </React.Fragment>
        );
      });
    } else {
      return departmentsData.map((rec, idx) => (
        <tr
          key={idx}
          className="group hover:bg-slate-50/50 transition-all duration-200"
        >
          <td className="px-8 py-6">
            <div className="flex flex-col gap-1">
              <span className="font-black text-slate-800 text-sm tracking-tight text-nowrap uppercase">
                {rec.label}
              </span>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-orange-600 uppercase tracking-widest">
                <span>Sections: {rec.sectionsCount}</span>
              </div>
            </div>
          </td>
          <td className="px-4 py-6 font-black text-slate-400 text-xs italic">
            Dept Output
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
                className={`font-black text-sm ${parseFloat(rec.efficiency) >= 95 ? "text-emerald-600" : "text-blue-600"}`}
              >
                {rec.efficiency}
              </span>
              <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${parseFloat(rec.efficiency) >= 95 ? "bg-emerald-500" : "bg-blue-500"}`}
                  style={{ width: rec.efficiency }}
                ></div>
              </div>
            </div>
          </td>
          <td className="px-4 py-6 text-center">
            <span
              className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest border bg-emerald-50 text-emerald-600 border-emerald-100/50`}
            >
              {rec.status}
            </span>
          </td>
          <td className="px-8 py-6">
            <div className="flex items-center justify-end gap-2 text-nowrap">
              <button
                onClick={() => handleAction("View", rec.label)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-orange-700 transition-colors shadow-sm"
              >
                <TrendingUp size={12} strokeWidth={3} />
                Dept Health
              </button>
            </div>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-[50] font-sans text-slate-900 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-6">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-black text-black tracking-tight uppercase">
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
        <div className="px-8 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 -mb-4 transition-all relative ${activeTab === tab.id ? "text-orange-600 font-black" : "text-slate-500 font-bold hover:text-slate-900"}`}
              >
                <span className="text-xs uppercase tracking-widest">
                  {tab.label}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-600"}`}
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
              placeholder="Filter view..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-orange-100 focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-200">
                <th className="px-8 py-5">
                  {activeTab === "all"
                    ? "Line / Section"
                    : activeTab === "section"
                      ? "Section Name"
                      : "Department Name"}
                </th>
                <th className="px-4 py-5 font-center">
                  {activeTab === "all" ? "Running Style" : "Level"}
                </th>
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
              {renderContent()}
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
