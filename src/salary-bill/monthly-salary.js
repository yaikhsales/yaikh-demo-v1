import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, DollarSign, Calculator, FileText, Calendar, Receipt, User } from 'lucide-react';

const MonthlySalary = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        month: '',
        year: '',
        payDate: '',
        basicSalary: '',
        allowances: {
            transportation: '',
            meal: '',
            housing: '',
            communication: '',
            other: ''
        },
        overtime: {
            hours: '',
            rate: '',
            amount: ''
        },
        bonuses: {
            performance: '',
            attendance: '',
            production: '',
            other: ''
        },
        deductions: {
            tax: '',
            nssf: '',
            healthInsurance: '',
            advance: '',
            loan: '',
            other: ''
        },
        grossSalary: '',
        totalDeductions: '',
        netSalary: '',
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
        const [parent, child] = name.split('.');
        
        if (child) {
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

    const handleOvertimeChange = (e) => {
        const { name, value } = e.target;
        const [parent, child] = name.split('.');
        
        setFormData(prev => {
            const updated = {
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            };
            
            if (child === 'hours' || child === 'rate') {
                const hours = parseFloat(child === 'hours' ? value : prev.overtime.hours) || 0;
                const rate = parseFloat(child === 'rate' ? value : prev.overtime.rate) || 0;
                updated.overtime.amount = (hours * rate).toFixed(2);
            }
            
            return updated;
        });
    };

    React.useEffect(() => {
        // Calculate gross salary
        const basic = parseFloat(formData.basicSalary) || 0;
        const totalAllowances = 
            (parseFloat(formData.allowances.transportation) || 0) +
            (parseFloat(formData.allowances.meal) || 0) +
            (parseFloat(formData.allowances.housing) || 0) +
            (parseFloat(formData.allowances.communication) || 0) +
            (parseFloat(formData.allowances.other) || 0);
        const overtimeAmount = parseFloat(formData.overtime.amount) || 0;
        const totalBonuses = 
            (parseFloat(formData.bonuses.performance) || 0) +
            (parseFloat(formData.bonuses.attendance) || 0) +
            (parseFloat(formData.bonuses.production) || 0) +
            (parseFloat(formData.bonuses.other) || 0);
        
        const grossSalary = basic + totalAllowances + overtimeAmount + totalBonuses;
        
        // Calculate total deductions
        const totalDeductions = 
            (parseFloat(formData.deductions.tax) || 0) +
            (parseFloat(formData.deductions.nssf) || 0) +
            (parseFloat(formData.deductions.healthInsurance) || 0) +
            (parseFloat(formData.deductions.advance) || 0) +
            (parseFloat(formData.deductions.loan) || 0) +
            (parseFloat(formData.deductions.other) || 0);
        
        // Calculate net salary
        const netSalary = grossSalary - totalDeductions;
        
        setFormData(prev => ({
            ...prev,
            grossSalary: grossSalary.toFixed(2),
            totalDeductions: totalDeductions.toFixed(2),
            netSalary: netSalary.toFixed(2)
        }));
    }, [
        formData.basicSalary,
        formData.allowances.transportation,
        formData.allowances.meal,
        formData.allowances.housing,
        formData.allowances.communication,
        formData.allowances.other,
        formData.overtime.amount,
        formData.bonuses.performance,
        formData.bonuses.attendance,
        formData.bonuses.production,
        formData.bonuses.other,
        formData.deductions.tax,
        formData.deductions.nssf,
        formData.deductions.healthInsurance,
        formData.deductions.advance,
        formData.deductions.loan,
        formData.deductions.other
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Monthly Salary form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-blue-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">Monthly Salary</h1>
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
                                <User className="text-blue-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Job title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Month <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="month"
                                        value={formData.month}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select Month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Year <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        min="2020"
                                        max="2100"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="2024"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Earnings */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-blue-600" size={24} />
                                Earnings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Basic Salary <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="basicSalary"
                                        value={formData.basicSalary}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Transportation Allowance
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.transportation"
                                        value={formData.allowances.transportation}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Meal Allowance
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.meal"
                                        value={formData.allowances.meal}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Housing Allowance
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.housing"
                                        value={formData.allowances.housing}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Communication Allowance
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.communication"
                                        value={formData.allowances.communication}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Other Allowances
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.other"
                                        value={formData.allowances.other}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Overtime */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calculator className="text-blue-600" size={24} />
                                Overtime
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Overtime Hours
                                    </label>
                                    <input
                                        type="number"
                                        name="overtime.hours"
                                        value={formData.overtime.hours}
                                        onChange={handleOvertimeChange}
                                        step="0.5"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Overtime Rate (per hour)
                                    </label>
                                    <input
                                        type="number"
                                        name="overtime.rate"
                                        value={formData.overtime.rate}
                                        onChange={handleOvertimeChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Overtime Amount
                                    </label>
                                    <input
                                        type="number"
                                        name="overtime.amount"
                                        value={formData.overtime.amount}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bonuses */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Receipt className="text-blue-600" size={24} />
                                Bonuses
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Production Bonus
                                    </label>
                                    <input
                                        type="number"
                                        name="bonuses.production"
                                        value={formData.bonuses.production}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        Tax
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.tax"
                                        value={formData.deductions.tax}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        NSSF Contribution
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.nssf"
                                        value={formData.deductions.nssf}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Health Insurance
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.healthInsurance"
                                        value={formData.deductions.healthInsurance}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Loan Deduction
                                    </label>
                                    <input
                                        type="number"
                                        name="deductions.loan"
                                        value={formData.deductions.loan}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="text-green-600" size={24} />
                                Salary Summary
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Gross Salary
                                    </label>
                                    <input
                                        type="text"
                                        name="grossSalary"
                                        value={formData.grossSalary}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 font-bold text-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-red-50 font-bold text-red-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Net Salary <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="netSalary"
                                        value={formData.netSalary}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-bold text-green-700 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-blue-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Any additional notes about the salary payment"
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
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Process Monthly Salary
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MonthlySalary;

