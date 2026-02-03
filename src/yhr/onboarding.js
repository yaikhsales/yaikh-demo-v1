import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Briefcase, FileText, Calendar, CheckSquare, Building } from 'lucide-react';
import { useTranslation } from '../translate/TranslationContext';

const Onboarding = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
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
                            <span className="font-medium">{t('back')}</span>
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all hover:scale-110 cursor-pointer flex-shrink-0"
                            title={t('home')}
                        >
                            <img 
                                src="/logo.jpg" 
                                alt={t('home')} 
                                className="w-full h-full object-cover"
                            />
                        </button>
                        <h1 className="text-lg font-bold">{t('employeeOnboarding')}</h1>
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
                                {t('employeeInformation')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('employeeName')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeName"
                                        value={formData.employeeName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder={t('enterFullName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('employeeId')} <span className="text-red-500">*</span>
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
                                        {t('emailAddress')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder={t('employeeAtCompany')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('phoneNumber')} <span className="text-red-500">*</span>
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
                                {t('jobDetails')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('department')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectDepartment')}</option>
                                        <option value="IT">IT</option>
                                        <option value="HR">HR</option>
                                        <option value="Finance">{t('financial')}</option>
                                        <option value="Operations">{t('operations')}</option>
                                        <option value="Production">{t('production')}</option>
                                        <option value="QA">{t('qa')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('position')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder={t('jobTitle')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('reportingManager')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="manager"
                                        value={formData.manager}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder={t('managerName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('startDate')} <span className="text-red-500">*</span>
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
                                        {t('employmentType')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectType')}</option>
                                        <option value="Full-time">{t('fullTime')}</option>
                                        <option value="Part-time">{t('partTime')}</option>
                                        <option value="Contract">{t('contract')}</option>
                                        <option value="Temporary">{t('temporary')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Building size={14} />
                                        {t('workLocation')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="workLocation"
                                        value={formData.workLocation}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder={t('officeLocation')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('workSchedule')}
                                    </label>
                                    <select
                                        name="workSchedule"
                                        value={formData.workSchedule}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectSchedule')}</option>
                                        <option value="Monday-Friday 8AM-5PM">{t('mondayFriday')}</option>
                                        <option value="Monday-Saturday 8AM-5PM">{t('mondaySaturday')}</option>
                                        <option value="Shift Work">{t('shiftWork')}</option>
                                        <option value="Flexible">{t('flexible')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('salary')}
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
                                {t('benefitsEquipment')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('benefitsPackage')}
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
                                                <span className="text-sm text-gray-700">{t(benefit.toLowerCase().replace(/\s+/g, '')) || benefit}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('equipmentAccess')}
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
                                                <span className="text-sm text-gray-700">{t(equipment.toLowerCase().replace(/\s+/g, '')) || equipment}</span>
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
                                {t('documentsChecklist')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('requiredDocuments')}
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
                                                <span className="text-sm text-gray-700">{t(doc.toLowerCase().replace(/[\/\s]+/g, '')) || doc}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('onboardingChecklist')}
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
                                            <span className="text-sm text-gray-700">{t('orientationCompleted')}</span>
                                        </label>
                                        <div className="ml-6">
                                            <label className="block text-xs text-gray-600 mb-1">{t('orientationDate')}</label>
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
                                            <span className="text-sm text-gray-700">{t('trainingCompleted')}</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="systemAccess"
                                                checked={formData.systemAccess}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                            />
                                            <span className="text-sm text-gray-700">{t('systemAccessGranted')}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                {t('additionalNotes')}
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder={t('anyAdditionalNotes')}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                {t('completeOnboarding')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;

