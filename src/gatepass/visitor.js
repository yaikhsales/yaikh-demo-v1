import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Printer, X, Calendar } from 'lucide-react';

const Visitor = ({ onBack }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visitors, setVisitors] = useState([
        {
            id: 1,
            no: 1,
            date: '20 Dec, 2025',
            visitorName: 'testing',
            idCardNo: 'testing',
            company: 'testing',
            contactPerson: 'testing',
            purpose: 'testing',
            visitorIdNumber: 'testing',
            carMotorPlate: 'testing',
            carCheck: 'testing',
            timeIn: '02:36 PM',
            timeOut: null,
            photos: null,
            remarks: 'testin'
        }
    ]);

    const [formData, setFormData] = useState({
        visitorName: '',
        idCardNo: '',
        contactPerson: '',
        purpose: '',
        date: '2025-12-23',
        visitorCardNo: '',
        carCheck: '',
        remarks: '',
        companyName: '',
        phoneNumber: '',
        timeIn: '12:20 PM',
        carMotorPlate: ''
    });

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
            visitorName: '',
            idCardNo: '',
            contactPerson: '',
            purpose: '',
            date: '2025-12-23',
            visitorCardNo: '',
            carCheck: '',
            remarks: '',
            companyName: '',
            phoneNumber: '',
            timeIn: '12:20 PM',
            carMotorPlate: ''
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
        const newVisitor = {
            id: visitors.length + 1,
            no: visitors.length + 1,
            date: new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            visitorName: formData.visitorName,
            idCardNo: formData.idCardNo,
            company: formData.companyName,
            contactPerson: formData.contactPerson,
            purpose: formData.purpose,
            visitorIdNumber: formData.visitorCardNo,
            carMotorPlate: formData.carMotorPlate,
            carCheck: formData.carCheck,
            timeIn: formData.timeIn,
            timeOut: null,
            photos: null,
            remarks: formData.remarks
        };
        setVisitors([...visitors, newVisitor]);
        handleCloseModal();
    };

    const handleCheckOut = (id) => {
        setVisitors(visitors.map(visitor => 
            visitor.id === id 
                ? { ...visitor, timeOut: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }
                : visitor
        ));
    };

    const handlePrintRecords = () => {
        console.log('Print Records');
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                <button 
                    onClick={handleBack} 
                    className="p-2 hover:bg-slate-100 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold px-3 py-1 text-sm"
                    aria-label="Go back"
                >
                    <ArrowLeft size={16} className="inline" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 text-center">Visitor Log</h1>
                <div className="w-16"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="w-full h-full">
                    {/* White Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 h-full">
                        {/* Title and Action Buttons */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Visitor Log</h2>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleOpenModal}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add New Visitor
                                </button>
                                <button
                                    onClick={handlePrintRecords}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    <Printer size={16} />
                                    Print Records
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">NO.</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">DATE</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">VISITOR'S NAME</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">ID CARD NO.</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">COMPANY</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">CONTACT PERSON</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">PURPOSE</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">VISITOR ID NUMBER</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">CAR/MOTOR PLATE</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">CAR CHECK</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">TIME IN</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">TIME OUT</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-center">PHOTOS</th>
                                        <th className="px-4 py-3 border border-slate-200 text-slate-600 font-bold text-xs text-left">REMARKS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visitors.length === 0 ? (
                                        <tr>
                                            <td colSpan={14} className="text-center py-16 text-slate-500">
                                                No visitor records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        visitors.map((visitor) => (
                                            <tr key={visitor.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700 text-center">{visitor.no}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.date}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.visitorName}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.idCardNo}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.company}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.contactPerson}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.purpose}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.visitorIdNumber}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.carMotorPlate}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.carCheck}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.timeIn}</td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">
                                                    {visitor.timeOut ? (
                                                        visitor.timeOut
                                                    ) : (
                                                        <button
                                                            onClick={() => handleCheckOut(visitor.id)}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                                                        >
                                                            Check Out
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 border border-slate-200 text-center">
                                                    {visitor.photos ? (
                                                        <img src={visitor.photos} alt="Visitor" className="w-12 h-12 object-cover rounded mx-auto" />
                                                    ) : (
                                                        <span className="text-slate-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 border border-slate-200 text-slate-700">{visitor.remarks}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Visitor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] animate-in fade-in duration-300">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="bg-white p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">Visitor Log - New Entry</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    {/* Visitor's Name */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Visitor's Name <span className="text-slate-500 text-xs">(ឈ្មោះអ្នកមក)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="visitorName"
                                            value={formData.visitorName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* ID Card No. */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            ID Card No. <span className="text-slate-500 text-xs">(អត្តសញ្ញាណប័ណ្ណ)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="idCardNo"
                                            value={formData.idCardNo}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Contact Person */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Contact Person <span className="text-slate-500 text-xs">(ឈ្មោះអ្នកដែលត្រូវជួប)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="contactPerson"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Purpose of Visiting */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Purpose of Visiting <span className="text-slate-500 text-xs">(គោលបំណង)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Date <span className="text-slate-500 text-xs">(កាលបរិច្ឆេទ)</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                        </div>
                                    </div>

                                    {/* Visitor Card No. */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Visitor Card No. <span className="text-slate-500 text-xs">(លេខកាត)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="visitorCardNo"
                                            value={formData.visitorCardNo}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Car check */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Car check
                                        </label>
                                        <input
                                            type="text"
                                            name="carCheck"
                                            value={formData.carCheck}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Remarks */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Remarks <span className="text-slate-500 text-xs">(ផ្សេងៗ)</span>
                                        </label>
                                        <textarea
                                            name="remarks"
                                            value={formData.remarks}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                            placeholder=""
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    {/* Company Name */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Company Name <span className="text-slate-500 text-xs">(ឈ្មោះក្រុមហ៊ុន)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Phone Number <span className="text-slate-500 text-xs">(ទូរស័ព្ទ)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>

                                    {/* Time In */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Time In <span className="text-slate-500 text-xs">(ម៉ោងចូល)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="timeIn"
                                            value={formData.timeIn}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="12:20 PM"
                                        />
                                    </div>

                                    {/* Car/Motor plate */}
                                    <div>
                                        <label className="flex items-center gap-1 text-sm font-semibold text-slate-700 mb-2">
                                            Car/Motor plate
                                        </label>
                                        <input
                                            type="text"
                                            name="carMotorPlate"
                                            value={formData.carMotorPlate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end mt-6 pt-4 border-t">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                                >
                                    LOG VISITOR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Visitor;

