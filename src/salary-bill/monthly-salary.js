import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  ArrowLeft,
  Download,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  AlertCircle,
  FileText,
  User,
  Calculator,
  MessageCircle,
  X,
} from "lucide-react";
import GeneralAIAgent from "../general-ag";
import { useTranslation } from "../translate/TranslationContext";

const MonthlySalaryDashboard = ({ onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // MOCK DATA: Simulating a sewing line payroll
  const [salaryRecords, setSalaryRecords] = useState([
    {
      id: "EMP-001",
      name: "Srey Mao",
      dept: "Sewing Line A",
      netPay: 245.5,
      status: "paid",
      period: "Oct 2023",
      lastUpdate: "2023-11-05",
    },
    {
      id: "EMP-002",
      name: "Vannak Kem",
      dept: "Sewing Line A",
      netPay: 230.15,
      status: "processed",
      period: "Oct 2023",
      lastUpdate: "2023-11-06",
    },
    {
      id: "EMP-003",
      name: "Sophea Rattanak",
      dept: "Quality Control",
      netPay: 310.0,
      status: "approved",
      period: "Oct 2023",
      lastUpdate: "2023-11-07",
    },
    {
      id: "EMP-004",
      name: "Chitra Long",
      dept: "Sewing Line B",
      netPay: 220.75,
      status: "pending",
      period: "Oct 2023",
      lastUpdate: "2023-11-08",
    },
    {
      id: "EMP-005",
      name: "Borith Seng",
      dept: "Finishing Dept",
      netPay: 275.4,
      status: "pending",
      period: "Oct 2023",
      lastUpdate: "2023-11-08",
    },
    {
      id: "EMP-006",
      name: "Leakhena Chan",
      dept: "Packing",
      netPay: 215.0,
      status: "paid",
      period: "Oct 2023",
      lastUpdate: "2023-11-04",
    },
    {
      id: "EMP-007",
      name: "Pisey Morn",
      dept: "Sewing Line C",
      netPay: 255.2,
      status: "processed",
      period: "Oct 2023",
      lastUpdate: "2023-11-06",
    },
    {
      id: "EMP-008",
      name: "Roth Sombo",
      dept: "Cutting Room",
      netPay: 290.0,
      status: "approved",
      period: "Oct 2023",
      lastUpdate: "2023-11-07",
    },
  ]);

  // Summary Calculations
  const stats = useMemo(() => {
    const total = salaryRecords.reduce((acc, curr) => acc + curr.netPay, 0);
    const pending = salaryRecords.filter((r) => r.status === "pending").length;
    const paid = salaryRecords.filter((r) => r.status === "paid").length;
    return { total, pending, paid };
  }, [salaryRecords]);

  const filteredRecords = salaryRecords.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "processed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "approved":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 size={14} />;
      case "processed":
        return <CreditCard size={14} />;
      case "approved":
        return <FileText size={14} />;
      case "pending":
        return <Clock size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col overflow-hidden z-[100]">
      {/* Minimal Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-[101]">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Monthly Salary Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage payroll and track payment progress
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all font-medium border border-slate-200">
            <Download size={18} />
            Export PDF
          </button>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200"
          >
            <Plus size={18} />
            Create New Bill
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Total Monthly Budget
              </p>
              <h3 className="text-3xl font-black text-slate-800">
                ${stats.total.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:border-amber-300 transition-all">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Awaiting Approval
              </p>
              <h3 className="text-3xl font-black text-slate-800">
                {stats.pending} Staff
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:border-green-300 transition-all">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Successfully Paid
              </p>
              <h3 className="text-3xl font-black text-slate-800">
                {stats.paid} Staff
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Table Filters */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by Employee ID or Name..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-500" />
              <select
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 transiton-all outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="processed">Processed</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Net Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                    Payment Progress
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                          {record.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">
                            {record.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {record.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-600">
                        {record.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-800">
                        ${record.netPay.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">
                        {record.period}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(record.status)}`}
                        >
                          {getStatusIcon(record.status)}
                          <span className="capitalize">{record.status}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-slate-500">
                        {record.lastUpdate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 text-slate-400 rounded-full mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No records found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SIDE PANEL: ADD NEW BILL (Replaces the "Old Form") */}
      {isAddFormOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]"
            onClick={() => setIsAddFormOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[201] flex flex-col transform transition-transform duration-300 animate-slide-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
              <div>
                <h2 className="text-xl font-bold font-heading">
                  New Monthly Salary
                </h2>
                <p className="text-blue-100 text-xs">
                  Enter employee earnings and deductions
                </p>
              </div>
              <button
                onClick={() => setIsAddFormOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Form Sections */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                  <User size={16} /> Employee Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                      Search Employee
                    </label>
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={14}
                      />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        placeholder="Enter ID or Name..."
                      />
                    </div>
                  </div>
                  <div className="col-span-2 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        John Doe (Selected)
                      </p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">
                        Sewing Line B • Grade A
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                  <Calculator size={16} /> Earnings & Incentives
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                      Basic Salary ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                      Overtime (Hrs)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      placeholder="0"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase leading-none">
                        Weekly Incentives Sum ($)
                      </label>
                      <button
                        className="text-[10px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-tighter"
                        type="button"
                        onClick={() =>
                          alert(
                            "Syncing with Weekly Incentive Dashboard... Found $145.00 for this month.",
                          )
                        }
                      >
                        <TrendingUp size={10} /> Sync from Production Line
                      </button>
                    </div>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      placeholder="0.00"
                      defaultValue="145.00"
                    />
                    <p className="text-[9px] text-slate-400 mt-1 italic leading-none">
                      *Automatically fetched from the Weekly Incentive module
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                  <AlertCircle size={16} /> Deductions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                      Tax/NSSF ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 transition-all outline-none border-red-50"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                      Loans/Advance
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 transition-all outline-none border-red-50"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">
                    Estimated Net Pay
                  </p>
                  <p className="text-3xl font-black text-slate-800">$0.00</p>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg border border-green-100 text-xs">
                  <TrendingUp size={14} /> Low Variance
                </div>
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                <Plus size={20} />
                Confirm & Create Bill
              </button>
            </div>
          </div>
        </>
      )}

      {/* AI Agent Bubble */}
      <button
        onClick={() => setIsBotOpen(true)}
        className="fixed bottom-6 right-6 z-[102] w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <MessageCircle className="relative z-10" size={24} />
      </button>

      {isBotOpen && (
        <GeneralAIAgent
          onClose={() => setIsBotOpen(false)}
          moduleContext="Monthly Salary Dashboard"
        />
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
                @keyframes slide-in {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `,
        }}
      />
    </div>
  );
};

export default MonthlySalaryDashboard;
