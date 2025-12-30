import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Users, Plus, X, Building, User, Hash, FileText, Clock, Rocket, ArrowLeft as ReturnIcon, Send, MapPin } from 'lucide-react';

const GatePass = ({ onBack }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([
        {
            id: 1,
            employeeId: 'TS00000001',
            name: 'John Doe',
            department: 'IT',
            supervisor: 'Jane Smith',
            requestType: 'personal',
            requestReason: 'Office Duty',
            whereToGo: 'YM to WH12000',
            departureTime: '09:00 AM',
            returnTime: '12:00 PM',
            status: 'pending',
            requestDate: '2025-12-23'
        },
        {
            id: 2,
            employeeId: 'TS00000002',
            name: 'Sarah Johnson',
            department: 'HR',
            supervisor: 'Mike Brown',
            requestType: 'material',
            requestReason: 'Purchase Goods',
            whereToGo: 'YM to Sub Factory',
            departureTime: '02:00 PM',
            returnTime: '04:30 PM',
            status: 'pending',
            requestDate: '2025-12-23'
        },
        {
            id: 3,
            employeeId: 'TS00000003',
            name: 'David Lee',
            department: 'Production',
            supervisor: 'Emily Chen',
            requestType: 'assets',
            requestReason: 'Repair Device',
            whereToGo: 'YM to Other',
            departureTime: '10:30 AM',
            returnTime: '01:00 PM',
            status: 'pending',
            requestDate: '2025-12-22'
        }
    ]);

    const [formData, setFormData] = useState({
        employeeId: 'TS00000005',
        name: 'Testuser1',
        department: 'CSR',
        supervisorCode: '',
        supervisor: 'Testuser',
        requestType: '',
        requestReason: '',
        whereToGo: '',
        departureHour: '12',
        departureMinute: '30',
        returnHour: '12',
        returnMinute: '55'
    });

    const requestTypes = [
        { value: 'personal', label: 'Personal Request', icon: 'User' },
        { value: 'material', label: 'Material Transport', icon: 'Package' },
        { value: 'assets', label: 'Fixed Assets Transport', icon: 'Wrench' }
    ];

    const requestReasons = [
        'Office Duty',
        'Audit Duty',
        'Purchase Goods',
        'Repair Device',
        'Health Issue',
        'Personal Emergency',
        'Other'
    ];

    const whereToGoOptions = [
        'YM to WH12000',
        'YM to Sub Factory',
        'YM to Other',
        'WH12000 to YM',
        'WH to Sub Factory',
        'WH to Other'
    ];

    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            employeeId: 'TS00000005',
            name: 'Testuser1',
            department: 'CSR',
            supervisorCode: '',
            supervisor: 'Testuser',
            requestType: '',
            requestReason: '',
            whereToGo: '',
            departureHour: '12',
            departureMinute: '30',
            returnHour: '12',
            returnMinute: '55'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
        handleCloseModal();
    };

    const handleMyHistory = () => {
        console.log('My History');
    };

    const handleGPAdmin = () => {
        console.log('GP-Admin');
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleBack} 
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold text-sm"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-300 hover:border-slate-400 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                        title="Home"
                    >
                        <img 
                            src="/logo.jpg" 
                            alt="Home" 
                            className="w-full h-full object-cover"
                        />
                    </button>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 text-center">Gate Pass</h1>
                <div className="w-16"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="w-full h-full">
                    {/* White Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 h-full">
                        {/* Top Section: Action Buttons */}
                        <div className="flex justify-between items-center mb-6">
                            {/* Left Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleMyHistory}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <History size={16} />
                                    My History
                                </button>
                                <button
                                    onClick={handleGPAdmin}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    <Users size={16} />
                                    GP-Admin
                                </button>
                            </div>

                            {/* Right Button */}
                            <button
                                onClick={handleOpenModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Plus size={16} />
                                Add New Request
                            </button>
                        </div>

                        {/* Pending Requests Table */}
                        {pendingRequests.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-32 h-32 mb-6 flex items-center justify-center">
                                    <div className="w-full h-full bg-orange-200 rounded-lg flex items-center justify-center">
                                        <FileText size={64} className="text-orange-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No pending request to approve</h3>
                                <p className="text-slate-600">All requests have been processed</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">N°</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">EMPLOYEE ID</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">NAME</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">DEPARTMENT</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">SUPERVISOR</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">REQUEST TYPE</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">REASON</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">DESTINATION</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">DEPARTURE</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">RETURN</th>
                                            <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingRequests.map((request, idx) => (
                                            <tr key={request.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700 text-center">{idx + 1}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.employeeId}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.name}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.department}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.supervisor}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700 capitalize">{request.requestType}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.requestReason}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.whereToGo}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.departureTime}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-slate-700">{request.returnTime}</td>
                                                <td className="px-4 py-3 border border-slate-200 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                                                            Approve
                                                        </button>
                                                        <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Gate Pass Request Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] animate-in fade-in duration-300">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
                        {/* Modal Header with Gradient */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <Building size={20} className="text-yellow-300" />
                                <h2 className="text-xl font-bold text-white">Gate Pass Request</h2>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Employee Information Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <User size={18} className="text-blue-600" />
                                    <h3 className="text-lg font-bold text-slate-800">Employee Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Employee ID */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <Hash size={14} className="text-blue-600" />
                                            Employee ID
                                        </label>
                                        <input
                                            type="text"
                                            name="employeeId"
                                            value={formData.employeeId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Your Name */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <User size={14} className="text-yellow-500" />
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <Building size={14} className="text-blue-600" />
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Supervisor Code */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <Hash size={14} className="text-blue-600" />
                                            Supervisor Code
                                        </label>
                                        <input
                                            type="text"
                                            name="supervisorCode"
                                            value={formData.supervisorCode}
                                            onChange={handleChange}
                                            placeholder="Authorized Person Code"
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Supervisor */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <User size={14} className="text-yellow-500" />
                                            Supervisor
                                        </label>
                                        <input
                                            type="text"
                                            name="supervisor"
                                            value={formData.supervisor}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Request Type */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <Hash size={14} className="text-blue-600" />
                                            Request Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="requestType"
                                                value={formData.requestType}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                            >
                                                <option value="">--Select request type--</option>
                                                {requestTypes.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <Hash className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Request Reason Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText size={18} className="text-yellow-500" />
                                    <h3 className="text-lg font-bold text-slate-800">Request Reason</h3>
                                </div>
                                <div className="relative">
                                    <select
                                        name="requestReason"
                                        value={formData.requestReason}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">--Select reason--</option>
                                        {requestReasons.map((reason) => (
                                            <option key={reason} value={reason}>
                                                {reason}
                                            </option>
                                        ))}
                                    </select>
                                    <FileText className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Where to Go Section - Only show when Request Reason is selected */}
                            {formData.requestReason && (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin size={18} className="text-blue-600" />
                                        <h3 className="text-lg font-bold text-slate-800">Where to Go</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {whereToGoOptions.map((option) => (
                                            <label
                                                key={option}
                                                className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    name="whereToGo"
                                                    value={option}
                                                    checked={formData.whereToGo === option}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                />
                                                <span className="text-slate-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Time Schedule Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock size={18} className="text-green-600" />
                                    <h3 className="text-lg font-bold text-slate-800">Time Schedule</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Departure Time */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <Rocket size={14} className="text-red-500" />
                                            Departure Time
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <select
                                                    name="departureHour"
                                                    value={formData.departureHour}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                                >
                                                    {hours.map((hour) => (
                                                        <option key={hour} value={hour}>
                                                            {hour}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="relative flex-1">
                                                <select
                                                    name="departureMinute"
                                                    value={formData.departureMinute}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                                >
                                                    {minutes.map((minute) => (
                                                        <option key={minute} value={minute}>
                                                            {minute}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Return Time */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            <ReturnIcon size={14} className="text-blue-500" />
                                            Return Time <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <select
                                                    name="returnHour"
                                                    value={formData.returnHour}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                                >
                                                    {hours.map((hour) => (
                                                        <option key={hour} value={hour}>
                                                            {hour}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="relative flex-1">
                                                <select
                                                    name="returnMinute"
                                                    value={formData.returnMinute}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                                >
                                                    {minutes.map((minute) => (
                                                        <option key={minute} value={minute}>
                                                            {minute}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-400 transition-colors flex items-center gap-2"
                                >
                                    <X size={16} className="text-red-500" />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Send size={16} />
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GatePass;

