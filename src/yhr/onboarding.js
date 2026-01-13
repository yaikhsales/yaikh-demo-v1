import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Briefcase, FileText, Calendar, CheckSquare, Building } from 'lucide-react';

const Onboarding = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        manager: '',
        startDate: '',
        employmentType: '',
        workLocation: '',
        workSchedule: '',
        salary: '',
        benefits: [],
        equipment: [],
        documents: [],
        orientationDate: '',
        orientationCompleted: false,
        trainingCompleted: false,
        systemAccess: false,
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
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCheckboxChange = (category, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Onboarding form submitted:', formData);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col overflow-hidden z-[100]">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg sticky top-0 z-[101]">
                <div className="px-4 py-3 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-purple-700 rounded transition-colors"
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
                        <h1 className="text-lg font-bold">Employee Onboarding</h1>
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
                                <User className="text-purple-600" size={24} />
                                Employee Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter full name"
                                    />
                                </div>
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="EMP-XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="employee@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="+855 XX XXX XXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Briefcase className="text-purple-600" size={24} />
                                Job Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Department <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">Select Department</option>
                                        <option value="IT">IT</option>
                                        <option value="HR">HR</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Operations">Operations</option>
                                        <option value="Production">Production</option>
                                        <option value="QA">QA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Position <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Job title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Reporting Manager <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="manager"
                                        value={formData.manager}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Manager name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Employment Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Temporary">Temporary</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Building size={14} />
                                        Work Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="workLocation"
                                        value={formData.workLocation}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Office location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Work Schedule
                                    </label>
                                    <select
                                        name="workSchedule"
                                        value={formData.workSchedule}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">Select Schedule</option>
                                        <option value="Monday-Friday 8AM-5PM">Monday-Friday 8AM-5PM</option>
                                        <option value="Monday-Saturday 8AM-5PM">Monday-Saturday 8AM-5PM</option>
                                        <option value="Shift Work">Shift Work</option>
                                        <option value="Flexible">Flexible</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Salary
                                    </label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Benefits & Equipment */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckSquare className="text-purple-600" size={24} />
                                Benefits & Equipment
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Benefits Package
                                    </label>
                                    <div className="space-y-2">
                                        {['Health Insurance', 'Dental Insurance', 'Life Insurance', 'Retirement Plan', 'Paid Time Off', 'Transportation Allowance', 'Meal Allowance'].map(benefit => (
                                            <label key={benefit} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.benefits.includes(benefit)}
                                                    onChange={() => handleCheckboxChange('benefits', benefit)}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-gray-700">{benefit}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Equipment & Access
                                    </label>
                                    <div className="space-y-2">
                                        {['Laptop', 'Desktop Computer', 'Mobile Phone', 'Email Account', 'System Access', 'ID Card', 'Access Card', 'Uniform'].map(equipment => (
                                            <label key={equipment} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.equipment.includes(equipment)}
                                                    onChange={() => handleCheckboxChange('equipment', equipment)}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-gray-700">{equipment}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents & Checklist */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="text-purple-600" size={24} />
                                Documents & Checklist
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Required Documents
                                    </label>
                                    <div className="space-y-2">
                                        {['ID Card Copy', 'Resume/CV', 'Educational Certificates', 'Previous Employment Letter', 'Medical Certificate', 'Bank Account Details', 'Emergency Contact Form'].map(doc => (
                                            <label key={doc} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.documents.includes(doc)}
                                                    onChange={() => handleCheckboxChange('documents', doc)}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-gray-700">{doc}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Onboarding Checklist
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="orientationCompleted"
                                                checked={formData.orientationCompleted}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                            />
                                            <span className="text-sm text-gray-700">Orientation Completed</span>
                                        </label>
                                        <div className="ml-6">
                                            <label className="block text-xs text-gray-600 mb-1">Orientation Date</label>
                                            <input
                                                type="date"
                                                name="orientationDate"
                                                value={formData.orientationDate}
                                                onChange={handleChange}
                                                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="trainingCompleted"
                                                checked={formData.trainingCompleted}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                            />
                                            <span className="text-sm text-gray-700">Training Completed</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="systemAccess"
                                                checked={formData.systemAccess}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                            />
                                            <span className="text-sm text-gray-700">System Access Granted</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Additional Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Any additional notes or special instructions"
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
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                Complete Onboarding
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;

