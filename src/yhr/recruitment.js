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

const Recruitment = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const tabs = [{ id: "all", label: "Applicants", count: 4 }];

  const [applicantsList, setApplicantsList] = useState([
    {
      id: 1,
      name: "Dot Sreynoch",
      gender: "FEMALE",
      age: 26,
      phone: "+855 010 223 445",
      department: "Production",
      position: "QA Engineer",
      status: "PHASE 1: REVIEW",
      subStatus: "NEW APPLICANT",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "09:30 AM",
      photo: "/assets/about-us/teams/Dot-Sreynoch.jpeg",
    },
    {
      id: 2,
      name: "Koem Phanny",
      gender: "FEMALE",
      age: 28,
      phone: "+855 012 334 556",
      department: "Logistics",
      position: "Coordinator",
      status: "PHASE 2: INTERVIEW",
      subStatus: "TECH SCREENING",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "09:45 AM",
      photo: "/assets/about-us/teams/Koem-Phanny.jpeg",
    },
    {
      id: 3,
      name: "Sin Khun",
      gender: "MALE",
      age: 30,
      phone: "+855 015 445 667",
      department: "Engineering",
      position: "Developer",
      status: "PHASE 3: ONBOARDING",
      subStatus: "OFFER SENT",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "10:15 AM",
      photo: "/assets/about-us/teams/Sin-Khun.jpeg",
    },
    {
      id: 4,
      name: "Voun Thida",
      gender: "FEMALE",
      age: 25,
      phone: "+855 099 556 778",
      department: "Admin",
      position: "Assistant",
      status: "PHASE 1: REVIEW",
      subStatus: "DOCUMENT PENDING",
      type: "KHMER",
      date: "Feb 13, 2026",
      time: "10:30 AM",
      photo: "/assets/about-us/teams/Voun-Thida.jpeg",
    },
    {
      id: 5,
      name: "Set Sophy",
      gender: "FEMALE",
      age: 27,
      phone: "+855 088 667 889",
      department: "Operations",
      position: "Manager",
      status: "PHASE 2: INTERVIEW",
      subStatus: "FINAL ROUND",
      type: "KHMER",
      date: "Feb 12, 2026",
      time: "04:45 PM",
      photo: "/assets/about-us/teams/Set-Sophy.jpg",
    },
    {
      id: 6,
      name: "Ton Noeun",
      gender: "MALE",
      age: 32,
      phone: "+855 077 778 990",
      department: "Maintenance",
      position: "Technician",
      status: "PHASE 1: REVIEW",
      subStatus: "SHORTLISTED",
      type: "KHMER",
      date: "Feb 12, 2026",
      time: "02:00 PM",
      photo: "/assets/about-us/teams/Ton-Noeun.jpeg",
    },
    {
      id: 7,
      name: "Proeurng Sokhim",
      gender: "FEMALE",
      age: 24,
      phone: "+855 011 222 333",
      department: "Design",
      position: "UI Designer",
      status: "PHASE 1: REVIEW",
      subStatus: "PORTFOLIO REVIEW",
      type: "KHMER",
      date: "Feb 12, 2026",
      time: "11:30 AM",
      photo: "/assets/about-us/teams/Proeurng-Sokhim.jpeg",
    },
    {
      id: 8,
      name: "Sobon Menghorng",
      gender: "MALE",
      age: 29,
      phone: "+855 016 333 444",
      department: "Engineering",
      position: "Backend Dev",
      status: "PHASE 2: INTERVIEW",
      subStatus: "CODE TEST",
      type: "KHMER",
      date: "Feb 11, 2026",
      time: "03:15 PM",
      photo: "/assets/about-us/teams/Sobon-Menghorng.jpg",
    },
    {
      id: 9,
      name: "Van Phanith",
      gender: "MALE",
      age: 27,
      phone: "+855 092 444 555",
      department: "Finance",
      position: "Accountant",
      status: "PHASE 3: ONBOARDING",
      subStatus: "CONTRACT SIGNED",
      type: "KHMER",
      date: "Feb 11, 2026",
      time: "01:00 PM",
      photo: "/assets/about-us/teams/Van-Phanith.jpeg",
    },
    {
      id: 10,
      name: "Yeom Chetra",
      gender: "MALE",
      age: 31,
      phone: "+855 095 555 666",
      department: "Engineering",
      position: "DevOps",
      status: "PHASE 2: INTERVIEW",
      subStatus: "CULTURE FIT",
      type: "KHMER",
      date: "Feb 10, 2026",
      time: "09:00 AM",
      photo: "/assets/about-us/teams/Yeom-Chetra.jpeg",
    },
    {
      id: 11,
      name: "Young Sengheang",
      gender: "MALE",
      age: 28,
      phone: "+855 010 666 777",
      department: "HR",
      position: "Recruiter",
      status: "PHASE 1: REVIEW",
      subStatus: "INITIAL SCREEN",
      type: "KHMER",
      date: "Feb 10, 2026",
      time: "10:30 AM",
      photo: "/assets/about-us/teams/Young-Sengheang.jpeg",
    },
    {
      id: 12,
      name: "Virot",
      gender: "MALE",
      age: 33,
      phone: "+855 012 777 888",
      department: "Engineering",
      position: "Senior Dev",
      status: "PHASE 1: REVIEW",
      subStatus: "REJECTED",
      type: "EXPAT",
      date: "Feb 09, 2026",
      time: "04:15 PM",
      photo: "/assets/about-us/teams/virot.jpg",
    },
    {
      id: 13,
      name: "Samnang",
      gender: "MALE",
      age: 25,
      phone: "+855 081 888 999",
      department: "IT Support",
      position: "Helpdesk",
      status: "PHASE 2: INTERVIEW",
      subStatus: "SKILLS TEST",
      type: "KHMER",
      date: "Feb 09, 2026",
      time: "11:00 AM",
      photo: "/assets/about-us/teams/samnang.png",
    },
    {
      id: 14,
      name: "Daly",
      gender: "FEMALE",
      age: 26,
      phone: "+855 099 999 000",
      department: "Marketing",
      position: "Social Media",
      status: "PHASE 1: REVIEW",
      subStatus: "IN REVIEW",
      type: "KHMER",
      date: "Feb 08, 2026",
      time: "02:45 PM",
      photo: "/assets/about-us/teams/daly.jpg",
    },
    {
      id: 15,
      name: "Yasomi",
      gender: "FEMALE",
      age: 24,
      phone: "+855 061 000 111",
      department: "Design",
      position: "Intern",
      status: "PHASE 3: ONBOARDING",
      subStatus: "ID ISSUED",
      type: "KHMER",
      date: "Feb 08, 2026",
      time: "09:30 AM",
      photo: "/assets/about-us/teams/yasomi.jpg",
    },
    {
      id: 16,
      name: "Chhorng",
      gender: "MALE",
      age: 30,
      phone: "+855 070 111 222",
      department: "Logistics",
      position: "Warehouse",
      status: "PHASE 1: REVIEW",
      subStatus: "NEW APPLICANT",
      type: "KHMER",
      date: "Feb 07, 2026",
      time: "03:20 PM",
      photo: "/assets/about-us/teams/chhorng.jpg",
    },
  ]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleSetup = (applicant) => {
    setSelectedApplicant(applicant);
    setShowSetupModal(true);
  };

  const handleViewDetail = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetailModal(true);
  };

  const handleEdit = (applicant) => {
    setSelectedApplicant(applicant);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      setApplicantsList((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleInterview = (name) => {
    alert(`Scheduling interview for ${name}...`);
  };

  const handleReject = (name) => {
    alert(`${name} has been moved to the rejected list.`);
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
                Recruitment
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95">
                <Plus size={14} strokeWidth={3} />
                Add Applicant
              </button>
            </div>
          </div>

          {/* Table Area */}
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
                {applicantsList.map((applicant) => (
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
                        <span className="font-black text-slate-700 text-xs text-nowrap">
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
                          onClick={() => handleInterview(applicant.name)}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-[9px] font-black uppercase hover:bg-emerald-100 transition-colors"
                        >
                          <Calendar size={12} strokeWidth={3} />
                          Interview
                        </button>
                        <button
                          onClick={() => handleReject(applicant.name)}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-[9px] font-black uppercase hover:bg-rose-100 transition-colors"
                        >
                          <X size={12} strokeWidth={3} />
                          Reject
                        </button>
                        <div className="flex items-center gap-1 ml-2 border-l border-slate-100 pl-3">
                          <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded transition-all">
                            <FileText size={14} />
                          </button>
                          <button
                            onClick={() => handleViewDetail(applicant)}
                            className="p-1.5 text-slate-300 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded transition-all"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleEdit(applicant)}
                            className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded transition-all"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(applicant.id)}
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-white hover:shadow-sm rounded transition-all"
                          >
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

      {/* Detail View Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                    Applicant Profile
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Submission Details & History
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto scroller-hide">
              <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <img
                  src={selectedApplicant?.photo}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-md"
                  alt=""
                />
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                    {selectedApplicant?.name}
                  </h2>
                  <div className="flex gap-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">
                      {selectedApplicant?.type}
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
                      {selectedApplicant?.subStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Contact Phone
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedApplicant?.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Department
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedApplicant?.department}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Applied For
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedApplicant?.position}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Date Submitted
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedApplicant?.date} at {selectedApplicant?.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-slate-800 transition-all shadow-xl active:scale-95"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Mock) */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-inner">
                  <Edit2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                    Edit Applicant
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Update basic information
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedApplicant?.name}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue={selectedApplicant?.phone}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
                >
                  Save Changes
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
          moduleContext="Recruitment Applicants"
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

export default Recruitment;
