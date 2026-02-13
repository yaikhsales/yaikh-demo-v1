import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Check,
  X,
  Send,
  Calendar,
  Phone,
  FileText,
  User,
  ChevronDown,
  Plus,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const teamPhotos = [
  "/assets/about-us/teams/Dot-Sreynoch.jpeg",
  "/assets/about-us/teams/Koem-Phanny.jpeg",
  "/assets/about-us/teams/Mr-Arnold11.jpeg",
  "/assets/about-us/teams/Sin-Khun.jpeg",
  "/assets/about-us/teams/Voun-Thida.jpeg",
  "/assets/about-us/teams/chhay.jpg",
  "/assets/about-us/teams/daly.jpg",
  "/assets/about-us/teams/yasomi.jpg",
];

const Interview = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("interviews");
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const tabs = [{ id: "interviews", label: "Interviews", count: 2 }];

  const applicants = [
    {
      id: 1,
      name: "Chhay",
      gender: "MALE",
      age: 29,
      phone: "+855 081 223 998",
      department: "Production",
      position: "QA Tester",
      status: "PHASE 2: INTERVIEW",
      subStatus: "TECHNICAL SCREENING",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "02:00 PM",
      photo: "/assets/about-us/teams/chhay.jpg",
    },
    {
      id: 2,
      name: "Daly",
      gender: "FEMALE",
      age: 27,
      phone: "+855 092 556 887",
      department: "Marketing",
      position: "Content Strategist",
      status: "PHASE 2: INTERVIEW",
      subStatus: "PORTFOLIO REVIEW",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "03:00 PM",
      photo: "/assets/about-us/teams/daly.jpg",
    },
    {
      id: 3,
      name: "Yasomi",
      gender: "FEMALE",
      age: 24,
      phone: "+855 061 445 112",
      department: "Design",
      position: "UI/UX Designer",
      status: "PHASE 2: INTERVIEW",
      subStatus: "DESIGN CHALLENGE",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "04:00 PM",
      photo: "/assets/about-us/teams/yasomi.jpg",
    },
    {
      id: 4,
      name: "Sobon Menghorng",
      gender: "MALE",
      age: 28,
      phone: "+855 010 778 334",
      department: "Engineering",
      position: "Frontend Lead",
      status: "PHASE 2: INTERVIEW",
      subStatus: "FINAL INTERVIEW",
      type: "KHMER",
      date: "Feb 14, 2026",
      time: "10:00 AM",
      photo: "/assets/about-us/teams/Sobon-Menghorng.jpg",
    },
    {
      id: 5,
      name: "Dot Sreynoch",
      gender: "FEMALE",
      age: 26,
      phone: "+855 010 223 445",
      department: "Production",
      position: "QA Lead",
      status: "PHASE 2: INTERVIEW",
      subStatus: "MANAGEMENT ROUND",
      type: "KHMER",
      date: "Feb 14, 2026",
      time: "11:30 AM",
      photo: "/assets/about-us/teams/Dot-Sreynoch.jpeg",
    },
    {
      id: 6,
      name: "Koem Phanny",
      gender: "FEMALE",
      age: 28,
      phone: "+855 012 334 556",
      department: "Logistics",
      position: "Supply Chain",
      status: "PHASE 2: INTERVIEW",
      subStatus: "SKILLS TEST",
      type: "KHMER",
      date: "Feb 14, 2026",
      time: "02:00 PM",
      photo: "/assets/about-us/teams/Koem-Phanny.jpeg",
    },
    {
      id: 7,
      name: "Sin Khun",
      gender: "MALE",
      age: 30,
      phone: "+855 015 445 667",
      department: "Engineering",
      position: "Senior Dev",
      status: "PHASE 2: INTERVIEW",
      subStatus: "TECH INTERVIEW",
      type: "KHMER",
      date: "Feb 15, 2026",
      time: "09:00 AM",
      photo: "/assets/about-us/teams/Sin-Khun.jpeg",
    },
    {
      id: 8,
      name: "Voun Thida",
      gender: "FEMALE",
      age: 25,
      phone: "+855 099 556 778",
      department: "HR",
      position: "Coordinator",
      status: "PHASE 2: INTERVIEW",
      subStatus: "HR SCREENING",
      type: "KHMER",
      date: "Feb 15, 2026",
      time: "10:30 AM",
      photo: "/assets/about-us/teams/Voun-Thida.jpeg",
    },
    {
      id: 9,
      name: "Proeurng Sokhim",
      gender: "FEMALE",
      age: 24,
      phone: "+855 011 222 333",
      department: "Design",
      position: "Graphic Artist",
      status: "PHASE 2: INTERVIEW",
      subStatus: "PORTFOLIO",
      type: "KHMER",
      date: "Feb 15, 2026",
      time: "03:00 PM",
      photo: "/assets/about-us/teams/Proeurng-Sokhim.jpeg",
    },
    {
      id: 10,
      name: "Ton Noeun",
      gender: "MALE",
      age: 32,
      phone: "+855 077 778 990",
      department: "Maintenance",
      position: "Lead Tech",
      status: "PHASE 2: INTERVIEW",
      subStatus: "PRACTICAL TEST",
      type: "KHMER",
      date: "Feb 16, 2026",
      time: "11:00 AM",
      photo: "/assets/about-us/teams/Ton-Noeun.jpeg",
    },
  ];

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handlePass = (name) => {
    alert(`${name} has passed the interview phase.`);
  };

  const handleFail = (name) => {
    alert(`${name} has failed the interview phase.`);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-[50] font-sans text-slate-900 overflow-hidden">
      {/* Main Table Container (Edge-to-Edge) */}
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header Action Bar */}
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-6">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">
                Interviews
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95">
                Schedule Interview
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-8 py-5">Photo</th>
                  <th className="px-4 py-5">Applicant / Contact</th>
                  <th className="px-4 py-5">Department</th>
                  <th className="px-4 py-5 text-center">Status</th>
                  <th className="px-4 py-5 text-center">Type</th>
                  <th className="px-4 py-5">Submitted</th>
                  <th className="px-8 py-5 text-right whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="group hover:bg-slate-50/50 transition-all duration-200"
                  >
                    <td className="px-8 py-6">
                      <div className="relative w-12 h-12 rounded-xl border-2 border-slate-100 overflow-hidden shadow-sm group-hover:border-blue-100 transition-colors">
                        <img
                          src={applicant.photo}
                          alt={applicant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-slate-800 text-sm tracking-tight">
                          {applicant.name}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>
                            {applicant.gender} • {applicant.age} YRS
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                          <Phone size={10} className="text-slate-300" />
                          <span>{applicant.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-700 text-xs">
                          {applicant.department}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {applicant.position}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.15em]">
                          {applicant.status}
                        </span>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[9px] font-black tracking-widest border border-emerald-100/50">
                          {applicant.subStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[9px] font-black text-blue-600 shadow-sm">
                        {applicant.type}
                      </span>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-700 text-xs">
                          {applicant.date}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {applicant.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handlePass(applicant.name)}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <User size={12} strokeWidth={3} />
                          Pass
                        </button>
                        <button
                          onClick={() => handleFail(applicant.name)}
                          className="px-4 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-[9px] font-black uppercase hover:bg-rose-100 transition-colors"
                        >
                          Fail
                        </button>
                        <div className="flex items-center gap-1 ml-2 border-l border-slate-100 pl-3">
                          <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded transition-all">
                            <FileText size={14} />
                          </button>
                          <button className="p-1.5 text-slate-300 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded transition-all">
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded transition-all">
                            <Edit2 size={14} />
                          </button>
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
      </div>

      {/* Contract Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">
                    Setup Contract
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Digital Service Agreement
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSetupModal(false)}
                className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <img
                  src={selectedApplicant?.photo}
                  alt=""
                  className="w-12 h-12 rounded-xl border-2 border-white shadow-sm"
                />
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
                    {selectedApplicant?.name}
                  </p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Candidate for Probation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                    Contract Type{" "}
                    <span className="text-slate-200">| លក្ខណៈកិច្ចសន្យា</span>
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer group-hover:bg-white">
                      <option>Probation</option>
                      <option>Fixed Term</option>
                      <option>Permanent</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                    Template Language{" "}
                    <span className="text-slate-200">| ភាសាកិច្ចសន្យា</span>
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer group-hover:bg-white">
                      <option>Khmer (Official)</option>
                      <option>English</option>
                      <option>Bilingual (KH/EN)</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                    Official Position{" "}
                    <span className="text-slate-200">| មុខតំណែងផ្លូវការ</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Software Engineer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowSetupModal(false)}
                  className="px-6 py-3 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors tracking-widest"
                >
                  Cancel
                </button>
                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95">
                  Confirm Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Bot Button */}
      <button
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Interviews"
        />
      )}

      <style jsx>{`
        .scroller-hide::-webkit-scrollbar {
          display: none;
        }
        .scroller-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Interview;
