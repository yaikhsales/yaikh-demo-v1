import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';

const RequestWorkerForm = ({ onBack }) => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        requestor: 'Testuser',
        department: '',
        gender: '',
        shift: '',
        workerType: '',
        hourlyRate: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const [errors, setErrors] = useState({});

    const departments = [
        'Admin',
        'HR',
        'Production',
        'Quality Assurance',
        'Cutting',
        'Sewing',
        'Pressing',
        'Packaging'
    ];

    const genders = ['Male', 'Female', 'Other'];

    const shifts = [
        'Morning Shift',
        'Afternoon Shift',
        'Night Shift',
        'Full Day'
    ];

    const workerTypes = [
        'Full-time',
        'Part-time',
        'Contract',
        'Temporary'
    ];

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
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        const newErrors = {};
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.shift) newErrors.shift = 'Shift is required';
        if (!formData.workerType) newErrors.workerType = 'Worker Type is required';
        if (!formData.startDate) newErrors.startDate = 'Start Date is required';
        if (!formData.endDate) newErrors.endDate = 'End Date is required';
        if (!formData.reason) newErrors.reason = 'Reason is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission
        console.log('Form submitted:', formData);
        // You can add API call here
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col animate-in fade-in duration-500 z-[200]">
            {/* Header */}
            <div className="bg-white p-4 border-b flex items-center gap-4 flex-shrink-0 shadow-sm relative z-[201]">
                <button 
                    onClick={handleBack} 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0 bg-slate-600 text-white font-semibold text-sm"
                    aria-label="Go back"
                >
                    <ArrowLeft size={16} /> Back
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex-1 text-center">Temporary Worker Request</h1>
                <div className="w-16"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-3xl mx-auto">
                    {/* White Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Requestor */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Requestor <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="requestor"
                                    value={formData.requestor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.department && (
                                    <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                                )}
                            </div>

                            {/* Gender of Worker */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Gender of Worker <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        {genders.map((gender) => (
                                            <option key={gender} value={gender}>
                                                {gender}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.gender && (
                                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                                )}
                            </div>

                            {/* Shift */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Shift <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="shift"
                                        value={formData.shift}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                        required
                                    >
                                        <option value="">-- Select Option --</option>
                                        {shifts.map((shift) => (
                                            <option key={shift} value={shift}>
                                                {shift}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.shift && (
                                    <p className="text-red-500 text-xs mt-1">{errors.shift}</p>
                                )}
                            </div>

                            {/* Worker Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Worker Type <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="workerType"
                                        value={formData.workerType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                        required
                                    >
                                        <option value="">-- Select Option --</option>
                                        {workerTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.workerType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.workerType}</p>
                                )}
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Hourly Rate
                                </label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={formData.hourlyRate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder=""
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                        placeholder="yyyy-mm-dd"
                                        required
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.startDate && (
                                    <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
                                )}
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    End Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                        placeholder="yyyy-mm-dd"
                                        required
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.endDate && (
                                    <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                                )}
                            </div>

                            {/* Reason */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Reason <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                    placeholder="Enter reason"
                                    required
                                />
                                {errors.reason && (
                                    <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-start pt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestWorkerForm;

