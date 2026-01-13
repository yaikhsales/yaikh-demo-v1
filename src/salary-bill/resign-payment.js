import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, DollarSign, Calendar, FileText, User, LogOut, Calculator, Receipt } from 'lucide-react';

const ResignPayment = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        resignationDate: '',
        lastWorkingDate: '',
        paymentDate: '',
        finalSalary: {
            basicSalary: '',
            proratedDays: '',
            proratedAmount: ''
        },
        unusedLeave: {
            totalDays: '',
            paidDays: '',
            amount: ''
        },
        bonuses: {
            performance: '',
            attendance: '',
            other: ''
        },
        deductions: {
            advance: '',
            loan: '',
            equipment: '',
            other: ''
        },
        severancePay: '',
        noticePeriodPay: '',
        totalEarnings: '',
        totalDeductions: '',
        netPayment: '',
        paymentMethod: '',
        bankAccount: '',
        status: 'pending',
        clearanceStatus: 'pending',
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
        const [parent, child, grandchild] = name.split('.');
        
        if (grandchild) {
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: {
                        ...prev[parent][child],
                        [grandchild]: value
                    }
                }
            }));
        } else if (child) {
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    React.useEffect(() => {
        // Calculate prorated salary
        const basicSalary = parseFloat(formData.finalSalary.basicSalary) || 0;
        const proratedDays = parseFloat(formData.finalSalary.proratedDays) || 0;
        const proratedAmount = basicSalary > 0 && proratedDays > 0 
            ? (basicSalary / 30) * proratedDays 
            : 0;
        
        // Calculate unused leave payment
        const paidDays = parseFloat(formData.unusedLeave.paidDays) || 0;
        const dailyRate = basicSalary > 0 ? basicSalary / 30 : 0;
        const leaveAmount = paidDays * dailyRate;
        
        // Calculate totals
        const totalBonuses = 
            (parseFloat(formData.bonuses.performance) || 0) +
            (parseFloat(formData.bonuses.attendance) || 0) +
            (parseFloat(formData.bonuses.other) || 0);
        
        const totalDeductions = 
            (parseFloat(formData.deductions.advance) || 0) +
            (parseFloat(formData.deductions.loan) || 0) +
            (parseFloat(formData.deductions.equipment) || 0) +
            (parseFloat(formData.deductions.other) || 0);
        
        const severancePay = parseFloat(formData.severancePay) || 0;
        const noticePeriodPay = parseFloat(formData.noticePeriodPay) || 0;
        
        const totalEarnings = proratedAmount + leaveAmount + totalBonuses + severancePay + noticePeriodPay;
        const netPayment = totalEarnings - totalDeductions;
        
        setFormData(prev => ({
            ...prev,
            finalSalary: {
                ...prev.finalSalary,
                proratedAmount: proratedAmount.toFixed(2)
            },
            unusedLeave: {
                ...prev.unusedLeave,
                amount: leaveAmount.toFixed(2)
            },
            totalEarnings: totalEarnings.toFixed(2),
            totalDeductions: totalDeductions.toFixed(2),
            netPayment: netPayment.toFixed(2)
        }));
    }, [
        formData.finalSalary.basicSalary,
        formData.finalSalary.proratedDays,
        formData.unusedLeave.paidDays,
        formData.bonuses.performance,
        formData.bonuses.attendance,
        formData.bonuses.other,
        formData.deductions.advance,
        formData.deductions.loan,
        formData.deductions.equipment,
        formData.deductions.other,
        formData.severancePay,
        formData.noticePeriodPay
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Resign Payment form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-orange-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">Resign Payment</h1>
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
                                <User className="text-orange-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Job title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Resignation Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="resignationDate"
                                        value={formData.resignationDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <LogOut size={14} />
                                        Last Working Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="lastWorkingDate"
                                        value={formData.lastWorkingDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Payment Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="paymentDate"
                                        value={formData.paymentDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Final Salary */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-orange-600" size={24} />
                                Final Salary
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Basic Salary <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="finalSalary.basicSalary"
                                        value={formData.finalSalary.basicSalary}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Prorated Days
                                    </label>
                                    <input
                                        type="number"
                                        name="finalSalary.proratedDays"
                                        value={formData.finalSalary.proratedDays}
                                        onChange={handleChange}
                                        step="0.5"
                                        min="0"
                                        max="31"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Prorated Amount
                                    </label>
                                    <input
                                        type="text"
                                        name="finalSalary.proratedAmount"
                                        value={formData.finalSalary.proratedAmount}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Unused Leave */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="text-orange-600" size={24} />
                                Unused Leave Payment
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Total Unused Leave Days
                                    </label>
                                    <input
                                        type="number"
                                        name="unusedLeave.totalDays"
                                        value={formData.unusedLeave.totalDays}
                                        onChange={handleChange}
                                        step="0.5"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Paid Days
                                    </label>
                                    <input
                                        type="number"
                                        name="unusedLeave.paidDays"
                                        value={formData.unusedLeave.paidDays}
                                        onChange={handleChange}
                                        step="0.5"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Leave Payment Amount
                                    </label>
                                    <input
                                        type="text"
                                        name="unusedLeave.amount"
                                        value={formData.unusedLeave.amount}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Payments */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Receipt className="text-orange-600" size={24} />
                                Additional Payments
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Performance Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.performance"
                                        value={formData.bonuses.performance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Attendance Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.attendance"
                                        value={formData.bonuses.attendance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Severance Pay
                                    </label>
                                    <input
                                        type="number"
                                        name="severancePay"
                                        value={formData.severancePay}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Notice Period Pay
                                    </label>
                                    <input
                                        type="number"
                                        name="noticePeriodPay"
                                        value={formData.noticePeriodPay}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Other Bonuses
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.other"
                                        value={formData.bonuses.other}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calculator className="text-red-600" size={24} />
                                Deductions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Salary Advance
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.advance"
                                        value={formData.deductions.advance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Outstanding Loan
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.loan"
                                        value={formData.deductions.loan}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Equipment/Asset Recovery
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.equipment"
                                        value={formData.deductions.equipment}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Other Deductions
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.other"
                                        value={formData.deductions.other}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="text-green-600" size={24} />
                                Payment Summary
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Total Earnings
                                    </label>
                                    <input
                                        type="text"
                                        name="totalEarnings"
                                        value={formData.totalEarnings}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 font-bold text-blue-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Total Deductions
                                    </label>
                                    <input
                                        type="text"
                                        name="totalDeductions"
                                        value={formData.totalDeductions}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-red-50 font-bold text-red-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Net Payment <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="netPayment"
                                        value={formData.netPayment}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-bold text-green-700 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-orange-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        placeholder="Bank account number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Payment Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="processed">Processed</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Clearance Status
                                    </label>
                                    <select
                                        name="clearanceStatus"
                                        value={formData.clearanceStatus}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Any additional notes about the resignation payment"
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
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Process Resign Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResignPayment;

