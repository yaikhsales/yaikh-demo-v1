import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Heart, Shield, Calendar, DollarSign, FileText } from 'lucide-react';

const BenefitProfile = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        department: '',
        position: '',
        enrollmentDate: '',
        healthInsurance: {
            provider: '',
            policyNumber: '',
            coverageType: '',
            startDate: '',
            endDate: '',
            dependents: []
        },
        dentalInsurance: {
            provider: '',
            policyNumber: '',
            startDate: '',
            endDate: '',
            covered: false
        },
        lifeInsurance: {
            provider: '',
            policyNumber: '',
            coverageAmount: '',
            beneficiary: '',
            startDate: '',
            covered: false
        },
        retirementPlan: {
            planType: '',
            contributionRate: '',
            employerMatch: '',
            accountNumber: '',
            startDate: '',
            enrolled: false
        },
        paidTimeOff: {
            totalDays: '',
            usedDays: '',
            remainingDays: '',
            carryOver: ''
        },
        allowances: {
            transportation: '',
            meal: '',
            housing: '',
            other: ''
        },
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

    const handleNestedCheckbox = (parent, child, checked) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [child]: checked
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Benefit Profile form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-indigo-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">Benefit Profile</h1>
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
                                <FileText className="text-indigo-600" size={24} />
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Job title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Enrollment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="enrollmentDate"
                                        value={formData.enrollmentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Health Insurance */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Heart className="text-indigo-600" size={24} />
                                Health Insurance
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Insurance Provider
                                    </label>
                                    <input
                                        type="text"
                                        name="healthInsurance.provider"
                                        value={formData.healthInsurance.provider}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Insurance company name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Policy Number
                                    </label>
                                    <input
                                        type="text"
                                        name="healthInsurance.policyNumber"
                                        value={formData.healthInsurance.policyNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Policy number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Coverage Type
                                    </label>
                                    <select
                                        name="healthInsurance.coverageType"
                                        value={formData.healthInsurance.coverageType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="">Select Coverage</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Family">Family</option>
                                        <option value="Employee + Spouse">Employee + Spouse</option>
                                        <option value="Employee + Children">Employee + Children</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        name="healthInsurance.startDate"
                                        value={formData.healthInsurance.startDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        name="healthInsurance.endDate"
                                        value={formData.healthInsurance.endDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dental Insurance */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="text-indigo-600" size={24} />
                                Dental Insurance
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            checked={formData.dentalInsurance.covered}
                                            onChange={(e) => handleNestedCheckbox('dentalInsurance', 'covered', e.target.checked)}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">Dental Insurance Covered</span>
                                    </label>
                                </div>
                                {formData.dentalInsurance.covered && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Provider
                                            </label>
                                            <input
                                                type="text"
                                                name="dentalInsurance.provider"
                                                value={formData.dentalInsurance.provider}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Insurance company"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Policy Number
                                            </label>
                                            <input
                                                type="text"
                                                name="dentalInsurance.policyNumber"
                                                value={formData.dentalInsurance.policyNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Policy number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                name="dentalInsurance.startDate"
                                                value={formData.dentalInsurance.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                name="dentalInsurance.endDate"
                                                value={formData.dentalInsurance.endDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Life Insurance */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="text-indigo-600" size={24} />
                                Life Insurance
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            checked={formData.lifeInsurance.covered}
                                            onChange={(e) => handleNestedCheckbox('lifeInsurance', 'covered', e.target.checked)}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">Life Insurance Covered</span>
                                    </label>
                                </div>
                                {formData.lifeInsurance.covered && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Provider
                                            </label>
                                            <input
                                                type="text"
                                                name="lifeInsurance.provider"
                                                value={formData.lifeInsurance.provider}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Insurance company"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Policy Number
                                            </label>
                                            <input
                                                type="text"
                                                name="lifeInsurance.policyNumber"
                                                value={formData.lifeInsurance.policyNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Policy number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                Coverage Amount
                                            </label>
                                            <input
                                                type="number"
                                                name="lifeInsurance.coverageAmount"
                                                value={formData.lifeInsurance.coverageAmount}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Beneficiary
                                            </label>
                                            <input
                                                type="text"
                                                name="lifeInsurance.beneficiary"
                                                value={formData.lifeInsurance.beneficiary}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Beneficiary name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                name="lifeInsurance.startDate"
                                                value={formData.lifeInsurance.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Retirement Plan */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-indigo-600" size={24} />
                                Retirement Plan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                                        <input
                                            type="checkbox"
                                            checked={formData.retirementPlan.enrolled}
                                            onChange={(e) => handleNestedCheckbox('retirementPlan', 'enrolled', e.target.checked)}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700">Enrolled in Retirement Plan</span>
                                    </label>
                                </div>
                                {formData.retirementPlan.enrolled && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Plan Type
                                            </label>
                                            <select
                                                name="retirementPlan.planType"
                                                value={formData.retirementPlan.planType}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            >
                                                <option value="">Select Plan</option>
                                                <option value="401(k)">401(k)</option>
                                                <option value="Pension Plan">Pension Plan</option>
                                                <option value="Provident Fund">Provident Fund</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Employee Contribution Rate (%)
                                            </label>
                                            <input
                                                type="number"
                                                name="retirementPlan.contributionRate"
                                                value={formData.retirementPlan.contributionRate}
                                                onChange={handleChange}
                                                min="0"
                                                max="100"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Employer Match (%)
                                            </label>
                                            <input
                                                type="number"
                                                name="retirementPlan.employerMatch"
                                                value={formData.retirementPlan.employerMatch}
                                                onChange={handleChange}
                                                min="0"
                                                max="100"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Account Number
                                            </label>
                                            <input
                                                type="text"
                                                name="retirementPlan.accountNumber"
                                                value={formData.retirementPlan.accountNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Account number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                name="retirementPlan.startDate"
                                                value={formData.retirementPlan.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Paid Time Off */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="text-indigo-600" size={24} />
                                Paid Time Off
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Total Days Allocated
                                    </label>
                                    <input
                                        type="number"
                                        name="paidTimeOff.totalDays"
                                        value={formData.paidTimeOff.totalDays}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Days Used
                                    </label>
                                    <input
                                        type="number"
                                        name="paidTimeOff.usedDays"
                                        value={formData.paidTimeOff.usedDays}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Remaining Days
                                    </label>
                                    <input
                                        type="number"
                                        name="paidTimeOff.remainingDays"
                                        value={formData.paidTimeOff.remainingDays}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Carry Over Days
                                    </label>
                                    <input
                                        type="number"
                                        name="paidTimeOff.carryOver"
                                        value={formData.paidTimeOff.carryOver}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Allowances */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <DollarSign className="text-indigo-600" size={24} />
                                Allowances
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Transportation Allowance
                                    </label>
                                    <input
                                        type="number"
                                        name="allowances.transportation"
                                        value={formData.allowances.transportation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0"
                                    />
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Any additional notes about benefits"
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
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Save Benefit Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BenefitProfile;

