import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Heart, Shield, Calendar, DollarSign, FileText, MessageCircle } from 'lucide-react';
import GeneralAIAgent from '../general-ag';
import { useTranslation } from '../translate/TranslationContext';

const BenefitProfile = ({ onBack }) => {
    const navigate = useNavigate();
    const { t, translateModuleTitle } = useTranslation();
    const [isBotOpen, setIsBotOpen] = useState(false);
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
                        <h1 className="text-lg font-bold">{t('benefitProfile')}</h1>
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
                                {t('employeeInformation')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="EMP-XXXXX"
                                    />
                                </div>
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder={t('enterFullName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('department')}
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder={t('departmentName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('position')}
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder={t('jobTitle')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {t('enrollmentDate')}
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
                                {t('healthInsurance')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('insuranceProvider')}
                                    </label>
                                    <input
                                        type="text"
                                        name="healthInsurance.provider"
                                        value={formData.healthInsurance.provider}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder={t('insuranceCompanyName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('policyNumber')}
                                    </label>
                                    <input
                                        type="text"
                                        name="healthInsurance.policyNumber"
                                        value={formData.healthInsurance.policyNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder={t('policyNumberPlaceholder')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('coverageType')}
                                    </label>
                                    <select
                                        name="healthInsurance.coverageType"
                                        value={formData.healthInsurance.coverageType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="">{t('selectCoverage')}</option>
                                        <option value="Individual">{t('individual')}</option>
                                        <option value="Family">{t('family')}</option>
                                        <option value="Employee + Spouse">{t('employeeSpouse')}</option>
                                        <option value="Employee + Children">{t('employeeChildren')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('startDate')}
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
                                        {t('endDate')}
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
                                {t('dentalInsurance')}
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
                                        <span className="text-sm font-semibold text-gray-700">{t('dentalInsuranceCovered')}</span>
                                    </label>
                                </div>
                                {formData.dentalInsurance.covered && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('provider')}
                                            </label>
                                            <input
                                                type="text"
                                                name="dentalInsurance.provider"
                                                value={formData.dentalInsurance.provider}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder={t('insuranceCompany')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('policyNumber')}
                                            </label>
                                            <input
                                                type="text"
                                                name="dentalInsurance.policyNumber"
                                                value={formData.dentalInsurance.policyNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder={t('policyNumberPlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('startDate')}
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
                                                {t('endDate')}
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
                                {t('lifeInsurance')}
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
                                        <span className="text-sm font-semibold text-gray-700">{t('lifeInsuranceCovered')}</span>
                                    </label>
                                </div>
                                {formData.lifeInsurance.covered && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('provider')}
                                            </label>
                                            <input
                                                type="text"
                                                name="lifeInsurance.provider"
                                                value={formData.lifeInsurance.provider}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder={t('insuranceCompany')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('policyNumber')}
                                            </label>
                                            <input
                                                type="text"
                                                name="lifeInsurance.policyNumber"
                                                value={formData.lifeInsurance.policyNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder={t('policyNumberPlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                                <DollarSign size={14} />
                                                {t('coverageAmount')}
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
                                                {t('beneficiary')}
                                            </label>
                                            <input
                                                type="text"
                                                name="lifeInsurance.beneficiary"
                                                value={formData.lifeInsurance.beneficiary}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder={t('beneficiaryNamePlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('startDate')}
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
                                {t('retirementPlan')}
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
                                        <span className="text-sm font-semibold text-gray-700">{t('enrolledInRetirementPlan')}</span>
                                    </label>
                                </div>
                                {formData.retirementPlan.enrolled && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('planType')}
                                            </label>
                                            <select
                                                name="retirementPlan.planType"
                                                value={formData.retirementPlan.planType}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            >
                                                <option value="">{t('selectPlan')}</option>
                                                <option value="401(k)">401(k)</option>
                                                <option value="Pension Plan">{t('pensionPlan')}</option>
                                                <option value="Provident Fund">{t('providentFund')}</option>
                                                <option value="Other">{t('other')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('employeeContributionRate')}
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
                                                {t('employerMatch')}
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
                                                {t('accountNumber')}
                                            </label>
                                            <input
                                                type="text"
                                                name="retirementPlan.accountNumber"
                                                value={formData.retirementPlan.accountNumber}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder={t('accountNumberPlaceholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                {t('startDate')}
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
                                {t('paidTimeOff')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('totalDaysAllocated')}
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
                                        {t('daysUsed')}
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
                                        {t('remainingDays')}
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
                                        {t('carryOverDays')}
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
                                {t('allowances')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {t('transportationAllowance')}
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
                                        {t('mealAllowance')}
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
                                        {t('housingAllowance')}
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
                                        {t('otherAllowances')}
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
                                {t('additionalNotes')}
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder={t('anyAdditionalNotesBenefits')}
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
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
                            >
                                <Save size={18} />
                                {t('saveBenefitProfile')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Bot Button - Bottom Right */}
            <button
                onClick={() => setIsBotOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                aria-label="Ask Benefit Profile bot"
                title="Ask Benefit Profile bot"
            >
                <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            </button>
            
            {/* Bot Modal */}
            {isBotOpen && (
                <GeneralAIAgent 
                    onClose={() => setIsBotOpen(false)}
                    moduleContext="Benefit Profile"
                />
            )}
        </div>
    );
};

export default BenefitProfile;

