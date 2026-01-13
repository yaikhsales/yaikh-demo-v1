import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, DollarSign, Calendar, User, TrendingUp } from 'lucide-react';

const WeeklyIncentive = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        weekStartDate: '',
        weekEndDate: '',
        payDate: '',
        incentiveType: '',
        baseAmount: '',
        performanceMultiplier: '',
        attendanceBonus: '',
        productionBonus: '',
        qualityBonus: '',
        teamBonus: '',
        totalIncentive: '',
        paymentMethod: '',
        bankAccount: '',
        status: 'pending',
        notes: ''
    });

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    React.useEffect(() => {
        const base = parseFloat(formData.baseAmount) || 0;
        const multiplier = parseFloat(formData.performanceMultiplier) || 1;
        const attendance = parseFloat(formData.attendanceBonus) || 0;
        const production = parseFloat(formData.productionBonus) || 0;
        const quality = parseFloat(formData.qualityBonus) || 0;
        const team = parseFloat(formData.teamBonus) || 0;
        
        const calculatedBase = base * multiplier;
        const totalIncentive = calculatedBase + attendance + production + quality + team;
        
        setFormData(prev => ({
            ...prev,
            totalIncentive: totalIncentive.toFixed(2)
        }));
    }, [
        formData.baseAmount,
        formData.performanceMultiplier,
        formData.attendanceBonus,
        formData.productionBonus,
        formData.qualityBonus,
        formData.teamBonus
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Weekly Incentive form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-green-700 rounded transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span className="font-medium">Back</span>
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title="Home"
                        >
                            <img 
                                src="/logo.jpg" 
                                alt="Home" 
                                className="w-full h-full object-cover"
                            />
                        </button>
                        <h1 className="text-lg font-bold">Weekly Incentive</h1>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                        {/* Employee Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="text-green-600" size={24} />
                                Employee Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Employee ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeId"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="EMP-XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Employee Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeName"
                                        value={formData.employeeName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Department name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Job title"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Week Information */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="text-green-600" size={24} />
                                Week Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Week Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="weekStartDate"
                                        value={formData.weekStartDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Week End Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="weekEndDate"
                                        value={formData.weekEndDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Pay Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="payDate"
                                        value={formData.payDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Incentive Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="incentiveType"
                                        value={formData.incentiveType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Performance">Performance</option>
                                        <option value="Production">Production</option>
                                        <option value="Attendance">Attendance</option>
                                        <option value="Quality">Quality</option>
                                        <option value="Team">Team</option>
                                        <option value="Combined">Combined</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Incentive Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="text-green-600" size={24} />
                                Incentive Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Base Amount <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="baseAmount"
                                        value={formData.baseAmount}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Performance Multiplier
                                    </label>
                                    <input
                                        type="number"
                                        name="performanceMultiplier"
                                        value={formData.performanceMultiplier}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        max="5"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="1.00"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Multiplier for base amount (e.g., 1.0 = 100%, 1.5 = 150%)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Attendance Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="attendanceBonus"
                                        value={formData.attendanceBonus}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Production Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="productionBonus"
                                        value={formData.productionBonus}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Quality Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="qualityBonus"
                                        value={formData.qualityBonus}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Team Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="teamBonus"
                                        value={formData.teamBonus}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Total Incentive
                                    </label>
                                    <input
                                        type="text"
                                        name="totalIncentive"
                                        value={formData.totalIncentive}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-bold text-green-700 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-green-600" size={24} />
                                Payment Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Payment Method <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Method</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Check">Check</option>
                                        <option value="Mobile Payment">Mobile Payment</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Bank Account Number
                                    </label>
                                    <input
                                        type="text"
                                        name="bankAccount"
                                        value={formData.bankAccount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Bank account number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="processed">Processed</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Additional Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Any additional notes about the weekly incentive"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Process Weekly Incentive
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WeeklyIncentive;

